import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useRouterState, Outlet, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { A as ArtWallCard } from "./ArtWallCard-CeuXO7mU.js";
import { useState, useMemo } from "react";
import { g as galleryType, a as artWallPrompt } from "./art-wall-CKEXSHke.js";
import { P as PageHero } from "./PageHero-CeWEWULs.js";
import { b as Route } from "./router-BzWi0J5v.js";
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
const filters = ["All", "Art", "Photography", "Poetry", "Writing", "Mixed media"];
function ArtWallGallery({ works }) {
  const [filter, setFilter] = useState("All");
  const shown = useMemo(() => works.filter((work) => filter === "All" || galleryType(work.type) === filter), [works, filter]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "-mx-1 flex gap-2 overflow-x-auto pb-3", role: "toolbar", "aria-label": "Filter the Art Wall", children: filters.map((item) => /* @__PURE__ */ jsx("button", { type: "button", "aria-pressed": filter === item, onClick: () => setFilter(item), className: `min-h-11 shrink-0 border px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${filter === item ? "border-forest bg-forest text-cream" : "border-forest/25 bg-paper text-forest hover:border-forest"}`, children: item }, item)) }),
    shown.length ? /* @__PURE__ */ jsx("div", { className: "mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3", children: shown.map((work, index) => /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(ArtWallCard, { work, index }) }, work.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-10 border-l-4 border-coral bg-paper p-6 text-forest/70", children: "No pieces match that filter yet. Try another way into the wall." })
  ] });
}
function ArtWallRoute() {
  const childRoute = useRouterState({
    select: (s) => s.matches.some((m) => m.routeId === "/art-wall/$slug" || m.routeId === "/art-wall/submit")
  });
  return childRoute ? /* @__PURE__ */ jsx(Outlet, {}) : /* @__PURE__ */ jsx(ArtWallPage, {});
}
function ArtWallPage() {
  const works = Route.useLoaderData();
  const featured = works.filter((work) => work.featured);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "The BrightFutures Art Wall", title: "Creativity, in our own words.", body: "Art, poetry, photography and creative work shared by the BrightFutures community.", visual: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold uppercase tracking-[.16em] text-coral", children: "A community exhibition" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 font-display text-4xl leading-none", children: [
        "Made here.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("em", { className: "font-normal text-coral", children: "Shared here." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm leading-relaxed text-forest/70", children: "Everything on the wall has been shared by a member of our community and reviewed before being published." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-forest/15 bg-cream px-6 py-6 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-sm leading-relaxed text-forest/70", children: "The wall is a calm place to share something you have made, without likes, rankings or pressure." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/art-wall/submit", className: "inline-flex min-h-11 items-center bg-coral px-5 font-bold text-cream", children: "Add something to the wall" }),
        /* @__PURE__ */ jsx("a", { href: "#on-the-wall", className: "inline-flex min-h-11 items-center border border-forest/30 px-5 font-bold text-forest", children: "Explore the wall" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-12 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-5 border-l-4 border-coral pl-5 sm:grid-cols-[1fr_auto] sm:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "THIS MONTH’S PROMPT" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-4xl text-forest", children: artWallPrompt.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-forest/70", children: artWallPrompt.description })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/art-wall/submit", className: "inline-flex min-h-11 items-center gap-2 font-bold text-forest underline decoration-coral decoration-2 underline-offset-4", children: [
        "Respond to the prompt ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 17 })
      ] })
    ] }) }),
    featured.length ? /* @__PURE__ */ jsx("section", { className: "bg-paper px-6 py-16 sm:px-8 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "SELECTED BY THE COMMITTEE" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-5xl text-forest", children: "Featured on the wall" }),
      /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-7 md:grid-cols-2", children: featured.slice(0, 2).map((work, index) => /* @__PURE__ */ jsx(ArtWallCard, { work, index }, work.slug)) })
    ] }) }) : null,
    /* @__PURE__ */ jsx("section", { id: "on-the-wall", className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6 border-b-2 border-forest pb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "THE EXHIBITION" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-5xl text-forest sm:text-6xl", children: "On the wall" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/art-wall/submit", className: "font-bold text-forest underline decoration-coral decoration-2 underline-offset-4", children: "Got something to add?" })
      ] }),
      works.length ? /* @__PURE__ */ jsx("div", { className: "mt-9", children: /* @__PURE__ */ jsx(ArtWallGallery, { works }) }) : /* @__PURE__ */ jsxs("div", { className: "mt-10 max-w-2xl border-l-4 border-coral bg-paper p-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest", children: "The wall is waiting for its first pieces." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/70", children: "Draw something. Write something. Photograph something. Share something that matters to you." }),
        /* @__PURE__ */ jsx(Link, { to: "/art-wall/submit", className: "mt-6 inline-flex bg-forest px-5 py-3 font-bold text-cream", children: "Be the first to add something" })
      ] })
    ] }) })
  ] });
}
export {
  ArtWallRoute as component
};
