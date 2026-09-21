import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, ArrowDownRight, MapPin } from "lucide-react";
import { i as isUpcoming, a as activityThemes, b as ideaCards } from "./events-DkYfSDFO.js";
import { useState, useRef } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { s as submitIdea, R as Route } from "./router-BzWi0J5v.js";
import { H as HighlightCard } from "./HighlightCard-B_y9O2-1.js";
import { C as CommunityActionCard } from "./CommunityActionCard-1TxperIe.js";
import { A as ArtWallCard } from "./ArtWallCard-CeuXO7mU.js";
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
import "./art-wall-CKEXSHke.js";
const empty = { idea: "", name: "", email: "", website: "" };
function IdeaForm({ categories }) {
  const send = useServerFn(submitIdea);
  const [fields, setFields] = useState(empty);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");
  const ideaRef = useRef(null);
  const change = (e) => {
    setFields((current) => ({ ...current, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };
  const chooseCategory = (category) => {
    setSelected(category);
    setFields((current) => ({
      ...current,
      idea: current.idea.trim() ? current.idea : `${category}: `
    }));
    requestAnimationFrame(() => ideaRef.current?.focus());
  };
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await send({ data: fields });
      setStatus("sent");
      setFields(empty);
      setSelected(null);
    } catch {
      setStatus("error");
    }
  };
  if (status === "sent") return /* @__PURE__ */ jsxs("div", { role: "status", className: "border-2 border-green bg-cream px-6 py-8 text-forest", children: [
    /* @__PURE__ */ jsx("p", { className: "font-display text-3xl", children: "Thanks for the idea." }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-forest/70", children: "It’s been sent to the committee." })
  ] });
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "rr-block grid gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("label", { children: [
      "Website",
      /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1, autoComplete: "off" })
    ] }) }),
    /* @__PURE__ */ jsxs("fieldset", { children: [
      /* @__PURE__ */ jsx("legend", { className: "font-display text-xl font-semibold text-forest", children: "What kind of thing?" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2.5", children: categories.map((category, index) => /* @__PURE__ */ jsx("button", { type: "button", "aria-pressed": selected === category, onClick: () => chooseCategory(category), className: `min-h-11 border-2 border-forest px-4 py-2 text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-coral-light aria-pressed:bg-forest aria-pressed:text-cream ${index % 3 === 1 ? "rotate-1" : index % 3 === 2 ? "-rotate-1" : ""}`, children: category }, category)) })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "grid gap-3 text-sm font-bold text-forest", children: [
      /* @__PURE__ */ jsx("span", { className: "font-display text-xl", children: "Put your idea here" }),
      /* @__PURE__ */ jsx("textarea", { ref: ideaRef, name: "idea", required: true, minLength: 10, maxLength: 3e3, rows: 8, value: fields.idea, onChange: change, placeholder: "What would make student life better, easier or more fun?", className: "min-h-56 resize-y border-2 border-forest bg-cream px-5 py-5 font-display text-xl font-normal leading-relaxed text-forest outline-none placeholder:text-forest/35 focus:bg-paper sm:text-2xl" }),
      /* @__PURE__ */ jsx("span", { className: "font-normal text-forest/55", children: "At least 10 characters. You don’t need to share anything about your personal circumstances." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 border-t-2 border-forest/15 pt-6 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-sm font-semibold text-forest", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Name ",
          /* @__PURE__ */ jsx("span", { className: "font-normal text-forest/50", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsx("input", { name: "name", autoComplete: "name", maxLength: 120, value: fields.name, onChange: change, className: "min-h-12 border-b-2 border-forest/35 bg-transparent px-1 py-3 font-normal outline-none focus:border-coral" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-sm font-semibold text-forest", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Email ",
          /* @__PURE__ */ jsx("span", { className: "font-normal text-forest/50", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsx("input", { name: "email", type: "email", autoComplete: "email", maxLength: 254, value: fields.email, onChange: change, className: "min-h-12 border-b-2 border-forest/35 bg-transparent px-1 py-3 font-normal outline-none focus:border-coral" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs("button", { type: "submit", disabled: status === "sending", className: "inline-flex min-h-12 items-center gap-3 bg-coral px-7 py-3 font-bold text-cream transition-all hover:-translate-y-1 hover:bg-forest disabled:opacity-60", children: [
        status === "sending" ? "Sending…" : "Pin it to the board",
        status !== "sending" ? /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" }) : null
      ] }),
      status === "error" ? /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm text-coral", children: "We couldn’t send your idea. Your text is still here, so please try again." }) : null
    ] })
  ] });
}
const realLife = [["A familiar face on campus", "Come for coffee, a meal or a low-key catch-up. No networking voice required."], ["Plans worth leaving the library for", "Trips, creative projects, seasonal get-togethers and whatever members want to try next."], ["Room to say what needs saying", "Share what university is actually like and help turn lived experience into practical change."], ["People in your corner", "Find opportunities, swap knowledge and stay connected through the busy and difficult bits too."]];
const dateParts = (event) => {
  if (!event.startDate) return {
    day: event.dateLabel || "TBC",
    month: ""
  };
  const date = new Date(event.startDate.includes("T") ? event.startDate : `${event.startDate}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat("en-GB", {
      day: "numeric"
    }).format(date),
    month: new Intl.DateTimeFormat("en-GB", {
      month: "short"
    }).format(date)
  };
};
function EventPoster({
  event,
  index
}) {
  const date = dateParts(event);
  const colours = ["bg-coral text-cream", "bg-green text-forest", "bg-cream text-forest"];
  return /* @__PURE__ */ jsxs("article", { className: `event-poster relative flex min-h-[31rem] flex-col overflow-hidden border-2 border-forest p-6 sm:p-8 ${colours[index % colours.length]}`, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 h-36 w-36 rounded-full border-[18px] border-current opacity-15", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-display leading-none", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-[5.5rem] font-semibold tracking-[-0.07em] sm:text-8xl", children: date.day }),
        date.month ? /* @__PURE__ */ jsx("span", { className: "ml-1 block text-2xl uppercase tracking-[0.08em]", children: date.month }) : null
      ] }),
      /* @__PURE__ */ jsx("span", { className: "max-w-28 border border-current px-3 py-2 text-right text-[0.68rem] font-bold uppercase tracking-[0.14em]", children: event.category })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-16", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl font-semibold leading-[1.05] sm:text-4xl", children: /* @__PURE__ */ jsx(Link, { to: "/events/$slug", params: {
        slug: event.slug
      }, className: "after:absolute after:inset-0", children: event.title }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm leading-relaxed opacity-80", children: event.description }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-current/30 pt-4 text-sm font-semibold", children: [
        event.time ? /* @__PURE__ */ jsx("span", { children: event.time }) : null,
        event.location ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 15, "aria-hidden": "true" }),
          event.location
        ] }) : null,
        !event.time && !event.location ? /* @__PURE__ */ jsx("span", { children: "Details coming soon" }) : null
      ] })
    ] })
  ] });
}
function Home() {
  const {
    events,
    settings,
    socialCards,
    highlights,
    communityActions,
    artWall
  } = Route.useLoaderData();
  const upcoming = events.filter((event) => event.status === "confirmed" && isUpcoming(event)).sort((a, b) => new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime()).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[calc(100svh-77px)] bg-forest px-6 py-14 text-cream sm:px-8 sm:py-20 lg:flex lg:items-center lg:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "hero-orbit pointer-events-none absolute inset-y-0 right-0 hidden w-[49%] lg:block", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-[7%] top-[4%] h-[34rem] w-[34rem] rounded-full border border-cream/20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-[13%] top-[12%] h-[27rem] w-[27rem] rounded-full bg-green" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute right-[8%] top-[25%] h-52 w-72 rotate-6 border-2 border-forest bg-cream p-6 text-forest shadow-[12px_12px_0_#e8734a]", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-display text-4xl italic leading-tight", children: [
            "Greenwich,",
            /* @__PURE__ */ jsx("br", {}),
            "meet your people."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 h-1 w-20 bg-coral" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-[12%] right-[37%] rotate-[-9deg] rounded-full bg-coral px-7 py-4 font-bold uppercase tracking-[0.12em] text-cream", children: "you’re invited" }),
        /* @__PURE__ */ jsx("svg", { className: "absolute bottom-[10%] right-[6%] w-44 text-cream", viewBox: "0 0 180 120", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M8 98c42-78 89-86 156-27M130 45l35 26-39 17", stroke: "currentColor", strokeWidth: "5", strokeLinecap: "round", strokeLinejoin: "round" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-full max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl lg:w-[62%]", children: [
          /* @__PURE__ */ jsxs("h1", { className: "bf-rise font-display text-[clamp(3.8rem,9vw,8.6rem)] font-medium leading-[0.86] tracking-[-0.055em] [animation-delay:80ms]", children: [
            "Find your",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { className: "font-normal text-coral-light", children: "people" }),
            " at",
            /* @__PURE__ */ jsx("br", {}),
            "Greenwich."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-9 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl", children: "A student-led community for care-experienced and estranged students, here for the good nights, honest conversations and everything in between." }),
          settings.show_announcement && settings.homepage_announcement ? /* @__PURE__ */ jsx("a", { href: settings.homepage_announcement_url || void 0, className: "mt-7 block max-w-xl border-l-4 border-coral bg-cream/10 px-5 py-4", children: settings.homepage_announcement }) : null,
          /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsx("a", { href: settings.membership_url, className: "bg-coral px-7 py-4 text-center font-bold text-cream transition-transform hover:-translate-y-1", children: "Join BrightFutures" }),
            /* @__PURE__ */ jsx(Link, { to: "/events", className: "border border-cream/40 px-7 py-4 text-center font-bold transition-colors hover:bg-cream hover:text-forest", children: "What’s happening" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-14 h-48 lg:hidden", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-[8%] top-2 h-40 w-40 rounded-full bg-green" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-[28%] top-8 rotate-3 border-2 border-forest bg-cream p-5 text-forest shadow-[8px_8px_0_#e8734a]", children: /* @__PURE__ */ jsxs("p", { className: "font-display text-2xl italic", children: [
            "Greenwich,",
            /* @__PURE__ */ jsx("br", {}),
            "meet your people."
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-32", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl leading-[0.98] tracking-tight text-forest sm:text-7xl", children: "So, what does it actually feel like?" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 w-28 -rotate-3 bg-green px-4 py-2 text-center text-sm font-extrabold uppercase tracking-widest text-forest", children: "Good question" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-0", children: realLife.map(([title, body], index) => /* @__PURE__ */ jsxs("article", { className: `border-t border-forest/25 py-7 sm:grid sm:grid-cols-[1fr_1.25fr] sm:gap-8 ${index === 1 ? "sm:ml-12" : index === 2 ? "sm:-ml-8" : ""}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-semibold text-forest sm:text-3xl", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-forest/70 sm:mt-0", children: body })
      ] }, title)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-20 sm:px-8 lg:py-28", "aria-labelledby": "events-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsx("h2", { id: "events-heading", className: "font-display text-6xl leading-none tracking-tight text-forest sm:text-8xl", children: "Coming up" }),
        /* @__PURE__ */ jsxs(Link, { to: "/events", className: "inline-flex w-fit items-center gap-2 border-b-2 border-forest pb-1 font-bold text-forest hover:text-coral", children: [
          "All events ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
        ] })
      ] }),
      upcoming.length ? /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 lg:grid-cols-3 lg:gap-0", children: upcoming.map((event, index) => /* @__PURE__ */ jsx(EventPoster, { event, index }, event.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-10 text-lg text-forest/65", children: "New dates are being planned. Check back soon or join to hear what’s next." })
    ] }) }),
    highlights.length || communityActions.length ? /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", "aria-labelledby": "noticeboard-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 border-b-2 border-forest pb-6 sm:grid-cols-[1fr_auto] sm:items-end", children: [
        /* @__PURE__ */ jsx("h2", { id: "noticeboard-heading", className: "font-display text-5xl text-forest sm:text-6xl", children: "From the community" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-sm text-forest/65", children: "Member stories and the changes we’re working on together." })
      ] }),
      highlights.length ? /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3", children: highlights.slice(0, 3).map((item) => /* @__PURE__ */ jsx(HighlightCard, { highlight: item }, item.id)) }) : null,
      communityActions.length ? /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-7 lg:grid-cols-3", children: communityActions.slice(0, 3).map((item) => /* @__PURE__ */ jsx(CommunityActionCard, { action: item }, item.id)) }) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-6", children: [
        highlights.length ? /* @__PURE__ */ jsxs(Link, { to: "/highlights", className: "inline-flex items-center gap-2 font-bold text-forest", children: [
          "All highlights ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
        ] }) : null,
        communityActions.length ? /* @__PURE__ */ jsxs(Link, { to: "/voice", className: "inline-flex items-center gap-2 font-bold text-forest", children: [
          "What we’re acting on ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
        ] }) : null
      ] })
    ] }) }) : null,
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-20 sm:px-8 lg:py-24", "aria-labelledby": "art-wall-home-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-5 border-b-2 border-forest pb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "FROM THE ART WALL" }),
          /* @__PURE__ */ jsx("h2", { id: "art-wall-home-heading", className: "mt-2 font-display text-5xl text-forest sm:text-6xl", children: "Made by our community" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/art-wall", className: "font-bold text-forest underline decoration-coral decoration-2 underline-offset-4", children: "Explore the Art Wall" })
      ] }),
      artWall.length ? /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-6 md:grid-cols-3", children: artWall.slice(0, 3).map((work, index) => /* @__PURE__ */ jsx(ArtWallCard, { work, index }, work.slug)) }) : /* @__PURE__ */ jsx("p", { className: "mt-7 max-w-xl text-forest/70", children: "The wall is waiting for its first pieces. Draw something, write something or photograph something that matters to you." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "year-strip bg-forest py-20 text-cream lg:py-28", "aria-labelledby": "year-heading", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-6 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-end", children: [
        /* @__PURE__ */ jsxs("h2", { id: "year-heading", className: "font-display text-5xl leading-none sm:text-7xl", children: [
          "BrightFutures,",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("em", { className: "font-normal text-green-light", children: "all year long." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-xl text-lg leading-relaxed text-cream/70 lg:justify-self-end", children: "The rhythm changes with the term. The community stays, with reasons to meet, make things and speak up from welcome week to summer." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 overflow-x-auto pb-8", tabIndex: 0, "aria-label": "BrightFutures activities throughout the year", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex w-max min-w-full items-center px-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))]", children: activityThemes.map(([title, body], index) => /* @__PURE__ */ jsxs("article", { className: `year-stop relative w-[17rem] shrink-0 border-l border-cream/25 px-6 py-8 sm:w-[20rem] ${index % 2 ? "translate-y-8" : "-translate-y-2"}`, children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -left-2 top-0 h-4 w-4 rounded-full bg-coral ring-4 ring-forest", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl text-cream", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-cream/65", children: body })
      ] }, title)) }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-coral px-6 py-20 text-forest sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "voice-collage relative mx-auto h-[24rem] w-full max-w-lg", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-8 h-72 w-72 rounded-full bg-green" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute left-[18%] top-[18%] w-[72%] -rotate-6 border-2 border-forest bg-cream p-7 shadow-[12px_12px_0_#16332c]", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-4xl italic leading-tight", children: "There’s power in saying it together." }),
          /* @__PURE__ */ jsx("svg", { viewBox: "0 0 220 60", className: "mt-8 w-full", children: /* @__PURE__ */ jsx("path", { d: "M5 35c42-29 69 15 111-7 27-14 53-13 98 8", fill: "none", stroke: "#e8734a", strokeWidth: "6", strokeLinecap: "round" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl leading-[1.02] sm:text-7xl", children: "A stronger collective voice at Greenwich." }),
        /* @__PURE__ */ jsx("p", { className: "mt-7 max-w-2xl text-lg leading-relaxed text-forest/80", children: "We work with students, Greenwich Cares, GSU and the University to raise issues, share experiences and help improve university for the students who come after us." }),
        /* @__PURE__ */ jsxs(Link, { to: "/about", className: "mt-8 inline-flex items-center gap-2 border-b-2 border-forest pb-1 font-bold", children: [
          "What we stand for ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 17 })
        ] })
      ] })
    ] }) }),
    settings.instagram_url ? /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", "aria-labelledby": "instagram-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { id: "instagram-heading", className: "font-display text-5xl text-forest sm:text-6xl", children: "See what we’re up to" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl text-forest/70", children: "Event announcements, society updates and moments from across the year." })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: settings.instagram_url, rel: "noreferrer", "aria-label": "Follow BrightFutures on Instagram", className: "inline-flex w-fit items-center gap-3 bg-forest px-6 py-3.5 font-bold text-cream", children: [
          /* @__PURE__ */ jsx(Instagram, { size: 19 }),
          " Follow on Instagram"
        ] })
      ] }),
      socialCards.length ? /* @__PURE__ */ jsx("ul", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: socialCards.map((card, index) => /* @__PURE__ */ jsxs("li", { className: `bg-paper ${index % 2 ? "lg:translate-y-8" : ""}`, children: [
        card.post_url ? /* @__PURE__ */ jsx("a", { href: card.post_url, rel: "noreferrer", "aria-label": card.caption ? `${card.caption} : view on Instagram` : "View this BrightFutures post on Instagram", children: /* @__PURE__ */ jsx("img", { src: card.image, alt: card.image_alt, className: "aspect-square w-full object-cover" }) }) : /* @__PURE__ */ jsx("img", { src: card.image, alt: card.image_alt, className: "aspect-square w-full object-cover" }),
        card.caption ? /* @__PURE__ */ jsx("p", { className: "p-5 leading-relaxed text-forest/70", children: card.caption }) : null
      ] }, card.id)) }) : null
    ] }) }) : null,
    /* @__PURE__ */ jsx("section", { className: "ideas-board relative bg-green px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-6xl leading-[0.94] tracking-tight text-forest sm:text-7xl", children: "What should we do next?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md text-lg leading-relaxed text-forest/75", children: "We don’t want to guess what students want. Put your idea on the board, big, small, serious or a bit weird." }),
        /* @__PURE__ */ jsx(ArrowDownRight, { className: "mt-8 hidden h-20 w-20 text-forest lg:block", strokeWidth: 1.5, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative rotate-[0.5deg] border-2 border-forest bg-paper p-5 shadow-[14px_14px_0_#16332c] sm:p-8 lg:p-10", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -top-4 left-1/2 h-8 w-32 -translate-x-1/2 -rotate-2 bg-coral-light/80", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(IdeaForm, { categories: ideaCards })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-[8%] top-10 hidden rotate-6 border border-cream/40 px-5 py-3 text-sm font-bold uppercase tracking-widest sm:block", "aria-hidden": "true", children: "free to join" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "max-w-4xl font-display text-6xl leading-[0.94] sm:text-8xl", children: "Come as you are." }),
        /* @__PURE__ */ jsx("p", { className: "mt-7 max-w-2xl text-lg leading-relaxed text-cream/75", children: "Membership is free. You don’t need to attend everything, know anyone already or explain your circumstances to get involved." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsx("a", { href: settings.membership_url, className: "bg-coral px-7 py-4 text-center font-bold", children: "Join BrightFutures" }),
          /* @__PURE__ */ jsx(Link, { to: "/events", className: "border border-cream/30 px-7 py-4 text-center font-bold", children: "See what’s on" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Home as component
};
