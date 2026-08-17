import { jsxs, jsx } from "react/jsx-runtime";
function HighlightCard({ highlight }) {
  const showImage = Boolean(highlight.image && highlight.image_alt?.trim());
  return /* @__PURE__ */ jsxs("article", { className: "highlight-note flex h-full min-w-0 flex-col overflow-hidden border-2 border-forest bg-paper shadow-[7px_7px_0_#16332c] transition-transform hover:-translate-y-1", children: [
    showImage ? /* @__PURE__ */ jsx(
      "img",
      {
        src: highlight.image,
        alt: highlight.image_alt.trim(),
        className: "aspect-[4/3] w-full border-b-2 border-forest object-cover"
      }
    ) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-6 sm:p-7", children: [
      highlight.category ? /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.16em] text-coral", children: highlight.category }) : null,
      /* @__PURE__ */ jsx("p", { className: "mt-4 whitespace-pre-line break-words font-display text-2xl leading-snug text-forest", children: highlight.highlight_text }),
      /* @__PURE__ */ jsxs("footer", { className: "mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-forest/15 pt-5 text-sm text-forest/60", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-forest", children: highlight.display_name?.trim() || "Anonymous member" }),
        highlight.term ? /* @__PURE__ */ jsx("span", { children: highlight.term }) : null
      ] })
    ] })
  ] });
}
export {
  HighlightCard as H
};
