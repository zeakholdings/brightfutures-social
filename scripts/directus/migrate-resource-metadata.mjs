import { api } from "./lib.mjs";

const reviewedOn = process.env.RESOURCE_REVIEWED_ON;
if (!reviewedOn || !/^\d{4}-\d{2}-\d{2}$/.test(reviewedOn)) {
  throw new Error("RESOURCE_REVIEWED_ON is required in YYYY-MM-DD format");
}
const reviewDue = process.env.RESOURCE_REVIEW_DUE || null;
if (reviewDue && !/^\d{4}-\d{2}-\d{2}$/.test(reviewDue)) {
  throw new Error("RESOURCE_REVIEW_DUE must use YYYY-MM-DD format");
}

const resources = await api("/items/resources?limit=-1&sort=display_order,title");
let updated = 0;
for (const resource of resources) {
  const patch = {};
  if (!resource.source_url && resource.url) patch.source_url = resource.url;
  if (!resource.last_reviewed) patch.last_reviewed = reviewedOn;
  if (!resource.review_due && reviewDue) patch.review_due = reviewDue;
  if (!resource.resource_status) patch.resource_status = "active";
  if (Object.keys(patch).length) {
    await api(`/items/resources/${resource.id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    updated += 1;
  }
}

console.log(`Resource metadata migration complete: ${updated} of ${resources.length} records updated; content and ordering unchanged.`);
