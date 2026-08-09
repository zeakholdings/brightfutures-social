import { readItems } from "@directus/sdk"
import { cmsClient } from "./client"
import type { Post } from "./types"

const publishedFilter = { status: { _eq: "published" }, published_at: { _lte: "$NOW" } }
export async function readPosts() { return cmsClient().request(readItems("posts", { filter: publishedFilter, sort: ["-featured", "-published_at"], limit: 100 })) as Promise<Post[]> }
export async function readPost(slug: string) { const rows = await cmsClient().request(readItems("posts", { filter: { ...publishedFilter, slug: { _eq: slug } }, limit: 1 })) as Post[]; return rows[0] ?? null }
