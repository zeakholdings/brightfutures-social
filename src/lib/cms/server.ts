import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { createDirectus, createItem, rest, staticToken } from "@directus/sdk"
import { createHash } from "node:crypto"
import { z } from "zod"
import { events as localEvents, type Event } from "@/data/events"
import { site } from "@/data/site"
import { readCommittee } from "./committee"
import { readPublicEvent, readPublicEvents } from "./events"
import { readPost, readPosts } from "./posts"
import { readResources } from "./resources"
import { readSettings } from "./settings"
import { assetUrl } from "./client"
import type { CmsEvent, CommitteeMember, Post, Resource, SiteSettings } from "./types"

const cache = new Map<string, { until: number; value: unknown }>()
async function cached<T>(key: string, fetcher: () => Promise<T>, fallback: T, seconds = 120): Promise<T> {
  const hit = cache.get(key)
  if (hit && hit.until > Date.now()) return hit.value as T
  try { const value = await fetcher(); cache.set(key, { value, until: Date.now() + seconds * 1000 }); return value } catch { return (hit?.value as T | undefined) ?? fallback }
}

const categoryMap = { Social: "social", "Coffee & Connect": "coffee-connect", Community: "community", Opportunity: "opportunity", "Voice & Advocacy": "voice-advocacy", Wellbeing: "wellbeing", Trips: "trips", Seasonal: "seasonal" } as const
const categoryLabels = { social: "Social", "coffee-connect": "Coffee & Connect", community: "Community", opportunity: "Opportunity", "voice-advocacy": "Voice & Advocacy", wellbeing: "Wellbeing", trips: "Trips", seasonal: "Seasonal" } as const
function localFallback(): CmsEvent[] { return localEvents.filter(e => e.status === "confirmed" || e.status === "completed" || e.status === "cancelled").filter(e => e.startDate).map((e, i) => ({ id: `local-${i}`, title: e.title, slug: e.slug, status: e.status, academic_year: e.academicYear, category: categoryMap[e.category], start_date: `${e.startDate}T12:00:00.000Z`, time_display: e.time, location: e.location, description: e.description, registration_url: e.registrationUrl, featured: e.featured })) }
export function toEvent(event: CmsEvent): Event { return { title: event.title, slug: event.slug, startDate: event.start_date, endDate: event.end_date || undefined, time: event.time_display || undefined, location: event.location || undefined, category: categoryLabels[event.category], description: event.description || "", academicYear: event.academic_year, status: event.status === "draft" ? "provisional" : event.status, featured: !!event.featured, registrationUrl: event.registration_url || undefined, body: event.body || undefined, coverImage: assetUrl(event.cover_image), coverImageAlt: event.cover_image_alt || undefined, accessibilityInfo: event.accessibility_info || undefined } }

export const getEvents = createServerFn({ method: "GET" }).handler(async () => (await cached("events", readPublicEvents, localFallback())).map(toEvent))
export const getEvent = createServerFn({ method: "GET" }).inputValidator(z.object({ slug: z.string().min(1).max(160) })).handler(async ({ data }) => { try { const value = await readPublicEvent(data.slug); return value ? toEvent(value) : localFallback().map(toEvent).find(e => e.slug === data.slug) ?? null } catch { return localFallback().map(toEvent).find(e => e.slug === data.slug) ?? null } })
const withPostAsset = (post: Post) => ({ ...post, featured_image: assetUrl(post.featured_image) || null })
export const getPosts = createServerFn({ method: "GET" }).handler(async () => (await cached<Post[]>("posts", readPosts, [])).map(withPostAsset))
export const getPost = createServerFn({ method: "GET" }).inputValidator(z.object({ slug: z.string().min(1).max(160) })).handler(async ({ data }) => { const post = await cached<Post | null>(`post:${data.slug}`, () => readPost(data.slug), null); return post ? withPostAsset(post) : null })
const committeeFallback: CommitteeMember[] = [{ id: "arshan-mahi", name: "Arshan Mahi", role: "President", academic_year: "2026/27" }, { id: "pragati-sahu", name: "Pragati Sahu", role: "Treasurer & Events and Community Officer", academic_year: "2026/27" }, { id: "faduma-hussain", name: "Faduma Hussain", role: "Communications & Marketing Officer", academic_year: "2026/27" }]
export const getCommittee = createServerFn({ method: "GET" }).handler(async () => (await cached("committee", readCommittee, committeeFallback)).map(person => ({ ...person, photo: assetUrl(person.photo) || null })))
export const getResources = createServerFn({ method: "GET" }).handler(() => cached<Resource[]>("resources", readResources, []))
export const getSettings = createServerFn({ method: "GET" }).handler(() => cached<SiteSettings>("settings", readSettings, { site_name: site.fullName, tagline: site.tagline, membership_url: site.joinUrl, contact_email: site.email, default_seo_title: site.fullName, default_seo_description: site.tagline }, 300))

const limits = new Map<string, number[]>()
function requestInfo(bucket: string) { const headers = getRequestHeaders(); const ip = (headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown").split(",")[0].trim(); const key = `${bucket}:${createHash("sha256").update(ip).digest("hex")}`; const now = Date.now(); const recent = (limits.get(key) || []).filter(t => t > now - 60 * 60 * 1000); if (recent.length >= 5) throw new Error("Too many submissions. Please try again later."); recent.push(now); limits.set(key, recent); return { ip_hash: key.split(":")[1], user_agent: headers.get("user-agent")?.slice(0, 500) || null } }
function privateClient() { const url = process.env.DIRECTUS_URL || "https://cms.brightfutures.social"; const token = process.env.DIRECTUS_SERVER_TOKEN; if (!token) throw new Error("Submissions are temporarily unavailable."); return createDirectus(url).with(staticToken(token)).with(rest()) }
const contactInput = z.object({ name: z.string().trim().min(1).max(120), email: z.string().trim().email().max(254), subject: z.string().trim().min(1).max(180), message: z.string().trim().min(10).max(5000), website: z.string().max(0) })
export const submitContact = createServerFn({ method: "POST" }).inputValidator(contactInput).handler(async ({ data }) => { const info = requestInfo("contact"); await privateClient().request(createItem("contact_messages", { name: data.name, email: data.email, subject: data.subject, message: data.message, status: "new", source_page: "/contact", ...info })); return { ok: true } })
const ideaInput = z.object({ idea: z.string().trim().min(10).max(3000), name: z.string().trim().max(120), email: z.union([z.literal(""), z.string().trim().email().max(254)]), website: z.string().max(0) })
export const submitIdea = createServerFn({ method: "POST" }).inputValidator(ideaInput).handler(async ({ data }) => { requestInfo("idea"); await privateClient().request(createItem("ideas", { idea: data.idea, name: data.name || null, email: data.email || null, status: "new" })); return { ok: true } })
