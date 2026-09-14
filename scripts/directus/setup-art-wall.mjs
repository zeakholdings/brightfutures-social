import { api, apiPath, field, select } from "./lib.mjs";

const collection = "art_wall_submissions";
const fields = [
  field("slug", "string", { is_unique: true }, { note: "Generated on approval. Never use an email address in a slug." }),
  field("title", "string", { is_nullable: false }),
  select("submission_type", ["drawing", "painting", "digital-art", "photography", "poetry", "writing", "mixed-media", "other"], "drawing"),
  field("display_name", "string"), field("is_anonymous", "boolean", { default_value: false }),
  field("contact_email", "string", { is_nullable: false }, { note: "Private. Never expose this field through a public API response." }),
  field("description", "text"), field("text_content", "text"),
  field("file", "uuid", {}, { interface: "file-image", special: ["file"], note: "Private while pending. Do not share an asset URL before approval." }),
  field("alt_text", "string", {}, { note: "Required before approving visual work unless the image is explicitly decorative." }),
  field("theme_slug", "string"), field("content_note", "string"), field("reveal_content", "boolean", { default_value: false }),
  select("moderation_status", ["pending", "approved", "rejected", "removed"], "pending"),
  field("moderation_notes", "text", {}, { note: "Private internal moderation notes." }),
  field("requires_safeguarding_review", "boolean", { default_value: false }, { note: "Internal flag only. It does not send a message or make a safeguarding decision." }),
  field("featured", "boolean", { default_value: false }), field("submitted_at", "timestamp", { default_value: "CURRENT_TIMESTAMP" }),
  field("reviewed_at", "timestamp"), field("published_at", "timestamp"), field("removed_at", "timestamp"),
  field("consent_given", "boolean", { is_nullable: false }), field("guidelines_accepted", "boolean", { is_nullable: false }),
];
const existing = await api(apiPath("/collections", { limit: -1, fields: "collection" }));
if (!existing.some((item) => item.collection === collection)) await api("/collections", { method: "POST", body: JSON.stringify({ collection, meta: { icon: "palette", note: "Private moderation queue. Nothing is public until manually approved.", display_template: "{{title}} · {{moderation_status}}" }, schema: {} }) });
const current = await api(`/fields/${collection}`);
for (const spec of fields) {
  const exists = current.some((item) => item.field === spec.field);
  if (exists) await api(`/fields/${collection}/${spec.field}`, { method: "PATCH", body: JSON.stringify({ schema: spec.schema, meta: spec.meta }) });
  else await api(`/fields/${collection}`, { method: "POST", body: JSON.stringify(spec) });
}
console.log("Art Wall collection is ready. Configure permissions before enabling submissions.");
