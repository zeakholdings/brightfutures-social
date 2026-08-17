import { api } from "./lib.mjs";

const fields = {
  slug: {
    schema: { is_nullable: true, is_unique: true },
    meta: {
      note: "Generated from the title for new posts. You can edit it manually.",
    },
  },
  published_at: {
    schema: { is_nullable: true },
    meta: {
      note: "Optional for drafts. Set automatically the first time a post is published if left blank.",
    },
  },
  seo_title: {
    schema: { is_nullable: true },
    meta: { note: "Defaults to post title if left blank." },
  },
  seo_description: {
    schema: { is_nullable: true },
    meta: { note: "Defaults to post excerpt if left blank." },
  },
};

for (const [field, updates] of Object.entries(fields)) {
  await api(`/fields/posts/${field}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

console.log("Posts editor fields updated.");
