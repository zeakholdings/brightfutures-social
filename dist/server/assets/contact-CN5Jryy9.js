import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { Mail, CheckCircle2 } from "lucide-react";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
import { d as Route, s as submitContact } from "./router-oKxGGzNV.js";
import "@tanstack/react-router";
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
const empty = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: ""
};
function ContactPage() {
  const settings = Route.useLoaderData();
  const send = useServerFn(submitContact);
  const [fields, setFields] = useState(empty);
  const [status, setStatus] = useState("idle");
  const change = (e) => setFields((f) => ({
    ...f,
    [e.target.name]: e.target.value
  }));
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await send({
        data: fields
      });
      setStatus("sent");
      setFields(empty);
    } catch {
      setStatus("error");
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Contact", title: "Talk to the committee.", body: "Use this form to ask a question, share an idea or offer to help. Your message goes to the students running BrightFutures." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Prefer email?" }),
        settings.contact_email ? /* @__PURE__ */ jsxs("a", { href: `mailto:${settings.contact_email}`, className: "mt-3 inline-flex items-center gap-2 font-semibold text-forest hover:text-coral", children: [
          /* @__PURE__ */ jsx(Mail, { size: 18 }),
          settings.contact_email
        ] }) : null,
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-sm leading-relaxed text-forest/65", children: "We aim to reply within a few days during term time. Nothing you send here is shared beyond the committee." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-sm text-sm leading-relaxed text-forest/50", children: "This form is for general enquiries only. We don’t ask about care or estrangement status here. You never need to disclose that to reach us." })
      ] }),
      /* @__PURE__ */ jsx("div", { children: status === "sent" ? /* @__PURE__ */ jsxs("div", { role: "status", className: "flex flex-col items-start gap-3 rounded-2xl bg-cream-dim p-8", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 32, className: "text-green" }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-forest", children: "Message sent" }),
        /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-forest/70", children: "Thanks for getting in touch. Someone from the committee will get back to you soon." })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("label", { children: [
          "Website",
          /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1, autoComplete: "off" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Field, { label: "Name", name: "name", value: fields.name, onChange: change, maxLength: 120 }),
          /* @__PURE__ */ jsx(Field, { label: "University email", name: "email", type: "email", value: fields.email, onChange: change, maxLength: 254 })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Subject", name: "subject", value: fields.subject, onChange: change, maxLength: 180 }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1.5 text-sm font-semibold text-forest", children: [
          "Message",
          /* @__PURE__ */ jsx("textarea", { name: "message", rows: 6, required: true, minLength: 10, maxLength: 5e3, value: fields.message, onChange: change, className: "rounded-xl border border-forest/20 bg-paper px-4 py-3 font-normal outline-none focus:border-coral" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: status === "sending", className: "mt-2 w-fit rounded-full bg-coral px-7 py-3 font-semibold text-cream disabled:opacity-60", children: status === "sending" ? "Sending…" : "Send message" }),
        status === "error" ? /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm text-coral", children: "We couldn’t send your message. Please try again or email us directly." }) : null
      ] }) })
    ] }) })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  maxLength
}) {
  return /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1.5 text-sm font-semibold text-forest", children: [
    label,
    /* @__PURE__ */ jsx("input", { name, type, required: true, maxLength, value, onChange, className: "rounded-xl border border-forest/20 bg-paper px-4 py-3 font-normal outline-none focus:border-coral" })
  ] });
}
export {
  ContactPage as component
};
