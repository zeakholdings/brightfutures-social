import { readItems } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import type { Resource, ResourceAudience } from "./types";
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
  "community",
] as const;

const reviewStatuses = ["active", "needs-review", "archived"] as const;
const audiences = [
  "all-greenwich-students",
  "care-experienced-students",
  "care-leavers",
  "estranged-students",
  "care-experienced-and-estranged-students",
] as const satisfies readonly ResourceAudience[];
const isDate = (value: unknown): value is string =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(`${value}T12:00:00Z`));
const safeUrl = (value: unknown) => {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};

function normaliseResources(value: unknown): Resource[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    if (
      (typeof row.id !== "string" && typeof row.id !== "number") ||
      typeof row.title !== "string" || !row.title.trim() ||
      !categories.some((category) => category === row.category)
    ) return [];
    return [{
      ...row,
      title: row.title.trim(),
      first_stop_guidance: typeof row.first_stop_guidance === "string"
        ? row.first_stop_guidance.trim() || null
        : null,
      url: safeUrl(row.url),
      source_url: safeUrl(row.source_url),
      last_reviewed: isDate(row.last_reviewed) ? row.last_reviewed : null,
      review_due: isDate(row.review_due) ? row.review_due : null,
      resource_status: reviewStatuses.some((status) => status === row.resource_status)
        ? row.resource_status : null,
      audience: Array.isArray(row.audience)
        ? row.audience.filter((entry): entry is ResourceAudience =>
            audiences.some((audience) => audience === entry),
          )
        : null,
    } as Resource];
  });
}

const validResources = (value: unknown): value is Resource[] => Array.isArray(value);
export async function readResources(): Promise<Resource[]> {
  return safeCmsRequest<Resource[]>(
    "Resources",
    () =>
      cmsClient().request(
        readItems("resources", {
          filter: { status: { _eq: "published" } },
          sort: ["display_order", "title"],
        }),
      ).then(normaliseResources),
    [],
    validResources,
  );
}
