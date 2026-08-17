import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Sparkles, MapPin, CalendarDays, HandHeart, ArrowRight } from "lucide-react";
import { P as PageHero } from "./PageHero-C5T1WZVn.js";
const routes = [{
  title: "BrightFutures Perks",
  body: "Offer a useful local benefit and help make Greenwich more affordable and welcoming for care-experienced and estranged students.",
  icon: Sparkles,
  live: true
}, {
  title: "Community Partners",
  body: "Build practical, lasting connections between students and organisations across Greenwich.",
  icon: MapPin
}, {
  title: "Event Partnerships",
  body: "Work with students on an event, workshop or community activity that adds real value.",
  icon: CalendarDays
}, {
  title: "Support BrightFutures",
  body: "Share skills, resources or other support that helps student-led ideas grow.",
  icon: HandHeart
}];
function PartnershipsPage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { title: "Partnerships rooted in Greenwich.", body: "We work with local organisations that want to help students feel connected, supported and at home in their community." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsx("div", { className: "grid gap-8 lg:grid-cols-2", children: routes.map(({
      title,
      body,
      icon: Icon,
      live
    }) => /* @__PURE__ */ jsxs("article", { className: `flex min-h-72 flex-col border p-7 sm:p-9 ${live ? "border-coral bg-paper shadow-[8px_8px_0_#e8734a]" : "border-forest/15 bg-cream-dim"}`, children: [
      /* @__PURE__ */ jsx(Icon, { className: live ? "text-coral" : "text-green", size: 30, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-8 font-display text-3xl text-forest", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-lg leading-relaxed text-forest/70", children: body }),
      live ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "mt-5 font-semibold text-forest", children: "No participation fee. You choose the offer." }),
        /* @__PURE__ */ jsxs(Link, { to: "/partnerships/perks", className: "mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-7 font-semibold text-coral", children: [
          "Explore BrightFutures Perks ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-7 font-semibold text-forest", children: [
        "Start a conversation ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
      ] })
    ] }, title)) }) }) })
  ] });
}
export {
  PartnershipsPage as component
};
