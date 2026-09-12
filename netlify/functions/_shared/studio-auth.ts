import { createHmac, timingSafeEqual } from "node:crypto"

const COOKIE_NAME = "bf_voices_studio"
const ONE_WEEK = 60 * 60 * 24 * 7

type StudioSession = {
  name: string
  role: "member" | "admin"
  exp: number
}

function env(name: string) {
  return (globalThis as any).Netlify?.env?.get(name) as string | undefined
}

function secret() {
  const value = env("STUDIO_SESSION_SECRET")
  if (!value) throw new Error("STUDIO_SESSION_SECRET is not configured")
  return value
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url")
}

export function configuredPassword() {
  return env("STUDIO_PASSWORD")
}

export function createSession(name: string, role: StudioSession["role"] = "member") {
  const session: StudioSession = {
    name: name.trim().slice(0, 80),
    role,
    exp: Date.now() + ONE_WEEK * 1000,
  }
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function sessionCookie(req: Request, token: string) {
  const secure = new URL(req.url).protocol === "https:" ? "; Secure" : ""
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ONE_WEEK}${secure}`
}

export function clearSessionCookie(req: Request) {
  const secure = new URL(req.url).protocol === "https:" ? "; Secure" : ""
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`
}

function cookieValue(req: Request, name: string) {
  const header = req.headers.get("cookie") || ""
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=")
    if (key === name) return rest.join("=")
  }
  return null
}

export function readSession(req: Request): StudioSession | null {
  const token = cookieValue(req, COOKIE_NAME)
  if (!token) return null
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null

  const expected = sign(payload)
  const left = Buffer.from(signature)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as StudioSession
    if (!parsed.name || !parsed.exp || parsed.exp < Date.now()) return null
    return parsed
  } catch {
    return null
  }
}

export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers)
  headers.set("content-type", "application/json; charset=utf-8")
  headers.set("cache-control", "no-store")
  return new Response(JSON.stringify(data), { ...init, headers })
}
