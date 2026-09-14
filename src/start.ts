import { createMiddleware, createStart } from "@tanstack/react-start"
import { approvedArtWallMedia } from "@/lib/cms/art-wall-media"

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://analytics.zeak.dev",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' https://cms.brightfutures.social data: blob:",
  "media-src 'self' https://cms.brightfutures.social",
  "connect-src 'self' https://cms.brightfutures.social https://analytics.zeak.dev",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = createMiddleware().server(async ({ next, pathname }) => {
  const match = pathname.match(/^\/art-wall\/media\/([^/]+)$/)
  if (match) return approvedArtWallMedia(match[1])
  const result = await next()
  const headers = new Headers(result.response.headers)
  headers.set("Content-Security-Policy", contentSecurityPolicy)

  return new Response(result.response.body, {
    status: result.response.status,
    statusText: result.response.statusText,
    headers,
  })
})

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeaders],
}))
