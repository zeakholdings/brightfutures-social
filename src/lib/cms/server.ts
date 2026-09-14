import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { createDirectus, createItem, readItems, updateItem, rest, staticToken } from "@directus/sdk";
import { createHash } from "node:crypto";
import { z } from "zod";
import { events as localEvents, type Event } from "@/data/events";
import { checkedResources } from "@/data/resources";
import { fallbackCommittee, readCommittee } from "./committee";
import { readPublicEvent, readPublicEvents } from "./events";
import { readPost, readPosts } from "./posts";
import { readResources } from "./resources";
import { readSocialCards } from "./social-cards";
import { readPublishedHighlights } from "./highlights";
import { readPublishedCommunityActions } from "./community-actions";
import { fallbackSettings, readSettings } from "./settings";
import { assetUrl } from "./client";
import type {
  CmsEvent,
  CommitteeMember,
  Post,
  Resource,
  SocialCard,
  SiteSettings,
  MemberHighlight,
  CommunityAction,
} from "./types";
import type { ArtWallSubmission, ArtWallType, ModerationStatus } from "@/data/art-wall";
import { readPublishedArtWall, readPublishedArtWallItem } from "./art-wall";

const cache = new Map<string, { until: number; value: unknown }>();
async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  fallback: T,
  seconds = 120,
): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.until > Date.now()) return hit.value as T;
  try {
    const value = await fetcher();
    cache.set(key, { value, until: Date.now() + seconds * 1000 });
    return value;
  } catch (error) {
    console.error(
      `[CMS] ${key} could not be loaded.`,
      error instanceof Error ? error.message : "Unknown error",
    );
    return (hit?.value as T | undefined) ?? fallback;
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
  Seasonal: "seasonal",
} as const;
const categoryLabels = {
  social: "Social",
  "coffee-connect": "Coffee & Connect",
  community: "Community",
  opportunity: "Opportunity",
  "voice-advocacy": "Voice & Advocacy",
  wellbeing: "Wellbeing",
  trips: "Trips",
  seasonal: "Seasonal",
} as const;
function localFallback(): CmsEvent[] {
  return localEvents
    .filter(
      (e) =>
        e.status === "confirmed" ||
        e.status === "completed" ||
        e.status === "cancelled",
    )
    .filter((e) => e.startDate)
    .map((e, i) => ({
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
      featured: e.featured,
    }));
}
export function toEvent(event: CmsEvent): Event {
  const correctedWelcome =
    event.slug === "greenwich-cares-welcome" &&
    event.title === "Greenwich Cares Welcome"
      ? localEvents.find((item) => item.slug === event.slug)
      : undefined;
  return {
    title: correctedWelcome?.title || event.title,
    slug: event.slug,
    startDate: event.start_date,
    endDate: event.end_date || undefined,
    time: event.time_display || undefined,
    location: event.location || undefined,
    category: categoryLabels[event.category],
    description: correctedWelcome?.description || event.description || "",
    academicYear: event.academic_year,
    status: event.status === "draft" ? "provisional" : event.status,
    featured: !!event.featured,
    registrationUrl: event.registration_url || undefined,
    body: event.body || correctedWelcome?.body || undefined,
    whoFor: event.who_for || undefined,
    costInfo: event.cost_info || undefined,
    contactInfo: event.contact_info || undefined,
    coverImage: assetUrl(event.cover_image),
    coverImageAlt: event.cover_image_alt || undefined,
    accessibilityInfo: event.accessibility_info || undefined,
  };
}

const getEventsServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<Event[]> => {
    try {
      return (
        await cached<CmsEvent[]>(
          "events",
          readPublicEvents,
          localFallback(),
          15,
        )
      ).map(toEvent);
    } catch (error) {
      console.error(
        "[CMS] Events data could not be loaded.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return localFallback().map(toEvent);
    }
  },
);
export async function getEvents(): Promise<Event[]> {
  return getEventsServer();
}
const getEventServer = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(160) }))
  .handler(async ({ data }): Promise<Event | null> => {
    try {
      const value = await readPublicEvent(data.slug);
      return value
        ? toEvent(value)
        : (localFallback()
            .map(toEvent)
            .find((e) => e.slug === data.slug) ?? null);
    } catch (error) {
      console.error(
        "[CMS] Event data could not be loaded.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return (
        localFallback()
          .map(toEvent)
          .find((e) => e.slug === data.slug) ?? null
      );
    }
  });
export async function getEvent(options: {
  data: { slug: string };
}): Promise<Event | null> {
  return getEventServer(options);
}
const withPostAsset = (post: Post) => ({
  ...post,
  featured_image: assetUrl(post.featured_image) || null,
});
const getPostsServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<Post[]> => {
    try {
      return (await cached<Post[]>("posts", readPosts, [])).map(withPostAsset);
    } catch (error) {
      console.error(
        "[CMS] Stories could not be loaded.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return [];
    }
  },
);
export async function getPosts(): Promise<Post[]> {
  return getPostsServer();
}
const getPostServer = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(160) }))
  .handler(async ({ data }): Promise<Post | null> => {
    try {
      const post = await cached<Post | null>(
        `post:${data.slug}`,
        () => readPost(data.slug),
        null,
      );
      return post ? withPostAsset(post) : null;
    } catch (error) {
      console.error(
        "[CMS] Story data could not be loaded.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return null;
    }
  });
export async function getPost(options: {
  data: { slug: string };
}): Promise<Post | null> {
  return getPostServer(options);
}
const getCommitteeServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<CommitteeMember[]> => {
    try {
      const people = await cached<CommitteeMember[]>(
        "committee",
        readCommittee,
        fallbackCommittee,
      );
      return (people.length ? people : fallbackCommittee).map((person) => ({
        ...person,
        portrait_original: assetUrl(person.portrait_original) || null,
        portrait_stylised: assetUrl(person.portrait_stylised) || null,
        photo: assetUrl(person.photo) || null,
      }));
    } catch (error) {
      console.error(
        "[CMS] Committee data could not be loaded.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return fallbackCommittee;
    }
  },
);
export async function getCommittee(): Promise<CommitteeMember[]> {
  return getCommitteeServer();
}
const getSocialCardsServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<SocialCard[]> => {
    const cards = await cached<SocialCard[]>(
      "homepage-social-cards",
      readSocialCards,
      [],
    );
    return cards
      .slice(0, 3)
      .map((card) => ({ ...card, image: assetUrl(card.image) || "" }))
      .filter((card) => card.image && card.image_alt.trim());
  },
);
export async function getSocialCards(): Promise<SocialCard[]> {
  return getSocialCardsServer();
}
const getHighlightsServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<MemberHighlight[]> => {
    const highlights = await cached<MemberHighlight[]>(
      "published-member-highlights",
      readPublishedHighlights,
      [],
      15,
    );
    return highlights.map((highlight) => {
      const hasApprovedImage = Boolean(
        highlight.image && highlight.image_alt?.trim(),
      );
      return {
        ...highlight,
        image: hasApprovedImage ? assetUrl(highlight.image) || null : null,
        image_alt: hasApprovedImage ? highlight.image_alt!.trim() : null,
      };
    });
  },
);
export async function getHighlights(): Promise<MemberHighlight[]> {
  return getHighlightsServer();
}
const getCommunityActionsServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<CommunityAction[]> =>
    cached<CommunityAction[]>(
      "published-community-actions",
      readPublishedCommunityActions,
      [],
    ),
);
export async function getCommunityActions(): Promise<CommunityAction[]> {
  return getCommunityActionsServer();
}
const getResourcesServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<Resource[]> => {
    try {
      const resources = await cached<Resource[]>("resources", readResources, checkedResources);
      return resources.length ? resources : checkedResources;
    } catch (error) {
      console.error(
        "[CMS] Resources could not be loaded.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return [];
    }
  },
);
export async function getResources(): Promise<Resource[]> {
  return getResourcesServer();
}
const getSiteSettingsServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettings> => {
    try {
      return await cached<SiteSettings>(
        "settings",
        readSettings,
        fallbackSettings,
        300,
      );
    } catch (error) {
      console.error(
        "[CMS] Site settings could not be loaded.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return fallbackSettings;
    }
  },
);
export async function getSiteSettings(): Promise<SiteSettings> {
  return getSiteSettingsServer();
}
export async function getSettings(): Promise<SiteSettings> {
  return getSiteSettings();
}

const getArtWallServer = createServerFn({ method: "GET" }).handler(() => readPublishedArtWall());
export async function getArtWall(): Promise<ArtWallSubmission[]> { return getArtWallServer(); }
const getArtWallItemServer = createServerFn({ method: "GET" }).validator(z.object({ slug: z.string().min(1).max(180) })).handler(({ data }) => readPublishedArtWallItem(data.slug));
export async function getArtWallItem(options: { data: { slug: string } }): Promise<ArtWallSubmission | null> { return getArtWallItemServer(options); }

const limits = new Map<string, number[]>();
function requestInfo(bucket: string) {
  const headers = getRequestHeaders();
  const ip = (
    headers.get("x-forwarded-for") ||
    headers.get("x-real-ip") ||
    "unknown"
  )
    .split(",")[0]
    .trim();
  const key = `${bucket}:${createHash("sha256").update(ip).digest("hex")}`;
  const now = Date.now();
  const recent = (limits.get(key) || []).filter(
    (t) => t > now - 60 * 60 * 1000,
  );
  if (recent.length >= 5)
    throw new Error("Too many submissions. Please try again later.");
  recent.push(now);
  limits.set(key, recent);
  return {
    ip_hash: key.split(":")[1],
    user_agent: headers.get("user-agent")?.slice(0, 500) || null,
  };
}
function privateClient() {
  const url = process.env.DIRECTUS_URL || "https://cms.brightfutures.social";
  const token = process.env.DIRECTUS_SERVER_TOKEN;
  if (!token) throw new Error("Submissions are temporarily unavailable.");
  return createDirectus(url).with(staticToken(token)).with(rest());
}

const artCleanText = (maximum: number) => z.string().max(maximum).transform((value) => value.normalize("NFKC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim());
const artWallInput = z.object({
  submissionType: z.enum(["drawing", "painting", "digital-art", "photography", "poetry", "writing", "mixed-media", "other"]),
  title: artCleanText(160).pipe(z.string().min(1)), displayPreference: z.enum(["first-name", "chosen-name", "anonymous"]),
  displayName: artCleanText(120), contactEmail: z.string().trim().email().max(254), description: artCleanText(2000),
  textContent: artCleanText(12000), altText: artCleanText(700), themeSlug: z.union([z.literal(""), z.string().max(100)]),
  contentNote: artCleanText(280), consentGiven: z.boolean(), guidelinesAccepted: z.boolean(), website: z.string().max(0),
  image: z.union([z.literal(""), z.string().max(14_000_000)]), imageName: z.string().max(180), imageType: z.string().max(100),
}).superRefine((data, ctx) => {
  const visual = !["poetry", "writing"].includes(data.submissionType);
  if (visual && !data.image) ctx.addIssue({ code: "custom", path: ["image"], message: "Choose an image of your work before submitting." });
  if (["poetry", "writing"].includes(data.submissionType) && !data.textContent) ctx.addIssue({ code: "custom", path: ["textContent"], message: "Add your poem or writing before submitting." });
  if (data.displayPreference === "chosen-name" && !data.displayName) ctx.addIssue({ code: "custom", path: ["displayName"], message: "Add the name you would like displayed." });
  if (!data.consentGiven) ctx.addIssue({ code: "custom", path: ["consentGiven"], message: "Please confirm you have permission to share this work." });
  if (!data.guidelinesAccepted) ctx.addIssue({ code: "custom", path: ["guidelinesAccepted"], message: "Please confirm you have read the submission guidelines." });
});

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
function dataUrlToImage(value: string, mime: string) {
  if (!acceptedImageTypes.has(mime)) throw new Error("That file type is not supported. Please use a JPG, PNG or WEBP image.");
  const match = /^data:([a-z/+.-]+);base64,([a-zA-Z0-9+/=]+)$/.exec(value);
  if (!match || match[1] !== mime) throw new Error("We couldn't read that image. Please choose the original file and try again.");
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 10 * 1024 * 1024) throw new Error("That image is too large. Please choose an image smaller than 10 MB.");
  return new Blob([bytes], { type: mime });
}
async function uploadArtWallImage(dataUrl: string, mime: string) {
  const image = dataUrlToImage(dataUrl, mime);
  const extension = mime === "image/jpeg" ? "jpg" : mime.split("/")[1];
  const form = new FormData();
  form.append("file", image, `art-wall-${crypto.randomUUID()}.${extension}`);
  form.append("folder", process.env.DIRECTUS_ART_WALL_FOLDER || "");
  const response = await fetch(`${(process.env.DIRECTUS_URL || "https://cms.brightfutures.social").replace(/\/$/, "")}/files`, { method: "POST", headers: { Authorization: `Bearer ${process.env.DIRECTUS_SERVER_TOKEN}` }, body: form });
  if (!response.ok) throw new Error("We couldn't upload that image. Your form hasn't been submitted yet, so please try again.");
  const payload = await response.json() as { data?: { id?: string } };
  if (!payload.data?.id) throw new Error("We couldn't upload that image. Your form hasn't been submitted yet, so please try again.");
  return payload.data.id;
}
export const submitArtWall = createServerFn({ method: "POST" }).validator(artWallInput).handler(async ({ data }) => {
  requestInfo("art-wall");
  const file = data.image ? await uploadArtWallImage(data.image, data.imageType) : null;
  const displayName = data.displayPreference === "anonymous" ? null : data.displayPreference === "first-name" ? data.displayName.split(/\s+/)[0] || null : data.displayName;
  const baseSlug = data.title.toLocaleLowerCase("en-GB").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "untitled-work";
  await privateClient().request(createItem("art_wall_submissions", { slug: `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`, title: data.title, submission_type: data.submissionType, display_name: displayName, is_anonymous: data.displayPreference === "anonymous", contact_email: data.contactEmail, description: data.description || null, text_content: data.textContent || null, file, alt_text: data.altText || null, theme_slug: data.themeSlug || null, content_note: data.contentNote || null, moderation_status: "pending", consent_given: true, guidelines_accepted: true }));
  return { ok: true };
});

type AdminArtWall = ArtWallSubmission & { id: string; contactEmail: string; moderationStatus: ModerationStatus; moderationNotes: string | null; requiresSafeguardingReview: boolean; submittedAt: string | null }
export const getAdminArtWall = createServerFn({ method: "POST" }).validator(z.object({ token: z.string().min(1).max(500) })).handler(async ({ data }) => {
  // TanStack server functions do not forward custom headers from this call, so compare the submitted secret server-side only.
  if (!process.env.ART_WALL_ADMIN_TOKEN || data.token !== process.env.ART_WALL_ADMIN_TOKEN) throw new Error("That moderation passcode was not recognised.");
  const rows = await privateClient().request(readItems("art_wall_submissions", { fields: ["id", "slug", "title", "submission_type", "display_name", "is_anonymous", "contact_email", "description", "text_content", "file", "alt_text", "theme_slug", "content_note", "reveal_content", "featured", "published_at", "moderation_status", "moderation_notes", "requires_safeguarding_review", "submitted_at"], sort: ["-submitted_at"], limit: 200 })) as unknown as Array<Record<string, unknown>>;
  return rows.map((r) => ({ id: String(r.id), slug: String(r.slug || ""), title: String(r.title), type: r.submission_type as ArtWallType, displayName: r.is_anonymous ? "Anonymous" : (r.display_name as string | null) || "Anonymous", isAnonymous: !!r.is_anonymous, description: (r.description as string | null) || null, textContent: (r.text_content as string | null) || null, imageUrl: assetUrl(r.file as string | null) || null, altText: (r.alt_text as string | null) || null, theme: (r.theme_slug as string | null) || null, contentNote: (r.content_note as string | null) || null, revealContent: !!r.reveal_content, featured: !!r.featured, publishedAt: (r.published_at as string | null) || null, contactEmail: String(r.contact_email), moderationStatus: r.moderation_status as ModerationStatus, moderationNotes: (r.moderation_notes as string | null) || null, requiresSafeguardingReview: !!r.requires_safeguarding_review, submittedAt: (r.submitted_at as string | null) || null } satisfies AdminArtWall));
});
export const moderateArtWall = createServerFn({ method: "POST" }).validator(z.object({ token: z.string().min(1).max(500), id: z.string().uuid(), action: z.enum(["approve", "reject", "remove", "restore", "feature", "unfeature", "safeguard", "unsafeguard"]), notes: artCleanText(2000) })).handler(async ({ data }) => {
  if (!process.env.ART_WALL_ADMIN_TOKEN || data.token !== process.env.ART_WALL_ADMIN_TOKEN) throw new Error("Your moderation session has expired. Please sign in again.");
  const now = new Date().toISOString(); const changes: Record<string, unknown> = { moderation_notes: data.notes || null };
  if (data.action === "approve") Object.assign(changes, { moderation_status: "approved", reviewed_at: now, published_at: now, removed_at: null });
  if (data.action === "reject") Object.assign(changes, { moderation_status: "rejected", reviewed_at: now });
  if (data.action === "remove") Object.assign(changes, { moderation_status: "removed", removed_at: now });
  if (data.action === "restore") Object.assign(changes, { moderation_status: "approved", removed_at: null, published_at: now });
  if (data.action === "feature") changes.featured = true; if (data.action === "unfeature") changes.featured = false;
  if (data.action === "safeguard") changes.requires_safeguarding_review = true; if (data.action === "unsafeguard") changes.requires_safeguarding_review = false;
  await privateClient().request(updateItem("art_wall_submissions", data.id, changes));
  return { ok: true };
});
const contactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(180),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0),
});
export const submitContact = createServerFn({ method: "POST" })
  .validator(contactInput)
  .handler(async ({ data }) => {
    const info = requestInfo("contact");
    await privateClient().request(
      createItem("contact_messages", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: "new",
        source_page: "/contact",
        ...info,
      }),
    );
    return { ok: true };
  });

const perksEnquiryInput = z.object({
  business: z.string().trim().min(1).max(180),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  link: z.string().trim().max(500),
  offer: z.string().trim().max(1500),
  restrictions: z.string().trim().max(1500),
  message: z.string().trim().max(3000),
  website: z.string().max(0),
});
export const submitPerksEnquiry = createServerFn({ method: "POST" })
  .validator(perksEnquiryInput)
  .handler(async ({ data }) => {
    const info = requestInfo("perks-enquiry");
    const details = [
      `Business/organisation: ${data.business}`,
      `Website or social link: ${data.link || "Not provided"}`,
      `Proposed offer: ${data.offer || "To be discussed"}`,
      `Restrictions: ${data.restrictions || "To be discussed"}`,
      `Message: ${data.message || "No additional message"}`,
    ].join("\n\n");
    await privateClient().request(
      createItem("contact_messages", {
        name: data.name,
        email: data.email,
        subject: `BrightFutures Perks enquiry — ${data.business}`,
        message: details,
        status: "new",
        source_page: "/partnerships/perks",
        ...info,
      }),
    );
    return { ok: true };
  });
const ideaInput = z.object({
  idea: z.string().trim().min(10).max(3000),
  name: z.string().trim().max(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  website: z.string().max(0),
});
export const submitIdea = createServerFn({ method: "POST" })
  .validator(ideaInput)
  .handler(async ({ data }) => {
    requestInfo("idea");
    await privateClient().request(
      createItem("ideas", {
        idea: data.idea,
        name: data.name || null,
        email: data.email || null,
        status: "new",
      }),
    );
    return { ok: true };
  });

const cleanText = (maximum: number) =>
  z
    .string()
    .max(maximum)
    .transform((value) =>
      value
        .normalize("NFKC")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim(),
    );

const checkinInput = z
  .object({
    highlight: cleanText(4000),
    proud_of: cleanText(4000),
    goal_or_challenge: cleanText(4000),
    brightfutures_idea: cleanText(4000),
    issue_to_raise: cleanText(4000),
    name: cleanText(120),
    email: z.union([z.literal(""), z.string().trim().email().max(254)]),
    share_publicly: z.boolean(),
    public_name_preference: z.union([z.enum(["full_name", "first_name", "anonymous"]), z.literal("")]),
    public_excerpt: cleanText(1500),
    website_consent: z.boolean(),
    social_media_consent: z.boolean(),
    website: z.string().max(0),
  })
  .superRefine((data, context) => {
    const responses = [
      data.highlight,
      data.proud_of,
      data.goal_or_challenge,
      data.brightfutures_idea,
      data.issue_to_raise,
    ];
    if (!responses.some((value) => value.length >= 3))
      context.addIssue({
        code: "custom",
        path: ["highlight"],
        message: "Add something to at least one box before sending your check-in.",
      });
    if (data.share_publicly && !data.public_excerpt)
      context.addIssue({
        code: "custom",
        path: ["public_excerpt"],
        message: "Choose the exact excerpt that may be considered for sharing.",
      });
    if (data.share_publicly && !data.public_name_preference)
      context.addIssue({ code: "custom", path: ["public_name_preference"], message: "Choose how you would like to be credited." });
    if (data.share_publicly && !data.website_consent && !data.social_media_consent)
      context.addIssue({ code: "custom", path: ["website_consent"], message: "Choose at least one place where the excerpt may be shared." });
    if (!data.share_publicly && (data.website_consent || data.social_media_consent))
      context.addIssue({
        code: "custom",
        path: ["share_publicly"],
        message: "Sharing consent cannot be given while the response is private.",
      });
    if (data.share_publicly && data.public_name_preference === "first_name" && !data.name)
      context.addIssue({ code: "custom", path: ["name"], message: "Add your first name for first-name attribution." });
    if (
      data.share_publicly &&
      data.public_name_preference === "full_name" &&
      data.name.split(/\s+/).filter(Boolean).length < 2
    )
      context.addIssue({ code: "custom", path: ["name"], message: "Add your full name for full-name attribution." });
  });

export const submitCommunityCheckin = createServerFn({ method: "POST" })
  .validator(checkinInput)
  .handler(async ({ data }) => {
    requestInfo("community-checkin");
    const consentGiven = data.website_consent || data.social_media_consent;
    await privateClient().request(
      createItem("community_checkins", {
        highlight: data.highlight || null,
        proud_of: data.proud_of || null,
        goal_or_challenge: data.goal_or_challenge || null,
        brightfutures_idea: data.brightfutures_idea || null,
        issue_to_raise: data.issue_to_raise || null,
        name: data.name || null,
        email: data.email || null,
        share_publicly: data.share_publicly,
        public_name_preference: data.share_publicly
          ? data.public_name_preference
          : "anonymous",
        public_excerpt: data.share_publicly ? data.public_excerpt : null,
        website_consent: data.website_consent,
        social_media_consent: data.social_media_consent,
        consent_recorded_at: consentGiven ? new Date().toISOString() : null,
      }),
    );
    return { ok: true };
  });
