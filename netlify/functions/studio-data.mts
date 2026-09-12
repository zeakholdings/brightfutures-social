import { randomUUID } from "node:crypto"
import { getDeployStore, getStore } from "@netlify/blobs"
import { json, readSession } from "./_shared/studio-auth"

const COLLECTIONS = new Set([
  "episodes",
  "tasks",
  "scripts",
  "contributors",
  "marketing",
  "members",
  "activity",
])

function studioStore() {
  const deployContext = (globalThis as any).Netlify?.context?.deploy?.context
  if (deployContext === "production") {
    return getStore("voices-studio", { consistency: "strong" })
  }
  return getDeployStore("voices-studio")
}

async function listRecords(collection: string) {
  const store = studioStore()
  const result = await store.list({ prefix: `${collection}/` })
  const records = await Promise.all(
    result.blobs.map(async ({ key }) => store.get(key, { type: "json" })),
  )
  return records.filter(Boolean)
}

async function addActivity(actor: string, action: string, collection: string, record: any) {
  const store = studioStore()
  const id = `${Date.now()}-${randomUUID()}`
  await store.setJSON(`activity/${id}`, {
    id,
    actor,
    action,
    collection,
    recordId: record?.id ?? null,
    label: record?.title ?? record?.name ?? record?.type ?? "Record",
    at: new Date().toISOString(),
  })
}

export default async (req: Request) => {
  const session = readSession(req)
  if (!session) return json({ error: "Not authenticated" }, { status: 401 })

  const url = new URL(req.url)
  const collection = url.searchParams.get("collection") || ""
  if (!COLLECTIONS.has(collection)) return json({ error: "Unknown collection" }, { status: 400 })

  const store = studioStore()

  if (req.method === "GET") {
    const records = await listRecords(collection)
    return json({ records })
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null) as { record?: Record<string, unknown> } | null
    if (!body?.record || typeof body.record !== "object") {
      return json({ error: "A record is required" }, { status: 400 })
    }

    const now = new Date().toISOString()
    const record = {
      ...body.record,
      id: String(body.record.id || randomUUID()),
      updatedAt: now,
      updatedBy: session.name,
      createdAt: body.record.createdAt || now,
    }
    await store.setJSON(`${collection}/${record.id}`, record)
    if (collection !== "activity") await addActivity(session.name, "saved", collection, record)
    return json({ record })
  }

  if (req.method === "DELETE") {
    const id = url.searchParams.get("id")
    if (!id) return json({ error: "Record id is required" }, { status: 400 })
    const existing = await store.get(`${collection}/${id}`, { type: "json" })
    await store.delete(`${collection}/${id}`)
    if (collection !== "activity") await addActivity(session.name, "deleted", collection, existing || { id })
    return json({ ok: true })
  }

  return json({ error: "Method not allowed" }, { status: 405 })
}

export const config = { path: "/api/studio/data" }
