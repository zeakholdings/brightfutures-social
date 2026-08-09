import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHero } from "./PageHero-BDJEcJfC.js";
function AccessibilityPage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Accessibility", title: "Built to work for everyone." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-6 leading-relaxed text-forest/75", children: [
      /* @__PURE__ */ jsx("p", { children: "This site is built with semantic HTML, keyboard-navigable menus and forms, visible focus states, and colour contrast that meets WCAG AA guidelines throughout." }),
      /* @__PURE__ */ jsx("p", { children: 'Animations are subtle and restrained, and automatically reduced for anyone with a "prefers reduced motion" setting turned on in their browser or device.' }),
      /* @__PURE__ */ jsxs("p", { children: [
        "If you run into anything on this site that's hard to use, please tell us. It helps us fix it. Reach the committee via the",
        " ",
        /* @__PURE__ */ jsx("a", { href: "/contact", className: "font-semibold text-forest underline", children: "contact page" }),
        "."
      ] })
    ] }) })
  ] });
}
export {
  AccessibilityPage as component
};
