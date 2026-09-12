import { configuredPassword, createSession, json, sessionCookie } from "./_shared/studio-auth"

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, { status: 405 })

  const password = configuredPassword()
  if (!password) return json({ error: "Studio access is not configured" }, { status: 503 })

  const body = await req.json().catch(() => ({})) as { name?: string; password?: string }
  const name = body.name?.trim()
  if (!name || !body.password) return json({ error: "Name and access code are required" }, { status: 400 })
  if (body.password !== password) return json({ error: "That access code is incorrect" }, { status: 401 })

  const token = createSession(name)
  return json(
    { ok: true, session: { name, role: "member" } },
    { headers: { "set-cookie": sessionCookie(req, token) } },
  )
}

export const config = { path: "/api/studio/login" }
