import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { ArrowDown, ShoppingBag, Coffee, Scissors, Dumbbell, BadgeCheck, Utensils, Check, CheckCircle2 } from "lucide-react";
import { l as submitPerksEnquiry } from "./router-tuXOV3p3.js";
import "@tanstack/react-router";
import "./settings-B6I0cOUr.js";
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
const steps = [["You choose an offer", "Choose a discount, free extra or other benefit that works for your business. You stay in control of the terms."], ["We promote it", "We list your offer through BrightFutures and help our members discover businesses that support their community."], ["Students support local", "Members use the offer, discover your business and are encouraged to spend with businesses that support BrightFutures."]];
const offers = [[ShoppingBag, "10% off purchases"], [Coffee, "Free hot drink with a qualifying meal"], [Scissors, "£3 off a haircut"], [Dumbbell, "Free introductory fitness session"], [BadgeCheck, "Weekday or off-peak discount"], [Utensils, "Free side with a main purchase"]];
const benefits = ["Dedicated BrightFutures partner listing", "Promotion of your offer", "BrightFutures Perks Partner recognition", "Opportunities to be featured through BrightFutures communications", "Visibility among University of Greenwich students", "Association with a student-led social-impact programme", "No participation fee"];
const faqs = [["Is there a fee to join?", "No. There is currently no participation fee for BrightFutures Perks partners."], ["How much discount do we need to offer?", "There is no minimum. You choose an offer that works for your business."], ["Can the offer have restrictions?", "Yes. You can set reasonable terms such as specific days, times, products or minimum spend."], ["Can we change or withdraw an offer?", "Yes. Just let BrightFutures know so we can keep the listing accurate."], ["Who can use BrightFutures Perks?", "BrightFutures Perks is being developed for care-experienced and estranged University of Greenwich students who participate in BrightFutures. We’ll publish the access process before offers go live."], ["How will our business be promoted?", "Partners can be listed on BrightFutures.social and may also be featured through BrightFutures social media, communications and activities where appropriate."]];
function PerksPage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-coral/20", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex border border-coral-light/50 bg-coral/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-coral-light", children: "Founding Partners · 2026/27" }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-8 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl", children: [
          "BrightFutures ",
          /* @__PURE__ */ jsx("span", { className: "text-coral-light", children: "Perks" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl font-display text-2xl leading-snug sm:text-3xl", children: "Local businesses supporting students. Students supporting local businesses." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-lg leading-relaxed text-cream/75", children: "We’re inviting Greenwich-area businesses to provide useful offers for care-experienced and estranged students at the University of Greenwich and be recognised as part of a student-led local community." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsx("a", { href: "#join", className: "inline-flex min-h-12 items-center justify-center bg-coral px-7 py-3 font-semibold text-cream hover:bg-coral-light hover:text-forest", children: "Become a Founding Partner" }),
          /* @__PURE__ */ jsxs("a", { href: "#how-it-works", className: "inline-flex min-h-12 items-center justify-center gap-2 border border-cream/35 px-7 py-3 font-semibold text-cream hover:border-cream", children: [
            "How it works ",
            /* @__PURE__ */ jsx(ArrowDown, { size: 17, "aria-hidden": "true" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[.16em] text-coral", children: "Why Perks exists" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-4xl text-forest sm:text-5xl", children: "A stronger local safety net." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-lg leading-relaxed text-forest/70", children: [
        /* @__PURE__ */ jsx("p", { children: "University can be expensive for everyone, but care-experienced and estranged students may be doing it without the same family or financial safety net that others can fall back on." }),
        /* @__PURE__ */ jsx("p", { children: "BrightFutures Perks connects our community with local businesses that want to make everyday student life a little easier, while helping students discover and support businesses around Greenwich." }),
        /* @__PURE__ */ jsx("p", { children: "It is not about charity. It is about building a stronger local community around students who may need it most." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "scroll-mt-24 bg-cream-dim px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest sm:text-5xl", children: "How it works" }),
      /* @__PURE__ */ jsx("ol", { className: "mt-12 grid border-t border-forest/25 lg:grid-cols-3", children: steps.map(([title, body], i) => /* @__PURE__ */ jsxs("li", { className: `border-b border-forest/20 py-8 lg:px-8 ${i > 0 ? "lg:border-l" : "lg:pl-0"}`, children: [
        /* @__PURE__ */ jsxs("span", { className: "font-display text-4xl text-coral", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-8 font-display text-2xl text-forest", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/65", children: body })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[.16em] text-coral", children: "You choose the offer" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-4xl text-forest", children: "An offer that works for you." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 leading-relaxed text-forest/65", children: "There is no minimum discount. Pick an offer that makes sense for your business." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: offers.map(([Icon, label]) => /* @__PURE__ */ jsxs("div", { className: "flex min-h-32 items-center gap-5 border border-forest/15 bg-paper p-6", children: [
        /* @__PURE__ */ jsx("span", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green/15 text-forest", children: /* @__PURE__ */ jsx(Icon, { size: 22, "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold leading-snug text-forest", children: label })
      ] }, label)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[.16em] text-coral-light", children: "What you get as a partner" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-4xl sm:text-5xl", children: "Recognition with a purpose." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-9 border-l-4 border-coral bg-cream/5 p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-2xl", children: "No participation fee." }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg text-cream/75", children: "You choose the offer." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "grid content-start gap-4", children: benefits.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 border-b border-cream/15 pb-4 text-cream/80", children: [
        /* @__PURE__ */ jsx(Check, { className: "mt-0.5 shrink-0 text-green-light", size: 20, "aria-hidden": "true" }),
        item
      ] }, item)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-coral px-6 py-20 text-forest sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[.16em]", children: "Founding Partners · 2026/27" }),
      /* @__PURE__ */ jsx("h2", { className: "mx-auto mt-5 max-w-4xl font-display text-4xl sm:text-5xl", children: "Founding BrightFutures Perks Partners · 2026/27" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-forest/80", children: [
        /* @__PURE__ */ jsx("p", { children: "We’re inviting an initial group of Greenwich-area businesses and organisations to help launch BrightFutures Perks." }),
        /* @__PURE__ */ jsx("p", { children: "Founding partners will help shape the programme from the beginning and will be recognised as part of the original 2026/27 cohort." })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "#join", className: "mt-8 inline-flex min-h-12 items-center bg-forest px-7 py-3 font-semibold text-cream", children: "Become a Founding Partner" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest", children: "Questions businesses ask" }),
      /* @__PURE__ */ jsx("div", { className: "mt-9 border-t border-forest/20", children: faqs.map(([question, answer]) => /* @__PURE__ */ jsxs("details", { className: "group border-b border-forest/20", children: [
        /* @__PURE__ */ jsxs("summary", { className: "flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold text-forest marker:content-none", children: [
          question,
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-normal text-coral transition-transform group-open:rotate-45", "aria-hidden": "true", children: "+" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-3xl pb-6 pr-10 leading-relaxed text-forest/65", children: answer })
      ] }, question)) })
    ] }) }),
    /* @__PURE__ */ jsx(JoinSection, {})
  ] });
}
const initial = {
  business: "",
  name: "",
  email: "",
  link: "",
  offer: "",
  restrictions: "",
  message: "",
  website: ""
};
function JoinSection() {
  const send = useServerFn(submitPerksEnquiry);
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState("idle");
  const feedback = useRef(null);
  useEffect(() => {
    if (status === "sent" || status === "error") feedback.current?.focus();
  }, [status]);
  const change = (e) => {
    setFields((v) => ({
      ...v,
      [e.target.name]: e.target.value
    }));
    if (status === "error") setStatus("idle");
  };
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await send({
        data: fields
      });
      setFields(initial);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  const control = "rounded-xl border border-forest/20 bg-paper px-4 py-3 font-normal outline-none focus:border-coral";
  return /* @__PURE__ */ jsx("section", { id: "join", className: "scroll-mt-24 bg-cream-dim px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[.16em] text-coral", children: "Become a partner" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-4xl text-forest sm:text-5xl", children: "Become a Founding Partner" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md text-lg leading-relaxed text-forest/70", children: "You provide an offer that works for your business. We make sure our community knows that you support them." }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-md leading-relaxed text-forest/65", children: "You do not need to have every detail finalised yet. Send us your idea and we can work out the rest together." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: status === "sent" ? /* @__PURE__ */ jsxs("div", { ref: feedback, tabIndex: -1, role: "status", className: "bg-paper p-8", children: [
      /* @__PURE__ */ jsx(CheckCircle2, { className: "text-green", size: 34, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-3xl text-forest", children: "Enquiry sent" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-forest/70", children: "Thank you. The student committee will be in touch to discuss the next steps." })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid gap-5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-forest/60", children: "Tell us a little about your business and the offer you have in mind." }),
      /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("label", { children: [
        "Website",
        /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1, autoComplete: "off" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(Field, { label: "Business/organisation name", name: "business", value: fields.business, onChange: change, required: true }),
        /* @__PURE__ */ jsx(Field, { label: "Contact name", name: "name", value: fields.name, onChange: change, autoComplete: "name", required: true })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: "Email", name: "email", type: "email", value: fields.email, onChange: change, autoComplete: "email", required: true }),
      /* @__PURE__ */ jsx(Field, { label: "Website or social link", name: "link", type: "url", value: fields.link, onChange: change }),
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-sm font-semibold text-forest", children: [
        "Proposed offer",
        /* @__PURE__ */ jsx("textarea", { name: "offer", rows: 3, maxLength: 1500, value: fields.offer, onChange: change, className: control })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-sm font-semibold text-forest", children: [
        "Any restrictions",
        /* @__PURE__ */ jsx("textarea", { name: "restrictions", rows: 3, maxLength: 1500, value: fields.restrictions, onChange: change, className: control })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-sm font-semibold text-forest", children: [
        "Message",
        /* @__PURE__ */ jsx("textarea", { name: "message", rows: 4, maxLength: 3e3, value: fields.message, onChange: change, className: control })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: status === "sending", className: "min-h-12 w-fit bg-coral px-7 py-3 font-semibold text-cream disabled:opacity-60", children: status === "sending" ? "Sending…" : "Send partnership enquiry" }),
      status === "error" ? /* @__PURE__ */ jsx("p", { ref: feedback, tabIndex: -1, role: "alert", className: "text-sm text-coral", children: "We couldn’t save your enquiry. Your entries are still here, so please try again." }) : null
    ] }) })
  ] }) });
}
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
  required = false
}) {
  return /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-sm font-semibold text-forest", children: [
    label,
    /* @__PURE__ */ jsx("input", { name, type, value, onChange, autoComplete, required, maxLength: name === "link" ? 500 : name === "business" ? 180 : name === "email" ? 254 : 120, className: "rounded-xl border border-forest/20 bg-paper px-4 py-3 font-normal outline-none focus:border-coral" })
  ] });
}
export {
  PerksPage as component
};
