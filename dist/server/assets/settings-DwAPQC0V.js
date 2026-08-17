import { createDirectus, staticToken, rest, readItems, readSingleton } from "@directus/sdk";
const directusUrl = () => process.env.DIRECTUS_URL || "https://cms.brightfutures.social";
function cmsClient() {
  const client = createDirectus(directusUrl());
  const token = process.env.DIRECTUS_SERVER_TOKEN;
  return token ? client.with(staticToken(token)).with(rest()) : client.with(rest());
}
function errorSummary(error) {
  if (!error || typeof error !== "object") return String(error || "unknown error");
  const value = error;
  const status = value.response?.status;
  const message = typeof value.message === "string" ? value.message : "request failed";
  return status ? `HTTP ${String(status)}: ${message}` : message;
}
async function safeCmsRequest(label, request, fallback, validate) {
  try {
    const value = await request();
    if (!validate(value)) {
      console.error(`[CMS] ${label} could not be loaded: unexpected response shape.`);
      return fallback;
    }
    return value;
  } catch (error) {
    console.error(`[CMS] ${label} could not be loaded: ${errorSummary(error)}.`);
    return fallback;
  }
}
function assetUrl(id) {
  if (!id) return void 0;
  return `${directusUrl().replace(/\/$/, "")}/assets/${encodeURIComponent(id)}`;
}
const fallbackCommittee = [
  { id: "arshan-mahi", name: "Arshan Mahi", role: "President" },
  {
    id: "pragati-sahu",
    name: "Pragati Sahu",
    role: "Treasurer & Events and Community Officer"
  },
  {
    id: "faduma-hussain",
    name: "Faduma Hussain",
    role: "Communications & Marketing Officer"
  }
];
const validCommittee = (value) => Array.isArray(value) && value.every(
  (person) => !!person && typeof person === "object" && typeof person.name === "string" && typeof person.role === "string"
);
async function readCommittee() {
  const result = await safeCmsRequest(
    "Committee data",
    () => cmsClient().request(
      readItems("committee", {
        filter: { active: { _eq: true } },
        sort: ["display_order", "name"]
      })
    ),
    fallbackCommittee,
    validCommittee
  );
  return result.length ? result : fallbackCommittee;
}
const site = {
  fullName: "BrightFutures Greenwich Society",
  university: "University of Greenwich",
  tagline: "The student-led community for care-experienced and estranged students at the University of Greenwich.",
  email: "hello@brightfutures.social"
};
const nav = [
  { label: "Home", to: "/" },
  { label: "What’s On", to: "/events" },
  { label: "About", to: "/about" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Partnerships", to: "/partnerships" },
  { label: "Resources", to: "/resources" },
  { label: "News & Stories", to: "/stories" }
];
const footerLinks = [
  { label: "About", to: "/about" },
  { label: "What’s On", to: "/events" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Partnerships", to: "/partnerships" },
  { label: "Resources", to: "/resources" },
  { label: "News & Stories", to: "/stories" },
  { label: "Member Highlights", to: "/highlights" },
  { label: "You Said / We’re Doing", to: "/voice" },
  { label: "Community Check-In", to: "/check-in" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Community Guidelines", to: "/community-guidelines" },
  { label: "Accessibility", to: "/accessibility" }
];
const fallbackSettings = {
  site_name: "BrightFutures Greenwich",
  tagline: site.tagline,
  membership_url: "https://www.greenwichsu.co.uk/societies/18691/",
  contact_email: site.email,
  instagram_url: null,
  default_seo_title: `${site.fullName} | Care-Experienced & Estranged Student Community`,
  default_seo_description: site.tagline
};
const validSettings = (value) => !!value && typeof value === "object" && !Array.isArray(value);
async function readSettings() {
  const value = await safeCmsRequest(
    "Site settings",
    () => cmsClient().request(readSingleton("site_settings")),
    {},
    validSettings
  );
  const text = (key, fallback) => typeof value[key] === "string" ? value[key] : fallback;
  return {
    ...fallbackSettings,
    site_name: text("site_name", fallbackSettings.site_name) || fallbackSettings.site_name,
    tagline: text("tagline", fallbackSettings.tagline) || fallbackSettings.tagline,
    membership_url: text("membership_url", fallbackSettings.membership_url) || fallbackSettings.membership_url,
    instagram_url: text("instagram_url", fallbackSettings.instagram_url),
    contact_email: text("contact_email", fallbackSettings.contact_email),
    homepage_announcement: text("homepage_announcement", null),
    homepage_announcement_url: text("homepage_announcement_url", null),
    show_announcement: typeof value.show_announcement === "boolean" ? value.show_announcement : false,
    default_seo_title: text("default_seo_title", fallbackSettings.default_seo_title) || fallbackSettings.default_seo_title,
    default_seo_description: text(
      "default_seo_description",
      fallbackSettings.default_seo_description
    ) || fallbackSettings.default_seo_description
  };
}
export {
  fallbackSettings as a,
  fallbackCommittee as b,
  safeCmsRequest as c,
  cmsClient as d,
  assetUrl as e,
  footerLinks as f,
  readSettings as g,
  nav as n,
  readCommittee as r,
  site as s
};
