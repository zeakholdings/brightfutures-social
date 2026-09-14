import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import { b as fallbackCommittee } from "./settings-B6I0cOUr.js";
import { a as Route } from "./router-tuXOV3p3.js";
import "@directus/sdk";
import "react";
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
const promises = [["Find each other", "A place for care-experienced and estranged students to meet, make friends and support one another, without having to explain everything first."], ["Make things happen", "Socials, activities, workshops and opportunities shaped around what students actually want from their time at Greenwich."], ["Say it together", "Space to raise issues, share what is and isn’t working and push for practical changes that help current and future students."]];
function portraitFor(person) {
  return person.portrait_stylised || person.portrait_original || person.photo || null;
}
function CommitteePortrait({
  person,
  index
}) {
  const portrait = portraitFor(person);
  const alt = person.portrait_alt || person.photo_alt || `Portrait of ${person.name}`;
  if (portrait) return /* @__PURE__ */ jsx("img", { src: portrait, alt, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" });
  const initials = person.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2);
  const treatments = ["bg-green", "bg-coral", "bg-coral-light"];
  return /* @__PURE__ */ jsxs("div", { className: `relative flex h-full items-center justify-center overflow-hidden ${treatments[index % treatments.length]}`, role: "img", "aria-label": `${person.name}, ${person.role}`, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -right-12 -top-10 h-44 w-44 rounded-full border-[20px] border-forest/15" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-8 h-20 w-20 rotate-12 border-2 border-forest/25" }),
    /* @__PURE__ */ jsx("span", { className: "relative font-display text-[7rem] font-semibold leading-none tracking-[-0.08em] text-forest sm:text-[9rem]", children: initials }),
    /* @__PURE__ */ jsx("svg", { viewBox: "0 0 180 50", className: "absolute bottom-10 right-6 w-32 text-cream", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M5 31c35-28 58 19 93-3 23-15 44-12 76 6", stroke: "currentColor", strokeWidth: "5", strokeLinecap: "round" }) })
  ] });
}
function AboutPage() {
  const loaded = Route.useLoaderData();
  const people = Array.isArray(loaded) && loaded.length ? loaded : fallbackCommittee;
  const honoraryPresidents = people.filter((person) => person.role.toLowerCase() === "honorary president");
  const committee = people.filter((person) => person.role.toLowerCase() !== "honorary president");
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative bg-forest px-6 py-16 text-cream sm:px-8 sm:py-24 lg:py-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-[8%] top-[8%] h-80 w-80 rounded-full bg-green" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-[18%] top-[24%] w-72 rotate-6 border-2 border-forest bg-cream p-7 text-forest shadow-[12px_12px_0_#e8734a]", children: /* @__PURE__ */ jsx("p", { className: "font-display text-4xl italic leading-[1.05]", children: "Made with students, not simply for them." }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[8%] -rotate-6 rounded-full border-2 border-cream bg-coral px-6 py-3 text-sm font-extrabold uppercase tracking-widest", children: "Greenwich" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl lg:w-[68%]", children: [
          /* @__PURE__ */ jsxs("h1", { className: "font-display text-[clamp(3.8rem,8vw,7.8rem)] font-medium leading-[0.9] tracking-[-0.05em]", children: [
            "A society shaped by the ",
            /* @__PURE__ */ jsx("em", { className: "font-normal text-coral-light", children: "students" }),
            " in it."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-9 max-w-2xl text-xl leading-relaxed text-cream/75", children: "BrightFutures is a student-led community for care-experienced and estranged students at Greenwich. It exists because university is better when there are people around who get it." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-12 h-36 lg:hidden", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-2 h-28 w-28 rounded-full bg-green" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-20 top-5 rotate-3 border-2 border-forest bg-cream px-5 py-4 font-display text-xl italic text-forest shadow-[7px_7px_0_#e8734a]", children: "Made with students." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl leading-none text-forest sm:text-7xl", children: "More than somewhere to show up." }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 inline-block -rotate-2 bg-coral px-5 py-2 text-sm font-extrabold uppercase tracking-widest text-cream", children: "Come as you are" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-7 text-lg leading-relaxed text-forest/75", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-3xl leading-snug text-forest", children: "We make room for friendships, events, projects and ideas that students actually want." }),
          /* @__PURE__ */ jsx("p", { children: "You can come along occasionally, stay connected or help run things. There’s no expected level of involvement and no need to explain your circumstances." }),
          /* @__PURE__ */ jsx("p", { children: "We also speak up. Students can share their experiences, raise issues together and help shape a better university experience for the people who come after us." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-20 border-y-2 border-forest", children: promises.map(([title, body], index) => /* @__PURE__ */ jsxs("article", { className: `grid gap-4 border-b border-forest/25 py-8 last:border-b-0 sm:grid-cols-[0.8fr_1.2fr] sm:gap-10 ${index === 1 ? "sm:ml-12" : index === 2 ? "sm:-ml-6" : ""}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl font-semibold text-forest sm:text-4xl", children: title }),
        /* @__PURE__ */ jsx("p", { className: "max-w-2xl leading-relaxed text-forest/70", children: body })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-coral px-6 py-20 text-forest sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto h-80 w-full max-w-md", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-2 top-5 h-64 w-64 rounded-full bg-green" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute left-[16%] top-[16%] w-[76%] -rotate-5 border-2 border-forest bg-cream p-7 shadow-[12px_12px_0_#16332c]", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-display text-4xl italic leading-tight", children: [
            "Our table.",
            /* @__PURE__ */ jsx("br", {}),
            "Our agenda."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-7 flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-full bg-coral" }),
            /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-full bg-green" }),
            /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-full bg-forest" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl leading-none sm:text-7xl", children: "Students make the decisions." }),
        /* @__PURE__ */ jsx("p", { className: "mt-7 max-w-2xl text-lg leading-relaxed text-forest/80", children: "BrightFutures is a University of Greenwich student society operating through Greenwich Students’ Union. We work with GSU, Greenwich Cares and university staff when it helps, but we are not a University department." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-6 py-20 sm:px-8 lg:py-32", "aria-labelledby": "committee-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 border-b-2 border-forest pb-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end", children: [
        /* @__PURE__ */ jsx("h2", { id: "committee-heading", className: "font-display text-6xl leading-[0.92] tracking-tight text-forest sm:text-8xl", children: "Meet the people making it happen." }),
        /* @__PURE__ */ jsx("p", { className: "max-w-md text-lg leading-relaxed text-forest/70 lg:justify-self-end", children: "The committee is made up of Greenwich students. We organise the calendar, keep conversations moving and make sure members shape what comes next." })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3", children: committee.map((person, index) => /* @__PURE__ */ jsxs("li", { className: "group", children: [
        /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] w-full max-w-64 overflow-hidden border-2 border-forest bg-cream shadow-[8px_8px_0_#16332c]", children: /* @__PURE__ */ jsx(CommitteePortrait, { person, index }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 border-t border-forest/30 pt-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-4xl text-forest", children: person.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 font-bold text-coral", children: person.role }),
          person.bio ? /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm leading-relaxed text-forest/70", children: person.bio }) : /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm leading-relaxed text-forest/60", children: "Part of the student team shaping BrightFutures this year." })
        ] })
      ] }, person.id || person.name)) }),
      honoraryPresidents.map((person, index) => /* @__PURE__ */ jsxs("article", { className: "mt-20 grid gap-8 border-t-2 border-forest pt-10 sm:grid-cols-[12rem_1fr] sm:items-start lg:mt-24 lg:gap-12", children: [
        /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] w-48 overflow-hidden border-2 border-forest bg-cream shadow-[6px_6px_0_#16332c] sm:w-full", children: /* @__PURE__ */ jsx(CommitteePortrait, { person, index: committee.length + index }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-2xl font-semibold text-coral", children: "Honorary President" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 font-display text-4xl text-forest sm:text-5xl", children: person.name }),
          person.bio ? /* @__PURE__ */ jsx("p", { className: "mt-5 whitespace-pre-line leading-relaxed text-forest/70", children: person.bio }) : null
        ] })
      ] }, person.id || person.name))
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-20 text-cream sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "mb-6 text-green-light", size: 34, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl leading-none sm:text-7xl", children: "There’s room for you here." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg leading-relaxed text-cream/70", children: "Join the community, come to something when it suits you, or tell us what you’d like BrightFutures to become." })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/get-involved", className: "inline-flex w-fit items-center gap-3 bg-coral px-7 py-4 font-bold text-cream", children: [
        "Get involved ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
      ] })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
