import { readItems } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import type { SocialCard } from "./types";

const validSocialCards = (value: unknown): value is SocialCard[] =>
  Array.isArray(value) &&
  value.every(
    (card) =>
      !!card &&
      typeof card === "object" &&
      typeof (card as SocialCard).image === "string" &&
      typeof (card as SocialCard).image_alt === "string" &&
      (card as SocialCard).image_alt.trim().length > 0,
  );

export async function readSocialCards(): Promise<SocialCard[]> {
  return safeCmsRequest<SocialCard[]>(
    "Homepage social cards",
    () =>
      cmsClient().request(
        readItems("homepage_social_cards", {
          filter: { status: { _eq: "published" } },
          sort: ["display_order"],
          limit: 3,
        }),
      ),
    [],
    validSocialCards,
  );
}
