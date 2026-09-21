import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { CheckCircle2 } from "lucide-react";
import { P as PageHero } from "./PageHero-CeWEWULs.js";
import { c as submitCommunityCheckin } from "./router-BzWi0J5v.js";
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
const empty = {
  highlight: "",
  proud_of: "",
  goal_or_challenge: "",
  brightfutures_idea: "",
  issue_to_raise: "",
  name: "",
  email: "",
  share_publicly: false,
  public_name_preference: "",
  public_excerpt: "",
  website_consent: false,
  social_media_consent: false,
  website: ""
};
const responseKeys = ["highlight", "proud_of", "goal_or_challenge", "brightfutures_idea", "issue_to_raise"];
function CheckInPage() {
  const send = useServerFn(submitCommunityCheckin);
  const [fields, setFields] = useState(empty);
  const [status, setStatus] = useState("idle");
  const [validation, setValidation] = useState("");
  const feedbackRef = useRef(null);
  useEffect(() => {
    if (status === "sent" || status === "error" || validation) feedbackRef.current?.focus();
  }, [status, validation]);
  const change = (event) => {
    const target = event.target;
    setFields((current) => ({
      ...current,
      [target.name]: target.type === "checkbox" ? target.checked : target.value
    }));
    setValidation("");
    if (status === "error") setStatus("idle");
  };
  const setSharing = (share) => {
    setFields((current) => ({
      ...current,
      share_publicly: share,
      public_name_preference: share ? current.public_name_preference : "",
      public_excerpt: share ? current.public_excerpt : "",
      website_consent: share ? current.website_consent : false,
      social_media_consent: share ? current.social_media_consent : false
    }));
    setValidation("");
  };
  const validate = () => {
    if (!responseKeys.some((key) => fields[key].trim().length >= 3)) return "Add something to at least one box before sending your check-in.";
    if (fields.share_publicly && !fields.public_excerpt.trim()) return "Add the words you’re happy for us to share.";
    if (fields.share_publicly && !fields.public_name_preference) return "Choose how you’d like us to credit you.";
    if (fields.share_publicly && fields.public_name_preference === "first_name" && !fields.name.trim()) return "Add your first name, or choose Anonymous.";
    if (fields.share_publicly && fields.public_name_preference === "full_name" && fields.name.trim().split(/\s+/).length < 2) return "Add your full name, or choose a different display preference.";
    if (fields.share_publicly && !fields.website_consent && !fields.social_media_consent) return "Choose at least one place where we may share your words.";
    return "";
  };
  const submit = async (event) => {
    event.preventDefault();
    const problem = validate();
    if (problem) {
      setValidation(problem);
      return;
    }
    setStatus("sending");
    try {
      await send({
        data: fields
      });
      setFields(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { title: "Your term, your wins.", body: "University isn’t only about grades. Tell us what’s gone well, what you’re working towards or what you’d like BrightFutures to do next." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-5 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 grid gap-3 border-l-4 border-green bg-paper px-6 py-5 leading-relaxed text-forest/75", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-forest", children: "Answer one question, a few, or all of them. It’s completely up to you." }),
        /* @__PURE__ */ jsx("p", { children: "Things don’t have to be going perfectly to check in, and you don’t need to explain your care or estrangement circumstances." })
      ] }),
      status === "sent" ? /* @__PURE__ */ jsxs("div", { ref: feedbackRef, tabIndex: -1, role: "status", className: "rounded-3xl bg-paper p-7 sm:p-10", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 36, className: "text-green", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-3xl text-forest", children: "Thanks, your check-in has been received." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/70", children: "Private responses stay private. If you offered an excerpt for public sharing, the committee will still review it first. Consent does not guarantee that it will be published." }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStatus("idle"), className: "mt-7 min-h-11 rounded-full border border-forest/25 px-6 py-3 font-semibold text-forest hover:border-coral", children: "Send another check-in" })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: submit, noValidate: true, className: "rr-block grid gap-12", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("label", { children: [
          "Website",
          /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1, autoComplete: "off" })
        ] }) }),
        /* @__PURE__ */ jsxs(FormSection, { title: "Your check-in", children: [
          /* @__PURE__ */ jsx(Prompt, { title: "Something worth celebrating", children: /* @__PURE__ */ jsx(TextArea, { name: "highlight", label: "What’s been a highlight for you recently?", value: fields.highlight, onChange: change, placeholder: "e.g. passed something, made a friend, joined a society, got through a difficult week…" }) }),
          /* @__PURE__ */ jsx(Prompt, { title: "Something you’re proud of", children: /* @__PURE__ */ jsx(TextArea, { name: "proud_of", label: "Big or small, what have you done that you’re pleased about?", value: fields.proud_of, onChange: change }) }),
          /* @__PURE__ */ jsx(Prompt, { title: "Looking ahead", children: /* @__PURE__ */ jsx(TextArea, { name: "goal_or_challenge", label: "Anything you’d like to achieve, try or work through next term?", value: fields.goal_or_challenge, onChange: change }) })
        ] }),
        /* @__PURE__ */ jsxs(FormSection, { title: "Help shape BrightFutures", children: [
          /* @__PURE__ */ jsx(Prompt, { title: "What would you like BrightFutures to do more of?", children: /* @__PURE__ */ jsx(TextArea, { name: "brightfutures_idea", label: "This can cover events, opportunities, resources, peer activities or anything else.", value: fields.brightfutures_idea, onChange: change, placeholder: "e.g. more socials, careers support, peer meet-ups, practical advice…" }) }),
          /* @__PURE__ */ jsx(Prompt, { title: "Anything we should raise or work on?", children: /* @__PURE__ */ jsx(TextArea, { name: "issue_to_raise", label: "Tell us about anything affecting care-experienced or estranged students that we could help address.", value: fields.issue_to_raise, onChange: change }) })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-5 border-t border-forest/15 pt-10", children: [
          /* @__PURE__ */ jsxs("legend", { className: "font-display text-3xl text-forest", children: [
            "About you ",
            /* @__PURE__ */ jsx("span", { className: "font-body text-sm font-normal text-forest/55", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-forest/65", children: "Leave these blank if you’d rather check in anonymously. Add your name if you want us to know who sent it, and your email if you’d like us to be able to reply. You do not need a university email address." }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Input, { name: "name", label: "Name", value: fields.name, onChange: change, autoComplete: "name", maxLength: 120 }),
            /* @__PURE__ */ jsx(Input, { name: "email", label: "Email address", value: fields.email, onChange: change, autoComplete: "email", type: "email", maxLength: 254 })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "rounded-3xl border border-coral/30 bg-paper p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx("legend", { className: "px-2 font-display text-3xl text-forest", children: "Can we celebrate one of your wins?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-forest/65", children: "If you’d like, you can let us consider sharing a small part of your check-in. Everything else stays private." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-3", children: [
            /* @__PURE__ */ jsx(Radio, { checked: !fields.share_publicly, onChange: () => setSharing(false), label: "No thanks — keep my check-in private" }),
            /* @__PURE__ */ jsx(Radio, { checked: fields.share_publicly, onChange: () => setSharing(true), label: "Yes — I’d like to share a highlight" })
          ] }),
          fields.share_publicly ? /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 rounded-2xl border border-forest/10 bg-cream/60 p-5 sm:p-6", children: [
            /* @__PURE__ */ jsx(TextArea, { name: "public_excerpt", label: "Words you’re happy for us to share", value: fields.public_excerpt, onChange: change, required: true, help: "Write or paste only the words you’d be comfortable with BrightFutures potentially sharing publicly. We won’t substitute anything else from your private check-in.", maxLength: 1500 }),
            /* @__PURE__ */ jsxs("fieldset", { children: [
              /* @__PURE__ */ jsx("legend", { className: "text-sm font-bold text-forest", children: "How should we credit you?" }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-3 sm:grid-cols-3", children: [["anonymous", "Anonymous"], ["first_name", "First name"], ["full_name", "Full name"]].map(([value, label]) => /* @__PURE__ */ jsx(Radio, { checked: fields.public_name_preference === value, onChange: () => {
                setFields((current) => ({
                  ...current,
                  public_name_preference: value
                }));
                setValidation("");
              }, label, name: "public_name_preference" }, value)) })
            ] }),
            /* @__PURE__ */ jsxs("fieldset", { children: [
              /* @__PURE__ */ jsx("legend", { className: "text-sm font-bold text-forest", children: "Where may we share it?" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-4", children: [
                /* @__PURE__ */ jsx(Checkbox, { name: "website_consent", checked: fields.website_consent, onChange: change, label: "BrightFutures website" }),
                /* @__PURE__ */ jsx(Checkbox, { name: "social_media_consent", checked: fields.social_media_consent, onChange: change, label: "BrightFutures social media" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-forest/55", children: "Choose either or both. Nothing is published automatically; BrightFutures reviews anything before it is shared." })
            ] })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "rounded-2xl border border-forest/10 bg-paper/60 px-5 py-4 text-sm leading-relaxed text-forest/60", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-forest/75", children: "Need urgent support?" }),
          " BrightFutures Check-In is not an emergency, crisis-reporting, counselling or safeguarding service. If you or someone else is in immediate danger, contact emergency services or an existing university support service directly."
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
          validation ? /* @__PURE__ */ jsx("p", { ref: feedbackRef, tabIndex: -1, role: "alert", className: "rounded-xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm font-semibold text-coral", children: validation }) : null,
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: status === "sending", className: "min-h-12 w-fit rounded-full bg-coral px-8 py-3 font-semibold text-cream transition-colors hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral disabled:opacity-60", children: status === "sending" ? "Sending…" : "Send my check-in" }),
          status === "error" ? /* @__PURE__ */ jsx("p", { ref: feedbackRef, tabIndex: -1, role: "alert", className: "text-sm font-semibold text-coral", children: "We couldn’t save your check-in just now. Your answers are still here, so please try again safely." }) : null
        ] })
      ] })
    ] }) })
  ] });
}
function FormSection({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-7 border-t border-forest/15 pt-10", children: [
    /* @__PURE__ */ jsx("legend", { className: "font-display text-3xl text-forest", children: title }),
    children
  ] });
}
function Prompt({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-forest", children: title }),
      /* @__PURE__ */ jsx(OptionalLabel, {})
    ] }),
    children
  ] });
}
function OptionalLabel() {
  return /* @__PURE__ */ jsx("span", { className: "rounded-full bg-green/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-forest/65", children: "Optional" });
}
function TextArea({
  name,
  label,
  value,
  onChange,
  help,
  placeholder,
  required = false,
  maxLength = 4e3
}) {
  const helpId = help ? `${name}-help` : void 0;
  return /* @__PURE__ */ jsxs("label", { className: "grid gap-2 text-sm font-medium leading-relaxed text-forest/70", children: [
    /* @__PURE__ */ jsxs("span", { children: [
      label,
      required ? /* @__PURE__ */ jsx("span", { className: "text-coral", children: " *" }) : null
    ] }),
    /* @__PURE__ */ jsx("textarea", { name, rows: 6, maxLength, value, onChange, placeholder, "aria-describedby": helpId, className: "min-h-40 resize-y rounded-2xl border border-forest/20 bg-paper px-5 py-4 text-base font-normal leading-relaxed text-forest outline-none placeholder:text-forest/40 focus:border-coral focus-visible:ring-2 focus-visible:ring-coral/25" }),
    help ? /* @__PURE__ */ jsx("span", { id: helpId, className: "font-normal leading-relaxed text-forest/55", children: help }) : null
  ] });
}
function Input({
  name,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  maxLength
}) {
  return /* @__PURE__ */ jsxs("label", { className: "grid gap-2 text-sm font-bold text-forest", children: [
    label,
    /* @__PURE__ */ jsx("input", { name, type, autoComplete, maxLength, value, onChange, className: "min-h-12 rounded-xl border border-forest/20 bg-cream px-4 py-3 font-normal outline-none focus:border-coral focus-visible:ring-2 focus-visible:ring-coral/25" })
  ] });
}
function Radio({
  checked,
  onChange,
  label,
  name = "share_publicly"
}) {
  return /* @__PURE__ */ jsxs("label", { className: "flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-forest/15 px-4 py-3 text-sm font-semibold leading-relaxed text-forest has-[:checked]:border-coral has-[:checked]:bg-coral/5", children: [
    /* @__PURE__ */ jsx("input", { type: "radio", name, checked, onChange, className: "mt-1 h-4 w-4 accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral" }),
    label
  ] });
}
function Checkbox({
  name,
  checked,
  onChange,
  label
}) {
  return /* @__PURE__ */ jsxs("label", { className: "flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-forest", children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", name, checked, onChange, className: "mt-1 h-4 w-4 shrink-0 accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral" }),
    label
  ] });
}
export {
  CheckInPage as component
};
