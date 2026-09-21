import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-CeWEWULs.js";
import { s as safeRichText } from "./safe-html-GWu8up0M.js";
import { useState, useMemo } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { Clock3, Trash2, CalendarPlus2, ArrowRight } from "lucide-react";
import { t as submitEventInterest, u as Route } from "./router-BzWi0J5v.js";
import "sanitize-html";
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
const emptySuggestion = () => ({ date: "", startTime: "", endTime: "" });
function respondentStorageKey(eventSlug) {
  return `brightfutures:event-interest:${eventSlug}:respondent-id`;
}
function newRespondentId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
    return crypto.randomUUID();
  if (typeof crypto === "undefined" || typeof crypto.getRandomValues !== "function")
    throw new Error("Your browser cannot create an anonymous response ID. Please try a current browser.");
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function respondentIdFor(eventSlug) {
  const key = respondentStorageKey(eventSlug);
  try {
    const stored = window.localStorage.getItem(key);
    if (stored && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(stored))
      return stored;
    const id = newRespondentId();
    window.localStorage.setItem(key, id);
    return id;
  } catch {
    return newRespondentId();
  }
}
function EventInterestForm({
  eventSlug,
  options,
  closesAt
}) {
  const send = useServerFn(submitEventInterest);
  const [fields, setFields] = useState({
    attendance: "yes",
    availability: [],
    suggestedSlots: [],
    email: "",
    website: ""
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const closed = useMemo(
    () => !!closesAt && Number.isFinite(Date.parse(closesAt)) && Date.parse(closesAt) <= Date.now(),
    [closesAt]
  );
  const chooseAttendance = (attendance) => {
    setFields((current) => ({
      ...current,
      attendance,
      availability: attendance === "no" ? [] : current.availability,
      suggestedSlots: attendance === "no" ? [] : current.suggestedSlots
    }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };
  const toggleOption = (id) => {
    setFields((current) => ({
      ...current,
      availability: current.availability.includes(id) ? current.availability.filter((value) => value !== id) : [...current.availability, id]
    }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };
  const change = (event) => {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };
  const updateSuggestion = (index, field, value) => {
    setFields((current) => ({
      ...current,
      suggestedSlots: current.suggestedSlots.map(
        (slot, slotIndex) => slotIndex === index ? { ...slot, [field]: value } : slot
      )
    }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };
  const suggestedSlots = fields.suggestedSlots.filter((slot) => slot.date && slot.startTime).map((slot) => ({
    start: (/* @__PURE__ */ new Date(`${slot.date}T${slot.startTime}`)).toISOString(),
    ...slot.endTime ? { end: (/* @__PURE__ */ new Date(`${slot.date}T${slot.endTime}`)).toISOString() } : {}
  }));
  const submit = async (event) => {
    event.preventDefault();
    if (closed) return;
    setStatus("sending");
    try {
      const result = await send({
        data: {
          eventSlug,
          attendance: fields.attendance,
          availability: fields.availability,
          suggestedSlots,
          respondentId: respondentIdFor(eventSlug),
          email: fields.email,
          website: fields.website
        }
      });
      void result;
      window.location.assign(`${window.location.pathname}#interest-check`);
    } catch (reason) {
      setErrorMessage(reason instanceof Error && reason.message ? reason.message : "We couldn’t save that response. Your choices are still here, so please try again.");
      setStatus("error");
    }
  };
  if (closed)
    return /* @__PURE__ */ jsxs("section", { className: "border-2 border-forest bg-paper px-6 py-7 text-forest", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold uppercase tracking-[.16em] text-coral", children: "Interest check closed" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-3xl", children: "Thanks for helping us plan it." }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-forest/70", children: "We’re working through everyone’s availability and will update this page when the date is confirmed." })
    ] });
  const attendanceOptions = [
    { value: "yes", label: "Yes", detail: "I’d be up for it" },
    { value: "maybe", label: "Maybe", detail: "Depends on the date" },
    { value: "no", label: "Not this one", detail: "Probably not" }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "interest-check", className: "relative scroll-mt-24 overflow-hidden border-2 border-forest bg-paper px-5 py-7 sm:px-7 sm:py-8", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-12 -top-16 size-40 rounded-full border-[22px] border-green/30", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold uppercase tracking-[.16em] text-coral", children: "Help choose the date" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 max-w-2xl font-display text-4xl leading-none text-forest sm:text-5xl", children: "When works for you?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl leading-relaxed text-forest/70", children: "This one isn’t booked yet. Tell us if you’d come and tick every time you could make. We’ll use the responses to choose the strongest option." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-8 grid gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("label", { children: [
          "Website",
          /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1, autoComplete: "off" })
        ] }) }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { className: "font-display text-xl font-semibold text-forest", children: "Would you come?" }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-3", children: attendanceOptions.map((item) => {
            const active = fields.attendance === item.value;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => chooseAttendance(item.value),
                "aria-pressed": active,
                className: `min-h-24 border-2 px-4 py-4 text-left transition-all hover:-translate-y-0.5 ${active ? "border-forest bg-forest text-cream" : "border-forest/25 bg-cream text-forest hover:border-forest"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "block font-display text-2xl", children: item.label }),
                  /* @__PURE__ */ jsx("span", { className: `mt-1 block text-xs font-semibold ${active ? "text-cream/70" : "text-forest/55"}`, children: item.detail })
                ]
              },
              item.value
            );
          }) })
        ] }),
        fields.attendance !== "no" ? /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { className: "font-display text-xl font-semibold text-forest", children: "Which times could you make?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-forest/55", children: "Tick as many as work. You don’t have to choose just one." }),
          options.length ? /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-3", children: options.map((option) => {
            const active = fields.availability.includes(option.id);
            return /* @__PURE__ */ jsxs("label", { className: `flex cursor-pointer items-center gap-4 border-2 px-4 py-4 transition-colors ${active ? "border-forest bg-coral-light" : "border-forest/20 bg-cream hover:border-forest/50"}`, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: active,
                  onChange: () => toggleOption(option.id),
                  className: "size-5 accent-[var(--color-forest)]"
                }
              ),
              /* @__PURE__ */ jsx(Clock3, { size: 19, className: "shrink-0 text-coral", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-forest", children: option.label })
            ] }, option.id);
          }) }) : /* @__PURE__ */ jsx("p", { className: "mt-4 border border-forest/15 bg-cream px-4 py-3 text-sm text-forest/65", children: "Date options are being added. You can still tell us you’re interested and suggest a time below." })
        ] }) : null,
        fields.attendance !== "no" ? /* @__PURE__ */ jsxs("fieldset", { className: "border-t-2 border-forest/15 pt-7", children: [
          /* @__PURE__ */ jsx("legend", { className: "font-display text-xl font-semibold text-forest", children: "None of these work? Suggest another time" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-forest/55", children: "Share up to five times that would suit you. These stay separate until an organiser adds one to the poll." }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-4", children: fields.suggestedSlots.map((slot, index) => /* @__PURE__ */ jsxs("div", { className: "border-2 border-forest/20 bg-cream p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("p", { className: "font-bold text-forest", children: [
                "Suggested time ",
                index + 1
              ] }),
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFields((current) => ({ ...current, suggestedSlots: current.suggestedSlots.filter((_, slotIndex) => slotIndex !== index) })), className: "inline-flex min-h-10 items-center gap-2 text-sm font-bold text-coral hover:text-forest", children: [
                /* @__PURE__ */ jsx(Trash2, { size: 16, "aria-hidden": "true" }),
                " Remove"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-3 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxs("label", { className: "grid gap-1 text-sm font-semibold text-forest", children: [
                "Date",
                /* @__PURE__ */ jsx("input", { type: "date", value: slot.date, min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), onChange: (event) => updateSuggestion(index, "date", event.target.value), className: "min-h-11 border-2 border-forest/25 bg-paper px-3 font-normal outline-none focus:border-coral", required: true })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "grid gap-1 text-sm font-semibold text-forest", children: [
                "Start time",
                /* @__PURE__ */ jsx("input", { type: "time", value: slot.startTime, onChange: (event) => updateSuggestion(index, "startTime", event.target.value), className: "min-h-11 border-2 border-forest/25 bg-paper px-3 font-normal outline-none focus:border-coral", required: true })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "grid gap-1 text-sm font-semibold text-forest", children: [
                "End time ",
                /* @__PURE__ */ jsx("span", { className: "font-normal text-forest/50", children: "(optional)" }),
                /* @__PURE__ */ jsx("input", { type: "time", value: slot.endTime, onChange: (event) => updateSuggestion(index, "endTime", event.target.value), className: "min-h-11 border-2 border-forest/25 bg-paper px-3 font-normal outline-none focus:border-coral" })
              ] })
            ] })
          ] }, index)) }),
          fields.suggestedSlots.length < 5 ? /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFields((current) => ({ ...current, suggestedSlots: [...current.suggestedSlots, emptySuggestion()] })), className: "mt-4 inline-flex min-h-11 items-center gap-2 border-2 border-forest px-4 py-2 text-sm font-bold text-forest hover:bg-forest hover:text-cream", children: [
            /* @__PURE__ */ jsx(CalendarPlus2, { size: 17, "aria-hidden": "true" }),
            " Add another date/time"
          ] }) : null
        ] }) : null,
        /* @__PURE__ */ jsxs("label", { className: "grid gap-2 border-t border-forest/15 pt-6 text-sm font-semibold text-forest", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "Email me when the date is confirmed ",
            /* @__PURE__ */ jsx("span", { className: "font-normal text-forest/50", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              name: "email",
              type: "email",
              autoComplete: "email",
              value: fields.email,
              onChange: change,
              maxLength: 254,
              placeholder: "you@example.com",
              className: "min-h-12 border-b-2 border-forest/35 bg-transparent px-1 py-3 font-normal outline-none focus:border-coral"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("button", { type: "submit", disabled: status === "sending", className: "inline-flex min-h-12 items-center gap-3 bg-coral px-7 py-3 font-bold text-cream transition-all hover:-translate-y-1 hover:bg-forest disabled:opacity-60", children: [
            status === "sending" ? "Sending…" : "Send my availability",
            status !== "sending" ? /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" }) : null
          ] }),
          /* @__PURE__ */ jsx("p", { className: "max-w-sm text-xs leading-relaxed text-forest/50", children: "Submitting again from this browser updates your response. Other people on the same Wi-Fi can respond separately." })
        ] }),
        status === "error" ? /* @__PURE__ */ jsx("p", { role: "alert", className: "border-l-4 border-coral pl-3 text-sm font-semibold text-coral", children: errorMessage }) : null
      ] })
    ] })
  ] });
}
function EventPage() {
  const event = Route.useLoaderData();
  const interestCheck = event.status === "interest-check";
  const date = interestCheck ? "Help choose the date" : event.startDate ? new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "Europe/London"
  }).format(new Date(event.startDate)) : "To be confirmed";
  const detail = (label, value) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("dt", { className: "text-xs font-bold uppercase tracking-[0.12em] text-coral", children: label }),
    /* @__PURE__ */ jsx("dd", { className: "mt-1 text-forest/75", children: value })
  ] });
  const awaitingDetails = !interestCheck && !event.time && !event.location;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: event.category, title: event.title, body: event.description }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("article", { className: "mx-auto grid max-w-5xl gap-10 lg:grid-cols-[15rem_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "border-t border-forest/25 pt-5", children: [
        /* @__PURE__ */ jsxs("dl", { className: "grid gap-5", children: [
          detail(interestCheck ? "Status" : "Date", date),
          event.time ? detail("Time", event.time) : null,
          event.location ? detail("Venue", event.location) : null,
          detail("Category", event.category),
          event.whoFor ? detail("Who it’s for", event.whoFor) : null,
          event.costInfo ? detail("Cost", event.costInfo) : null
        ] }),
        awaitingDetails ? /* @__PURE__ */ jsx("p", { className: "mt-5 border border-forest/15 bg-paper px-3 py-2 text-sm font-semibold text-forest/65", children: "Details coming soon" }) : null,
        event.status === "cancelled" ? /* @__PURE__ */ jsx("p", { className: "mt-5 bg-coral px-3 py-2 font-semibold text-cream", children: "Cancelled" }) : null,
        event.registrationUrl && event.status !== "cancelled" ? /* @__PURE__ */ jsx("a", { href: event.registrationUrl, className: "mt-6 inline-flex bg-forest px-5 py-3 font-semibold text-cream", rel: "noreferrer", children: "Book or RSVP" }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        event.coverImage ? /* @__PURE__ */ jsx("img", { src: event.coverImage, alt: event.coverImageAlt || "", className: "mb-8 w-full" }) : null,
        interestCheck ? /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx(EventInterestForm, { eventSlug: event.slug, options: event.interestOptions || [], closesAt: event.interestClosesAt }) }) : null,
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-forest", children: "About this event" }),
          event.body ? /* @__PURE__ */ jsx("div", { className: "prose mt-4 max-w-none text-forest/75", dangerouslySetInnerHTML: {
            __html: safeRichText(event.body)
          } }) : /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/70", children: event.description })
        ] }),
        event.accessibilityInfo ? /* @__PURE__ */ jsxs("section", { className: "mt-10 border-t border-forest/20 pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Accessibility" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-line text-forest/70", children: event.accessibilityInfo })
        ] }) : null,
        /* @__PURE__ */ jsxs("section", { className: "mt-10 border-t border-forest/20 pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Contact and help" }),
          event.contactInfo ? /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-line text-forest/70", children: event.contactInfo }) : null,
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "mt-3 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral", children: "Contact BrightFutures" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/events", className: "mt-10 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral", children: "← Back to What’s On" })
      ] })
    ] }) })
  ] });
}
export {
  EventPage as component
};
