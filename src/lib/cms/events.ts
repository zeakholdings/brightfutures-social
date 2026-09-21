import { readItems } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import type { CmsEvent } from "./types";

// Directus uses the event lifecycle itself as the publication control. Keep the
// same rule for listings and detail pages so an editor cannot accidentally make
// a provisional event reachable by its slug.
export const PUBLIC_EVENT_STATUSES = ["interest-check", "confirmed", "completed"] as const;

export async function readPublicEvents(): Promise<CmsEvent[]> {
  return safeCmsRequest<CmsEvent[]>(
    "Events",
    () =>
      cmsClient().request(
        readItems("events", {
          filter: { status: { _in: [...PUBLIC_EVENT_STATUSES] } },
          sort: ["start_date", "sort"],
          limit: 200,
        }),
      ),
    [],
    validEvents,
  );
}

export async function readPublicEvent(slug: string): Promise<CmsEvent | null> {
  const rows = await safeCmsRequest<CmsEvent[]>(
    "Event detail",
    () =>
      cmsClient().request(
        readItems("events", {
          filter: {
            slug: { _eq: slug },
            status: { _in: [...PUBLIC_EVENT_STATUSES] },
          },
          limit: 1,
        }),
      ),
    [],
    validEvents,
  );
  return rows[0] ?? null;
}
const validEvents = (value: unknown): value is CmsEvent[] =>
  Array.isArray(value) &&
  value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const event = item as CmsEvent;
    const status = event.status as (typeof PUBLIC_EVENT_STATUSES)[number];
    const validStatus = PUBLIC_EVENT_STATUSES.includes(status);
    const validDate =
      status === "interest-check"
        ? !event.start_date || Number.isFinite(Date.parse(event.start_date))
        : typeof event.start_date === "string" &&
          Number.isFinite(Date.parse(event.start_date));
    return (
      typeof event.title === "string" &&
      typeof event.slug === "string" &&
      validStatus &&
      validDate &&
      [
        "social",
        "coffee-connect",
        "community",
        "opportunity",
        "voice-advocacy",
        "wellbeing",
        "trips",
        "seasonal",
      ].includes(event.category)
    );
  });
