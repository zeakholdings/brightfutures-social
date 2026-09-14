import { T as TSS_SERVER_FUNCTION, c as createServerFn, b as getRequestHeaders } from "../server.js";
import { readItems, createItem, createDirectus, staticToken, rest } from "@directus/sdk";
import { createHash } from "node:crypto";
import { z } from "zod";
import { e as events } from "./events-DkYfSDFO.js";
import { c as safeCmsRequest, d as cmsClient, r as readCommittee, b as fallbackCommittee, e as assetUrl, g as readSettings, a as fallbackSettings } from "./settings-B6I0cOUr.js";
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
const PUBLIC_EVENT_STATUSES = ["confirmed", "completed"];
async function readPublicEvents() {
  return safeCmsRequest(
    "Events",
    () => cmsClient().request(
      readItems("events", {
        filter: { status: { _in: [...PUBLIC_EVENT_STATUSES] } },
        sort: ["start_date", "sort"],
        limit: 200
      })
    ),
    [],
    validEvents
  );
}
async function readPublicEvent(slug) {
  const rows = await safeCmsRequest(
    "Event detail",
    () => cmsClient().request(
      readItems("events", {
        filter: {
          slug: { _eq: slug },
          status: { _in: [...PUBLIC_EVENT_STATUSES] }
        },
        limit: 1
      })
    ),
    [],
    validEvents
  );
  return rows[0] ?? null;
}
const validEvents = (value) => Array.isArray(value) && value.every(
  (item) => !!item && typeof item === "object" && typeof item.title === "string" && typeof item.slug === "string" && typeof item.start_date === "string" && Number.isFinite(Date.parse(item.start_date)) && PUBLIC_EVENT_STATUSES.includes(
    item.status
  ) && [
    "social",
    "coffee-connect",
    "community",
    "opportunity",
    "voice-advocacy",
    "wellbeing",
    "trips",
    "seasonal"
  ].includes(item.category)
);
const publishedFilter = {
  status: { _eq: "published" },
  published_at: { _lte: "$NOW" }
};
const validPosts = (value) => Array.isArray(value) && value.every(
  (item) => !!item && typeof item === "object" && typeof item.title === "string" && typeof item.slug === "string" && typeof item.published_at === "string" && Number.isFinite(Date.parse(item.published_at))
);
async function readPosts() {
  return safeCmsRequest(
    "Stories",
    () => cmsClient().request(
      readItems("posts", {
        filter: publishedFilter,
        sort: ["-featured", "-published_at"],
        limit: 100
      })
    ),
    [],
    validPosts
  );
}
async function readPost(slug) {
  const rows = await safeCmsRequest(
    "Story detail",
    () => cmsClient().request(
      readItems("posts", {
        filter: { ...publishedFilter, slug: { _eq: slug } },
        limit: 1
      })
    ),
    [],
    validPosts
  );
  return rows[0] ?? null;
}
const categories = [
  "money-funding",
  "university-support",
  "life-after-university",
  "greenwich-support",
  "accommodation",
  "money",
  "wellbeing",
  "careers",
  "opportunities",
  "community"
];
const reviewStatuses = ["active", "needs-review", "archived"];
const audiences = [
  "all-greenwich-students",
  "care-experienced-students",
  "care-leavers",
  "estranged-students",
  "care-experienced-and-estranged-students"
];
const isDate = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T12:00:00Z`));
const safeUrl = (value) => {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};
function normaliseResources(value) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item;
    if (typeof row.id !== "string" && typeof row.id !== "number" || typeof row.title !== "string" || !row.title.trim() || !categories.some((category) => category === row.category)) return [];
    return [{
      ...row,
      title: row.title.trim(),
      first_stop_guidance: typeof row.first_stop_guidance === "string" ? row.first_stop_guidance.trim() || null : null,
      url: safeUrl(row.url),
      source_url: safeUrl(row.source_url),
      last_reviewed: isDate(row.last_reviewed) ? row.last_reviewed : null,
      review_due: isDate(row.review_due) ? row.review_due : null,
      resource_status: reviewStatuses.some((status) => status === row.resource_status) ? row.resource_status : null,
      audience: Array.isArray(row.audience) ? row.audience.filter(
        (entry) => audiences.some((audience) => audience === entry)
      ) : null
    }];
  });
}
const validResources = (value) => Array.isArray(value);
async function readResources() {
  return safeCmsRequest(
    "Resources",
    () => cmsClient().request(
      readItems("resources", {
        filter: { status: { _eq: "published" } },
        sort: ["display_order", "title"]
      })
    ).then(normaliseResources),
    [],
    validResources
  );
}
const validSocialCards = (value) => Array.isArray(value) && value.every(
  (card) => !!card && typeof card === "object" && typeof card.image === "string" && typeof card.image_alt === "string" && card.image_alt.trim().length > 0
);
async function readSocialCards() {
  return safeCmsRequest(
    "Homepage social cards",
    () => cmsClient().request(
      readItems("homepage_social_cards", {
        filter: { status: { _eq: "published" } },
        sort: ["display_order"],
        limit: 3
      })
    ),
    [],
    validSocialCards
  );
}
const publicFields$1 = [
  "id",
  "status",
  "display_name",
  "highlight_text",
  "category",
  "term",
  "published_at",
  "image",
  "image_alt",
  "display_order"
];
const validHighlights = (value) => Array.isArray(value) && value.every(
  (item) => !!item && typeof item === "object" && item.status === "published" && typeof item.highlight_text === "string" && item.highlight_text.trim().length > 0 && typeof item.published_at === "string" && Number.isFinite(Date.parse(item.published_at))
);
async function readPublishedHighlights() {
  return safeCmsRequest(
    "Published member highlights",
    () => cmsClient().request(
      readItems("member_highlights", {
        fields: [...publicFields$1],
        filter: {
          status: { _eq: "published" },
          published_at: { _lte: "$NOW" }
        },
        sort: ["display_order", "-published_at"],
        limit: 100
      })
    ),
    [],
    validHighlights
  );
}
const publicFields = [
  "id",
  "status",
  "title",
  "theme",
  "what_members_said",
  "what_brightfutures_did",
  "current_status",
  "public_update",
  "published_at",
  "display_order"
];
const actionStatuses = /* @__PURE__ */ new Set([
  "heard",
  "raised",
  "in_progress",
  "completed"
]);
const validActions = (value) => Array.isArray(value) && value.every((row) => {
  if (!row || typeof row !== "object") return false;
  const action = row;
  return action.status === "published" && typeof action.title === "string" && action.title.trim().length > 0 && typeof action.what_members_said === "string" && action.what_members_said.trim().length > 0 && typeof action.what_brightfutures_did === "string" && action.what_brightfutures_did.trim().length > 0 && actionStatuses.has(action.current_status) && typeof action.published_at === "string" && Number.isFinite(Date.parse(action.published_at));
});
async function readPublishedCommunityActions() {
  return safeCmsRequest(
    "Published community actions",
    () => cmsClient().request(
      readItems("community_actions", {
        fields: [...publicFields],
        filter: {
          status: { _eq: "published" },
          published_at: { _lte: "$NOW" }
        },
        sort: ["display_order", "-published_at"],
        limit: 100
      })
    ),
    [],
    validActions
  );
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
  } catch (error) {
    console.error(`[CMS] ${key} could not be loaded.`, error instanceof Error ? error.message : "Unknown error");
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
    body: e.body,
    who_for: e.whoFor,
    cost_info: e.costInfo,
    contact_info: e.contactInfo,
    registration_url: e.registrationUrl,
    featured: e.featured
  }));
}
function toEvent(event) {
  const correctedWelcome = event.slug === "greenwich-cares-welcome" && event.title === "Greenwich Cares Welcome" ? events.find((item) => item.slug === event.slug) : void 0;
  return {
    title: correctedWelcome?.title || event.title,
    slug: event.slug,
    startDate: event.start_date,
    endDate: event.end_date || void 0,
    time: event.time_display || void 0,
    location: event.location || void 0,
    category: categoryLabels[event.category],
    description: correctedWelcome?.description || event.description || "",
    academicYear: event.academic_year,
    status: event.status === "draft" ? "provisional" : event.status,
    featured: !!event.featured,
    registrationUrl: event.registration_url || void 0,
    body: event.body || correctedWelcome?.body || void 0,
    whoFor: event.who_for || void 0,
    costInfo: event.cost_info || void 0,
    contactInfo: event.contact_info || void 0,
    coverImage: assetUrl(event.cover_image),
    coverImageAlt: event.cover_image_alt || void 0,
    accessibilityInfo: event.accessibility_info || void 0
  };
}
const getEventsServer_createServerFn_handler = createServerRpc({
  id: "167ba15ae4b55098241e92911773c71357230c664dc9ee89cdb333f13968f6a2",
  name: "getEventsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getEventsServer.__executeServer(opts));
const getEventsServer = createServerFn({
  method: "GET"
}).handler(getEventsServer_createServerFn_handler, async () => {
  try {
    return (await cached("events", readPublicEvents, localFallback(), 15)).map(toEvent);
  } catch (error) {
    console.error("[CMS] Events data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return localFallback().map(toEvent);
  }
});
const getEventServer_createServerFn_handler = createServerRpc({
  id: "a30e69df17a1a918144bf392c07f3fab99574c478668839d59e598b1c0642bd2",
  name: "getEventServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getEventServer.__executeServer(opts));
const getEventServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(160)
})).handler(getEventServer_createServerFn_handler, async ({
  data
}) => {
  try {
    const value = await readPublicEvent(data.slug);
    return value ? toEvent(value) : localFallback().map(toEvent).find((e) => e.slug === data.slug) ?? null;
  } catch (error) {
    console.error("[CMS] Event data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return localFallback().map(toEvent).find((e) => e.slug === data.slug) ?? null;
  }
});
const withPostAsset = (post) => ({
  ...post,
  featured_image: assetUrl(post.featured_image) || null
});
const getPostsServer_createServerFn_handler = createServerRpc({
  id: "c45ff4ca2ad39500b15a2d254a9d296b9127c74f01b3f11bf8947feab407ffae",
  name: "getPostsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getPostsServer.__executeServer(opts));
const getPostsServer = createServerFn({
  method: "GET"
}).handler(getPostsServer_createServerFn_handler, async () => {
  try {
    return (await cached("posts", readPosts, [])).map(withPostAsset);
  } catch (error) {
    console.error("[CMS] Stories could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return [];
  }
});
const getPostServer_createServerFn_handler = createServerRpc({
  id: "fa34e5b0534a94c006a3e171388e1107cb7c112967d1e42778325fe11244b5e0",
  name: "getPostServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getPostServer.__executeServer(opts));
const getPostServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(160)
})).handler(getPostServer_createServerFn_handler, async ({
  data
}) => {
  try {
    const post = await cached(`post:${data.slug}`, () => readPost(data.slug), null);
    return post ? withPostAsset(post) : null;
  } catch (error) {
    console.error("[CMS] Story data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
});
const getCommitteeServer_createServerFn_handler = createServerRpc({
  id: "b3e4b99703b24021917134ff1c670baad0d008cb52d022fb9ca1bf998430f57a",
  name: "getCommitteeServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getCommitteeServer.__executeServer(opts));
const getCommitteeServer = createServerFn({
  method: "GET"
}).handler(getCommitteeServer_createServerFn_handler, async () => {
  try {
    const people = await cached("committee", readCommittee, fallbackCommittee);
    return (people.length ? people : fallbackCommittee).map((person) => ({
      ...person,
      portrait_original: assetUrl(person.portrait_original) || null,
      portrait_stylised: assetUrl(person.portrait_stylised) || null,
      photo: assetUrl(person.photo) || null
    }));
  } catch (error) {
    console.error("[CMS] Committee data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return fallbackCommittee;
  }
});
const getSocialCardsServer_createServerFn_handler = createServerRpc({
  id: "01179dcb172c360d8e7fb04e5b2124ff7acb0f36caba4694f36c35a37e7715c8",
  name: "getSocialCardsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getSocialCardsServer.__executeServer(opts));
const getSocialCardsServer = createServerFn({
  method: "GET"
}).handler(getSocialCardsServer_createServerFn_handler, async () => {
  const cards = await cached("homepage-social-cards", readSocialCards, []);
  return cards.slice(0, 3).map((card) => ({
    ...card,
    image: assetUrl(card.image) || ""
  })).filter((card) => card.image && card.image_alt.trim());
});
const getHighlightsServer_createServerFn_handler = createServerRpc({
  id: "c3e2c9fa7efaa05d66fa8d6dd66845d4a95e73ba84399382ced6dde0531d8667",
  name: "getHighlightsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getHighlightsServer.__executeServer(opts));
const getHighlightsServer = createServerFn({
  method: "GET"
}).handler(getHighlightsServer_createServerFn_handler, async () => {
  const highlights = await cached("published-member-highlights", readPublishedHighlights, [], 15);
  return highlights.map((highlight) => {
    const hasApprovedImage = Boolean(highlight.image && highlight.image_alt?.trim());
    return {
      ...highlight,
      image: hasApprovedImage ? assetUrl(highlight.image) || null : null,
      image_alt: hasApprovedImage ? highlight.image_alt.trim() : null
    };
  });
});
const getCommunityActionsServer_createServerFn_handler = createServerRpc({
  id: "25f68e7f8034139322a52ff40c945b50570f0049e8ff782d6efb590f9a9f472b",
  name: "getCommunityActionsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getCommunityActionsServer.__executeServer(opts));
const getCommunityActionsServer = createServerFn({
  method: "GET"
}).handler(getCommunityActionsServer_createServerFn_handler, async () => cached("published-community-actions", readPublishedCommunityActions, []));
const getResourcesServer_createServerFn_handler = createServerRpc({
  id: "eaae13ebb87b84f971ba35b626367e8223d33586d24bdddd6aba26fa9380e657",
  name: "getResourcesServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getResourcesServer.__executeServer(opts));
const getResourcesServer = createServerFn({
  method: "GET"
}).handler(getResourcesServer_createServerFn_handler, async () => {
  try {
    return await cached("resources", readResources, []);
  } catch (error) {
    console.error("[CMS] Resources could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return [];
  }
});
const getSiteSettingsServer_createServerFn_handler = createServerRpc({
  id: "16e14e768e3171f904fc62d3dbb8dc36725cb4721585d80f8a3376cd273b2af5",
  name: "getSiteSettingsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getSiteSettingsServer.__executeServer(opts));
const getSiteSettingsServer = createServerFn({
  method: "GET"
}).handler(getSiteSettingsServer_createServerFn_handler, async () => {
  try {
    return await cached("settings", readSettings, fallbackSettings, 300);
  } catch (error) {
    console.error("[CMS] Site settings could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return fallbackSettings;
  }
});
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
}).validator(contactInput).handler(submitContact_createServerFn_handler, async ({
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
const perksEnquiryInput = z.object({
  business: z.string().trim().min(1).max(180),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  link: z.string().trim().max(500),
  offer: z.string().trim().max(1500),
  restrictions: z.string().trim().max(1500),
  message: z.string().trim().max(3e3),
  website: z.string().max(0)
});
const submitPerksEnquiry_createServerFn_handler = createServerRpc({
  id: "dbf6c5ea319bc9c376955563f80f383f29da4244784cc0e323652989763a041a",
  name: "submitPerksEnquiry",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitPerksEnquiry.__executeServer(opts));
const submitPerksEnquiry = createServerFn({
  method: "POST"
}).validator(perksEnquiryInput).handler(submitPerksEnquiry_createServerFn_handler, async ({
  data
}) => {
  const info = requestInfo("perks-enquiry");
  const details = [`Business/organisation: ${data.business}`, `Website or social link: ${data.link || "Not provided"}`, `Proposed offer: ${data.offer || "To be discussed"}`, `Restrictions: ${data.restrictions || "To be discussed"}`, `Message: ${data.message || "No additional message"}`].join("\n\n");
  await privateClient().request(createItem("contact_messages", {
    name: data.name,
    email: data.email,
    subject: `BrightFutures Perks enquiry — ${data.business}`,
    message: details,
    status: "new",
    source_page: "/partnerships/perks",
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
}).validator(ideaInput).handler(submitIdea_createServerFn_handler, async ({
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
const cleanText = (maximum) => z.string().max(maximum).transform((value) => value.normalize("NFKC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim());
const checkinInput = z.object({
  highlight: cleanText(4e3),
  proud_of: cleanText(4e3),
  goal_or_challenge: cleanText(4e3),
  brightfutures_idea: cleanText(4e3),
  issue_to_raise: cleanText(4e3),
  name: cleanText(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  share_publicly: z.boolean(),
  public_name_preference: z.union([z.enum(["full_name", "first_name", "anonymous"]), z.literal("")]),
  public_excerpt: cleanText(1500),
  website_consent: z.boolean(),
  social_media_consent: z.boolean(),
  website: z.string().max(0)
}).superRefine((data, context) => {
  const responses = [data.highlight, data.proud_of, data.goal_or_challenge, data.brightfutures_idea, data.issue_to_raise];
  if (!responses.some((value) => value.length >= 3)) context.addIssue({
    code: "custom",
    path: ["highlight"],
    message: "Add something to at least one box before sending your check-in."
  });
  if (data.share_publicly && !data.public_excerpt) context.addIssue({
    code: "custom",
    path: ["public_excerpt"],
    message: "Choose the exact excerpt that may be considered for sharing."
  });
  if (data.share_publicly && !data.public_name_preference) context.addIssue({
    code: "custom",
    path: ["public_name_preference"],
    message: "Choose how you would like to be credited."
  });
  if (data.share_publicly && !data.website_consent && !data.social_media_consent) context.addIssue({
    code: "custom",
    path: ["website_consent"],
    message: "Choose at least one place where the excerpt may be shared."
  });
  if (!data.share_publicly && (data.website_consent || data.social_media_consent)) context.addIssue({
    code: "custom",
    path: ["share_publicly"],
    message: "Sharing consent cannot be given while the response is private."
  });
  if (data.share_publicly && data.public_name_preference === "first_name" && !data.name) context.addIssue({
    code: "custom",
    path: ["name"],
    message: "Add your first name for first-name attribution."
  });
  if (data.share_publicly && data.public_name_preference === "full_name" && data.name.split(/\s+/).filter(Boolean).length < 2) context.addIssue({
    code: "custom",
    path: ["name"],
    message: "Add your full name for full-name attribution."
  });
});
const submitCommunityCheckin_createServerFn_handler = createServerRpc({
  id: "afb8f434e238e65bf496fdd6da6ebd8237b98ccaf92ab71d253f313560605a90",
  name: "submitCommunityCheckin",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitCommunityCheckin.__executeServer(opts));
const submitCommunityCheckin = createServerFn({
  method: "POST"
}).validator(checkinInput).handler(submitCommunityCheckin_createServerFn_handler, async ({
  data
}) => {
  requestInfo("community-checkin");
  const consentGiven = data.website_consent || data.social_media_consent;
  await privateClient().request(createItem("community_checkins", {
    highlight: data.highlight || null,
    proud_of: data.proud_of || null,
    goal_or_challenge: data.goal_or_challenge || null,
    brightfutures_idea: data.brightfutures_idea || null,
    issue_to_raise: data.issue_to_raise || null,
    name: data.name || null,
    email: data.email || null,
    share_publicly: data.share_publicly,
    public_name_preference: data.share_publicly ? data.public_name_preference : "anonymous",
    public_excerpt: data.share_publicly ? data.public_excerpt : null,
    website_consent: data.website_consent,
    social_media_consent: data.social_media_consent,
    consent_recorded_at: consentGiven ? (/* @__PURE__ */ new Date()).toISOString() : null
  }));
  return {
    ok: true
  };
});
export {
  getCommitteeServer_createServerFn_handler,
  getCommunityActionsServer_createServerFn_handler,
  getEventServer_createServerFn_handler,
  getEventsServer_createServerFn_handler,
  getHighlightsServer_createServerFn_handler,
  getPostServer_createServerFn_handler,
  getPostsServer_createServerFn_handler,
  getResourcesServer_createServerFn_handler,
  getSiteSettingsServer_createServerFn_handler,
  getSocialCardsServer_createServerFn_handler,
  submitCommunityCheckin_createServerFn_handler,
  submitContact_createServerFn_handler,
  submitIdea_createServerFn_handler,
  submitPerksEnquiry_createServerFn_handler
};
