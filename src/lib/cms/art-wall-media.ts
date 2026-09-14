import { createDirectus, readItems, rest, staticToken } from "@directus/sdk"

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"])

/** Streams only media attached to an approved, currently published Art Wall record. */
export async function approvedArtWallMedia(id: string): Promise<Response> {
  if (!uuid.test(id)) return new Response("Not found", { status: 404 })
  const token = process.env.DIRECTUS_ART_WALL_TOKEN || process.env.DIRECTUS_SERVER_TOKEN
  const base = (process.env.DIRECTUS_URL || "https://cms.brightfutures.social").replace(/\/$/, "")
  if (!token) return new Response("Not found", { status: 404 })
  try {
    const client = createDirectus(base).with(staticToken(token)).with(rest())
    const records = await client.request(readItems("art_wall_submissions", { fields: ["file"], filter: { file: { _eq: id }, moderation_status: { _eq: "approved" }, published_at: { _nnull: true }, removed_at: { _null: true } }, limit: 1 })) as Array<{ file?: string | null }>
    if (!records.length) return new Response("Not found", { status: 404 })
    const source = await fetch(`${base}/assets/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${token}` } })
    const type = source.headers.get("content-type")?.split(";", 1)[0].toLowerCase() || ""
    if (!source.ok || !source.body || !imageTypes.has(type)) return new Response("Not found", { status: 404 })
    return new Response(source.body, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400", "X-Content-Type-Options": "nosniff" } })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}
