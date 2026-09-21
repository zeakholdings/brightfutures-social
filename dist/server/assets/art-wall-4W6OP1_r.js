import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { u as useServerFn } from "./useServerFn-DL2oePlL.js";
import { l as getAdminArtWall, m as moderateArtWall } from "./router-BzWi0J5v.js";
import "@tanstack/react-router";
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
function AdminArtWall() {
  const load = useServerFn(getAdminArtWall);
  const action = useServerFn(moderateArtWall);
  const [token, setToken] = useState("");
  const [items, setItems] = useState(null);
  const [tab, setTab] = useState("pending");
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn’t open the moderation queue.");
    }
  }
  async function doAction(id, next) {
    try {
      setBusy(id + next);
      await action({
        data: {
          token,
          id,
          action: next,
          notes: ""
        }
      });
      setItems(await load({
        data: {
          token
        }
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn’t save that moderation action.");
    } finally {
      setBusy("");
    }
  }
  if (!items) return /* @__PURE__ */ jsx("main", { className: "min-h-[70vh] bg-forest px-6 py-20 text-cream", children: /* @__PURE__ */ jsxs("form", { onSubmit: signIn, className: "mx-auto max-w-md border border-cream/30 bg-forest-light p-7", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral-light", children: "PRIVATE AREA" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-4xl", children: "Art Wall moderation" }),
    /* @__PURE__ */ jsxs("label", { className: "mt-6 flex flex-col gap-2 text-sm font-bold", children: [
      "Moderation passcode",
      /* @__PURE__ */ jsx("input", { type: "password", value: token, onChange: (e) => setToken(e.target.value), className: "bg-paper px-3 py-3 text-forest", autoComplete: "current-password", required: true })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "mt-5 bg-coral px-5 py-3 font-bold", children: "Open queue" }),
    error ? /* @__PURE__ */ jsx("p", { role: "alert", className: "mt-4 text-sm text-coral-light", children: error }) : null
  ] }) });
  const visible = items.filter((item) => item.moderationStatus === tab);
  return /* @__PURE__ */ jsx("main", { className: "bg-cream px-5 py-10 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: "PRIVATE MODERATION" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-5xl text-forest", children: "Art Wall queue" }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex gap-2 overflow-x-auto", children: ["pending", "approved", "rejected", "removed"].map((status) => /* @__PURE__ */ jsx("button", { onClick: () => setTab(status), "aria-pressed": tab === status, className: `min-h-11 px-4 text-sm font-bold capitalize ${tab === status ? "bg-forest text-cream" : "border border-forest/20 text-forest"}`, children: status }, status)) }),
    error ? /* @__PURE__ */ jsx("p", { role: "alert", className: "mt-4 text-coral", children: error }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-6", children: [
      visible.map((item) => /* @__PURE__ */ jsxs("article", { className: "grid gap-5 border border-forest/20 bg-paper p-5 md:grid-cols-[12rem_1fr]", children: [
        /* @__PURE__ */ jsx("div", { children: item.imageUrl ? /* @__PURE__ */ jsx("img", { src: item.imageUrl, alt: item.altText || "Submission preview", className: "max-h-64 w-full object-contain" }) : /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap font-display text-sm", children: item.textContent }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-coral", children: item.type }),
          /* @__PURE__ */ jsx("h2", { className: "mt-1 font-display text-3xl text-forest", children: item.title }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-forest/70", children: [
            /* @__PURE__ */ jsx("strong", { children: "Private email:" }),
            " ",
            item.contactEmail
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-forest/70", children: [
            /* @__PURE__ */ jsx("strong", { children: "Alt text:" }),
            " ",
            item.altText || "Missing"
          ] }),
          item.description ? /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-forest/70", children: item.description }) : null,
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [
            tab === "pending" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("button", { disabled: busy === item.id + "approve", onClick: () => doAction(item.id, "approve"), className: "bg-green px-3 py-2 text-sm font-bold text-forest", children: "Approve" }),
              /* @__PURE__ */ jsx("button", { disabled: busy === item.id + "reject", onClick: () => doAction(item.id, "reject"), className: "border border-coral px-3 py-2 text-sm font-bold text-coral", children: "Reject" })
            ] }) : null,
            tab === "approved" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("button", { onClick: () => doAction(item.id, "remove"), className: "border border-coral px-3 py-2 text-sm font-bold text-coral", children: "Remove from wall" }),
              /* @__PURE__ */ jsx("button", { onClick: () => doAction(item.id, item.featured ? "unfeature" : "feature"), className: "border border-forest/30 px-3 py-2 text-sm font-bold text-forest", children: item.featured ? "Unfeature" : "Feature" })
            ] }) : null,
            tab === "removed" ? /* @__PURE__ */ jsx("button", { onClick: () => doAction(item.id, "restore"), className: "bg-green px-3 py-2 text-sm font-bold text-forest", children: "Restore" }) : null,
            /* @__PURE__ */ jsx("button", { onClick: () => doAction(item.id, item.requiresSafeguardingReview ? "unsafeguard" : "safeguard"), className: "border border-forest/30 px-3 py-2 text-sm font-bold text-forest", children: item.requiresSafeguardingReview ? "Clear welfare flag" : "Needs welfare/safeguarding review" })
          ] })
        ] })
      ] }, item.id)),
      !visible.length ? /* @__PURE__ */ jsx("p", { className: "border-l-4 border-green bg-green/10 p-5 text-forest/70", children: "Nothing in this part of the queue." }) : null
    ] })
  ] }) });
}
export {
  AdminArtWall as component
};
