import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { b as artWallTypes, a as artWallPrompt } from "./art-wall-CKEXSHke.js";
import { r as submitArtWall } from "./router-BzWi0J5v.js";
import { P as PageHero } from "./PageHero-CeWEWULs.js";
import "lucide-react";
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
const initial = { submissionType: "drawing", title: "", displayPreference: "first-name", displayName: "", contactEmail: "", description: "", textContent: "", altText: "", themeSlug: "", contentNote: "", consentGiven: false, guidelinesAccepted: false, website: "" };
const visual = (type) => !["poetry", "writing"].includes(type);
function SubmissionForm() {
  const send = useServerFn(submitArtWall);
  const [fields, setFields] = useState(initial);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const result = useRef(null);
  const change = (event) => {
    const el = event.currentTarget;
    setFields((old) => ({ ...old, [el.name]: el instanceof HTMLInputElement && el.type === "checkbox" ? el.checked : el.value }));
    setStatus("idle");
  };
  async function submit(event) {
    event.preventDefault();
    setError("");
    if (file && (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024)) {
      setStatus("error");
      setError(file.size > 10 * 1024 * 1024 ? "That image is too large. Please choose an image smaller than 10 MB." : "That file type is not supported. Please use a JPG, PNG or WEBP image.");
      return;
    }
    setStatus("sending");
    try {
      const image = file ? await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }) : "";
      await send({ data: { ...fields, image, imageName: file?.name || "", imageType: file?.type || "" } });
      setStatus("sent");
      result.current?.focus();
    } catch (reason) {
      setStatus("error");
      setError(reason instanceof Error && reason.message ? reason.message : "We couldn't send your work. Your entries are still here, so please try again.");
    }
  }
  if (status === "sent") return /* @__PURE__ */ jsxs("div", { ref: result, tabIndex: -1, role: "status", className: "border-l-4 border-green bg-green/15 p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-forest", children: "It’s on its way to the wall." }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl leading-relaxed text-forest/75", children: "Thanks for sharing something with us. The BrightFutures team will review your submission before it appears publicly. You don’t need to submit it again." }),
    /* @__PURE__ */ jsx(Link, { to: "/art-wall", className: "mt-6 inline-flex bg-forest px-5 py-3 font-bold text-cream", children: "Back to the Art Wall" })
  ] });
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-7", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden", children: /* @__PURE__ */ jsxs("label", { children: [
      "Website",
      /* @__PURE__ */ jsx("input", { name: "website", value: fields.website, onChange: change, tabIndex: -1, autoComplete: "off" })
    ] }) }),
    /* @__PURE__ */ jsxs("label", { className: "field", children: [
      "What are you sharing?",
      /* @__PURE__ */ jsx("select", { name: "submissionType", value: fields.submissionType, onChange: change, children: artWallTypes.map((type) => /* @__PURE__ */ jsx("option", { value: type.value, children: type.label }, type.value)) })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "field", children: [
      "Title",
      /* @__PURE__ */ jsx("input", { required: true, name: "title", value: fields.title, onChange: change, maxLength: 160 })
    ] }),
    /* @__PURE__ */ jsxs("fieldset", { children: [
      /* @__PURE__ */ jsx("legend", { className: "text-sm font-bold text-forest", children: "How should the wall credit you?" }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2 sm:grid-cols-3", children: [["first-name", "My first name"], ["chosen-name", "A chosen display name"], ["anonymous", "Anonymous"]].map(([value, label]) => /* @__PURE__ */ jsxs("label", { className: "flex min-h-12 items-center gap-2 border border-forest/20 bg-paper px-3 text-sm", children: [
        /* @__PURE__ */ jsx("input", { type: "radio", name: "displayPreference", value, checked: fields.displayPreference === value, onChange: change }),
        label
      ] }, value)) })
    ] }),
    fields.displayPreference !== "anonymous" ? /* @__PURE__ */ jsxs("label", { className: "field", children: [
      fields.displayPreference === "first-name" ? "Your first name" : "Display name",
      /* @__PURE__ */ jsx("input", { name: "displayName", required: fields.displayPreference === "chosen-name", value: fields.displayName, onChange: change, maxLength: 120 })
    ] }) : null,
    /* @__PURE__ */ jsxs("label", { className: "field", children: [
      "Contact email",
      /* @__PURE__ */ jsx("input", { required: true, type: "email", name: "contactEmail", value: fields.contactEmail, onChange: change, maxLength: 254 }),
      /* @__PURE__ */ jsx("span", { children: "Your email is only used by the BrightFutures team if we need to contact you about this submission. It will never appear publicly." })
    ] }),
    visual(fields.submissionType) ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("label", { className: "field", children: [
        "Image of your work",
        /* @__PURE__ */ jsx("input", { required: true, type: "file", accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp", onChange: (event) => setFile(event.target.files?.[0] || null) }),
        /* @__PURE__ */ jsx("span", { children: "JPG, PNG or WEBP, up to 10 MB." })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "field", children: [
        "Describe this image for someone who can’t see it",
        /* @__PURE__ */ jsx("input", { name: "altText", value: fields.altText, onChange: change, maxLength: 700 }),
        /* @__PURE__ */ jsx("span", { children: "Optional, but it helps make the wall more welcoming." })
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("label", { className: "field", children: [
        "Your ",
        fields.submissionType === "poetry" ? "poem" : "writing",
        /* @__PURE__ */ jsx("textarea", { required: true, name: "textContent", rows: 12, value: fields.textContent, onChange: change, maxLength: 12e3 }),
        /* @__PURE__ */ jsx("span", { children: "Line breaks and stanza spacing will be kept." })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "field", children: [
        "Optional accompanying image",
        /* @__PURE__ */ jsx("input", { type: "file", accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp", onChange: (event) => setFile(event.target.files?.[0] || null) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "field", children: [
      "Anything you’d like people to know about this piece?",
      /* @__PURE__ */ jsx("textarea", { name: "description", rows: 4, value: fields.description, onChange: change, maxLength: 2e3 })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "field", children: [
      "Theme",
      /* @__PURE__ */ jsxs("select", { name: "themeSlug", value: fields.themeSlug, onChange: change, children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "No theme / something else" }),
        /* @__PURE__ */ jsxs("option", { value: artWallPrompt.slug, children: [
          "Current theme: ",
          artWallPrompt.title
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "field", children: [
      "Would you like to add a content note?",
      /* @__PURE__ */ jsx("input", { name: "contentNote", value: fields.contentNote, onChange: change, maxLength: 280, placeholder: "For example, grief or mental health" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex gap-3 text-sm leading-relaxed text-forest", children: [
      /* @__PURE__ */ jsx("input", { required: true, type: "checkbox", name: "consentGiven", checked: fields.consentGiven, onChange: change }),
      /* @__PURE__ */ jsx("span", { children: "I confirm that this is my work, or that I have permission to share it, and I give BrightFutures permission to display it on the Art Wall. Your work stays yours, and you can ask us to remove it at any time." })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex gap-3 text-sm leading-relaxed text-forest", children: [
      /* @__PURE__ */ jsx("input", { required: true, type: "checkbox", name: "guidelinesAccepted", checked: fields.guidelinesAccepted, onChange: change }),
      /* @__PURE__ */ jsx("span", { children: "I have read the Art Wall submission guidelines." })
    ] }),
    /* @__PURE__ */ jsx("button", { disabled: status === "sending", className: "min-h-12 bg-coral px-6 font-bold text-cream disabled:opacity-60", children: status === "sending" ? "Sending…" : "Share your work" }),
    status === "error" ? /* @__PURE__ */ jsx("p", { ref: result, tabIndex: -1, role: "alert", className: "text-sm font-semibold text-coral", children: error }) : null
  ] });
}
function SubmitPage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { quiet: true, eyebrow: "The BrightFutures Art Wall", title: "Add something to the wall", body: "Share artwork, poetry, photography or something creative you’ve made." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-12 sm:px-8 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx(Link, { to: "/art-wall", className: "text-sm font-bold text-forest underline decoration-coral underline-offset-4", children: "Back to the Art Wall" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "border-l-4 border-green bg-green/10 px-5 py-4 font-semibold text-forest", children: "Your work won’t appear publicly until it has been reviewed." }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 border-t-2 border-forest pt-8", children: /* @__PURE__ */ jsx(SubmissionForm, {}) })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "space-y-6 lg:sticky lg:top-28", children: [
          /* @__PURE__ */ jsxs("div", { className: "border border-forest/15 bg-cream-dim p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-forest", children: "Before you submit" }),
            /* @__PURE__ */ jsxs("ul", { className: "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-forest/70", children: [
              /* @__PURE__ */ jsx("li", { children: "Every submission is reviewed before it appears on the wall." }),
              /* @__PURE__ */ jsx("li", { children: "You keep ownership and copyright. BrightFutures only receives permission to display your work." }),
              /* @__PURE__ */ jsx("li", { children: "Do not include someone else’s personal information or identifiable image without permission." }),
              /* @__PURE__ */ jsx("li", { children: "We may add a content note where it helps people choose how to engage with a piece." }),
              /* @__PURE__ */ jsx("li", { children: "You can ask us to remove your work at any time." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "border-l-2 border-coral pl-4 text-sm leading-relaxed text-forest/70", children: [
            "If you need urgent support rather than somewhere to share creative work, please use our ",
            /* @__PURE__ */ jsx(Link, { to: "/resources", className: "font-bold underline", children: "support and resources page" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm leading-relaxed text-forest/60", children: [
            "Want your work removed? ",
            /* @__PURE__ */ jsx(Link, { to: "/contact", className: "font-bold underline", children: "Contact BrightFutures" }),
            " and tell us the title of the piece."
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SubmitPage as component
};
