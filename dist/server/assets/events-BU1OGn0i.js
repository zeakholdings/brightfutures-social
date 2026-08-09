import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
import { E as EventCard } from "./EventCard-DYqanAtl.js";
import { i as isUpcoming } from "./events-DmYQydHL.js";
import { c as Route } from "./router-oKxGGzNV.js";
import "@tanstack/react-router";
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
const filters = ["All", "Social", "Coffee & Connect", "Community", "Opportunity", "Voice & Advocacy", "Wellbeing", "Trips", "Seasonal"];
function EventsPage() {
  const events = Route.useLoaderData();
  const [active, setActive] = useState("All");
  const [year, setYear] = useState("All");
  const years = [...new Set(events.map((e) => e.academicYear))];
  const match = (category, academicYear) => (active === "All" || category === active) && (year === "All" || academicYear === year);
  const upcoming = useMemo(() => events.filter((e) => e.status !== "cancelled" && isUpcoming(e) && match(e.category, e.academicYear)), [events, active, year]);
  const past = useMemo(() => events.filter((e) => !isUpcoming(e) && match(e.category, e.academicYear)).sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime()), [events, active, year]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "What’s on", title: "Things to do. People to meet.", body: "Socials, activities, opportunities and community moments happen throughout the year. Confirmed details appear here as soon as we have them." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 border-b border-forest/20 pb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-5 gap-y-2", role: "group", "aria-label": "Filter events by category", children: filters.map((f) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setActive(f), "aria-pressed": active === f, className: `border-b py-1 text-sm font-semibold ${active === f ? "border-coral text-forest" : "border-transparent text-forest/55 hover:text-forest"}`, children: f }, f)) }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 text-sm text-forest/65", children: [
          "Academic year",
          /* @__PURE__ */ jsxs("select", { value: year, onChange: (e) => setYear(e.target.value), className: "border border-forest/20 bg-cream px-3 py-2 text-forest", children: [
            /* @__PURE__ */ jsx("option", { children: "All" }),
            years.map((y) => /* @__PURE__ */ jsx("option", { children: y }, y))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-12 font-display text-4xl text-forest", children: "Upcoming" }),
      upcoming.length ? /* @__PURE__ */ jsx("div", { className: "mt-5", children: upcoming.map((e) => /* @__PURE__ */ jsx(EventCard, { event: e, compact: true }, e.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-6 text-forest/60", children: "Nothing in this category is scheduled yet." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-16 sm:px-8 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest", children: "Past events" }),
      past.length ? /* @__PURE__ */ jsx("div", { className: "mt-5", children: past.map((e) => /* @__PURE__ */ jsx(EventCard, { event: e, compact: true }, e.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-forest/60", children: "Past events will build into an archive here as the year goes on." })
    ] }) })
  ] });
}
export {
  EventsPage as component
};
