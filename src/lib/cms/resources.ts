import { readItems } from "@directus/sdk"
import { cmsClient } from "./client"
import type { Resource } from "./types"
export async function readResources() { return cmsClient().request(readItems("resources", { filter: { status: { _eq: "published" } }, sort: ["display_order", "title"] })) as Promise<Resource[]> }
