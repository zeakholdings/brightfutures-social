import { jsx, jsxs } from "react/jsx-runtime";
function PageHero({
  eyebrow,
  title,
  body
}) {
  return /* @__PURE__ */ jsx("section", { className: "bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsx("p", { className: "font-display text-sm font-semibold uppercase tracking-[0.15em] text-coral-light", children: eyebrow }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl", children: title }),
    body ? /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg leading-relaxed text-cream/75", children: body }) : null
  ] }) });
}
export {
  PageHero as P
};
