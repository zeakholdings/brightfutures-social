import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useRouterState, Outlet, Link } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-C5T1WZVn.js";
import { i as Route } from "./router-tuXOV3p3.js";
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
function StoriesRoute() {
  const isDetail = useRouterState({
    select: (state) => state.matches.some((match) => match.routeId === "/stories/$slug")
  });
  return isDetail ? /* @__PURE__ */ jsx(Outlet, {}) : /* @__PURE__ */ jsx(Stories, {});
}
const labels = {
  news: "News",
  society: "Society updates",
  "student-voice": "Student voice",
  opportunities: "Opportunities",
  events: "Event recaps",
  history: "BrightFutures history",
  podcast: "Podcast / Voices of Change"
};
function Stories() {
  const posts = Route.useLoaderData();
  const [category, setCategory] = useState("all");
  const shown = useMemo(() => posts.filter((p) => category === "all" || p.category === category), [posts, category]);
  const categories = [...new Set(posts.flatMap((p) => p.category ? [p.category] : []))];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "News & Stories", title: "What’s happening in our community.", body: "Updates, student voice and stories from BrightFutures Greenwich." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 border-b border-forest/20 pb-6", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setCategory("all"), className: category === "all" ? "font-semibold text-coral" : "text-forest/60", children: "All" }),
        categories.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCategory(c), className: category === c ? "font-semibold text-coral" : "text-forest/60", children: labels[c] || c }, c))
      ] }),
      shown.length ? /* @__PURE__ */ jsx("div", { className: "grid gap-x-10 md:grid-cols-2 lg:grid-cols-12", children: shown.map((post, index) => /* @__PURE__ */ jsxs("article", { className: `border-b-2 border-forest/20 py-9 ${index === 0 ? "md:col-span-2 lg:col-span-8" : index % 3 === 1 ? "lg:col-span-4" : "lg:col-span-6"}`, children: [
        post.featured_image ? /* @__PURE__ */ jsx("img", { src: post.featured_image, alt: post.featured_image_alt || "", className: `mb-6 w-full border-2 border-forest object-cover ${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}` }) : null,
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[.15em] text-coral", children: post.category ? labels[post.category] : "Story" }),
        /* @__PURE__ */ jsx("h2", { className: `mt-3 font-display leading-tight text-forest ${index === 0 ? "text-4xl sm:text-6xl" : "text-3xl"}`, children: /* @__PURE__ */ jsx(Link, { to: "/stories/$slug", params: {
          slug: post.slug
        }, children: post.title }) }),
        post.excerpt ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-forest/70", children: post.excerpt }) : null,
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-forest/50", children: new Intl.DateTimeFormat("en-GB", {
          dateStyle: "long"
        }).format(new Date(post.published_at)) })
      ] }, post.slug)) }) : /* @__PURE__ */ jsxs("div", { className: "my-12 max-w-2xl border-l-4 border-coral bg-cream-dim px-6 py-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Stories from BrightFutures are coming soon." }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-forest/65", children: "We’ll share occasional society updates, student voice and highlights from across the year." })
      ] })
    ] }) })
  ] });
}
export {
  StoriesRoute as component
};
