import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { i as isUpcoming, a as activityThemes, b as ideaCards } from "./events-DmYQydHL.js";
import { E as EventCard } from "./EventCard-DYqanAtl.js";
import { useState } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { f as submitIdea, g as Route } from "./router-oKxGGzNV.js";
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
function IdeaForm() {
  const send = useServerFn(submitIdea);
  const [fields, setFields] = useState({ idea: "", name: "", email: "", website: "" });
  const [status, setStatus] = useState("idle");
  const change = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await send({ data: fields });
      setStatus("sent");
      setFields({ idea: "", name: "", email: "", website: "" });
    } catch {
      setStatus("error");
    }
  };
  if (status === "sent") return /* @__PURE__ */ jsx("p", { role: "status", className: "border-l-4 border-green bg-cream px-5 py-4 text-forest", children: "Thanks. Your idea has been sent to the committee." });
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("label", { children: [
      "Website",
      /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1 })
    ] }) }),
    /* @__PURE__ */ jsxs("label", { className: "grid gap-1 text-sm font-semibold text-forest", children: [
      "Your idea",
      /* @__PURE__ */ jsx("textarea", { name: "idea", required: true, minLength: 10, maxLength: 3e3, rows: 4, value: fields.idea, onChange: change, className: "border border-forest/20 bg-paper px-4 py-3 font-normal outline-none focus:border-coral" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1 text-sm font-semibold text-forest", children: [
        "Name ",
        /* @__PURE__ */ jsx("span", { className: "font-normal text-forest/50", children: "optional" }),
        /* @__PURE__ */ jsx("input", { name: "name", maxLength: 120, value: fields.name, onChange: change, className: "border border-forest/20 bg-paper px-4 py-3 font-normal" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1 text-sm font-semibold text-forest", children: [
        "Email ",
        /* @__PURE__ */ jsx("span", { className: "font-normal text-forest/50", children: "optional" }),
        /* @__PURE__ */ jsx("input", { name: "email", type: "email", maxLength: 254, value: fields.email, onChange: change, className: "border border-forest/20 bg-paper px-4 py-3 font-normal" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { disabled: status === "sending", className: "w-fit bg-forest px-6 py-3 text-sm font-semibold text-cream disabled:opacity-60", children: status === "sending" ? "Sending…" : "Send idea" }),
    status === "error" ? /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm text-coral", children: "We couldn’t send your idea. Please try again later." }) : null
  ] });
}
const principles = [["Belong", "Meet people and build your community."], ["Do", "Socials, activities, trips and projects."], ["Speak", "Help shape the experience of students at Greenwich."], ["Grow", "Find opportunities, build skills and make connections beyond university."]];
function Home() {
  const {
    events,
    settings
  } = Route.useLoaderData();
  const upcoming = events.filter((e) => e.status === "confirmed" && isUpcoming(e)).sort((a, b) => new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime()).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-20 text-cream sm:px-8 lg:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "bf-rise text-xs font-bold uppercase tracking-[0.2em] text-coral-light", children: "BrightFutures Greenwich" }),
      /* @__PURE__ */ jsx("h1", { className: "bf-rise mt-7 max-w-5xl font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-[6.5rem] [animation-delay:80ms]", children: "Find your people at Greenwich." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-8 border-t border-cream/20 pt-8 lg:grid-cols-[1.4fr_1fr]", children: [
        /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-xl leading-relaxed text-cream/90", children: "BrightFutures is the student-led community for care-experienced and estranged students at the University of Greenwich." }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-cream/70", children: "Socials, opportunities, student voice and a community that’s here throughout university." }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-xs uppercase tracking-[0.16em] text-cream/50", children: "University of Greenwich Student Society" })
        ] })
      ] }),
      settings.show_announcement && settings.homepage_announcement ? /* @__PURE__ */ jsx("a", { href: settings.homepage_announcement_url || void 0, className: "mt-8 block border-l-4 border-coral bg-cream/10 px-5 py-4 text-cream", children: settings.homepage_announcement }) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx("a", { href: settings.membership_url, className: "bg-coral px-6 py-3.5 text-center font-semibold text-cream hover:bg-coral-light", children: "Join BrightFutures" }),
        /* @__PURE__ */ jsx(Link, { to: "/events", className: "border border-cream/35 px-6 py-3.5 text-center font-semibold hover:bg-cream/10", children: "See what’s happening" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "max-w-5xl font-display text-4xl font-medium leading-tight text-forest sm:text-6xl", children: "Meet people, get involved and have your say." }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 max-w-3xl text-xl leading-relaxed text-forest/70", children: "BrightFutures gives care-experienced and estranged students a place to connect throughout the year." }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 grid border-t border-forest/25 sm:grid-cols-2 lg:grid-cols-4", children: principles.map(([title, body], i) => /* @__PURE__ */ jsxs("div", { className: `border-b border-forest/20 py-7 sm:px-6 lg:border-r ${i % 2 === 0 ? "sm:pl-0" : ""}`, children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.18em] text-coral", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-forest/75", children: body })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest sm:text-5xl", children: "What’s happening" }),
        /* @__PURE__ */ jsxs(Link, { to: "/events", className: "hidden items-center gap-2 font-semibold text-forest hover:text-coral sm:flex", children: [
          "View all events ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
        ] })
      ] }),
      upcoming.length ? /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-x-8 lg:grid-cols-3", children: upcoming.map((event) => /* @__PURE__ */ jsx(EventCard, { event }, event.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-8 text-forest/65", children: "New dates are being planned. Check back soon or join to hear what’s next." }),
      /* @__PURE__ */ jsxs(Link, { to: "/events", className: "mt-6 inline-flex items-center gap-2 font-semibold text-forest sm:hidden", children: [
        "View all events ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.18em] text-green", children: "BrightFutures throughout the year" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-x-12 md:grid-cols-2", children: activityThemes.map(([title, body], i) => /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-[3rem_1fr] border-t border-forest/20 py-7 ${i % 2 ? "md:translate-y-10" : ""}`, children: [
        /* @__PURE__ */ jsxs("span", { className: "font-display text-xl text-coral", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-forest", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-forest/65", children: body })
        ] })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-coral-light", children: "Student voice" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl leading-tight sm:text-5xl", children: "A stronger collective voice at Greenwich." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-lg leading-relaxed text-cream/75", children: "We work with students, Greenwich Cares, GSU and the University to raise issues, share experiences and help improve university for the students who come after us." }),
        /* @__PURE__ */ jsxs(Link, { to: "/about", className: "mt-7 inline-flex items-center gap-2 border-b border-cream/40 pb-1 font-semibold", children: [
          "What we stand for ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 border-y border-forest/20 py-14 lg:grid-cols-[1fr_1.2fr]", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest sm:text-5xl", children: "Built by students, for students." }),
      /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-lg leading-relaxed text-forest/70", children: "Members shape what BrightFutures does. Come to a social, join a project, suggest something, help campaign for change or stay connected." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-y border-forest/15 bg-cream-dim px-6 py-20 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest", children: "What should we do next?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-forest/70", children: "We don’t want to guess what students want. Tell us." }),
        /* @__PURE__ */ jsx("div", { className: "mt-7", children: /* @__PURE__ */ jsx(IdeaForm, {}) })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 border-t border-forest/20", children: ideaCards.map((idea) => /* @__PURE__ */ jsx("li", { className: "border-b border-forest/15 py-3 text-forest/70", children: idea }, idea)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl sm:text-7xl", children: "Come as you are." }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-lg leading-relaxed text-cream/75", children: "Membership is free. You don’t need to attend everything, know anyone already or explain your circumstances to get involved." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx("a", { href: settings.membership_url, className: "bg-coral px-6 py-3 text-center font-semibold", children: "Join BrightFutures" }),
        /* @__PURE__ */ jsx(Link, { to: "/events", className: "border border-cream/30 px-6 py-3 text-center font-semibold", children: "See what’s on" })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
