import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-CeWEWULs.js";
import { i as isUpcoming } from "./events-DkYfSDFO.js";
import { f as Route } from "./router-BzWi0J5v.js";
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
const formatDate = (event) => event.status === "interest-check" ? "Help choose the date" : event.dateLabel || (event.startDate ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(event.startDate.includes("T") ? event.startDate : `${event.startDate}T12:00:00`)) : "To be confirmed");
function EventCard({ event, compact = false }) {
  const parts = event.startDate ? { day: new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(new Date(event.startDate)), month: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(new Date(event.startDate)) } : null;
  const interestCheck = event.status === "interest-check";
  const awaitingDetails = !interestCheck && !event.time && !event.location;
  return /* @__PURE__ */ jsxs("article", { className: `group relative border-t-2 border-forest py-7 transition-transform hover:translate-x-1 ${compact ? "lg:grid lg:grid-cols-[10rem_1fr_auto] lg:gap-8" : "flex h-full flex-col"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-forest/65", children: [
      parts ? /* @__PURE__ */ jsxs("p", { className: "font-display leading-none text-forest", children: [
        /* @__PURE__ */ jsx("span", { className: "text-6xl font-semibold tracking-[-.06em]", children: parts.day }),
        /* @__PURE__ */ jsx("span", { className: "ml-2 text-xl uppercase", children: parts.month })
      ] }) : /* @__PURE__ */ jsx("p", { className: "font-display text-3xl text-forest", children: formatDate(event) }),
      event.time ? /* @__PURE__ */ jsx("p", { className: "mt-2 font-semibold", children: event.time }) : null,
      /* @__PURE__ */ jsx("p", { className: "mt-2 w-fit bg-coral px-2 py-1 text-[.68rem] font-bold uppercase tracking-[0.12em] text-cream", children: event.category })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: compact ? "mt-4 lg:mt-0" : "mt-6 flex flex-1 flex-col", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-forest", children: /* @__PURE__ */ jsx(Link, { to: "/events/$slug", params: { slug: event.slug }, className: "hover:text-coral", children: event.title }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl leading-relaxed text-forest/70", children: event.description }),
      event.location ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-forest/55", children: event.location }) : null,
      interestCheck ? /* @__PURE__ */ jsx("p", { className: "mt-4 w-fit border border-coral/35 bg-coral-light px-3 py-2 text-sm font-semibold text-forest", children: "Planning with members · vote for a time" }) : null,
      awaitingDetails ? /* @__PURE__ */ jsx("p", { className: "mt-4 w-fit border border-forest/15 bg-paper px-3 py-2 text-sm font-semibold text-forest/65", children: "Details coming soon" }) : null
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/events/$slug", params: { slug: event.slug }, className: "mt-5 inline-flex h-fit w-fit border-b-2 border-forest pb-1 text-sm font-bold text-forest hover:text-coral lg:mt-0", children: interestCheck ? "Choose a time →" : "View event →" })
  ] });
}
function EventsRoute() {
  const isDetail = useRouterState({
    select: (state) => state.matches.some((match) => match.routeId === "/events/$slug")
  });
  return isDetail ? /* @__PURE__ */ jsx(Outlet, {}) : /* @__PURE__ */ jsx(EventsPage, {});
}
const filters = ["All", "Social", "Coffee & Connect", "Community", "Opportunity", "Voice & Advocacy", "Wellbeing", "Trips", "Seasonal"];
function EventsPage() {
  const events = Route.useLoaderData();
  const [active, setActive] = useState("All");
  const [year, setYear] = useState("All");
  const years = [...new Set(events.map((e) => e.academicYear))];
  const match = (category, academicYear) => (active === "All" || category === active) && (year === "All" || academicYear === year);
  const upcoming = useMemo(() => events.filter((e) => e.status !== "cancelled" && isUpcoming(e) && match(e.category, e.academicYear)), [events, active, year]);
  const past = useMemo(() => events.filter((e) => !isUpcoming(e) && match(e.category, e.academicYear)).sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime()), [events, active, year]);
  const planning = upcoming.filter((event) => event.status === "interest-check");
  const confirmedUpcoming = upcoming.filter((event) => event.status !== "interest-check");
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
      planning.length ? /* @__PURE__ */ jsxs("div", { className: "mt-12 border-2 border-forest bg-paper px-5 py-7 sm:px-7", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold uppercase tracking-[.16em] text-coral", children: "Help shape what’s next" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-4xl text-forest", children: "Choose a date that actually works." }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-forest/65", children: "These events are still being planned. Tell us if you’d come and tick the times you can make before we book anything." }),
        /* @__PURE__ */ jsx("div", { className: "mt-5", children: planning.map((e) => /* @__PURE__ */ jsx(EventCard, { event: e, compact: true }, e.slug)) })
      ] }) : null,
      /* @__PURE__ */ jsx("h2", { className: "mt-12 font-display text-4xl text-forest", children: planning.length ? "Confirmed events" : "Upcoming" }),
      confirmedUpcoming.length ? /* @__PURE__ */ jsx("div", { className: "mt-5", children: confirmedUpcoming.map((e) => /* @__PURE__ */ jsx(EventCard, { event: e, compact: true }, e.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-6 text-forest/60", children: planning.length ? "No confirmed events in this category yet." : "Nothing in this category is scheduled yet." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-16 sm:px-8 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest", children: "Past events" }),
      past.length ? /* @__PURE__ */ jsx("div", { className: "mt-5", children: past.map((e) => /* @__PURE__ */ jsx(EventCard, { event: e, compact: true }, e.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-forest/60", children: "Past events will build into an archive here as the year goes on." })
    ] }) })
  ] });
}
export {
  EventsRoute as component
};
