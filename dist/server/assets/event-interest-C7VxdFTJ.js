import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { CalendarCheck2, CheckCircle2, UsersRound } from "lucide-react";
import { n as getEventInterestAdmin, o as confirmEventInterestOption, p as addSuggestedEventInterestOption } from "./router-BzWi0J5v.js";
import "@tanstack/react-router";
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
function EventInterestAdmin() {
  const load = useServerFn(getEventInterestAdmin);
  const confirmSlot = useServerFn(confirmEventInterestOption);
  const addSuggestion = useServerFn(addSuggestedEventInterestOption);
  const [token, setToken] = useState("");
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  async function signIn(event) {
    event.preventDefault();
    try {
      setError("");
      setItems(await load({
        data: {
          token
        }
      }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We couldn’t open the event planning dashboard.");
    }
  }
  async function choose(eventSlug, optionId, label) {
    if (!window.confirm(`Confirm “${label}” as the event date? This will close the interest check and publish the event as confirmed.`)) return;
    const key = `${eventSlug}:${optionId}`;
    try {
      setBusy(key);
      setError("");
      await confirmSlot({
        data: {
          token,
          eventSlug,
          optionId
        }
      });
      setItems(await load({
        data: {
          token
        }
      }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We couldn’t confirm that date.");
    } finally {
      setBusy("");
    }
  }
  async function addToPoll(eventSlug, slot) {
    const key = `${eventSlug}:${slot.start}:${slot.end || ""}`;
    try {
      setBusy(key);
      setError("");
      await addSuggestion({
        data: {
          token,
          eventSlug,
          ...slot
        }
      });
      setItems(await load({
        data: {
          token
        }
      }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We couldn’t add that suggested time to the poll.");
    } finally {
      setBusy("");
    }
  }
  if (!items) return /* @__PURE__ */ jsx("main", { className: "min-h-[70vh] bg-forest px-6 py-20 text-cream", children: /* @__PURE__ */ jsxs("form", { onSubmit: signIn, className: "mx-auto max-w-md border border-cream/30 bg-forest-light p-7", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral-light", children: "PRIVATE AREA" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-4xl", children: "Event planning" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-cream/70", children: "See member availability, compare the strongest times and confirm the final event date." }),
    /* @__PURE__ */ jsxs("label", { className: "mt-6 flex flex-col gap-2 text-sm font-bold", children: [
      "Organiser passcode",
      /* @__PURE__ */ jsx("input", { type: "password", value: token, onChange: (event) => setToken(event.target.value), className: "bg-paper px-3 py-3 text-forest", autoComplete: "current-password", required: true })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "mt-5 bg-coral px-5 py-3 font-bold", children: "Open dashboard" }),
    error ? /* @__PURE__ */ jsx("p", { role: "alert", className: "mt-4 text-sm text-coral-light", children: error }) : null
  ] }) });
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-cream px-5 py-10 sm:px-8 lg:py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "PRIVATE ORGANISER VIEW" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-5xl text-forest sm:text-6xl", children: "Event interest" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-forest/65", children: "Responses update the same event record. Confirming a slot changes the event from an interest check into a normal confirmed event." })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: async () => setItems(await load({
        data: {
          token
        }
      })), className: "w-fit border-b-2 border-forest pb-1 text-sm font-bold text-forest", children: "Refresh results" })
    ] }),
    error ? /* @__PURE__ */ jsx("p", { role: "alert", className: "mt-6 border-l-4 border-coral pl-4 text-coral", children: error }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-10", children: [
      items.map((item) => {
        const interested = item.totals.yes + item.totals.maybe;
        const labels = new Map(item.options.map((option) => [option.id, option.label]));
        return /* @__PURE__ */ jsxs("article", { className: "overflow-hidden border-2 border-forest bg-paper", children: [
          /* @__PURE__ */ jsxs("header", { className: "grid gap-6 bg-forest px-6 py-7 text-cream lg:grid-cols-[1fr_auto] lg:items-end", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold uppercase tracking-[.16em] text-coral-light", children: item.status === "interest-check" ? "Planning with members" : "Confirmed" }),
              /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-4xl", children: item.title }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-cream/60", children: [
                "/events/",
                item.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(Stat, { value: item.totals.yes, label: "Yes" }),
              /* @__PURE__ */ jsx(Stat, { value: item.totals.maybe, label: "Maybe" }),
              /* @__PURE__ */ jsx(Stat, { value: item.totals.no, label: "No" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-8 p-6 lg:grid-cols-[1.2fr_.8fr] lg:p-8", children: [
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(CalendarCheck2, { className: "text-coral" }),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl text-forest", children: "Which time works best?" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3", children: [
                item.options.map((option) => {
                  const best = item.bestOptionId === option.id;
                  const percentage = interested ? Math.round(option.available / interested * 100) : 0;
                  const busyKey = `${item.slug}:${option.id}`;
                  return /* @__PURE__ */ jsxs("div", { className: `grid gap-4 border-2 p-4 sm:grid-cols-[1fr_auto] sm:items-center ${best ? "border-green bg-green/10" : "border-forest/15 bg-cream"}`, children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx("p", { className: "font-bold text-forest", children: option.label }),
                        best && item.options.length > 1 ? /* @__PURE__ */ jsx("span", { className: "bg-green px-2 py-1 text-[.68rem] font-extrabold uppercase tracking-widest text-forest", children: "Strongest" }) : null
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-forest/60", children: [
                        option.yes,
                        " yes · ",
                        option.maybe,
                        " maybe · ",
                        percentage,
                        "% of interested members available"
                      ] })
                    ] }),
                    item.status === "interest-check" ? /* @__PURE__ */ jsxs("button", { type: "button", disabled: busy === busyKey, onClick: () => choose(item.slug, option.id, option.label), className: "inline-flex min-h-11 items-center justify-center gap-2 bg-coral px-4 py-2 text-sm font-bold text-cream hover:bg-forest disabled:opacity-60", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { size: 17 }),
                      busy === busyKey ? "Confirming…" : "Confirm this slot"
                    ] }) : null
                  ] }, option.id);
                }),
                !item.options.length ? /* @__PURE__ */ jsx("p", { className: "border border-forest/15 bg-cream p-4 text-sm text-forest/60", children: "This event has no planning options configured yet." }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxs("aside", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(CalendarCheck2, { className: "text-coral" }),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl text-forest", children: "Member-suggested times" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-forest/60", children: "These are separate from the poll until you choose to add one." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3", children: [
                item.suggestedSlots.map((slot) => {
                  const key = `${item.slug}:${slot.start}:${slot.end || ""}`;
                  return /* @__PURE__ */ jsxs("div", { className: "border-2 border-green/50 bg-green/10 p-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-forest", children: formatSuggestedSlot(slot) }),
                    /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-forest/65", children: [
                      "Suggested by ",
                      slot.count,
                      " ",
                      slot.count === 1 ? "person" : "people"
                    ] }),
                    item.status === "interest-check" ? /* @__PURE__ */ jsx("button", { type: "button", disabled: busy === key, onClick: () => addToPoll(item.slug, slot), className: "mt-3 min-h-10 bg-forest px-4 py-2 text-sm font-bold text-cream hover:bg-coral disabled:opacity-60", children: busy === key ? "Adding…" : "Add to poll" }) : null
                  ] }, key);
                }),
                !item.suggestedSlots.length ? /* @__PURE__ */ jsx("p", { className: "border border-forest/15 bg-cream p-4 text-sm text-forest/60", children: "No alternative times suggested yet." }) : null
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(UsersRound, { className: "text-green" }),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl text-forest", children: "Recent responses" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 max-h-[32rem] space-y-3 overflow-y-auto pr-1", children: [
                item.recent.map((response) => /* @__PURE__ */ jsxs("div", { className: "border border-forest/15 bg-cream p-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-extrabold uppercase tracking-widest text-coral", children: response.attendance }),
                    response.email ? /* @__PURE__ */ jsx("span", { className: "text-xs text-forest/45", children: "wants date update" }) : null
                  ] }),
                  response.availability.length ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-semibold text-forest", children: response.availability.map((id) => labels.get(id) || id).join(" · ") }) : null,
                  response.suggestedSlots.length ? /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-forest/65", children: [
                    "Suggested: ",
                    response.suggestedSlots.map(formatSuggestedSlot).join(" · ")
                  ] }) : null,
                  response.email ? /* @__PURE__ */ jsx("p", { className: "mt-2 break-all text-xs text-forest/55", children: response.email }) : null
                ] }, response.id)),
                !item.recent.length ? /* @__PURE__ */ jsx("p", { className: "border border-forest/15 bg-cream p-4 text-sm text-forest/60", children: "No responses yet." }) : null
              ] })
            ] })
          ] })
        ] }, item.slug);
      }),
      !items.length ? /* @__PURE__ */ jsx("div", { className: "border-l-4 border-green bg-green/10 p-6 text-forest/70", children: "No interest-check or recently confirmed events to show." }) : null
    ] })
  ] }) });
}
function formatSuggestedSlot(slot) {
  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/London"
  }).format(new Date(slot.start));
  const time = (value) => new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/London"
  }).format(new Date(value)).replace(":00", "").replace(/\s/g, "").toLowerCase();
  return `${date}, ${time(slot.start)}${slot.end ? `–${time(slot.end)}` : ""}`;
}
function Stat({
  value,
  label
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-w-16 border border-cream/20 px-3 py-2 text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "font-display text-3xl leading-none", children: value }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-[.65rem] font-bold uppercase tracking-wider text-cream/55", children: label })
  ] });
}
export {
  EventInterestAdmin as component
};
