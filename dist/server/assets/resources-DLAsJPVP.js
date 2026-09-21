import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Search, Banknote, Home, GraduationCap, HeartHandshake, BriefcaseBusiness, Sparkles, ExternalLink, X, ArrowRight, ChevronDown, Check } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { i as Route } from "./router-BzWi0J5v.js";
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
const categories = [{
  id: "money-funding",
  label: "Money",
  prompt: "Money is tight",
  description: "Funding, bursaries and practical money help.",
  Icon: Banknote
}, {
  id: "accommodation",
  label: "Housing",
  prompt: "I need housing help",
  description: "Halls, renting and somewhere safe to stay.",
  Icon: Home
}, {
  id: "university-support",
  label: "University",
  prompt: "I need help at uni",
  description: "Independent advice and support at Greenwich.",
  Icon: GraduationCap
}, {
  id: "wellbeing",
  label: "Wellbeing",
  prompt: "I’m not doing okay",
  description: "Someone to talk to and ongoing support.",
  Icon: HeartHandshake
}, {
  id: "careers",
  label: "Careers",
  prompt: "I want work or opportunities",
  description: "Jobs, experience, mentoring and applications.",
  Icon: BriefcaseBusiness
}, {
  id: "life-after-university",
  label: "After university",
  prompt: "I’m graduating / thinking ahead",
  description: "Next steps, graduation and what comes after.",
  Icon: Sparkles
}];
const audienceLabels = {
  "all-greenwich-students": "Everyone",
  "care-experienced-students": "Care-experienced",
  "care-leavers": "Care leavers",
  "estranged-students": "Estranged students",
  "care-experienced-and-estranged-students": "Care-experienced & estranged"
};
const categoryAliases = {
  money: "money-funding",
  "greenwich-support": "university-support",
  opportunities: "careers",
  community: "university-support"
};
function categoryOf(resource) {
  const category = categoryAliases[resource.category] || resource.category;
  return categories.some(({
    id
  }) => id === category) ? category : null;
}
function formatReviewed(value) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric"
  }).format(/* @__PURE__ */ new Date(`${value}T12:00:00`));
}
function audienceFor(resource) {
  return resource.audience?.map((item) => audienceLabels[item]).filter(Boolean) || [];
}
function ResourceCard({
  resource
}) {
  const category = categories.find(({
    id
  }) => id === categoryOf(resource));
  const Icon = category?.Icon || Sparkles;
  const audiences = audienceFor(resource);
  const status = resource.context_label?.toLowerCase().includes("check") ? resource.context_label : null;
  return /* @__PURE__ */ jsxs("article", { className: "group flex h-full flex-col border border-forest/15 bg-paper p-5 transition duration-200 hover:-translate-y-1 hover:border-forest/35 hover:shadow-[5px_6px_0_#f1e9d8] focus-within:border-forest/45 sm:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.11em] text-forest/60", children: [
        /* @__PURE__ */ jsx("span", { className: "grid size-8 place-items-center rounded-full bg-cream-dim text-forest", children: /* @__PURE__ */ jsx(Icon, { size: 15, "aria-hidden": "true" }) }),
        category?.label
      ] }),
      status ? /* @__PURE__ */ jsx("span", { className: "max-w-40 border border-coral/35 bg-coral-light/25 px-2 py-1 text-right text-[10px] font-bold leading-tight text-forest", children: status }) : null
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "mt-5 font-display text-2xl font-semibold leading-[1.04] text-forest", children: resource.title }),
    resource.organisation ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-bold text-coral", children: resource.organisation }) : null,
    resource.description ? /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-forest/70", children: resource.description }) : null,
    audiences.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: audiences.map((audience) => /* @__PURE__ */ jsx("span", { className: "border border-green/35 bg-green/10 px-2.5 py-1 text-xs font-semibold text-forest", children: audience }, audience)) }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-6", children: [
      resource.url ? /* @__PURE__ */ jsxs("a", { href: resource.url, target: "_blank", rel: "noreferrer", className: "inline-flex min-h-11 items-center gap-2 bg-forest px-4 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral", children: [
        "Visit resource ",
        /* @__PURE__ */ jsx(ExternalLink, { size: 15, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: " (opens in a new tab)" })
      ] }) : null,
      resource.first_stop_guidance || resource.eligibility_note || resource.last_reviewed ? /* @__PURE__ */ jsxs("details", { className: "mt-4 border-t border-forest/15 pt-3", children: [
        /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-forest marker:content-none", children: [
          "More details ",
          /* @__PURE__ */ jsx(ChevronDown, { size: 16, "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-4 text-sm leading-relaxed text-forest/68", children: [
          resource.first_stop_guidance ? /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-forest", children: "Good first stop if…" }),
            /* @__PURE__ */ jsx("br", {}),
            resource.first_stop_guidance
          ] }) : null,
          resource.eligibility_note ? /* @__PURE__ */ jsx("p", { children: resource.eligibility_note }) : null,
          formatReviewed(resource.last_reviewed) ? /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs text-forest/50", children: [
            /* @__PURE__ */ jsx(Check, { size: 13, "aria-hidden": "true" }),
            " Checked ",
            formatReviewed(resource.last_reviewed)
          ] }) : null
        ] })
      ] }) : null
    ] })
  ] });
}
function RecommendedCard({
  resource
}) {
  return /* @__PURE__ */ jsxs("article", { className: "flex flex-col border-2 border-forest bg-paper p-6 shadow-[7px_7px_0_#e8734a] sm:p-7", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold uppercase tracking-[.12em] text-coral", children: resource.organisation }),
    /* @__PURE__ */ jsx("h3", { className: "mt-3 font-display text-3xl leading-none text-forest", children: resource.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/72", children: resource.description }),
    resource.first_stop_guidance ? /* @__PURE__ */ jsxs("p", { className: "mt-5 border-l-2 border-green pl-3 text-sm leading-relaxed text-forest/80", children: [
      /* @__PURE__ */ jsx("strong", { children: "Good first stop if…" }),
      " ",
      resource.first_stop_guidance
    ] }) : null,
    /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: audienceFor(resource).map((audience) => /* @__PURE__ */ jsx("span", { className: "border border-forest/20 px-2.5 py-1 text-xs font-bold text-forest", children: audience }, audience)) }),
    resource.url ? /* @__PURE__ */ jsxs("a", { href: resource.url, target: "_blank", rel: "noreferrer", className: "mt-6 inline-flex min-h-11 w-fit items-center gap-2 font-bold text-forest underline decoration-coral decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral", children: [
      "Visit resource ",
      /* @__PURE__ */ jsx(ExternalLink, { size: 15, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: " (opens in a new tab)" })
    ] }) : null
  ] });
}
function ResourcesPage() {
  const resources = Route.useLoaderData();
  const resultsRef = useRef(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const hasFilters = Boolean(query || category || audience);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory = !category || categoryOf(resource) === category;
      const matchesAudience = !audience || resource.audience?.includes(audience) || audience !== "all-greenwich-students" && resource.audience?.includes("all-greenwich-students");
      const searchable = [resource.title, resource.organisation, resource.description, resource.context_label, categoryOf(resource), ...audienceFor(resource)].filter(Boolean).join(" ").toLowerCase();
      return matchesCategory && matchesAudience && (!needle || searchable.includes(needle));
    });
  }, [resources, query, category, audience]);
  const recommended = useMemo(() => {
    const preferred = ["Greenwich Cares", "GSU Advice Service", "Greenwich Money Advice and Support", "Student Wellbeing Hub"];
    return preferred.map((title) => resources.find((resource) => resource.title === title)).filter((resource) => Boolean(resource)).slice(0, 4);
  }, [resources]);
  const urgent = resources.filter((resource) => resource.title === "Urgent housing help: homeless or at risk" || resource.title.includes("Spectrum Life"));
  const overallReview = resources.length && resources.every((resource) => resource.last_reviewed) ? resources.reduce((oldest, resource) => resource.last_reviewed < oldest ? resource.last_reviewed : oldest, resources[0].last_reviewed) : null;
  const clear = () => {
    setQuery("");
    setCategory("");
    setAudience("");
  };
  const chooseCategory = (id) => {
    setCategory((current) => current === id ? "" : id);
    window.setTimeout(() => resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    }), 0);
  };
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden bg-cream", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative bg-forest px-5 py-14 text-cream sm:px-8 sm:py-20 lg:py-24", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-[7%] top-12 hidden size-56 rounded-full border-[28px] border-green/70 lg:block", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.18em] text-coral-light", children: "RESOURCES & SUPPORT" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h1", { className: "max-w-4xl font-display text-[clamp(3.4rem,7vw,6.6rem)] leading-[.88] tracking-[-.045em]", children: [
              "What do you need ",
              /* @__PURE__ */ jsx("em", { className: "font-normal text-coral-light", children: "help" }),
              " with?"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-lg leading-relaxed text-cream/78", children: "Money, housing, uni, wellbeing, work or figuring out what comes next. Start with what’s happening right now." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "hidden border-l border-cream/25 pl-5 text-sm leading-relaxed text-cream/70 lg:block", children: "The links we’d send to a friend — checked, clear and ready when you need them." })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "relative mt-9 block max-w-3xl", htmlFor: "hero-resource-search", children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Search support resources" }),
          /* @__PURE__ */ jsx(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-forest", size: 21, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("input", { id: "hero-resource-search", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search support, bursaries, housing, careers…", className: "min-h-15 w-full border-2 border-transparent bg-paper py-4 pl-14 pr-5 text-base text-forest placeholder:text-forest/48 focus:border-coral focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-cream/70", children: [
          /* @__PURE__ */ jsxs("strong", { className: "text-cream", children: [
            resources.length,
            " checked resources"
          ] }),
          overallReview ? /* @__PURE__ */ jsxs(Fragment, { children: [
            " ",
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            " last review ",
            formatReviewed(overallReview)
          ] }) : null
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream-dim px-5 py-14 sm:px-8 sm:py-20", "aria-labelledby": "start-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.15em] text-coral", children: "START HERE" }),
          /* @__PURE__ */ jsx("h2", { id: "start-heading", className: "mt-2 font-display text-4xl leading-none text-forest sm:text-5xl", children: "What’s happening?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-md text-sm leading-relaxed text-forest/65", children: "Choose what feels most useful. You can change it at any time." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: categories.map(({
        id,
        prompt,
        description,
        Icon
      }) => {
        const count = resources.filter((resource) => categoryOf(resource) === id).length;
        const selected = category === id;
        return /* @__PURE__ */ jsxs("button", { type: "button", "aria-pressed": selected, onClick: () => chooseCategory(id), className: "group min-h-44 border border-forest/20 bg-paper p-5 text-left transition hover:-translate-y-1 hover:border-forest hover:shadow-[5px_6px_0_#85b978] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-cream", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "grid size-10 place-items-center rounded-full bg-green/20 text-forest group-aria-pressed:bg-coral group-aria-pressed:text-forest", children: /* @__PURE__ */ jsx(Icon, { size: 20, "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold opacity-65", children: [
              count,
              " resources"
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "mt-5 block font-display text-2xl leading-none", children: prompt }),
          /* @__PURE__ */ jsx("span", { className: "mt-2 block text-sm leading-relaxed opacity-70", children: description })
        ] }, id);
      }) })
    ] }) }),
    urgent.length ? /* @__PURE__ */ jsx("section", { className: "bg-forest-light px-5 py-8 text-cream sm:px-8", "aria-labelledby": "urgent-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-6 lg:grid-cols-[15rem_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral-light", children: "SUPPORT THAT CAN’T WAIT" }),
        /* @__PURE__ */ jsx("h2", { id: "urgent-heading", className: "mt-2 font-display text-3xl leading-none", children: "Need help right now?" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: urgent.map((resource) => /* @__PURE__ */ jsxs("a", { href: resource.url || void 0, target: "_blank", rel: "noreferrer", className: "group border border-cream/25 bg-forest/25 p-4 transition hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-between gap-4 font-bold", children: [
          resource.title,
          /* @__PURE__ */ jsx(ExternalLink, { size: 16, "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "mt-2 block text-sm leading-relaxed text-cream/75", children: resource.description }),
        /* @__PURE__ */ jsxs("span", { className: "mt-3 inline-block text-xs font-bold text-coral-light", children: [
          "Open support ",
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "(opens in a new tab)" })
        ] })
      ] }, resource.id)) })
    ] }) }) : null,
    recommended.length ? /* @__PURE__ */ jsx("section", { className: "bg-cream px-5 py-16 sm:px-8 lg:py-24", "aria-labelledby": "recommended-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "A FEW FRIENDLY POINTERS" }),
      /* @__PURE__ */ jsx("h2", { id: "recommended-heading", className: "mt-2 font-display text-5xl leading-none text-forest sm:text-6xl", children: "Good places to start" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl leading-relaxed text-forest/65", children: "A small shortlist for when you’re not quite sure which door to knock on first." }),
      /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-6 lg:grid-cols-2", children: recommended.map((resource) => /* @__PURE__ */ jsx(RecommendedCard, { resource }, resource.id)) })
    ] }) }) : null,
    /* @__PURE__ */ jsx("section", { ref: resultsRef, id: "resources-results", className: "scroll-mt-24 border-t border-forest/15 bg-cream-dim px-5 py-16 sm:px-8 lg:py-20", "aria-labelledby": "finder-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "SUPPORT FINDER" }),
          /* @__PURE__ */ jsx("h2", { id: "finder-heading", className: "mt-2 font-display text-5xl leading-none text-forest sm:text-6xl", children: "Find your next step" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-forest/60", children: "Tags are a guide; the official provider decides eligibility." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sticky top-[5.5rem] z-20 mt-8 border border-forest/15 bg-paper p-4 shadow-sm sm:p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-end", children: [
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-2 block text-sm font-bold text-forest", children: "Search" }),
            /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-forest/55", size: 17, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search all resources", className: "min-h-11 w-full border border-forest/30 bg-cream px-10 py-2 text-sm text-forest focus:border-coral focus:outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("fieldset", { children: [
            /* @__PURE__ */ jsx("legend", { className: "mb-2 text-sm font-bold text-forest", children: "Category" }),
            /* @__PURE__ */ jsx("div", { className: "flex max-w-full gap-2 overflow-x-auto pb-1", children: [{
              id: "",
              label: "All"
            }, ...categories].map((item) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCategory(item.id), "aria-pressed": category === item.id, className: "min-h-10 shrink-0 border border-forest/25 px-3 text-sm font-bold text-forest transition aria-pressed:bg-forest aria-pressed:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral", children: item.label }, item.id)) })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-2 block text-sm font-bold text-forest", children: "Audience" }),
            /* @__PURE__ */ jsxs("select", { value: audience, onChange: (event) => setAudience(event.target.value), className: "min-h-11 w-full border border-forest/30 bg-cream px-3 text-sm text-forest focus:border-coral focus:outline-none", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Everyone" }),
              Object.entries(audienceLabels).filter(([value]) => value !== "all-greenwich-students").map(([value, label]) => /* @__PURE__ */ jsx("option", { value, children: label }, value))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2 border-t border-forest/10 pt-4", "aria-live": "polite", children: [
          /* @__PURE__ */ jsxs("p", { className: "mr-auto text-sm text-forest/65", children: [
            /* @__PURE__ */ jsx("strong", { className: "text-forest", children: filtered.length }),
            " ",
            filtered.length === 1 ? "resource" : "resources",
            " found"
          ] }),
          category ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 bg-green/15 px-2 py-1 text-xs font-bold text-forest", children: [
            categories.find((item) => item.id === category)?.label,
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCategory(""), "aria-label": "Remove category filter", children: /* @__PURE__ */ jsx(X, { size: 13 }) })
          ] }) : null,
          audience ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 bg-green/15 px-2 py-1 text-xs font-bold text-forest", children: [
            audienceLabels[audience],
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setAudience(""), "aria-label": "Remove audience filter", children: /* @__PURE__ */ jsx(X, { size: 13 }) })
          ] }) : null,
          hasFilters ? /* @__PURE__ */ jsx("button", { type: "button", onClick: clear, className: "min-h-10 px-2 text-sm font-bold text-forest underline decoration-coral decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral", children: "Clear filters" }) : null
        ] })
      ] }),
      filtered.length ? /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((resource) => /* @__PURE__ */ jsx(ResourceCard, { resource }, resource.id)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-9 border-2 border-dashed border-forest/25 bg-paper px-6 py-12 text-center", children: [
        /* @__PURE__ */ jsx(Search, { className: "mx-auto text-green", size: 32, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-3xl text-forest", children: "We couldn’t find a match for that." }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-lg text-sm leading-relaxed text-forest/65", children: "Try a broader search, or BrightFutures can point you towards an appropriate service." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: clear, className: "min-h-11 bg-forest px-4 text-sm font-bold text-cream", children: "Clear filters" }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "inline-flex min-h-11 items-center px-4 text-sm font-bold text-forest underline decoration-coral decoration-2 underline-offset-4", children: "Contact BrightFutures" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-5 py-14 text-cream sm:px-8 sm:py-18", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral-light", children: "KEEP IT USEFUL" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-5xl leading-none", children: "Something missing?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl leading-relaxed text-cream/75", children: "If there’s a service, bursary or opportunity other students should know about, tell us." })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "inline-flex min-h-12 w-fit items-center gap-2 bg-coral px-5 py-3 text-sm font-bold text-forest transition hover:bg-coral-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream", children: [
        "Suggest a resource ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 17, "aria-hidden": "true" })
      ] })
    ] }) })
  ] });
}
export {
  ResourcesPage as component
};
