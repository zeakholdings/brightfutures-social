import { createHmac } from "node:crypto";
import { api, apiPath } from "./lib.mjs";

const secret = process.env.DIRECTUS_SERVER_TOKEN || process.env.DIRECTUS_ADMIN_TOKEN;
if (!secret) throw new Error("DIRECTUS_SERVER_TOKEN or DIRECTUS_ADMIN_TOKEN is required.");

const apply = process.argv.includes("--apply");

function recoveryId(source) {
  const hex = createHmac("sha256", secret)
    .update(`brightfutures:event-interest-recovery:${source}`)
    .digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${((parseInt(hex.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hex.slice(18, 20)}-${hex.slice(20, 32)}`;
}

function responsePayload(data, respondentId) {
  return {
    event_slug: data.event_slug,
    respondent_id: respondentId,
    attendance: data.attendance,
    availability: Array.isArray(data.availability) ? data.availability : [],
    suggested_slots: Array.isArray(data.suggested_slots) ? data.suggested_slots : [],
    comment: typeof data.comment === "string" ? data.comment : null,
    email: typeof data.email === "string" && data.email ? data.email : null,
  };
}

const legacy = await api(
  apiPath("/items/event_interest_responses", {
    "filter[respondent_id][_null]": "true",
    fields: "id,event_slug,attendance,availability,suggested_slots,comment,email",
    limit: -1,
  }),
);
const revisions = await api(
  apiPath("/revisions", {
    "filter[collection][_eq]": "event_interest_responses",
    fields: "id,item,activity,data",
    limit: -1,
  }),
);

let recovered = 0;
for (const row of legacy) {
  const history = revisions
    .filter((revision) => String(revision.item) === String(row.id) && revision.data?.event_slug === row.event_slug)
    .sort((a, b) => Number(a.activity) - Number(b.activity));
  const earlierSnapshots = history.slice(0, -1);

  for (const revision of earlierSnapshots) {
    const respondentId = recoveryId(`revision:${revision.id}`);
    const existing = await api(
      apiPath("/items/event_interest_responses", {
        "filter[event_slug][_eq]": row.event_slug,
        "filter[respondent_id][_eq]": respondentId,
        fields: "id",
        limit: 1,
      }),
    );
    if (existing.length) continue;
    if (apply)
      await api("/items/event_interest_responses", {
        method: "POST",
        body: JSON.stringify(responsePayload(revision.data, respondentId)),
      });
    recovered += 1;
  }

  const respondentId = recoveryId(`item:${row.id}`);
  if (apply)
    await api(`/items/event_interest_responses/${row.id}`, {
      method: "PATCH",
      body: JSON.stringify({ respondent_id: respondentId }),
    });
  console.log(`${apply ? "Backfilled" : "Would backfill"} item ${row.id}: ${earlierSnapshots.length} recovered revision(s), current row assigned an anonymous ID.`);
}

console.log(`${apply ? "Recovered" : "Would recover"} ${recovered} separate historic response item(s).`);
