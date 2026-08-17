import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { C as CommunityActionCard } from "./CommunityActionCard-1TxperIe.js";
import { P as PageHero } from "./PageHero-C5T1WZVn.js";
import { j as Route } from "./router-zUj7zh-c.js";
import "react";
import "./settings-DwAPQC0V.js";
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
function VoicePage() {
  const actions = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Community voice", title: "You said. We’re doing.", body: "We listen for shared themes, turn them into practical actions and report back on what happens next." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", "aria-labelledby": "actions-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { id: "actions-heading", className: "font-display text-3xl text-forest sm:text-4xl", children: "What we’re acting on" }),
      actions.length ? /* @__PURE__ */ jsx("div", { className: "mt-10 grid items-stretch gap-7 lg:grid-cols-2", children: actions.map((action) => /* @__PURE__ */ jsx(CommunityActionCard, { action }, action.id)) }) : /* @__PURE__ */ jsx("p", { className: "mt-8 max-w-2xl border-l-4 border-coral bg-paper px-6 py-5 leading-relaxed text-forest/70", children: "We’ll share theme-level updates here when there is a published action to report." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-16 text-cream sm:px-8 lg:py-20", "aria-labelledby": "voice-cta-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { id: "voice-cta-heading", className: "font-display text-3xl sm:text-4xl", children: "Have something we should hear?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl leading-relaxed text-cream/75", children: "Your feedback helps shape BrightFutures. The community check-in is a private way to share what matters to you." }),
      /* @__PURE__ */ jsxs(Link, { to: "/check-in", className: "mt-7 inline-flex items-center gap-2 bg-coral px-6 py-3 font-semibold text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream", children: [
        "Go to the community check-in ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
      ] })
    ] }) })
  ] });
}
export {
  VoicePage as component
};
