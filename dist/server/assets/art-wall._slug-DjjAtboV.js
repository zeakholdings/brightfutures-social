import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { q as Route } from "./router-BzWi0J5v.js";
import "react";
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
function WorkPage() {
  const work = Route.useLoaderData();
  return /* @__PURE__ */ jsx("article", { className: "bg-cream px-6 py-12 sm:px-8 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsx(Link, { to: "/art-wall", className: "text-sm font-bold text-forest underline", children: "Back to the Art Wall" }),
    work.contentNote ? /* @__PURE__ */ jsxs("p", { className: "mt-8 w-fit border border-coral/50 bg-coral-light/20 px-4 py-2 text-sm text-forest", children: [
      /* @__PURE__ */ jsx("strong", { children: "Content note:" }),
      " ",
      work.contentNote
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(17rem,.6fr)]", children: [
      " ",
      /* @__PURE__ */ jsx("div", { children: work.imageUrl ? /* @__PURE__ */ jsx("img", { src: work.imageUrl, alt: work.altText || "", className: "max-h-[75vh] w-full bg-paper object-contain" }) : /* @__PURE__ */ jsx("div", { className: "bg-paper p-7 sm:p-12", children: /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap font-display text-2xl leading-[1.7] text-forest sm:text-3xl", children: work.textContent }) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold tracking-[.16em] text-coral", children: work.type }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-5xl leading-none text-forest", children: work.title }),
        /* @__PURE__ */ jsxs("p", { className: "mt-5 text-forest/65", children: [
          "Shared by ",
          work.isAnonymous ? "Anonymous" : work.displayName
        ] }),
        work.description ? /* @__PURE__ */ jsx("p", { className: "mt-7 leading-relaxed text-forest/75", children: work.description }) : null,
        work.theme ? /* @__PURE__ */ jsxs("p", { className: "mt-7 text-sm font-bold text-forest", children: [
          "Theme: ",
          work.theme
        ] }) : null
      ] })
    ] })
  ] }) });
}
export {
  WorkPage as component
};
