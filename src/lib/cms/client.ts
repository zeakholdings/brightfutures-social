import { createDirectus, rest, staticToken } from "@directus/sdk"

const directusUrl = () => process.env.DIRECTUS_URL || "https://cms.brightfutures.social"

export function cmsClient() {
  const client = createDirectus(directusUrl())
  const token = process.env.DIRECTUS_SERVER_TOKEN
  return token
    ? client.with(staticToken(token)).with(rest())
    : client.with(rest())
}

function errorSummary(error: unknown) {
  if (!error || typeof error !== "object") return String(error || "unknown error")
  const value = error as { message?: unknown; response?: { status?: unknown } }
  const status = value.response?.status
  const message = typeof value.message === "string" ? value.message : "request failed"
  return status ? `HTTP ${String(status)}: ${message}` : message
}

export async function safeCmsRequest<T>(label: string, request: () => Promise<unknown>, fallback: T, validate: (value: unknown) => value is T): Promise<T> {
  try {
    const value = await request()
    if (!validate(value)) {
      console.error(`[CMS] ${label} could not be loaded: unexpected response shape.`)
      return fallback
    }
    return value
  } catch (error) {
    console.error(`[CMS] ${label} could not be loaded: ${errorSummary(error)}.`)
    return fallback
  }
}

export function assetUrl(id?: string | null) {
  if (!id) return undefined
  return `${directusUrl().replace(/\/$/, "")}/assets/${encodeURIComponent(id)}`
}
