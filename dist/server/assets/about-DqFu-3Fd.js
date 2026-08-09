import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
import { e as Route } from "./router-oKxGGzNV.js";
import "@tanstack/react-router";
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
const objectives = ["Give care-experienced and estranged students a place to meet and support each other.", "Make it easier for students to raise issues and help shape life at Greenwich.", "Run social activities and share useful workshops, information and opportunities."];
function AboutPage() {
  const committee = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Why BrightFutures exists", title: "A society shaped by the students in it.", body: "BrightFutures is a student-led community for care-experienced and estranged students at Greenwich. It exists because university is better when there are people around who get it." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest", children: "What we do" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-lg leading-relaxed text-forest/70", children: [
        /* @__PURE__ */ jsx("p", { children: "We make room for friendships, events, projects and ideas that students actually want. You can come along occasionally, stay connected or help run things." }),
        /* @__PURE__ */ jsx("p", { children: "We also speak up. Students can raise issues together, share what is and isn’t working and push for practical change at Greenwich." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[.18em] text-coral", children: "Our objectives" }),
      /* @__PURE__ */ jsx("ol", { className: "mt-8 border-t border-forest/25", children: objectives.map((body, i) => /* @__PURE__ */ jsxs("li", { className: "grid gap-4 border-b border-forest/20 py-7 sm:grid-cols-[5rem_1fr]", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-display text-3xl text-coral", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-3xl text-lg leading-relaxed text-forest/75", children: body })
      ] }, body)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[.18em] text-coral-light", children: "Student-led" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl sm:text-5xl", children: "Students make the decisions." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 leading-relaxed text-cream/75", children: "BrightFutures is a University of Greenwich student society operating through Greenwich Students’ Union. We work with GSU, Greenwich Cares and university staff when it helps, but we are not a University department." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[.18em] text-green", children: "Meet the committee" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-4 font-display text-4xl text-forest", children: "The students running BrightFutures" }),
      /* @__PURE__ */ jsx("ol", { className: "mt-10 grid border-t border-forest/25 lg:grid-cols-3", children: committee.map((person, i) => /* @__PURE__ */ jsxs("li", { className: `border-b border-forest/20 py-8 lg:min-h-64 lg:px-8 ${i > 0 ? "lg:border-l" : "lg:pl-0"}`, children: [
        /* @__PURE__ */ jsxs("p", { className: "font-display text-2xl text-coral", children: [
          "0",
          i + 1
        ] }),
        person.photo ? /* @__PURE__ */ jsx("img", { src: person.photo, alt: "", className: "mt-8 aspect-[4/5] w-full object-cover" }) : null,
        /* @__PURE__ */ jsx("h3", { className: "mt-10 font-display text-3xl uppercase text-forest", children: person.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-xs leading-relaxed text-forest/65", children: person.role })
      ] }, person.name)) })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
