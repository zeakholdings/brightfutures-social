import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Users, CalendarHeart, Lightbulb } from "lucide-react";
import { g as Route } from "./router-BzWi0J5v.js";
import "react";
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
function GetInvolvedPage() {
  const settings = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative bg-forest px-6 py-16 text-cream sm:px-8 sm:py-24 lg:py-32", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-[7%] top-[12%] hidden h-72 w-72 rounded-full bg-green lg:block", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-[12%] top-[25%] hidden w-64 rotate-6 border-2 border-forest bg-cream p-6 font-display text-3xl italic text-forest shadow-[11px_11px_0_#e8734a] lg:block", "aria-hidden": "true", children: [
        "Come once.",
        /* @__PURE__ */ jsx("br", {}),
        "Stay awhile.",
        /* @__PURE__ */ jsx("br", {}),
        "Shape it."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl lg:w-[68%]", children: [
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-[clamp(3.8rem,8vw,7.8rem)] leading-[.9] tracking-[-.05em]", children: [
          "There’s more than one way ",
          /* @__PURE__ */ jsx("em", { className: "font-normal text-coral-light", children: "in." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-8 max-w-2xl text-xl leading-relaxed text-cream/75", children: "Come to one thing, join officially, bring an idea or help make it happen. You decide what being part of BrightFutures looks like." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-2xl italic text-coral", children: "The formal bit" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-5xl leading-none text-forest sm:text-7xl", children: "Join BrightFutures." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg leading-relaxed text-forest/70", children: "Official membership is free for 2026/27 and is handled through Greenwich Students’ Union. It is the easiest way to hear what is happening and support the society." }),
        /* @__PURE__ */ jsxs("a", { href: settings.membership_url, className: "mt-8 inline-flex items-center gap-3 bg-coral px-7 py-4 font-bold text-cream shadow-[6px_6px_0_#16332c] transition-transform hover:-translate-y-1", children: [
          "Become an official GSU member ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rotate-2 border-2 border-forest bg-green p-8 text-forest shadow-[12px_12px_0_#16332c]", children: [
        /* @__PURE__ */ jsx(Users, { size: 36 }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 font-display text-3xl", children: "You can still come and meet us first." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/75", children: "Taking part in BrightFutures activities and completing official GSU membership are different things. There is no expected level of involvement." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("article", { className: "grid gap-8 border-y-2 border-forest py-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CalendarHeart, { className: "text-coral", size: 36 }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 font-display text-5xl text-forest", children: "Come to something." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-lg leading-relaxed text-forest/70", children: "Socials, activities and community moments happen throughout the year. Pick whatever sounds like you; no networking voice required." }),
          /* @__PURE__ */ jsxs(Link, { to: "/events", className: "mt-6 inline-flex items-center gap-2 border-b-2 border-forest pb-1 font-bold text-forest", children: [
            "See what’s on ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 17 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "grid gap-8 border-b-2 border-forest py-10 lg:ml-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:order-2", children: [
          /* @__PURE__ */ jsx(Lightbulb, { className: "text-green", size: 38 }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 font-display text-5xl text-forest", children: "Bring an idea." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-lg leading-relaxed text-forest/70", children: "Suggest an event, a project, a campaign or something the community should try. Ideas do not need to arrive fully formed." }),
          /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "mt-6 inline-flex items-center gap-2 border-b-2 border-forest pb-1 font-bold text-forest", children: [
            "Share your idea ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 17 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "mt-14 bg-forest p-8 text-cream sm:p-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl sm:text-6xl", children: "Help shape what happens next." }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-2xl text-lg leading-relaxed text-cream/70", children: "Volunteer, ask about the committee, offer a collaboration or simply tell us what would make the society better." })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "mt-8 inline-flex bg-coral px-6 py-4 font-bold lg:mt-0", children: "Talk to the student committee →" })
      ] })
    ] }) })
  ] });
}
export {
  GetInvolvedPage as component
};
