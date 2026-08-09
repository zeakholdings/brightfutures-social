import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
import { s as safeRichText } from "./safe-html-GWu8up0M.js";
import { i as Route } from "./router-oKxGGzNV.js";
import "sanitize-html";
import "@tanstack/react-router";
import "react";
import "lucide-react";
import "./site-7ycwNZvd.js";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "@directus/sdk";
function EventPage() {
  const event = Route.useLoaderData();
  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: event.startDate?.includes("T") ? "short" : void 0
  }).format(new Date(event.startDate || ""));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: event.category, title: event.title, body: event.description }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("article", { className: "mx-auto grid max-w-5xl gap-10 lg:grid-cols-[15rem_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "border-t border-forest/25 pt-5 text-forest/70", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-forest", children: event.time || date }),
        event.location ? /* @__PURE__ */ jsx("p", { className: "mt-3", children: event.location }) : null,
        event.status === "cancelled" ? /* @__PURE__ */ jsx("p", { className: "mt-5 bg-coral px-3 py-2 font-semibold text-cream", children: "Cancelled" }) : null,
        event.registrationUrl && event.status !== "cancelled" ? /* @__PURE__ */ jsx("a", { href: event.registrationUrl, className: "mt-6 inline-flex bg-forest px-5 py-3 font-semibold text-cream", children: "Register" }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        event.coverImage ? /* @__PURE__ */ jsx("img", { src: event.coverImage, alt: event.coverImageAlt || "", className: "mb-8 w-full" }) : null,
        event.body ? /* @__PURE__ */ jsx("div", { className: "prose max-w-none text-forest/75", dangerouslySetInnerHTML: {
          __html: safeRichText(event.body)
        } }) : null,
        event.accessibilityInfo ? /* @__PURE__ */ jsxs("section", { className: "mt-10 border-t border-forest/20 pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Accessibility" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-line text-forest/70", children: event.accessibilityInfo })
        ] }) : null
      ] })
    ] }) })
  ] });
}
export {
  EventPage as component
};
