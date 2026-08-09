import { readItems } from "@directus/sdk"
import { cmsClient } from "./client"
import type { CommitteeMember } from "./types"
export async function readCommittee() { return cmsClient().request(readItems("committee", { filter: { active: { _eq: true } }, sort: ["display_order", "name"] })) as Promise<CommitteeMember[]> }
