import { readItems } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import type { Post } from "./types";

const publishedFilter = {
  status: { _eq: "published" },
  published_at: { _lte: "$NOW" },
};
const validPosts = (value: unknown): value is Post[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      !!item &&
      typeof item === "object" &&
      typeof (item as Post).title === "string" &&
      typeof (item as Post).slug === "string" &&
      typeof (item as Post).published_at === "string" &&
      Number.isFinite(Date.parse((item as Post).published_at)),
  );
export async function readPosts(): Promise<Post[]> {
  return safeCmsRequest<Post[]>(
    "Stories",
    () =>
      cmsClient().request(
        readItems("posts", {
          filter: publishedFilter,
          sort: ["-featured", "-published_at"],
          limit: 100,
        }),
      ),
    [],
    validPosts,
  );
}
export async function readPost(slug: string): Promise<Post | null> {
  const rows = await safeCmsRequest<Post[]>(
    "Story detail",
    () =>
      cmsClient().request(
        readItems("posts", {
          filter: { ...publishedFilter, slug: { _eq: slug } },
          limit: 1,
        }),
      ),
    [],
    validPosts,
  );
  return rows[0] ?? null;
}
