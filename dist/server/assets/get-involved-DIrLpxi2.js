import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
import { b as Route } from "./router-oKxGGzNV.js";
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
const routeItems = (membershipUrl) => [{
  title: "Join as a member",
  body: "Membership is free for 2026/27 and takes a couple of minutes. It’s the easiest way to hear what’s happening.",
  cta: "Become a member",
  href: membershipUrl
}, {
  title: "Take part",
  body: "Come to events, projects and activities.",
  cta: "See what’s on",
  to: "/events"
}, {
  title: "Help shape it",
  body: "Suggest an idea, volunteer or ask about the committee.",
  cta: "Talk to us",
  to: "/contact"
}];
function GetInvolvedPage() {
  const routes = routeItems(Route.useLoaderData().membership_url);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Get involved", title: "Come along in whatever way works for you.", body: "Membership is free. Come to one event, join a project or help run the society. There’s no expected level of involvement." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("div", { className: "grid border-t border-forest/25 lg:grid-cols-3", children: routes.map((r, i) => /* @__PURE__ */ jsxs("article", { className: `border-b border-forest/20 py-9 lg:px-8 ${i === 0 ? "lg:pl-0" : "lg:border-l"}`, children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold uppercase tracking-[.18em] text-coral", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "mt-6 font-display text-4xl text-forest", children: r.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 min-h-14 leading-relaxed text-forest/70", children: r.body }),
        "href" in r ? /* @__PURE__ */ jsxs("a", { href: r.href, className: "mt-7 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral", children: [
          r.cta,
          " →"
        ] }) : /* @__PURE__ */ jsxs(Link, { to: r.to, className: "mt-7 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral", children: [
          r.cta,
          " →"
        ] })
      ] }, r.title)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-forest/15 pt-7 text-sm", children: ["Volunteering", "Committee", "Collaboration", "Event ideas"].map((item) => /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "font-semibold text-forest/65 hover:text-forest", children: [
        item,
        " →"
      ] }, item)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 grid gap-8 bg-forest px-7 py-10 text-cream sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl", children: "Questions, ideas or offers to help?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-cream/70", children: "Send a message straight to the student committee." })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "border border-cream/30 px-6 py-3 text-center font-semibold", children: "Contact us" })
      ] })
    ] }) })
  ] });
}
export {
  GetInvolvedPage as component
};
