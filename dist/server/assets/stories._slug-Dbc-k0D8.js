import { jsxs, jsx } from "react/jsx-runtime";
import { s as safeRichText } from "./safe-html-GWu8up0M.js";
import { h as Route } from "./router-oKxGGzNV.js";
import "sanitize-html";
import "@tanstack/react-router";
import "react";
import "lucide-react";
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
function Story() {
  const post = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("article", { className: "bg-cream px-6 py-16 sm:px-8 lg:py-24", children: [
    /* @__PURE__ */ jsxs("header", { className: "mx-auto max-w-4xl border-b border-forest/20 pb-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[.16em] text-coral", children: post.category?.replace("-", " ") || "Story" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-5 font-display text-5xl leading-tight text-forest sm:text-6xl", children: post.title }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-forest/55", children: [
        new Intl.DateTimeFormat("en-GB", {
          dateStyle: "long"
        }).format(new Date(post.published_at)),
        post.author_name ? ` · ${post.author_name}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl pt-10", children: [
      post.featured_image ? /* @__PURE__ */ jsx("img", { src: post.featured_image, alt: post.featured_image_alt || "", className: "mb-10 w-full" }) : null,
      /* @__PURE__ */ jsx("div", { className: "prose max-w-none text-forest/75", dangerouslySetInnerHTML: {
        __html: safeRichText(post.body)
      } })
    ] })
  ] });
}
export {
  Story as component
};
