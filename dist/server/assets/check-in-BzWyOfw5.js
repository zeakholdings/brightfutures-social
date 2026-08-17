import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { CheckCircle2 } from "lucide-react";
import { P as PageHero } from "./PageHero-C5T1WZVn.js";
import { b as submitCommunityCheckin } from "./router-zUj7zh-c.js";
import "@tanstack/react-router";
import "./settings-DwAPQC0V.js";
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
  public_name_preference: "anonymous",
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
      website_consent: share ? current.website_consent : false,
      social_media_consent: share ? current.social_media_consent : false
    }));
    setValidation("");
  };
  const validate = () => {
    if (!responseKeys.some((key) => fields[key].trim().length >= 3)) return "Add at least one response before sending your check-in.";
    if (fields.share_publicly && !fields.public_excerpt.trim()) return "Write or choose the exact excerpt you are happy for us to consider sharing.";
    if (fields.share_publicly && fields.public_name_preference === "first_name" && !fields.name.trim()) return "Add your first name, or choose Anonymous.";
    if (fields.share_publicly && fields.public_name_preference === "full_name" && fields.name.trim().split(/\s+/).length < 2) return "Add your full name, or choose a different display preference.";
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
    /* @__PURE__ */ jsx(PageHero, { title: "Your term, your wins.", body: "University isn’t only about grades. Tell us what’s gone well, what you’re working towards and what you’d like BrightFutures to do next." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-5 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 grid gap-3 border-l-4 border-green bg-paper px-6 py-5 text-sm leading-relaxed text-forest/70", children: [
        /* @__PURE__ */ jsx("p", { children: "This check-in is optional. Answer as much or as little as feels useful." }),
        /* @__PURE__ */ jsx("p", { children: "You do not need to explain your care or estrangement circumstances." }),
        /* @__PURE__ */ jsx("p", { children: "Private answers are never automatically published. Sharing requires your explicit consent and a separate manual review." }),
        /* @__PURE__ */ jsx("p", { children: "This form is not monitored as an emergency, crisis-reporting or counselling service. If you or someone else is in immediate danger, contact emergency services or an existing university support service directly." })
      ] }),
      status === "sent" ? /* @__PURE__ */ jsxs("div", { ref: feedbackRef, tabIndex: -1, role: "status", className: "rounded-3xl bg-paper p-7 sm:p-10", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 36, className: "text-green", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-3xl text-forest", children: "Thanks, your check-in has been received." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-forest/70", children: "Private responses stay private. If you offered an excerpt for public sharing, the committee will still review it first. Consent does not guarantee that it will be published." }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStatus("idle"), className: "mt-7 min-h-11 rounded-full border border-forest/25 px-6 py-3 font-semibold text-forest hover:border-coral", children: "Send another check-in" })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: submit, noValidate: true, className: "grid gap-12", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("label", { children: [
          "Website",
          /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1, autoComplete: "off" })
        ] }) }),
        /* @__PURE__ */ jsx(FormSection, { title: "Something worth celebrating", children: /* @__PURE__ */ jsx(TextArea, { name: "highlight", label: "What’s been a highlight for you recently?", value: fields.highlight, onChange: change }) }),
        /* @__PURE__ */ jsx(FormSection, { title: "Something you’re proud of", children: /* @__PURE__ */ jsx(TextArea, { name: "proud_of", label: "Big or small, what have you done that you’re pleased about?", value: fields.proud_of, onChange: change }) }),
        /* @__PURE__ */ jsx(FormSection, { title: "Looking ahead", children: /* @__PURE__ */ jsx(TextArea, { name: "goal_or_challenge", label: "Is there something you’d like to achieve, try or work through next term?", value: fields.goal_or_challenge, onChange: change, help: "Share only what feels comfortable. This form is not a specialist support service." }) }),
        /* @__PURE__ */ jsxs(FormSection, { title: "Help shape BrightFutures", children: [
          /* @__PURE__ */ jsx(TextArea, { name: "brightfutures_idea", label: "What would you like BrightFutures to do more of?", value: fields.brightfutures_idea, onChange: change }),
          /* @__PURE__ */ jsx(TextArea, { name: "issue_to_raise", label: "Is there anything affecting care-experienced or estranged students that you think BrightFutures should raise or work on?", value: fields.issue_to_raise, onChange: change })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-5 border-t border-forest/15 pt-10", children: [
          /* @__PURE__ */ jsxs("legend", { className: "font-display text-3xl text-forest", children: [
            "About you ",
            /* @__PURE__ */ jsx("span", { className: "font-body text-sm font-normal text-forest/55", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-forest/65", children: "Add these only if you want attribution or would like us to reply. You do not need a university email address." }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Input, { name: "name", label: "Name", value: fields.name, onChange: change, autoComplete: "name", maxLength: 120 }),
            /* @__PURE__ */ jsx(Input, { name: "email", label: "Email address", value: fields.email, onChange: change, autoComplete: "email", type: "email", maxLength: 254 })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "rounded-3xl border border-coral/30 bg-paper p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx("legend", { className: "px-2 font-display text-3xl text-forest", children: "Can we celebrate this?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-forest/65", children: "Your private answers remain separate. Choosing yes only lets us consider the exact excerpt you approve below." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-3", children: [
            /* @__PURE__ */ jsx(Radio, { checked: !fields.share_publicly, onChange: () => setSharing(false), label: "No: keep my response private" }),
            /* @__PURE__ */ jsx(Radio, { checked: fields.share_publicly, onChange: () => setSharing(true), label: "Yes: BrightFutures may consider sharing the highlight I’ve approved below" })
          ] }),
          fields.share_publicly ? /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 border-t border-forest/15 pt-8", children: [
            /* @__PURE__ */ jsx(TextArea, { name: "public_excerpt", label: "Public excerpt", value: fields.public_excerpt, onChange: change, required: true, help: "Write or paste only the exact words you are happy for us to consider sharing. We will not substitute your full private answers.", maxLength: 1500 }),
            /* @__PURE__ */ jsxs("fieldset", { children: [
              /* @__PURE__ */ jsx("legend", { className: "text-sm font-bold text-forest", children: "Display preference" }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-3 sm:grid-cols-3", children: [["full_name", "Full name"], ["first_name", "First name only"], ["anonymous", "Anonymous"]].map(([value, label]) => /* @__PURE__ */ jsx(Radio, { checked: fields.public_name_preference === value, onChange: () => setFields((current) => ({
                ...current,
                public_name_preference: value
              })), label, name: "public_name_preference" }, value)) })
            ] }),
            /* @__PURE__ */ jsxs("fieldset", { children: [
              /* @__PURE__ */ jsx("legend", { className: "text-sm font-bold text-forest", children: "Consent" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-4", children: [
                /* @__PURE__ */ jsx(Checkbox, { name: "website_consent", checked: fields.website_consent, onChange: change, label: "I agree to this approved excerpt being published on brightfutures.social." }),
                /* @__PURE__ */ jsx(Checkbox, { name: "social_media_consent", checked: fields.social_media_consent, onChange: change, label: "I agree to this approved excerpt being shared on BrightFutures social media." })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-forest/55", children: "Each choice is separate and optional. Social media consent is not required for website publication. Nothing is published automatically." })
            ] })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-forest/60", children: "At least one reflection or idea is required. Everything else is optional unless you choose public sharing." }),
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
function TextArea({
  name,
  label,
  value,
  onChange,
  help,
  required = false,
  maxLength = 4e3
}) {
  const helpId = help ? `${name}-help` : void 0;
  return /* @__PURE__ */ jsxs("label", { className: "grid gap-2 text-sm font-bold text-forest", children: [
    /* @__PURE__ */ jsxs("span", { children: [
      label,
      required ? /* @__PURE__ */ jsx("span", { className: "text-coral", children: " *" }) : null
    ] }),
    /* @__PURE__ */ jsx("textarea", { name, rows: 6, maxLength, value, onChange, "aria-describedby": helpId, className: "min-h-40 resize-y rounded-2xl border border-forest/20 bg-paper px-5 py-4 text-base font-normal leading-relaxed outline-none focus:border-coral focus-visible:ring-2 focus-visible:ring-coral/25" }),
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
  return /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-forest", children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", name, checked, onChange, className: "mt-1 h-4 w-4 shrink-0 accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral" }),
    label
  ] });
}
export {
  CheckInPage as component
};
