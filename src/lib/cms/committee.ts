import { readItems } from "@directus/sdk";
import { cmsClient, safeCmsRequest } from "./client";
import type { CommitteeMember } from "./types";
export const fallbackCommittee: CommitteeMember[] = [
  { id: "arshan-mahi", name: "Arshan Mahi", role: "President" },
  {
    id: "pragati-sahu",
    name: "Pragati Sahu",
    role: "Treasurer & Events and Community Officer",
  },
  {
    id: "faduma-hussain",
    name: "Faduma Hussain",
    role: "Communications & Marketing Officer",
  },
];
const validCommittee = (value: unknown): value is CommitteeMember[] =>
  Array.isArray(value) &&
  value.every(
    (person) =>
      !!person &&
      typeof person === "object" &&
      typeof (person as CommitteeMember).name === "string" &&
      typeof (person as CommitteeMember).role === "string",
  );
export async function readCommittee(): Promise<CommitteeMember[]> {
  const result = await safeCmsRequest<CommitteeMember[]>(
    "Committee data",
    () =>
      cmsClient().request(
        readItems("committee", {
          filter: { active: { _eq: true } },
          sort: ["display_order", "name"],
        }),
      ),
    fallbackCommittee,
    validCommittee,
  );
  return result.length ? result : fallbackCommittee;
}
