import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const formatDate = (event) => event.dateLabel || (event.startDate ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(event.startDate.includes("T") ? event.startDate : `${event.startDate}T12:00:00`)) : "Date coming soon");
function EventCard({ event, compact = false }) {
  return /* @__PURE__ */ jsxs("article", { className: `border-t border-forest/25 py-6 ${compact ? "lg:grid lg:grid-cols-[10rem_1fr_auto] lg:gap-8" : "flex h-full flex-col"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-forest/65", children: [
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-forest", children: formatDate(event) }),
      event.time ? /* @__PURE__ */ jsx("p", { className: "mt-1", children: event.time }) : null,
      /* @__PURE__ */ jsx("p", { className: "mt-2 uppercase tracking-[0.12em] text-coral", children: event.category })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: compact ? "mt-4 lg:mt-0" : "mt-6 flex flex-1 flex-col", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-forest", children: /* @__PURE__ */ jsx(Link, { to: "/events/$slug", params: { slug: event.slug }, className: "hover:text-coral", children: event.title }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl leading-relaxed text-forest/70", children: event.description }),
      event.location ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-forest/55", children: event.location }) : null
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/events/$slug", params: { slug: event.slug }, className: "mt-5 inline-flex h-fit w-fit border-b border-forest pb-1 text-sm font-semibold text-forest hover:text-coral lg:mt-0", children: "Details" })
  ] });
}
export {
  EventCard as E
};
