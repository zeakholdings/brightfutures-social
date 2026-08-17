import { readItems } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import type { MemberHighlight } from "./types";

const publicFields = [
  "id",
  "status",
  "display_name",
  "highlight_text",
  "category",
  "term",
  "published_at",
  "image",
  "image_alt",
  "display_order",
] as const;

const validHighlights = (value: unknown): value is MemberHighlight[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      !!item &&
      typeof item === "object" &&
      (item as MemberHighlight).status === "published" &&
      typeof (item as MemberHighlight).highlight_text === "string" &&
      (item as MemberHighlight).highlight_text.trim().length > 0 &&
      typeof (item as MemberHighlight).published_at === "string" &&
      Number.isFinite(Date.parse((item as MemberHighlight).published_at)),
  );

export async function readPublishedHighlights(): Promise<MemberHighlight[]> {
  return safeCmsRequest<MemberHighlight[]>(
    "Published member highlights",
    () =>
      cmsClient().request(
        readItems("member_highlights", {
          fields: [...publicFields],
          filter: {
            status: { _eq: "published" },
            published_at: { _lte: "$NOW" },
          },
          sort: ["display_order", "-published_at"],
          limit: 100,
        }),
      ),
    [],
    validHighlights,
  );
}
