import { createDirectus, rest } from "@directus/sdk"

const directusUrl = () => process.env.DIRECTUS_URL || "https://cms.brightfutures.social"

export function cmsClient() {
  return createDirectus(directusUrl()).with(rest())
}

export function assetUrl(id?: string | null) {
  if (!id) return undefined
  return `${directusUrl().replace(/\/$/, "")}/assets/${encodeURIComponent(id)}`
}
