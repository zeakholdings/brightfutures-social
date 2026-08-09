import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
import { a as Route } from "./router-oKxGGzNV.js";
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
const labels = {
  "greenwich-support": "Greenwich Cares / University support",
  accommodation: "Accommodation",
  money: "Money",
  wellbeing: "Wellbeing",
  careers: "Careers",
  opportunities: "Opportunities",
  community: "Community"
};
function ResourcesPage() {
  const resources = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Resources", title: "Useful information, when you need it.", body: "BrightFutures is a community first. This page collects confirmed support and opportunities so they’re easier to find." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      resources.length ? /* @__PURE__ */ jsx("div", { className: "border-t border-forest/25", children: resources.map((item, i) => /* @__PURE__ */ jsxs("article", { className: "grid gap-3 border-b border-forest/20 py-6 sm:grid-cols-[3rem_1fr_10rem] sm:items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-xl text-coral", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[.12em] text-coral", children: labels[item.category] || item.category }),
          /* @__PURE__ */ jsx("h2", { className: "mt-1 font-display text-xl text-forest", children: item.title }),
          item.description ? /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-relaxed text-forest/65", children: item.description }) : null,
          item.organisation ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-forest/50", children: item.organisation }) : null
        ] }),
        item.url ? /* @__PURE__ */ jsx("a", { href: item.url, className: "text-sm font-semibold text-forest underline sm:text-right", children: "View resource" }) : null
      ] }, item.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-forest/60", children: "No resources have been published yet." }),
      /* @__PURE__ */ jsxs("p", { className: "mt-10 text-forest/60", children: [
        "Know something that belongs here? ",
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "font-semibold text-forest underline", children: "Tell the committee" }),
        "."
      ] })
    ] }) })
  ] });
}
export {
  ResourcesPage as component
};
