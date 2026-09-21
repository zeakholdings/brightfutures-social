import { jsxs, jsx } from "react/jsx-runtime";
import { H as HighlightCard } from "./HighlightCard-B_y9O2-1.js";
import { P as PageHero } from "./PageHero-CeWEWULs.js";
import { h as Route } from "./router-BzWi0J5v.js";
import "@tanstack/react-router";
import "react";
import "lucide-react";
import "./settings-DGJdzXcl.js";
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
function HighlightsPage() {
  const highlights = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Member highlights", title: "Small wins. Big wins. Your wins.", body: "BrightFutures is about more than belonging. We want to celebrate the things our members are building, trying and achieving, in whatever form that takes." }),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-green/20 px-6 py-16 sm:px-8 lg:py-24", "aria-labelledby": "highlights-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { id: "highlights-heading", className: "font-display text-4xl text-forest sm:text-6xl", children: "Celebrated by our community" }),
      highlights.length ? /* @__PURE__ */ jsx("div", { className: "mt-12 grid items-stretch gap-9 md:grid-cols-2 lg:grid-cols-3", children: highlights.map((highlight) => /* @__PURE__ */ jsx(HighlightCard, { highlight }, highlight.id)) }) : /* @__PURE__ */ jsx("div", { className: "mt-10 max-w-2xl border-l-4 border-coral bg-paper px-6 py-6 sm:px-8", children: /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-forest/70", children: "We’ll share member highlights here when people choose to celebrate them with the community." }) })
    ] }) })
  ] });
}
export {
  HighlightsPage as component
};
