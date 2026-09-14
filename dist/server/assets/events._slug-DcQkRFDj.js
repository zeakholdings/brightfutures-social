import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-C5T1WZVn.js";
import { s as safeRichText } from "./safe-html-GWu8up0M.js";
import { k as Route } from "./router-tuXOV3p3.js";
import "sanitize-html";
import "react";
import "lucide-react";
import "./settings-B6I0cOUr.js";
import "@directus/sdk";
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
function EventPage() {
  const event = Route.useLoaderData();
  const date = event.startDate ? new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "Europe/London"
  }).format(new Date(event.startDate)) : "To be confirmed";
  const detail = (label, value) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("dt", { className: "text-xs font-bold uppercase tracking-[0.12em] text-coral", children: label }),
    /* @__PURE__ */ jsx("dd", { className: "mt-1 text-forest/75", children: value })
  ] });
  const awaitingDetails = !event.time && !event.location;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: event.category, title: event.title, body: event.description }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("article", { className: "mx-auto grid max-w-5xl gap-10 lg:grid-cols-[15rem_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "border-t border-forest/25 pt-5", children: [
        /* @__PURE__ */ jsxs("dl", { className: "grid gap-5", children: [
          detail("Date", date),
          event.time ? detail("Time", event.time) : null,
          event.location ? detail("Venue", event.location) : null,
          detail("Category", event.category),
          event.whoFor ? detail("Who it’s for", event.whoFor) : null,
          event.costInfo ? detail("Cost", event.costInfo) : null
        ] }),
        awaitingDetails ? /* @__PURE__ */ jsx("p", { className: "mt-5 border border-forest/15 bg-paper px-3 py-2 text-sm font-semibold text-forest/65", children: "Details coming soon" }) : null,
        event.status === "cancelled" ? /* @__PURE__ */ jsx("p", { className: "mt-5 bg-coral px-3 py-2 font-semibold text-cream", children: "Cancelled" }) : null,
        event.registrationUrl && event.status !== "cancelled" ? /* @__PURE__ */ jsx("a", { href: event.registrationUrl, className: "mt-6 inline-flex bg-forest px-5 py-3 font-semibold text-cream", rel: "noreferrer", children: "Book or RSVP" }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        event.coverImage ? /* @__PURE__ */ jsx("img", { src: event.coverImage, alt: event.coverImageAlt || "", className: "mb-8 w-full" }) : null,
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-forest", children: "About this event" }),
          event.body ? /* @__PURE__ */ jsx("div", { className: "prose mt-4 max-w-none text-forest/75", dangerouslySetInnerHTML: {
            __html: safeRichText(event.body)
          } }) : /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/70", children: event.description })
        ] }),
        event.accessibilityInfo ? /* @__PURE__ */ jsxs("section", { className: "mt-10 border-t border-forest/20 pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Accessibility" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-line text-forest/70", children: event.accessibilityInfo })
        ] }) : null,
        /* @__PURE__ */ jsxs("section", { className: "mt-10 border-t border-forest/20 pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Contact and help" }),
          event.contactInfo ? /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-line text-forest/70", children: event.contactInfo }) : null,
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "mt-3 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral", children: "Contact BrightFutures" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/events", className: "mt-10 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral", children: "← Back to What’s On" })
      ] })
    ] }) })
  ] });
}
export {
  EventPage as component
};
