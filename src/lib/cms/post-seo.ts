import type { Post } from "./types";

const nonBlank = (value: string | null | undefined) => value?.trim() || "";

export function postSeo(
  post: Pick<Post, "title" | "excerpt" | "seo_title" | "seo_description">,
) {
  return {
    title: nonBlank(post.seo_title) || post.title,
    description: nonBlank(post.seo_description) || nonBlank(post.excerpt),
  };
}
