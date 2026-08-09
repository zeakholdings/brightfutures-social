import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
import { R as Route } from "./router-oKxGGzNV.js";
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
  news: "News",
  society: "Society",
  "student-voice": "Student voice",
  opportunities: "Opportunities",
  events: "Events"
};
function Stories() {
  const posts = Route.useLoaderData();
  const [category, setCategory] = useState("all");
  const shown = useMemo(() => posts.filter((p) => category === "all" || p.category === category), [posts, category]);
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "News & Stories", title: "What’s happening in our community.", body: "Updates, student voice and stories from BrightFutures Greenwich." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 border-b border-forest/20 pb-6", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setCategory("all"), className: category === "all" ? "font-semibold text-coral" : "text-forest/60", children: "All" }),
        categories.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCategory(c), className: category === c ? "font-semibold text-coral" : "text-forest/60", children: labels[c] || c }, c))
      ] }),
      shown.length ? /* @__PURE__ */ jsx("div", { className: "grid gap-x-10 md:grid-cols-2", children: shown.map((post) => /* @__PURE__ */ jsxs("article", { className: "border-b border-forest/20 py-9", children: [
        post.featured_image ? /* @__PURE__ */ jsx("img", { src: post.featured_image, alt: post.featured_image_alt || "", className: "mb-6 aspect-[16/9] w-full object-cover" }) : null,
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[.15em] text-coral", children: post.category ? labels[post.category] : "Story" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-3xl text-forest", children: /* @__PURE__ */ jsx(Link, { to: "/stories/$slug", params: {
          slug: post.slug
        }, children: post.title }) }),
        post.excerpt ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-forest/70", children: post.excerpt }) : null,
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-forest/50", children: new Intl.DateTimeFormat("en-GB", {
          dateStyle: "long"
        }).format(new Date(post.published_at)) })
      ] }, post.slug)) }) : /* @__PURE__ */ jsx("p", { className: "py-12 text-forest/60", children: "No stories have been published yet." })
    ] }) })
  ] });
}
export {
  Stories as component
};
