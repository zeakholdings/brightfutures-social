import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./PageHero-C5T1WZVn.js";
function CookiePolicy() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHero, { title: "Cookie Policy", body: "Last updated: 23 August 2026" }),
    /* @__PURE__ */ jsx("article", { className: "bg-cream px-6 py-20 sm:px-8 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-9 leading-relaxed text-forest/75", children: [
      /* @__PURE__ */ jsx(Section, { title: "About this policy", children: /* @__PURE__ */ jsx("p", { children: "This policy explains how BrightFutures HQ uses cookies and browser storage. BrightFutures HQ is a project of Vibes in Care CIC." }) }),
      /* @__PURE__ */ jsx(Section, { title: "Essential preference storage", children: /* @__PURE__ */ jsxs("p", { children: [
        "We store your cookie and privacy choices in your browser's local storage under ",
        /* @__PURE__ */ jsx("code", { children: "brightfutures.cookie-preferences" }),
        ". This is necessary to remember whether you accepted or rejected optional analytics and session recording. It does not track you across websites."
      ] }) }),
      /* @__PURE__ */ jsxs(Section, { title: "ZEAK Insights analytics", children: [
        /* @__PURE__ */ jsx("p", { children: "ZEAK Insights is our self-hosted website analytics service, operated by ZEAK for BrightFutures. It helps us understand how visitors use the website and improve the website and its services." }),
        /* @__PURE__ */ jsx("p", { children: "If you allow analytics, it collects usage information including pages viewed, page titles, referrer URLs, browser language, screen size, browser, operating system, device type and approximate country. We do not use it to identify logged-in users or attach names, email addresses or form contents to analytics events." }),
        /* @__PURE__ */ jsx("p", { children: "The standard analytics tracker does not set cookies or store an analytics identifier in local storage. It can read its standard local opt-out flag. We nevertheless ask for your choice before loading it, and it remains off if you reject analytics." })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Session recording", children: [
        /* @__PURE__ */ jsx("p", { children: "ZEAK Insights can also provide session recordings showing interactions such as clicks, scrolling and navigation. This is a separate optional choice intended to help us understand website usability." }),
        /* @__PURE__ */ jsx("p", { children: "Session recording is currently disabled while BrightFutures completes additional privacy configuration. It will only load after both analytics and session-recording consent, and only when the required privacy safeguards have been enabled. Forms are marked for blocking so information entered into them is not recorded." }),
        /* @__PURE__ */ jsx("p", { children: "ZEAK Insights documents a 30-day retention period for session replays. No separate retention period for our self-hosted aggregate analytics is currently configured or documented, so we do not state one here." })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Change or withdraw your choice", children: [
        /* @__PURE__ */ jsx("p", { children: "Use the Cookie settings link in the website footer at any time. Rejecting or withdrawing analytics stops the optional scripts from loading on the next page load; the settings interface reloads the page when needed to stop tracking already active on that page." }),
        /* @__PURE__ */ jsx("p", { children: "Clearing this site's local storage will remove your saved choice and we will ask again." })
      ] }),
      /* @__PURE__ */ jsx(Section, { title: "More information", children: /* @__PURE__ */ jsxs("p", { children: [
        "Read our ",
        /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "font-semibold text-forest underline", children: "Privacy Policy" }),
        " for more information about how BrightFutures HQ handles personal information."
      ] }) })
    ] }) })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-forest", children: title }),
    children
  ] });
}
export {
  CookiePolicy as component
};
