import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHero } from "./PageHero-C5T1WZVn.js";
function AccessibilityPage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Accessibility", title: "Built to work for everyone." }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-8 leading-relaxed text-forest/75", children: [
      /* @__PURE__ */ jsx("p", { children: "The site has been designed with WCAG 2.2 AA accessibility principles in mind. This is not a claim of full conformance, and the site has not yet had a complete formal accessibility audit." }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "What we have put in place" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-3 list-disc space-y-2 pl-6", children: [
          /* @__PURE__ */ jsx("li", { children: "A skip link and clear page landmarks" }),
          /* @__PURE__ */ jsx("li", { children: "One main heading on each public page and a logical heading structure" }),
          /* @__PURE__ */ jsx("li", { children: "Keyboard-operable navigation and forms with visible focus indicators" }),
          /* @__PURE__ */ jsx("li", { children: "Associated form labels, clear required-field guidance and status messages" }),
          /* @__PURE__ */ jsx("li", { children: "Alternative text for published content images" }),
          /* @__PURE__ */ jsx("li", { children: "Responsive layouts that support mobile screens and browser text scaling" }),
          /* @__PURE__ */ jsx("li", { children: "Reduced animation when your device requests reduced motion" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: "Tell us about a problem" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
          "If anything on this site is hard to use, please tell us what happened and which page you were using. Reach the committee through the ",
          /* @__PURE__ */ jsx("a", { href: "/contact", className: "font-semibold text-forest underline", children: "contact page" }),
          "."
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AccessibilityPage as component
};
