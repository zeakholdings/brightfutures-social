import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { s as safeRichText } from "./safe-html-GWu8up0M.js";
import { m as Route } from "./router-zUj7zh-c.js";
import "sanitize-html";
import "react";
import "lucide-react";
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
function Story() {
  const post = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("article", { className: "bg-cream", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-forest px-6 py-16 text-cream sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx("p", { className: "inline-flex bg-coral px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em]", children: post.category?.replace("-", " ") || "Story" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-7 font-display text-[clamp(3.4rem,7vw,6.8rem)] leading-[.95] tracking-[-.04em]", children: post.title }),
      post.excerpt ? /* @__PURE__ */ jsx("p", { className: "mt-7 max-w-3xl border-l-4 border-green pl-5 text-xl leading-relaxed text-cream/75", children: post.excerpt }) : null,
      /* @__PURE__ */ jsxs("p", { className: "mt-7 text-sm text-cream/55", children: [
        new Intl.DateTimeFormat("en-GB", {
          dateStyle: "long"
        }).format(new Date(post.published_at)),
        post.author_name ? ` · ${post.author_name}` : ""
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:py-20", children: [
      post.featured_image ? /* @__PURE__ */ jsx("img", { src: post.featured_image, alt: post.featured_image_alt || "", className: "mb-12 w-full border-2 border-forest shadow-[9px_9px_0_#e8734a]" }) : null,
      post.body ? /* @__PURE__ */ jsx("div", { className: "prose mx-auto max-w-3xl text-lg text-forest/75", dangerouslySetInnerHTML: {
        __html: safeRichText(post.body)
      } }) : null,
      /* @__PURE__ */ jsx(Link, { to: "/stories", className: "mt-12 inline-flex border-b-2 border-forest pb-1 font-bold text-forest hover:text-coral", children: "← Back to News & Stories" })
    ] })
  ] });
}
export {
  Story as component
};
