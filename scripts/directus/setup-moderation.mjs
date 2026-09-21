import { api, apiPath } from "./lib.mjs";

async function patchField(collection, field, meta) {
  await api(`/fields/${collection}/${field}`, {
    method: "PATCH",
    body: JSON.stringify({ meta }),
  });
}

async function ensureGroup(collection, fieldName, label, note, sort) {
  const fields = await api(`/fields/${collection}`);
  const spec = {
    field: fieldName,
    type: "alias",
    meta: {
      special: ["alias", "no-data", "group"],
      interface: "group-detail",
      options: { start: "open", headerIcon: fieldName === "private_response" ? "lock" : "verified" },
      translations: [{ language: "en-US", translation: label }],
      note,
      width: "full",
      sort,
    },
  };
  if (fields.some((field) => field.field === fieldName))
    await api(`/fields/${collection}/${fieldName}`, { method: "PATCH", body: JSON.stringify({ meta: spec.meta }) });
  else
    await api(`/fields/${collection}`, { method: "POST", body: JSON.stringify(spec) });
}

await api("/collections/community_checkins", {
  method: "PATCH",
  body: JSON.stringify({
    meta: {
      hidden: false,
      icon: "how_to_reg",
      display_template: "{{date_created}} — {{status}} — {{name}}",
      note: "Private member responses. Review carefully; never publish a check-in directly.",
    },
  }),
});
await api("/collections/member_highlights", {
  method: "PATCH",
  body: JSON.stringify({
    meta: {
      display_template: "{{title}} — {{status}}",
      note: "Public-safe editorial records. Publication is always a separate manual decision.",
    },
  }),
});

await ensureGroup(
  "community_checkins",
  "private_response",
  "PRIVATE RESPONSE",
  "Confidential. Do not copy private answers into public content.",
  5,
);
await ensureGroup(
  "community_checkins",
  "approved_public_excerpt",
  "APPROVED PUBLIC EXCERPT",
  "Only this member-approved excerpt may be considered for a public highlight, subject to consent and manual review.",
  13,
);

const privateFields = ["highlight", "proud_of", "goal_or_challenge", "brightfutures_idea", "issue_to_raise", "name", "email"];
const publicFields = ["share_publicly", "public_name_preference", "public_excerpt", "website_consent", "social_media_consent", "consent_recorded_at"];
for (const field of privateFields) await patchField("community_checkins", field, { group: "private_response" });
for (const field of publicFields) await patchField("community_checkins", field, { group: "approved_public_excerpt" });

await patchField("community_checkins", "status", {
  display: "labels",
  options: {
    choices: [
      { text: "New", value: "new", color: "#2ECDA7" },
      { text: "Reviewed", value: "reviewed", color: "#A2B5CD" },
      { text: "Action needed", value: "action_needed", color: "#E35169" },
      { text: "Closed", value: "closed", color: "#6B7280" },
    ],
  },
});
await patchField("community_checkins", "public_excerpt", {
  note: "Member-approved wording only. Before using it, check website consent and review for sensitive or third-party information.",
});
await patchField("community_checkins", "internal_notes", {
  note: "Internal only. Do not add safeguarding conclusions or alter the member’s private submission.",
});
await patchField("member_highlights", "status", {
  note: "Drafts are never public. An editor must explicitly change this to Published after final review.",
});
await patchField("member_highlights", "highlight_text", {
  note: "Review before publication. Do not include unnecessary sensitive personal information, identifiable third-party information, detailed family/care history, or inappropriate health information.",
});
await patchField("member_highlights", "source_checkin", {
  readonly: true,
  note: "Internal consent source/reference. This relationship is excluded from public API fields.",
});
await patchField("member_highlights", "website_consent_confirmed", { readonly: true, note: "Must be Yes for website publication." });
await patchField("member_highlights", "social_consent_confirmed", { readonly: true, note: "If No, do not use this highlight on social media." });
await patchField("member_highlights", "consent_confirmed_at", { readonly: true, note: "When the draft workflow confirmed the source consent." });
await patchField("events", "status", {
  note: "Publication control: Interest Check, Confirmed and Completed events are public. Draft, Provisional and Cancelled events are not shown on the website.",
  display: "labels",
  options: {
    choices: [
      { text: "Draft (not public)", value: "draft", color: "#6B7280" },
      { text: "Provisional (not public)", value: "provisional", color: "#D97706" },
      { text: "Interest Check (public)", value: "interest-check", color: "#E76F51" },
      { text: "Confirmed (public)", value: "confirmed", color: "#059669" },
      { text: "Cancelled (not public)", value: "cancelled", color: "#DC2626" },
      { text: "Completed (public archive)", value: "completed", color: "#2563EB" },
    ],
  },
});
await patchField("events", "interest_options", {
  note: "Interest Check only. Add JSON such as [{\"id\":\"sat-1400\",\"label\":\"Saturday 3 October, 2–4pm\",\"start\":\"2026-10-03T14:00:00+01:00\",\"end\":\"2026-10-03T16:00:00+01:00\"}]. Keep IDs stable while voting is open.",
});
await patchField("events", "interest_closes_at", {
  note: "Optional. The public form closes automatically after this date/time.",
});
await patchField("events", "published_at", {
  hidden: true,
  note: "Legacy field. Event visibility is controlled by Status, not this date.",
});

const existingPresets = await api(apiPath("/presets", { limit: -1, fields: "id,user,role,collection,bookmark" }));
const presetPayload = {
  bookmark: null,
  user: null,
  role: null,
  collection: "community_checkins",
  layout: "tabular",
  layout_query: {
    tabular: {
      sort: ["-date_created"],
      fields: ["date_created", "status", "term", "name", "share_publicly", "website_consent", "social_media_consent", "reviewed_at"],
      page: 1,
    },
  },
  layout_options: {
    tabular: {
      widths: { date_created: 190, status: 140, term: 120, name: 180, share_publicly: 150, website_consent: 150, social_media_consent: 150, reviewed_at: 190 },
    },
  },
};
const globalPreset = existingPresets.find((preset) => preset.collection === "community_checkins" && preset.user === null && preset.role === null && preset.bookmark === null);
if (globalPreset)
  await api(`/presets/${globalPreset.id}`, { method: "PATCH", body: JSON.stringify(presetPayload) });
else
  await api("/presets", { method: "POST", body: JSON.stringify(presetPayload) });

const flowName = "Create safe Member Highlight draft";
const existingFlows = await api(apiPath("/flows", { limit: -1, fields: "id,name,operation" }));
let flow = existingFlows.find((item) => item.name === flowName);
if (!flow) {
  flow = await api("/flows", {
    method: "POST",
    body: JSON.stringify({
      name: flowName,
      icon: "verified",
      color: "#E76F51",
      description: "Validates website consent and creates a public-safe draft only.",
      status: "inactive",
      trigger: "manual",
      accountability: "$trigger",
      options: {
        collections: ["community_checkins"],
        location: "item",
        async: false,
        error_on_reject: true,
        requireConfirmation: true,
        confirmationDescription: "Create a draft from the approved excerpt only? Confirm the excerpt contains no unnecessary sensitive or third-party information. This does not publish anything.",
        fields: [],
      },
    }),
  });
}
await api(`/flows/${flow.id}`, { method: "PATCH", body: JSON.stringify({ status: "inactive" }) });

const operations = await api(apiPath("/operations", { limit: -1, fields: "id,key,flow" }));
async function ensureOperation(key, payload) {
  const existing = operations.find((operation) => operation.flow === flow.id && operation.key === key);
  if (existing) {
    await api(`/operations/${existing.id}`, { method: "PATCH", body: JSON.stringify(payload) });
    return { ...existing, ...payload };
  }
  return api("/operations", { method: "POST", body: JSON.stringify({ ...payload, key, flow: flow.id }) });
}

const create = await ensureOperation("create_highlight_draft", {
  name: "Create draft highlight",
  type: "item-create",
  position_x: 39,
  position_y: 33,
  resolve: null,
  reject: null,
  options: { collection: "member_highlights", permissions: "$trigger", emitEvents: true, payload: "{{prepare_highlight}}" },
});
const prepare = await ensureOperation("prepare_highlight", {
  name: "Validate consent and prepare safe fields",
  type: "exec",
  position_x: 20,
  position_y: 33,
  resolve: create.id,
  reject: null,
  options: {
    code: `module.exports = function (data) {
  const item = data.read_checkin;
  if (!item || item.share_publicly !== true) throw new Error("Public sharing was not requested.");
  if (!item.public_excerpt || !String(item.public_excerpt).trim()) throw new Error("No approved public excerpt exists.");
  if (item.website_consent !== true) throw new Error("Website consent is required.");
  const preference = item.public_name_preference;
  if (!["full_name", "first_name", "anonymous"].includes(preference)) throw new Error("Attribution preference is invalid.");
  const exactName = item.name ? String(item.name).trim() : "";
  let displayName = null;
  if (preference === "full_name") {
    if (exactName.split(/\\s+/).length < 2) throw new Error("A full name is required for full-name attribution.");
    displayName = exactName;
  }
  if (preference === "first_name") {
    if (!exactName) throw new Error("A name is required for first-name attribution.");
    displayName = exactName.split(/\\s+/)[0];
  }
  return {
    status: "draft",
    title: "Member highlight",
    slug: "member-highlight-" + item.id,
    display_name: displayName,
    highlight_text: String(item.public_excerpt).trim(),
    category: "Other",
    term: item.term || null,
    source_checkin: item.id,
    website_consent_confirmed: true,
    social_consent_confirmed: item.social_media_consent === true,
    consent_confirmed_at: new Date().toISOString(),
    published_at: null
  };
}`,
  },
});
const read = await ensureOperation("read_checkin", {
  name: "Read selected private check-in",
  type: "item-read",
  position_x: 1,
  position_y: 33,
  resolve: prepare.id,
  reject: null,
  options: {
    collection: "community_checkins",
    key: "{{$trigger.body.keys}}",
    query: { fields: ["id", "term", "name", "share_publicly", "public_name_preference", "public_excerpt", "website_consent", "social_media_consent"] },
    permissions: "$trigger",
    emitEvents: false,
  },
});
await api(`/flows/${flow.id}`, {
  method: "PATCH",
  body: JSON.stringify({ operation: read.id, status: "active" }),
});

const privateCheckinPolicyId = process.env.DIRECTUS_PRIVATE_CHECKIN_POLICY_ID;
if (!privateCheckinPolicyId) throw new Error("DIRECTUS_PRIVATE_CHECKIN_POLICY_ID is required for moderation setup");
const flowPermissions = await api(apiPath("/permissions", {
  limit: -1,
  fields: "id",
  "filter[policy][_eq]": privateCheckinPolicyId,
  "filter[collection][_eq]": "directus_flows",
  "filter[action][_eq]": "read",
}));
const flowPermissionPayload = {
  policy: privateCheckinPolicyId,
  collection: "directus_flows",
  action: "read",
  permissions: { _and: [{ status: { _eq: "active" } }, { trigger: { _eq: "manual" } }, { id: { _eq: flow.id } }] },
  validation: {},
  presets: {},
  fields: ["id", "name", "icon", "color", "description", "status", "trigger", "options"],
};
if (flowPermissions.length)
  await api(`/permissions/${flowPermissions[0].id}`, { method: "PATCH", body: JSON.stringify(flowPermissionPayload) });
else
  await api("/permissions", { method: "POST", body: JSON.stringify(flowPermissionPayload) });

const ownUserPermissions = await api(apiPath("/permissions", {
  limit: -1,
  fields: "id",
  "filter[policy][_eq]": privateCheckinPolicyId,
  "filter[collection][_eq]": "directus_users",
  "filter[action][_eq]": "read",
}));
const ownUserPermissionPayload = {
  policy: privateCheckinPolicyId,
  collection: "directus_users",
  action: "read",
  permissions: { id: { _eq: "$CURRENT_USER" } },
  validation: {},
  presets: {},
  fields: ["id", "first_name", "last_name"],
};
if (ownUserPermissions.length)
  await api(`/permissions/${ownUserPermissions[0].id}`, { method: "PATCH", body: JSON.stringify(ownUserPermissionPayload) });
else
  await api("/permissions", { method: "POST", body: JSON.stringify(ownUserPermissionPayload) });

console.log(JSON.stringify({ flow_id: flow.id, preset: "community_checkins global tabular", groups: ["private_response", "approved_public_excerpt"] }));
