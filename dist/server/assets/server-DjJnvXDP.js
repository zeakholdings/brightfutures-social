import { T as TSS_SERVER_FUNCTION, c as createServerFn, a as getRequestHeaders } from "../server.js";
import { createDirectus, rest, readItems, readSingleton, createItem, staticToken } from "@directus/sdk";
import { createHash } from "node:crypto";
import { z } from "zod";
import { e as events } from "./events-DmYQydHL.js";
import { s as site } from "./site-7ycwNZvd.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const directusUrl = () => process.env.DIRECTUS_URL || "https://cms.brightfutures.social";
function cmsClient() {
  return createDirectus(directusUrl()).with(rest());
}
function assetUrl(id) {
  if (!id) return void 0;
  return `${directusUrl().replace(/\/$/, "")}/assets/${encodeURIComponent(id)}`;
}
async function readCommittee() {
  return cmsClient().request(readItems("committee", { filter: { active: { _eq: true } }, sort: ["display_order", "name"] }));
}
async function readPublicEvents() {
  return cmsClient().request(readItems("events", {
    filter: { status: { _in: ["confirmed", "completed", "cancelled"] } },
    sort: ["start_date", "sort"],
    limit: 200
  }));
}
async function readPublicEvent(slug) {
  const rows = await cmsClient().request(readItems("events", { filter: { slug: { _eq: slug }, status: { _in: ["confirmed", "completed", "cancelled"] } }, limit: 1 }));
  return rows[0] ?? null;
}
const publishedFilter = { status: { _eq: "published" }, published_at: { _lte: "$NOW" } };
async function readPosts() {
  return cmsClient().request(readItems("posts", { filter: publishedFilter, sort: ["-featured", "-published_at"], limit: 100 }));
}
async function readPost(slug) {
  const rows = await cmsClient().request(readItems("posts", { filter: { ...publishedFilter, slug: { _eq: slug } }, limit: 1 }));
  return rows[0] ?? null;
}
async function readResources() {
  return cmsClient().request(readItems("resources", { filter: { status: { _eq: "published" } }, sort: ["display_order", "title"] }));
}
const fallbackSettings = { site_name: site.fullName, tagline: site.tagline, membership_url: site.joinUrl, contact_email: site.email, instagram_url: null, default_seo_title: `${site.fullName} | Care-Experienced & Estranged Student Community`, default_seo_description: site.tagline };
async function readSettings() {
  try {
    return { ...fallbackSettings, ...await cmsClient().request(readSingleton("site_settings")) };
  } catch {
    return fallbackSettings;
  }
}
const cache = /* @__PURE__ */ new Map();
async function cached(key, fetcher, fallback, seconds = 120) {
  const hit = cache.get(key);
  if (hit && hit.until > Date.now()) return hit.value;
  try {
    const value = await fetcher();
    cache.set(key, {
      value,
      until: Date.now() + seconds * 1e3
    });
    return value;
  } catch {
    return hit?.value ?? fallback;
  }
}
const categoryMap = {
  Social: "social",
  "Coffee & Connect": "coffee-connect",
  Community: "community",
  Opportunity: "opportunity",
  "Voice & Advocacy": "voice-advocacy",
  Wellbeing: "wellbeing",
  Trips: "trips",
  Seasonal: "seasonal"
};
const categoryLabels = {
  social: "Social",
  "coffee-connect": "Coffee & Connect",
  community: "Community",
  opportunity: "Opportunity",
  "voice-advocacy": "Voice & Advocacy",
  wellbeing: "Wellbeing",
  trips: "Trips",
  seasonal: "Seasonal"
};
function localFallback() {
  return events.filter((e) => e.status === "confirmed" || e.status === "completed" || e.status === "cancelled").filter((e) => e.startDate).map((e, i) => ({
    id: `local-${i}`,
    title: e.title,
    slug: e.slug,
    status: e.status,
    academic_year: e.academicYear,
    category: categoryMap[e.category],
    start_date: `${e.startDate}T12:00:00.000Z`,
    time_display: e.time,
    location: e.location,
    description: e.description,
    registration_url: e.registrationUrl,
    featured: e.featured
  }));
}
function toEvent(event) {
  return {
    title: event.title,
    slug: event.slug,
    startDate: event.start_date,
    endDate: event.end_date || void 0,
    time: event.time_display || void 0,
    location: event.location || void 0,
    category: categoryLabels[event.category],
    description: event.description || "",
    academicYear: event.academic_year,
    status: event.status === "draft" ? "provisional" : event.status,
    featured: !!event.featured,
    registrationUrl: event.registration_url || void 0,
    body: event.body || void 0,
    coverImage: assetUrl(event.cover_image),
    coverImageAlt: event.cover_image_alt || void 0,
    accessibilityInfo: event.accessibility_info || void 0
  };
}
const getEvents_createServerFn_handler = createServerRpc({
  id: "97cf24593d000dd8735d294a9e5bd054a1de012f9cdba637796c4260dad62c90",
  name: "getEvents",
  filename: "src/lib/cms/server.ts"
}, (opts) => getEvents.__executeServer(opts));
const getEvents = createServerFn({
  method: "GET"
}).handler(getEvents_createServerFn_handler, async () => (await cached("events", readPublicEvents, localFallback())).map(toEvent));
const getEvent_createServerFn_handler = createServerRpc({
  id: "da5d5e7c6a98c5867b58e70c3ffbb05b616b7326b7d075b7e02ac7ac75cc5c27",
  name: "getEvent",
  filename: "src/lib/cms/server.ts"
}, (opts) => getEvent.__executeServer(opts));
const getEvent = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  slug: z.string().min(1).max(160)
})).handler(getEvent_createServerFn_handler, async ({
  data
}) => {
  try {
    const value = await readPublicEvent(data.slug);
    return value ? toEvent(value) : localFallback().map(toEvent).find((e) => e.slug === data.slug) ?? null;
  } catch {
    return localFallback().map(toEvent).find((e) => e.slug === data.slug) ?? null;
  }
});
const withPostAsset = (post) => ({
  ...post,
  featured_image: assetUrl(post.featured_image) || null
});
const getPosts_createServerFn_handler = createServerRpc({
  id: "af214f0fb0dc2dae3e31084372f146d3d45d8669321db45200cdfb7512d69a3c",
  name: "getPosts",
  filename: "src/lib/cms/server.ts"
}, (opts) => getPosts.__executeServer(opts));
const getPosts = createServerFn({
  method: "GET"
}).handler(getPosts_createServerFn_handler, async () => (await cached("posts", readPosts, [])).map(withPostAsset));
const getPost_createServerFn_handler = createServerRpc({
  id: "122b63dadd6013ce07711c6f6adf11e0189689d985e5150d8270c5c6a519835b",
  name: "getPost",
  filename: "src/lib/cms/server.ts"
}, (opts) => getPost.__executeServer(opts));
const getPost = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  slug: z.string().min(1).max(160)
})).handler(getPost_createServerFn_handler, async ({
  data
}) => {
  const post = await cached(`post:${data.slug}`, () => readPost(data.slug), null);
  return post ? withPostAsset(post) : null;
});
const committeeFallback = [{
  id: "arshan-mahi",
  name: "Arshan Mahi",
  role: "President",
  academic_year: "2026/27"
}, {
  id: "pragati-sahu",
  name: "Pragati Sahu",
  role: "Treasurer & Events and Community Officer",
  academic_year: "2026/27"
}, {
  id: "faduma-hussain",
  name: "Faduma Hussain",
  role: "Communications & Marketing Officer",
  academic_year: "2026/27"
}];
const getCommittee_createServerFn_handler = createServerRpc({
  id: "fb02a6da83d4153732d971fdb19d0daa1b5b381d591d9f88f47abd925c9d831a",
  name: "getCommittee",
  filename: "src/lib/cms/server.ts"
}, (opts) => getCommittee.__executeServer(opts));
const getCommittee = createServerFn({
  method: "GET"
}).handler(getCommittee_createServerFn_handler, async () => (await cached("committee", readCommittee, committeeFallback)).map((person) => ({
  ...person,
  photo: assetUrl(person.photo) || null
})));
const getResources_createServerFn_handler = createServerRpc({
  id: "3b30cfae46732db35f7b3b362bf9f00d961a9d340c2715de16982ed2b795aae2",
  name: "getResources",
  filename: "src/lib/cms/server.ts"
}, (opts) => getResources.__executeServer(opts));
const getResources = createServerFn({
  method: "GET"
}).handler(getResources_createServerFn_handler, () => cached("resources", readResources, []));
const getSettings_createServerFn_handler = createServerRpc({
  id: "b4396753f9b2dc456bf0409ca2461bf3365f5495fc1934377067d30876ef45d8",
  name: "getSettings",
  filename: "src/lib/cms/server.ts"
}, (opts) => getSettings.__executeServer(opts));
const getSettings = createServerFn({
  method: "GET"
}).handler(getSettings_createServerFn_handler, () => cached("settings", readSettings, {
  site_name: site.fullName,
  tagline: site.tagline,
  membership_url: site.joinUrl,
  contact_email: site.email,
  default_seo_title: site.fullName,
  default_seo_description: site.tagline
}, 300));
const limits = /* @__PURE__ */ new Map();
function requestInfo(bucket) {
  const headers = getRequestHeaders();
  const ip = (headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown").split(",")[0].trim();
  const key = `${bucket}:${createHash("sha256").update(ip).digest("hex")}`;
  const now = Date.now();
  const recent = (limits.get(key) || []).filter((t) => t > now - 60 * 60 * 1e3);
  if (recent.length >= 5) throw new Error("Too many submissions. Please try again later.");
  recent.push(now);
  limits.set(key, recent);
  return {
    ip_hash: key.split(":")[1],
    user_agent: headers.get("user-agent")?.slice(0, 500) || null
  };
}
function privateClient() {
  const url = process.env.DIRECTUS_URL || "https://cms.brightfutures.social";
  const token = process.env.DIRECTUS_SERVER_TOKEN;
  if (!token) throw new Error("Submissions are temporarily unavailable.");
  return createDirectus(url).with(staticToken(token)).with(rest());
}
const contactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(180),
  message: z.string().trim().min(10).max(5e3),
  website: z.string().max(0)
});
const submitContact_createServerFn_handler = createServerRpc({
  id: "4aa391040c420b87535c6025a32bce7c0a6d1c213d55d23200e47cfbf94b15c8",
  name: "submitContact",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitContact.__executeServer(opts));
const submitContact = createServerFn({
  method: "POST"
}).inputValidator(contactInput).handler(submitContact_createServerFn_handler, async ({
  data
}) => {
  const info = requestInfo("contact");
  await privateClient().request(createItem("contact_messages", {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: "new",
    source_page: "/contact",
    ...info
  }));
  return {
    ok: true
  };
});
const ideaInput = z.object({
  idea: z.string().trim().min(10).max(3e3),
  name: z.string().trim().max(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  website: z.string().max(0)
});
const submitIdea_createServerFn_handler = createServerRpc({
  id: "db88b5907e38d3c14d850e46b5ce7f7f08fdb0c79cb8eac32e983360a3a50531",
  name: "submitIdea",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitIdea.__executeServer(opts));
const submitIdea = createServerFn({
  method: "POST"
}).inputValidator(ideaInput).handler(submitIdea_createServerFn_handler, async ({
  data
}) => {
  requestInfo("idea");
  await privateClient().request(createItem("ideas", {
    idea: data.idea,
    name: data.name || null,
    email: data.email || null,
    status: "new"
  }));
  return {
    ok: true
  };
});
export {
  getCommittee_createServerFn_handler,
  getEvent_createServerFn_handler,
  getEvents_createServerFn_handler,
  getPost_createServerFn_handler,
  getPosts_createServerFn_handler,
  getResources_createServerFn_handler,
  getSettings_createServerFn_handler,
  submitContact_createServerFn_handler,
  submitIdea_createServerFn_handler
};
