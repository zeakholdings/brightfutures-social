import { readItems } from "@directus/sdk"
import { cmsClient, safeCmsRequest } from "./client"
import type { ArtWallSubmission, ArtWallType } from "@/data/art-wall"

type CmsArtWall = {
  slug: string; title: string; submission_type: ArtWallType; display_name?: string | null; is_anonymous?: boolean
  description?: string | null; text_content?: string | null; file?: string | null; alt_text?: string | null
  theme_slug?: string | null; content_note?: string | null; reveal_content?: boolean; featured?: boolean; published_at?: string | null
}
const fields = ["slug", "title", "submission_type", "display_name", "is_anonymous", "description", "text_content", "file", "alt_text", "theme_slug", "content_note", "reveal_content", "featured", "published_at"] as const
function publicWork(item: CmsArtWall): ArtWallSubmission {
  return { slug: item.slug, title: item.title, type: item.submission_type, displayName: item.is_anonymous ? "Anonymous" : item.display_name || "Anonymous", isAnonymous: !!item.is_anonymous, description: item.description || null, textContent: item.text_content || null, imageUrl: item.file ? `/art-wall/media/${encodeURIComponent(item.file)}` : null, altText: item.alt_text || null, theme: item.theme_slug || null, contentNote: item.content_note || null, revealContent: !!item.reveal_content, featured: !!item.featured, publishedAt: item.published_at || null }
}
export async function readPublishedArtWall(): Promise<ArtWallSubmission[]> {
  return safeCmsRequest("art wall", () => cmsClient().request(readItems("art_wall_submissions", { fields: [...fields], filter: { moderation_status: { _eq: "approved" }, removed_at: { _null: true }, published_at: { _nnull: true } }, sort: ["-featured", "-published_at"], limit: 100 })), [], (value): value is CmsArtWall[] => Array.isArray(value)).then((items) => items.map(publicWork))
}
export async function readPublishedArtWallItem(slug: string): Promise<ArtWallSubmission | null> {
  const result = await safeCmsRequest("art wall work", () => cmsClient().request(readItems("art_wall_submissions", { fields: [...fields], filter: { slug: { _eq: slug }, moderation_status: { _eq: "approved" }, removed_at: { _null: true } }, limit: 1 })), [], (value): value is CmsArtWall[] => Array.isArray(value))
  return result[0] ? publicWork(result[0]) : null
}
