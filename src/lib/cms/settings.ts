import { readSingleton } from "@directus/sdk"
import { cmsClient } from "./client"
import { site } from "@/data/site"
import type { SiteSettings } from "./types"

export const fallbackSettings: SiteSettings = { site_name: site.fullName, tagline: site.tagline, membership_url: site.joinUrl, contact_email: site.email, instagram_url: null, default_seo_title: `${site.fullName} | Care-Experienced & Estranged Student Community`, default_seo_description: site.tagline }
export async function readSettings() { try { return { ...fallbackSettings, ...(await cmsClient().request(readSingleton("site_settings")) as Partial<SiteSettings>) } } catch { return fallbackSettings } }
