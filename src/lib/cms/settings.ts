import { readSingleton } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import { site } from "@/data/site";
import type { SiteSettings } from "./types";

export const fallbackSettings: SiteSettings = {
  site_name: "BrightFutures Greenwich",
  tagline: site.tagline,
  membership_url: "https://www.greenwichsu.co.uk/societies/18691/",
  contact_email: site.email,
  instagram_url: null,
  default_seo_title: `${site.fullName} | Care-Experienced & Estranged Student Community`,
  default_seo_description: site.tagline,
};
const validSettings = (value: unknown): value is Partial<SiteSettings> =>
  !!value && typeof value === "object" && !Array.isArray(value);
export async function readSettings(): Promise<SiteSettings> {
  const value = await safeCmsRequest<Partial<SiteSettings>>(
    "Site settings",
    () => cmsClient().request(readSingleton("site_settings")),
    {},
    validSettings,
  );
  const text = (
    key: keyof SiteSettings,
    fallback: string | null | undefined,
  ) => (typeof value[key] === "string" ? (value[key] as string) : fallback);
  return {
    ...fallbackSettings,
    site_name:
      text("site_name", fallbackSettings.site_name) ||
      fallbackSettings.site_name,
    tagline:
      text("tagline", fallbackSettings.tagline) || fallbackSettings.tagline,
    membership_url:
      text("membership_url", fallbackSettings.membership_url) ||
      fallbackSettings.membership_url,
    instagram_url: text("instagram_url", fallbackSettings.instagram_url),
    contact_email: text("contact_email", fallbackSettings.contact_email),
    homepage_announcement: text("homepage_announcement", null),
    homepage_announcement_url: text("homepage_announcement_url", null),
    show_announcement:
      typeof value.show_announcement === "boolean"
        ? value.show_announcement
        : false,
    default_seo_title:
      text("default_seo_title", fallbackSettings.default_seo_title) ||
      fallbackSettings.default_seo_title,
    default_seo_description:
      text(
        "default_seo_description",
        fallbackSettings.default_seo_description,
      ) || fallbackSettings.default_seo_description,
  };
}
