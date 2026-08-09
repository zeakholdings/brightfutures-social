import { readItems } from "@directus/sdk"
import { cmsClient } from "./client"
import type { CmsEvent } from "./types"

export async function readPublicEvents() {
  return cmsClient().request(readItems("events", {
    filter: { status: { _in: ["confirmed", "completed", "cancelled"] } },
    sort: ["start_date", "sort"],
    limit: 200,
  })) as Promise<CmsEvent[]>
}

export async function readPublicEvent(slug: string) {
  const rows = await cmsClient().request(readItems("events", { filter: { slug: { _eq: slug }, status: { _in: ["confirmed", "completed", "cancelled"] } }, limit: 1 })) as CmsEvent[]
  return rows[0] ?? null
}
