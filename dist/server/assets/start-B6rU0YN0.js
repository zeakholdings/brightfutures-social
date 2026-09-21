import { a as createMiddleware } from "../server.js";
import { createDirectus, staticToken, rest, readItems } from "@directus/sdk";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
function dedupeSerializationAdapters(deduped, serializationAdapters) {
  for (let i = 0, len = serializationAdapters.length; i < len; i++) {
    const current = serializationAdapters[i];
    if (!deduped.has(current)) {
      deduped.add(current);
      if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
    }
  }
}
var createStart = (getOptions) => {
  return {
    getOptions: async () => {
      const options = await getOptions();
      if (options.serializationAdapters) {
        const deduped = /* @__PURE__ */ new Set();
        dedupeSerializationAdapters(deduped, options.serializationAdapters);
        options.serializationAdapters = Array.from(deduped);
      }
      return options;
    },
    createMiddleware
  };
};
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const imageTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp"]);
async function approvedArtWallMedia(id) {
  if (!uuid.test(id)) return new Response("Not found", { status: 404 });
  const token = process.env.DIRECTUS_ART_WALL_TOKEN || process.env.DIRECTUS_SERVER_TOKEN;
  const base = (process.env.DIRECTUS_URL || "https://cms.brightfutures.social").replace(/\/$/, "");
  if (!token) return new Response("Not found", { status: 404 });
  try {
    const client = createDirectus(base).with(staticToken(token)).with(rest());
    const records = await client.request(readItems("art_wall_submissions", { fields: ["file"], filter: { file: { _eq: id }, moderation_status: { _eq: "approved" }, published_at: { _nnull: true }, removed_at: { _null: true } }, limit: 1 }));
    if (!records.length) return new Response("Not found", { status: 404 });
    const source = await fetch(`${base}/assets/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${token}` } });
    const type = source.headers.get("content-type")?.split(";", 1)[0].toLowerCase() || "";
    if (!source.ok || !source.body || !imageTypes.has(type)) return new Response("Not found", { status: 404 });
    return new Response(source.body, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
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
  "upgrade-insecure-requests"
].join("; ");
const securityHeaders = createMiddleware().server(async ({ next, pathname }) => {
  const match = pathname.match(/^\/art-wall\/media\/([^/]+)$/);
  if (match) return approvedArtWallMedia(match[1]);
  const result = await next();
  const headers = new Headers(result.response.headers);
  headers.set("Content-Security-Policy", contentSecurityPolicy);
  return new Response(result.response.body, {
    status: result.response.status,
    statusText: result.response.statusText,
    headers
  });
});
const startInstance = createStart(() => ({
  requestMiddleware: [securityHeaders]
}));
export {
  startInstance
};
