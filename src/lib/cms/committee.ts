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
  {
    id: "april-williams",
    name: "April Williams",
    role: "Honorary President",
    bio: "Hi! I'm April, and I started the society with Arshan. 😊 I am really passionate about care-experienced visibility within higher education, particularly through student-led initiatives. This society was created so that all care-experienced and estranged students have a safe space to laugh, hope, and build within our community. I am currently publishing research into relational experiences that impact care-experienced individuals' educational trajectories! In my spare time, I'm probably wheel-building pots or doing developmental research. I am excited to see our community build within Greenwich and beyond, and hope you can join us in making more spaces inclusive for care-experienced students. 💜",
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
