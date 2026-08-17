import { readItems } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import type { CommunityAction, CommunityActionStatus } from "./types";

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
  "display_order",
] as const;

const actionStatuses = new Set<CommunityActionStatus>([
  "heard",
  "raised",
  "in_progress",
  "completed",
]);

const validActions = (value: unknown): value is CommunityAction[] =>
  Array.isArray(value) &&
  value.every((row) => {
    if (!row || typeof row !== "object") return false;
    const action = row as CommunityAction;
    return (
      action.status === "published" &&
      typeof action.title === "string" &&
      action.title.trim().length > 0 &&
      typeof action.what_members_said === "string" &&
      action.what_members_said.trim().length > 0 &&
      typeof action.what_brightfutures_did === "string" &&
      action.what_brightfutures_did.trim().length > 0 &&
      actionStatuses.has(action.current_status) &&
      typeof action.published_at === "string" &&
      Number.isFinite(Date.parse(action.published_at))
    );
  });

export async function readPublishedCommunityActions(): Promise<CommunityAction[]> {
  return safeCmsRequest<CommunityAction[]>(
    "Published community actions",
    () =>
      cmsClient().request(
        readItems("community_actions", {
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
    validActions,
  );
}
