import { clearSessionCookie, json, readSession } from "./_shared/studio-auth"

export default async (req: Request) => {
  if (req.method === "DELETE") {
    return json({ ok: true }, { headers: { "set-cookie": clearSessionCookie(req) } })
  }

  if (req.method !== "GET") return json({ error: "Method not allowed" }, { status: 405 })
  const session = readSession(req)
  if (!session) return json({ authenticated: false }, { status: 401 })
  return json({ authenticated: true, session })
}

export const config = { path: "/api/studio/session" }
