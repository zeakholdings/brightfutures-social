const slugify = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default ({ filter }, { database }) => {
  filter("items.create", (payload, meta) => {
    if (meta.collection !== "posts") return payload;

    if (!payload.slug && typeof payload.title === "string") {
      payload.slug = slugify(payload.title);
    }

    if (payload.status === "published" && !payload.published_at) {
      payload.published_at = new Date().toISOString();
    }

    return payload;
  });

  filter("items.update", async (payload, meta) => {
    if (meta.collection !== "posts" || payload.status !== "published") {
      return payload;
    }

    const keys = Array.isArray(meta.keys) ? meta.keys : [meta.keys];
    const existing = await database("posts")
      .select("id", "status", "published_at")
      .whereIn("id", keys.filter((key) => key !== undefined));

    if (
      !payload.published_at &&
      existing.length > 0 &&
      existing.every(
        (post) => post.status !== "published" && !post.published_at,
      )
    ) {
      payload.published_at = new Date().toISOString();
    }

    return payload;
  });
};
