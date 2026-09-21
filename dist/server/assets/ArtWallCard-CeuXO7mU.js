import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { t as typeLabel } from "./art-wall-CKEXSHke.js";
function ArtWallCard({ work, index = 0 }) {
  const textWork = work.type === "poetry" || work.type === "writing";
  return /* @__PURE__ */ jsxs("article", { className: `group relative break-inside-avoid border border-forest/15 bg-paper p-4 shadow-[4px_5px_0_rgba(22,51,44,.12)] transition-transform hover:-translate-y-1 motion-reduce:transition-none ${index % 3 === 1 ? "md:translate-y-6" : ""}`, children: [
    /* @__PURE__ */ jsx(Link, { to: "/art-wall/$slug", params: { slug: work.slug }, className: "absolute inset-0 z-10", "aria-label": `Read ${work.title} by ${work.displayName || "Anonymous"}` }),
    work.imageUrl ? /* @__PURE__ */ jsx("img", { src: work.imageUrl, alt: work.altText || "", loading: "lazy", className: "w-full bg-cream-dim object-contain" }) : null,
    textWork ? /* @__PURE__ */ jsx("div", { className: "min-h-48 bg-cream p-5", children: /* @__PURE__ */ jsx("p", { className: "line-clamp-6 whitespace-pre-wrap font-display text-xl leading-relaxed text-forest", children: work.textContent }) }) : null,
    /* @__PURE__ */ jsxs("div", { className: "pt-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[.68rem] font-extrabold uppercase tracking-[.14em] text-coral", children: typeLabel(work.type) }),
      /* @__PURE__ */ jsx("h3", { className: "mt-1 font-display text-2xl leading-tight text-forest", children: work.title }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-forest/60", children: [
        "Shared by ",
        work.isAnonymous ? "Anonymous" : work.displayName
      ] })
    ] })
  ] });
}
export {
  ArtWallCard as A
};
