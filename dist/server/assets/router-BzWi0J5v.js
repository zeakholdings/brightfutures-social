import { useLoaderData, Link, useRouterState, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useId, useRef, useEffect, useMemo } from "react";
import { X, Menu, Plus, List, ChevronUp } from "lucide-react";
import { n as nav, f as footerGroups, s as site, a as fallbackSettings, b as fallbackCommittee } from "./settings-DGJdzXcl.js";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { z } from "zod";
import "@directus/sdk";
function Header() {
  const [open, setOpen] = useState(false);
  const settings = useLoaderData({ from: "__root__" });
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 border-b border-forest/15 bg-cream", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "flex shrink-0 items-center",
          onClick: () => setOpen(false),
          "aria-label": "BrightFutures home",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/BrightFutures%20Logo%20transparent.png",
              alt: "BrightFutures",
              className: "h-14 w-auto sm:h-16"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "nav",
        {
          className: "hidden items-center gap-8 lg:flex",
          "aria-label": "Primary",
          children: nav.map((item) => /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              activeOptions: { exact: item.to === "/" },
              className: "text-[0.95rem] font-medium text-forest/75 transition-colors hover:text-forest",
              activeProps: { className: "text-forest font-semibold" },
              children: item.label
            },
            item.to
          ))
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: settings.membership_url,
          className: "bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-light",
          children: "Join BrightFutures"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "inline-flex min-h-11 min-w-11 items-center justify-center text-forest lg:hidden",
          "aria-expanded": open,
          "aria-controls": "mobile-nav",
          "aria-label": open ? "Close menu" : "Open menu",
          onClick: () => setOpen((v) => !v),
          children: open ? /* @__PURE__ */ jsx(X, { size: 26 }) : /* @__PURE__ */ jsx(Menu, { size: 26 })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsx(
      "nav",
      {
        id: "mobile-nav",
        "aria-label": "Mobile",
        className: "border-t border-forest/10 bg-cream px-5 pb-6 pt-2 lg:hidden",
        children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-1", children: [
          nav.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              onClick: () => setOpen(false),
              className: "block border-b border-forest/10 px-2 py-3 text-lg font-medium text-forest/85",
              activeProps: { className: "text-coral font-semibold" },
              children: item.label
            }
          ) }, item.to)),
          /* @__PURE__ */ jsx("li", { className: "mt-2", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: settings.membership_url,
              onClick: () => setOpen(false),
              className: "block bg-forest px-5 py-3 text-center font-semibold text-cream",
              children: "Join BrightFutures"
            }
          ) })
        ] })
      }
    )
  ] });
}
const focusStyles = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-light";
function FooterNavLinks({ group }) {
  return /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", children: group.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.to, className: `inline-flex min-h-9 items-center text-sm font-semibold text-cream/70 transition-colors hover:text-cream ${focusStyles}`, children: link.label }) }, link.to)) });
}
function FooterNavGroup({ group }) {
  const headingId2 = `footer-${group.label.replace(/\s/g, "-").toLowerCase()}`;
  return /* @__PURE__ */ jsxs("section", { "aria-labelledby": headingId2, children: [
    /* @__PURE__ */ jsx("h3", { id: headingId2, className: "mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-coral-light", children: group.label }),
    /* @__PURE__ */ jsx(FooterNavLinks, { group })
  ] });
}
function FooterAccordion({ group }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return /* @__PURE__ */ jsxs("div", { className: "border-b border-cream/20", children: [
    /* @__PURE__ */ jsxs("button", { type: "button", "aria-expanded": open, "aria-controls": panelId, onClick: () => setOpen((value) => !value), className: `flex min-h-12 w-full items-center justify-between py-2 text-left font-bold text-cream ${focusStyles}`, children: [
      /* @__PURE__ */ jsx("span", { children: group.label }),
      /* @__PURE__ */ jsx(Plus, { className: `h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-45" : ""}`, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsx("div", { id: panelId, hidden: !open, className: "pb-4 pl-1", children: /* @__PURE__ */ jsx(FooterNavLinks, { group }) })
  ] });
}
function FooterIdentity({ membershipUrl }) {
  return /* @__PURE__ */ jsxs("div", { className: "grid border-y border-cream/20 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("section", { className: "py-6 sm:pr-8 lg:py-7", "aria-labelledby": "footer-society", children: [
      /* @__PURE__ */ jsx("h3", { id: "footer-society", className: "font-display text-2xl tracking-[0.01em] text-cream", children: "BrightFutures Society" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-sm text-sm leading-relaxed text-cream/65", children: "Student society at the University of Greenwich." }),
      /* @__PURE__ */ jsx("a", { href: membershipUrl, className: `mt-3 inline-flex min-h-10 items-center text-sm font-bold text-coral-light underline decoration-coral-light/40 underline-offset-4 hover:text-cream ${focusStyles}`, children: "Greenwich Students’ Union membership" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "border-t border-cream/20 py-6 sm:border-l sm:border-t-0 sm:pl-8 lg:py-7", "aria-labelledby": "footer-hq", children: [
      /* @__PURE__ */ jsx("h3", { id: "footer-hq", className: "font-display text-2xl tracking-[0.01em] text-cream", children: "BrightFutures HQ" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-sm text-sm leading-relaxed text-cream/65", children: "A Vibes in Care CIC project supporting BrightFutures Society." })
    ] })
  ] });
}
function Footer() {
  const settings = useLoaderData({ from: "__root__" });
  return /* @__PURE__ */ jsx("footer", { className: "border-t-8 border-coral bg-forest text-cream/90", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-12 lg:py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(28rem,.9fr)] lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "max-w-2xl font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] tracking-[0.01em] text-cream", children: [
          "Find your people.",
          /* @__PURE__ */ jsx("br", {}),
          "Stay connected."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-lg text-base leading-relaxed text-cream/75 sm:text-lg", children: "BrightFutures is the student-led community for care-experienced and estranged students at the University of Greenwich." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 grid gap-3 sm:flex sm:flex-wrap", children: [
          /* @__PURE__ */ jsx("a", { href: settings.membership_url, className: `inline-flex min-h-12 items-center justify-center border-2 border-coral bg-coral px-6 py-3 font-extrabold text-cream shadow-[5px_5px_0_#f6f0df] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none ${focusStyles}`, children: "Join BrightFutures" }),
          settings.instagram_url ? /* @__PURE__ */ jsxs("a", { href: settings.instagram_url, target: "_blank", rel: "noreferrer", "aria-label": "BrightFutures on Instagram (opens in a new tab)", className: `inline-flex min-h-12 items-center justify-center border-2 border-cream/40 px-6 py-3 font-bold text-cream transition-colors hover:border-cream hover:bg-cream hover:text-forest ${focusStyles}`, children: [
            "Instagram ",
            /* @__PURE__ */ jsx("span", { className: "ml-2", "aria-hidden": "true", children: "↗" })
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "Footer navigation", className: "hidden grid-cols-3 gap-x-8 md:grid", children: footerGroups.map((group) => /* @__PURE__ */ jsx(FooterNavGroup, { group }, group.label)) })
    ] }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Footer navigation", className: "mt-9 border-t border-cream/20 md:hidden", children: footerGroups.map((group) => /* @__PURE__ */ jsx(FooterAccordion, { group }, group.label)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 lg:mt-14", children: /* @__PURE__ */ jsx(FooterIdentity, { membershipUrl: settings.membership_url }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-4 text-sm text-cream/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-2", "aria-label": "Legal links", children: [
        /* @__PURE__ */ jsx(Link, { to: "/privacy", className: `min-h-10 content-center hover:text-cream ${focusStyles}`, children: "Privacy" }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
        /* @__PURE__ */ jsx(Link, { to: "/terms", className: `min-h-10 content-center hover:text-cream ${focusStyles}`, children: "Terms" }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
        /* @__PURE__ */ jsx(Link, { to: "/accessibility", className: `min-h-10 content-center hover:text-cream ${focusStyles}`, children: "Accessibility" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        site.fullName
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => window.dispatchEvent(new Event("brightfutures:open-cookie-settings")), className: `min-h-10 w-fit underline underline-offset-4 hover:text-cream ${focusStyles}`, children: "Cookie settings" })
    ] })
  ] }) });
}
const legalPages = /* @__PURE__ */ new Set(["/privacy", "/cookies", "/terms", "/community-guidelines"]);
function headingId(label, index) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return slug || `section-${index + 1}`;
}
function PageContentsBar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);
  const closeButton = useRef(null);
  useEffect(() => {
    setOpen(false);
    if (!legalPages.has(pathname)) {
      setSections([]);
      setActiveId("");
      return;
    }
    let cleanup = () => {
    };
    const frame = window.requestAnimationFrame(() => {
      const headings = Array.from(document.querySelectorAll("main h1, main h2"));
      const used = /* @__PURE__ */ new Set();
      const links = headings.map((heading, index) => {
        const label = heading.textContent?.trim() || `Section ${index + 1}`;
        let id = heading.id || headingId(label, index);
        let suffix = 2;
        while (used.has(id) || !heading.id && document.getElementById(id)) id = `${headingId(label, index)}-${suffix++}`;
        heading.id = id;
        heading.classList.add("scroll-mt-28");
        used.add(id);
        return { id, label };
      });
      setSections(links);
      setActiveId(links[0]?.id || "");
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
      );
      headings.forEach((heading) => observer.observe(heading));
      const updateFromScroll = () => {
        const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= window.innerHeight * 0.22);
        if (passed.length) setActiveId(passed[passed.length - 1].id);
      };
      window.addEventListener("scroll", updateFromScroll, { passive: true });
      updateFromScroll();
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("scroll", updateFromScroll);
      };
    });
    return () => {
      window.cancelAnimationFrame(frame);
      cleanup();
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  const activeLabel = useMemo(
    () => sections.find((section) => section.id === activeId)?.label || sections[0]?.label || "Page contents",
    [activeId, sections]
  );
  if (!legalPages.has(pathname) || !sections.length) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "h-16", "aria-hidden": "true" }),
    open ? /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[70] bg-forest/45", "aria-hidden": "true", onClick: () => setOpen(false) }) : null,
    open ? /* @__PURE__ */ jsxs("aside", { id: "page-contents-panel", role: "dialog", "aria-modal": "true", "aria-labelledby": "page-contents-title", className: "fixed inset-x-3 bottom-[4.75rem] z-[80] mx-auto max-h-[min(70vh,38rem)] max-w-2xl overflow-y-auto border border-forest/15 bg-paper shadow-2xl sm:inset-x-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "sticky top-0 flex items-center justify-between gap-6 border-b border-forest/15 bg-paper px-5 py-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[.16em] text-coral", children: "On this page" }),
          /* @__PURE__ */ jsx("h2", { id: "page-contents-title", className: "mt-1 font-display text-2xl text-forest", children: "Choose a section" })
        ] }),
        /* @__PURE__ */ jsx("button", { ref: closeButton, type: "button", onClick: () => setOpen(false), className: "grid min-h-11 min-w-11 place-items-center rounded-full border border-forest/20 text-forest hover:border-coral", "aria-label": "Close page contents", children: /* @__PURE__ */ jsx(X, { size: 21, "aria-hidden": "true" }) })
      ] }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "On this page", className: "p-3 sm:p-4", children: /* @__PURE__ */ jsx("ol", { className: "grid gap-1", children: sections.map((section, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: `#${section.id}`, "aria-current": section.id === activeId ? "location" : void 0, onClick: () => setOpen(false), className: `flex min-h-12 items-center gap-4 px-4 py-3 text-sm transition-colors ${section.id === activeId ? "bg-forest font-bold text-cream" : "font-semibold text-forest hover:bg-cream-dim"}`, children: [
        /* @__PURE__ */ jsx("span", { className: `font-display text-lg ${section.id === activeId ? "text-coral-light" : "text-coral"}`, children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("span", { children: section.label })
      ] }) }, section.id)) }) })
    ] }) : null,
    /* @__PURE__ */ jsx("div", { className: "fixed inset-x-0 bottom-0 z-[90] border-t border-cream/15 bg-forest text-cream shadow-[0_-8px_30px_rgba(22,51,44,.18)]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
        /* @__PURE__ */ jsx(List, { size: 19, className: "shrink-0 text-coral-light", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[.65rem] font-bold uppercase tracking-[.14em] text-cream/55", children: "On this page" }),
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold text-cream", children: activeLabel })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setOpen((value) => !value), "aria-expanded": open, "aria-controls": "page-contents-panel", className: "inline-flex min-h-11 shrink-0 items-center gap-2 border border-cream/25 px-4 text-sm font-bold text-cream hover:border-coral-light", children: [
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: open ? "Close" : "View contents" }),
        /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: open ? "Close" : "Contents" }),
        /* @__PURE__ */ jsx(ChevronUp, { size: 18, className: `transition-transform ${open ? "rotate-180" : ""}`, "aria-hidden": "true" })
      ] })
    ] }) })
  ] });
}
const PREFERENCE_KEY = "brightfutures.cookie-preferences";
const WEBSITE_ID = "d1cf0c73-b736-451d-afca-563bff2cd6b1";
const ANALYTICS_SCRIPT_ID = "zeak-insights-analytics";
const RECORDER_SCRIPT_ID = "zeak-insights-recorder";
const SESSION_RECORDING_ENABLED = false;
let formProtectionObserver = null;
function readPreferences() {
  try {
    const value = window.localStorage.getItem(PREFERENCE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value);
    if (parsed.version !== 1 || typeof parsed.analytics !== "boolean" || typeof parsed.sessionRecording !== "boolean") return null;
    return { version: 1, analytics: parsed.analytics, sessionRecording: parsed.analytics && parsed.sessionRecording };
  } catch {
    return null;
  }
}
function addScript(id, src) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.defer = true;
  script.src = src;
  script.dataset.websiteId = WEBSITE_ID;
  document.head.appendChild(script);
}
function protectFormsFromRecording() {
  const protect = (root) => {
    root.querySelectorAll("form").forEach((form) => form.classList.add("rr-block"));
  };
  protect(document);
  if (formProtectionObserver) return;
  formProtectionObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) {
        if (node.matches("form")) node.classList.add("rr-block");
        protect(node);
      }
    }));
  });
  formProtectionObserver.observe(document.body, { childList: true, subtree: true });
}
function applyPreferences(preferences) {
  if (preferences.analytics) {
    addScript(ANALYTICS_SCRIPT_ID, "https://analytics.zeak.dev/script.js");
  }
  if (preferences.analytics && preferences.sessionRecording && SESSION_RECORDING_ENABLED) {
    protectFormsFromRecording();
    addScript(RECORDER_SCRIPT_ID, "https://analytics.zeak.dev/recorder.js");
  }
}
function AnalyticsConsent() {
  const [preferences, setPreferences] = useState(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [sessionRecording, setSessionRecording] = useState(false);
  useEffect(() => {
    const stored = readPreferences();
    setPreferences(stored);
    setAnalytics(stored?.analytics ?? false);
    setSessionRecording(stored?.sessionRecording ?? false);
    if (stored) applyPreferences(stored);
    setReady(true);
    const openSettings = () => {
      const current = readPreferences();
      setAnalytics(current?.analytics ?? false);
      setSessionRecording(current?.sessionRecording ?? false);
      setSettingsOpen(true);
    };
    window.addEventListener("brightfutures:open-cookie-settings", openSettings);
    return () => window.removeEventListener("brightfutures:open-cookie-settings", openSettings);
  }, []);
  const save = (next) => {
    const mustStopLoadedTracking = Boolean(
      preferences?.analytics && !next.analytics || preferences?.sessionRecording && !next.sessionRecording
    );
    window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(next));
    setPreferences(next);
    setSettingsOpen(false);
    if (mustStopLoadedTracking) {
      window.location.reload();
      return;
    }
    applyPreferences(next);
  };
  if (!ready || preferences && !settingsOpen) return null;
  if (!settingsOpen) {
    return /* @__PURE__ */ jsx("aside", { className: "fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-4xl border-2 border-forest border-t-8 border-t-coral bg-paper p-5 text-forest shadow-[8px_8px_0_#16332c] sm:inset-x-6 sm:bottom-6 sm:p-7", "aria-label": "Cookie and analytics choices", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-[1fr_auto] md:items-end md:gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl leading-tight text-forest", children: "Cookies & analytics" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-forest/75", children: "We use ZEAK Insights to understand how people use BrightFutures and improve the website and its services. Analytics and optional session recording stay off unless you choose them." }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs leading-relaxed text-forest/60", children: [
          "The analytics tracker does not set cookies. We store your choice in your browser. Read our ",
          /* @__PURE__ */ jsx(Link, { to: "/cookies", className: "font-bold underline decoration-coral decoration-2 underline-offset-2", children: "Cookie Policy" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:flex-row md:max-w-sm md:flex-wrap md:justify-end", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => save({ version: 1, analytics: true, sessionRecording: false }), className: "min-h-11 bg-forest px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-light", children: "Allow analytics" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => save({ version: 1, analytics: false, sessionRecording: false }), className: "min-h-11 border-2 border-forest px-5 py-2.5 text-sm font-bold text-forest transition-colors hover:bg-cream", children: "Reject" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSettingsOpen(true), className: "min-h-11 px-3 py-2.5 text-sm font-bold text-forest underline decoration-coral decoration-2 underline-offset-2", children: "Manage choices" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[130] grid place-items-end bg-forest/55 p-4 sm:place-items-center", role: "presentation", children: /* @__PURE__ */ jsxs("section", { role: "dialog", "aria-modal": "true", "aria-labelledby": "privacy-settings-title", className: "max-h-[90vh] w-full max-w-xl overflow-y-auto border-2 border-forest border-t-8 border-t-coral bg-paper p-6 shadow-[10px_10px_0_#16332c] sm:p-8", children: [
    /* @__PURE__ */ jsx("h2", { id: "privacy-settings-title", className: "font-display text-3xl text-forest", children: "Cookie and privacy settings" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-forest/65", children: "Essential storage is always active. It remembers these choices and supports website features." }),
    /* @__PURE__ */ jsxs("label", { className: "mt-6 flex items-start justify-between gap-5 border-t border-forest/15 pt-5", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { className: "text-forest", children: "ZEAK Insights analytics" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm leading-relaxed text-forest/65", children: "Collects aggregate information such as pages viewed, referrers, device type, browser, operating system, screen size, language and approximate country. The tracker does not set cookies." })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: analytics, onChange: (event) => {
        setAnalytics(event.target.checked);
        if (!event.target.checked) setSessionRecording(false);
      }, className: "mt-1 h-5 w-5 shrink-0 accent-coral" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "mt-5 flex items-start justify-between gap-5 border-t border-forest/15 pt-5", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { className: "text-forest", children: "Session recording" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm leading-relaxed text-forest/65", children: "Would record clicks, scrolling and navigation to help us understand usability. Form areas are blocked. This remains technically disabled until BrightFutures completes the additional ZEAK Insights privacy configuration." })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: sessionRecording, disabled: !analytics || !SESSION_RECORDING_ENABLED, onChange: (event) => setSessionRecording(event.target.checked), className: "mt-1 h-5 w-5 shrink-0 accent-coral disabled:opacity-40" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-5 text-xs leading-relaxed text-forest/55", children: [
      "You can change or withdraw your choice at any time. See the ",
      /* @__PURE__ */ jsx(Link, { to: "/cookies", className: "font-semibold underline", children: "Cookie Policy" }),
      " and ",
      /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "font-semibold underline", children: "Privacy Policy" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => save({ version: 1, analytics, sessionRecording: analytics && sessionRecording }), className: "min-h-11 bg-forest px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-light", children: "Save choices" }),
      preferences ? /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSettingsOpen(false), className: "min-h-11 px-4 py-2.5 text-sm font-semibold text-forest underline", children: "Cancel" }) : null
    ] })
  ] }) });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getEventsServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("167ba15ae4b55098241e92911773c71357230c664dc9ee89cdb333f13968f6a2"));
async function getEvents() {
  return getEventsServer();
}
const getEventServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(160)
})).handler(createSsrRpc("a30e69df17a1a918144bf392c07f3fab99574c478668839d59e598b1c0642bd2"));
async function getEvent(options) {
  return getEventServer(options);
}
const eventInterestInput = z.object({
  eventSlug: z.string().min(1).max(160),
  respondentId: z.string().uuid(),
  attendance: z.enum(["yes", "maybe", "no"]),
  availability: z.array(z.string().min(1).max(100)).max(20),
  suggestedSlots: z.array(z.object({
    start: z.string().datetime(),
    end: z.string().datetime().optional()
  })).max(5),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  website: z.string().max(0)
});
const submitEventInterest = createServerFn({
  method: "POST"
}).validator(eventInterestInput).handler(createSsrRpc("f1ab7c0b6166accfed88280ccdaabb970ab14de12c54e3e08afd850d55b760eb"));
const getEventInterestAdmin = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500)
})).handler(createSsrRpc("80974fb0f7b33011b47694fc02a6d825f92dd7a33f3923daad093b0a38a25aac"));
const confirmEventInterestOption = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500),
  eventSlug: z.string().min(1).max(160),
  optionId: z.string().min(1).max(100)
})).handler(createSsrRpc("9b37ff50e44e43d83acb40e62f5764407be1d4450cae698cc36e2750173f072d"));
const addSuggestedEventInterestOption = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500),
  eventSlug: z.string().min(1).max(160),
  start: z.string().datetime(),
  end: z.string().datetime().optional()
})).handler(createSsrRpc("b2cdcd64ebe52183f7fb032f30c6dff86fbffcfce4242fe4ad0f0bb1c1288507"));
const getPostsServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c45ff4ca2ad39500b15a2d254a9d296b9127c74f01b3f11bf8947feab407ffae"));
async function getPosts() {
  return getPostsServer();
}
const getPostServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(160)
})).handler(createSsrRpc("fa34e5b0534a94c006a3e171388e1107cb7c112967d1e42778325fe11244b5e0"));
async function getPost(options) {
  return getPostServer(options);
}
const getCommitteeServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b3e4b99703b24021917134ff1c670baad0d008cb52d022fb9ca1bf998430f57a"));
async function getCommittee() {
  return getCommitteeServer();
}
const getSocialCardsServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("01179dcb172c360d8e7fb04e5b2124ff7acb0f36caba4694f36c35a37e7715c8"));
async function getSocialCards() {
  return getSocialCardsServer();
}
const getHighlightsServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c3e2c9fa7efaa05d66fa8d6dd66845d4a95e73ba84399382ced6dde0531d8667"));
async function getHighlights() {
  return getHighlightsServer();
}
const getCommunityActionsServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("25f68e7f8034139322a52ff40c945b50570f0049e8ff782d6efb590f9a9f472b"));
async function getCommunityActions() {
  return getCommunityActionsServer();
}
const getResourcesServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("eaae13ebb87b84f971ba35b626367e8223d33586d24bdddd6aba26fa9380e657"));
async function getResources() {
  return getResourcesServer();
}
const getSiteSettingsServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("16e14e768e3171f904fc62d3dbb8dc36725cb4721585d80f8a3376cd273b2af5"));
async function getSiteSettings() {
  return getSiteSettingsServer();
}
async function getSettings() {
  return getSiteSettings();
}
const getArtWallServer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b9912b87cdaa1dcb81915ca0751c4a889dabe2af3548a987fc49841c209df331"));
async function getArtWall() {
  return getArtWallServer();
}
const getArtWallItemServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(180)
})).handler(createSsrRpc("4f9bd158e5051dc0a00bd239dd82192a245c029d1b4900ae72c0c8340ab69911"));
async function getArtWallItem(options) {
  return getArtWallItemServer(options);
}
const artCleanText = (maximum) => z.string().max(maximum).transform((value) => value.normalize("NFKC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim());
const artWallInput = z.object({
  submissionType: z.enum(["drawing", "painting", "digital-art", "photography", "poetry", "writing", "mixed-media", "other"]),
  title: artCleanText(160).pipe(z.string().min(1)),
  displayPreference: z.enum(["first-name", "chosen-name", "anonymous"]),
  displayName: artCleanText(120),
  contactEmail: z.string().trim().email().max(254),
  description: artCleanText(2e3),
  textContent: artCleanText(12e3),
  altText: artCleanText(700),
  themeSlug: z.union([z.literal(""), z.string().max(100)]),
  contentNote: artCleanText(280),
  consentGiven: z.boolean(),
  guidelinesAccepted: z.boolean(),
  website: z.string().max(0),
  image: z.union([z.literal(""), z.string().max(14e6)]),
  imageName: z.string().max(180),
  imageType: z.string().max(100)
}).superRefine((data, ctx) => {
  const visual = !["poetry", "writing"].includes(data.submissionType);
  if (visual && !data.image) ctx.addIssue({
    code: "custom",
    path: ["image"],
    message: "Choose an image of your work before submitting."
  });
  if (["poetry", "writing"].includes(data.submissionType) && !data.textContent) ctx.addIssue({
    code: "custom",
    path: ["textContent"],
    message: "Add your poem or writing before submitting."
  });
  if (data.displayPreference === "chosen-name" && !data.displayName) ctx.addIssue({
    code: "custom",
    path: ["displayName"],
    message: "Add the name you would like displayed."
  });
  if (!data.consentGiven) ctx.addIssue({
    code: "custom",
    path: ["consentGiven"],
    message: "Please confirm you have permission to share this work."
  });
  if (!data.guidelinesAccepted) ctx.addIssue({
    code: "custom",
    path: ["guidelinesAccepted"],
    message: "Please confirm you have read the submission guidelines."
  });
});
const submitArtWall = createServerFn({
  method: "POST"
}).validator(artWallInput).handler(createSsrRpc("bdab7f1e78aa648a707ba0708a2b93b5fbe1a5553422cca0059c9f77d19bb798"));
const getAdminArtWall = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500)
})).handler(createSsrRpc("8922217af96945bf53b011f674b4e730d6e947d0b314a5ea7db68775bd0d976a"));
const moderateArtWall = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500),
  id: z.string().uuid(),
  action: z.enum(["approve", "reject", "remove", "restore", "feature", "unfeature", "safeguard", "unsafeguard"]),
  notes: artCleanText(2e3)
})).handler(createSsrRpc("e564a3a974a9b387b8e68a41262a1e8cabf3e424c9dd5b402f08f3fde650cfc1"));
const contactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(180),
  message: z.string().trim().min(10).max(5e3),
  website: z.string().max(0)
});
const submitContact = createServerFn({
  method: "POST"
}).validator(contactInput).handler(createSsrRpc("4aa391040c420b87535c6025a32bce7c0a6d1c213d55d23200e47cfbf94b15c8"));
const perksEnquiryInput = z.object({
  business: z.string().trim().min(1).max(180),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  link: z.string().trim().max(500),
  offer: z.string().trim().max(1500),
  restrictions: z.string().trim().max(1500),
  message: z.string().trim().max(3e3),
  website: z.string().max(0)
});
const submitPerksEnquiry = createServerFn({
  method: "POST"
}).validator(perksEnquiryInput).handler(createSsrRpc("dbf6c5ea319bc9c376955563f80f383f29da4244784cc0e323652989763a041a"));
const ideaInput = z.object({
  idea: z.string().trim().min(10).max(3e3),
  name: z.string().trim().max(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  website: z.string().max(0)
});
const submitIdea = createServerFn({
  method: "POST"
}).validator(ideaInput).handler(createSsrRpc("db88b5907e38d3c14d850e46b5ce7f7f08fdb0c79cb8eac32e983360a3a50531"));
const cleanText = (maximum) => z.string().max(maximum).transform((value) => value.normalize("NFKC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim());
const checkinInput = z.object({
  highlight: cleanText(4e3),
  proud_of: cleanText(4e3),
  goal_or_challenge: cleanText(4e3),
  brightfutures_idea: cleanText(4e3),
  issue_to_raise: cleanText(4e3),
  name: cleanText(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  share_publicly: z.boolean(),
  public_name_preference: z.union([z.enum(["full_name", "first_name", "anonymous"]), z.literal("")]),
  public_excerpt: cleanText(1500),
  website_consent: z.boolean(),
  social_media_consent: z.boolean(),
  website: z.string().max(0)
}).superRefine((data, context) => {
  const responses = [data.highlight, data.proud_of, data.goal_or_challenge, data.brightfutures_idea, data.issue_to_raise];
  if (!responses.some((value) => value.length >= 3)) context.addIssue({
    code: "custom",
    path: ["highlight"],
    message: "Add something to at least one box before sending your check-in."
  });
  if (data.share_publicly && !data.public_excerpt) context.addIssue({
    code: "custom",
    path: ["public_excerpt"],
    message: "Choose the exact excerpt that may be considered for sharing."
  });
  if (data.share_publicly && !data.public_name_preference) context.addIssue({
    code: "custom",
    path: ["public_name_preference"],
    message: "Choose how you would like to be credited."
  });
  if (data.share_publicly && !data.website_consent && !data.social_media_consent) context.addIssue({
    code: "custom",
    path: ["website_consent"],
    message: "Choose at least one place where the excerpt may be shared."
  });
  if (!data.share_publicly && (data.website_consent || data.social_media_consent)) context.addIssue({
    code: "custom",
    path: ["share_publicly"],
    message: "Sharing consent cannot be given while the response is private."
  });
  if (data.share_publicly && data.public_name_preference === "first_name" && !data.name) context.addIssue({
    code: "custom",
    path: ["name"],
    message: "Add your first name for first-name attribution."
  });
  if (data.share_publicly && data.public_name_preference === "full_name" && data.name.split(/\s+/).filter(Boolean).length < 2) context.addIssue({
    code: "custom",
    path: ["name"],
    message: "Add your full name for full-name attribution."
  });
});
const submitCommunityCheckin = createServerFn({
  method: "POST"
}).validator(checkinInput).handler(createSsrRpc("afb8f434e238e65bf496fdd6da6ebd8237b98ccaf92ab71d253f313560605a90"));
const Route$o = createRootRoute({
  loader: async () => {
    try {
      const settings = await getSettings();
      return settings && typeof settings === "object" ? settings : fallbackSettings;
    } catch (error) {
      console.error("Site settings could not be loaded.", error instanceof Error ? error.message : "Unknown error");
      return fallbackSettings;
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: loaderData?.default_seo_title || `${site.fullName} | Care-Experienced & Estranged Student Community`
      },
      {
        name: "description",
        content: loaderData?.default_seo_description || "BrightFutures is the student-led community for care-experienced and estranged students at the University of Greenwich. Meet people, join events, find opportunities and have your voice heard."
      },
      { property: "og:site_name", content: site.fullName },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#16332c" }
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Manrope:wght@400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-cream text-ink", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#main-content",
          className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-cream focus:font-body",
          children: "Skip to content"
        }
      ),
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { id: "main-content", children }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(PageContentsBar, {}),
      /* @__PURE__ */ jsx(AnalyticsConsent, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center px-6 text-center gap-4", children: [
    /* @__PURE__ */ jsx("p", { className: "font-display text-lg text-green", children: "404" }),
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl", children: "Page not found." }),
    /* @__PURE__ */ jsx("p", { className: "max-w-md text-forest/70", children: "The page you were looking for isn't here." }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/",
        className: "mt-2 rounded-full bg-forest px-6 py-3 text-cream font-semibold hover:bg-forest-light transition-colors",
        children: "Back to home"
      }
    )
  ] });
}
const $$splitComponentImporter$n = () => import("./index-6WtodlOI.js");
const Route$n = createFileRoute("/")({
  loader: async () => {
    const [events, settings, socialCards, highlights, communityActions, artWall] = await Promise.all([getEvents(), getSettings(), getSocialCards(), getHighlights(), getCommunityActions(), getArtWall()]);
    return {
      events,
      settings,
      socialCards,
      highlights,
      communityActions,
      artWall
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./about-CErTXqRg.js");
const Route$m = createFileRoute("/about")({
  loader: async () => {
    try {
      const committee = await getCommittee();
      return Array.isArray(committee) && committee.length ? committee : fallbackCommittee;
    } catch (error) {
      console.error("Committee data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
      return fallbackCommittee;
    }
  },
  head: () => ({
    meta: [{
      title: "About | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Why BrightFutures exists and what the student-led Greenwich society stands for."
    }, {
      property: "og:title",
      content: "About | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./accessibility-DTPOEI3O.js");
const Route$l = createFileRoute("/accessibility")({
  head: () => ({
    meta: [{
      title: "Accessibility | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "The accessibility approach behind the BrightFutures website."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./art-wall-DhO3jXpY.js");
const Route$k = createFileRoute("/art-wall")({
  loader: () => getArtWall(),
  head: () => ({
    meta: [{
      title: "Art Wall | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Explore art, photography, poetry and creative work shared by the BrightFutures Greenwich community."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./check-in-FBaAhPA4.js");
const Route$j = createFileRoute("/check-in")({
  head: () => ({
    meta: [{
      title: "Community Check-In | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Share a win, something you are working towards, or an idea for BrightFutures in a private community check-in."
    }, {
      property: "og:title",
      content: "Community Check-In | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./community-guidelines-DJ46XAKE.js");
const Route$i = createFileRoute("/community-guidelines")({
  head: () => ({
    meta: [{
      title: "Community Guidelines | BrightFutures HQ"
    }, {
      name: "description",
      content: "Guidelines for participating in BrightFutures HQ community features."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./contact-CjMN3sGn.js");
const Route$h = createFileRoute("/contact")({
  loader: () => getSettings(),
  head: () => ({
    meta: [{
      title: "Contact | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Get in touch with the BrightFutures committee: ask a question, share an idea, or find out how to get involved."
    }, {
      property: "og:title",
      content: "Contact | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./cookies-CnbCBpmc.js");
const Route$g = createFileRoute("/cookies")({
  head: () => ({
    meta: [{
      title: "Cookie Policy | BrightFutures HQ"
    }, {
      name: "description",
      content: "How BrightFutures HQ uses browser storage and ZEAK Insights."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./events-Iq_YtU20.js");
const Route$f = createFileRoute("/events")({
  loader: async () => getEvents(),
  head: () => ({
    meta: [{
      title: "What’s On | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "See upcoming and past BrightFutures events at the University of Greenwich."
    }, {
      property: "og:title",
      content: "What’s On | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./get-involved-extY2L__.js");
const Route$e = createFileRoute("/get-involved")({
  loader: () => getSettings(),
  head: () => ({
    meta: [{
      title: "Get Involved | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Join BrightFutures, take part in events or help shape the society."
    }, {
      property: "og:title",
      content: "Get Involved | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./highlights-DzcE8BYo.js");
const Route$d = createFileRoute("/highlights")({
  loader: async () => getHighlights(),
  head: () => ({
    meta: [{
      title: "Member Highlights | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Celebrate the things BrightFutures members are building, trying and achieving."
    }, {
      property: "og:title",
      content: "Member Highlights | BrightFutures Greenwich"
    }, {
      property: "og:description",
      content: "Small wins, big wins and the things our community chooses to celebrate."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./partnerships-BuuG-SDk.js");
const Route$c = createFileRoute("/partnerships")({
  head: () => ({
    meta: [{
      title: "Partnerships | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Partner with BrightFutures to support a welcoming, connected student community in Greenwich."
    }, {
      property: "og:title",
      content: "Partnerships | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./privacy-DQZ3yO-A.js");
const Route$b = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy | BrightFutures HQ"
    }, {
      name: "description",
      content: "How BrightFutures HQ and Vibes in Care CIC handle personal information."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./resources-DLAsJPVP.js");
const Route$a = createFileRoute("/resources")({
  loader: async () => getResources(),
  head: () => ({
    meta: [{
      title: "Resources | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Find checked money, housing, university, wellbeing and careers support for Greenwich students."
    }, {
      property: "og:title",
      content: "Resources | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./stories-uJI_rcri.js");
const Route$9 = createFileRoute("/stories")({
  loader: async () => getPosts(),
  head: () => ({
    meta: [{
      title: "News & Stories | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "News and stories from BrightFutures Greenwich."
    }, {
      property: "og:title",
      content: "News & Stories | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./terms-BqVcoAx6.js");
const Route$8 = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms of Service | BrightFutures HQ"
    }, {
      name: "description",
      content: "Terms for accessing and using BrightFutures HQ."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./voice-CmYvJxM-.js");
const Route$7 = createFileRoute("/voice")({
  loader: async () => getCommunityActions(),
  head: () => ({
    meta: [{
      title: "You Said. We’re Doing. | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "See how BrightFutures responds to themes and ideas raised by our community."
    }, {
      property: "og:title",
      content: "You Said. We’re Doing. | BrightFutures Greenwich"
    }, {
      property: "og:description",
      content: "Theme-level updates on how community feedback helps shape BrightFutures."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./art-wall-4W6OP1_r.js");
const Route$6 = createFileRoute("/admin/art-wall")({
  head: () => ({
    meta: [{
      name: "robots",
      content: "noindex, nofollow"
    }, {
      title: "Art Wall moderation | BrightFutures"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./event-interest-C7VxdFTJ.js");
const Route$5 = createFileRoute("/admin/event-interest")({
  head: () => ({
    meta: [{
      name: "robots",
      content: "noindex, nofollow"
    }],
    title: "Event interest | BrightFutures"
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./art-wall._slug-DjjAtboV.js");
const Route$4 = createFileRoute("/art-wall/$slug")({
  loader: async ({
    params
  }) => {
    const work = await getArtWallItem({
      data: {
        slug: params.slug
      }
    });
    if (!work) throw notFound();
    return work;
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./art-wall.submit-B74NOghE.js");
const Route$3 = createFileRoute("/art-wall/submit")({
  head: () => ({
    meta: [{
      name: "robots",
      content: "noindex, nofollow"
    }, {
      title: "Add something to the wall | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./events._slug-ihu0qtIu.js");
const Route$2 = createFileRoute("/events/$slug")({
  loader: async ({
    params
  }) => {
    const event = await getEvent({
      data: {
        slug: params.slug
      }
    });
    if (!event) throw notFound();
    return event;
  },
  head: ({
    loaderData,
    params
  }) => {
    const title = `${loaderData?.title || "Event"} | BrightFutures Greenwich`;
    const description = loaderData?.description || "BrightFutures Greenwich event details.";
    const canonical = `https://brightfutures.social/events/${encodeURIComponent(params.slug)}`;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:url",
        content: canonical
      }],
      links: [{
        rel: "canonical",
        href: canonical
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./partnerships_.perks-DK0_evay.js");
const Route$1 = createFileRoute("/partnerships_/perks")({
  head: () => ({
    meta: [{
      title: "BrightFutures Perks | Partner with us"
    }, {
      name: "description",
      content: "Join BrightFutures Perks and connect your Greenwich business with a student-led community."
    }, {
      property: "og:title",
      content: "BrightFutures Perks | Partner with us"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const nonBlank = (value) => value?.trim() || "";
function postSeo(post) {
  return {
    title: nonBlank(post.seo_title) || post.title,
    description: nonBlank(post.seo_description) || nonBlank(post.excerpt)
  };
}
const $$splitComponentImporter = () => import("./stories._slug-BSubUj_m.js");
const Route = createFileRoute("/stories/$slug")({
  loader: async ({
    params
  }) => {
    const post = await getPost({
      data: {
        slug: params.slug
      }
    });
    if (!post) throw notFound();
    return post;
  },
  head: ({
    loaderData,
    params
  }) => {
    const {
      title,
      description
    } = loaderData ? postSeo(loaderData) : {
      title: "Story",
      description: ""
    };
    const canonical = `https://brightfutures.social/stories/${encodeURIComponent(params.slug)}`;
    return {
      meta: [{
        title
      }, ...description ? [{
        name: "description",
        content: description
      }, {
        property: "og:description",
        content: description
      }] : [], {
        property: "og:title",
        content: title
      }, {
        property: "og:url",
        content: canonical
      }, ...loaderData?.featured_image ? [{
        property: "og:image",
        content: loaderData.featured_image
      }] : []],
      links: [{
        rel: "canonical",
        href: canonical
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$n.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$o
});
const AboutRoute = Route$m.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$o
});
const AccessibilityRoute = Route$l.update({
  id: "/accessibility",
  path: "/accessibility",
  getParentRoute: () => Route$o
});
const ArtWallRoute = Route$k.update({
  id: "/art-wall",
  path: "/art-wall",
  getParentRoute: () => Route$o
});
const CheckInRoute = Route$j.update({
  id: "/check-in",
  path: "/check-in",
  getParentRoute: () => Route$o
});
const CommunityGuidelinesRoute = Route$i.update({
  id: "/community-guidelines",
  path: "/community-guidelines",
  getParentRoute: () => Route$o
});
const ContactRoute = Route$h.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$o
});
const CookiesRoute = Route$g.update({
  id: "/cookies",
  path: "/cookies",
  getParentRoute: () => Route$o
});
const EventsRoute = Route$f.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$o
});
const GetInvolvedRoute = Route$e.update({
  id: "/get-involved",
  path: "/get-involved",
  getParentRoute: () => Route$o
});
const HighlightsRoute = Route$d.update({
  id: "/highlights",
  path: "/highlights",
  getParentRoute: () => Route$o
});
const PartnershipsRoute = Route$c.update({
  id: "/partnerships",
  path: "/partnerships",
  getParentRoute: () => Route$o
});
const PrivacyRoute = Route$b.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$o
});
const ResourcesRoute = Route$a.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => Route$o
});
const StoriesRoute = Route$9.update({
  id: "/stories",
  path: "/stories",
  getParentRoute: () => Route$o
});
const TermsRoute = Route$8.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$o
});
const VoiceRoute = Route$7.update({
  id: "/voice",
  path: "/voice",
  getParentRoute: () => Route$o
});
const AdminArtWallRoute = Route$6.update({
  id: "/admin/art-wall",
  path: "/admin/art-wall",
  getParentRoute: () => Route$o
});
const AdminEventInterestRoute = Route$5.update({
  id: "/admin/event-interest",
  path: "/admin/event-interest",
  getParentRoute: () => Route$o
});
const ArtWallSlugRoute = Route$4.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ArtWallRoute
});
const ArtWallSubmitRoute = Route$3.update({
  id: "/submit",
  path: "/submit",
  getParentRoute: () => ArtWallRoute
});
const EventsSlugRoute = Route$2.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => EventsRoute
});
const PartnershipsPerksRoute = Route$1.update({
  id: "/partnerships_/perks",
  path: "/partnerships/perks",
  getParentRoute: () => Route$o
});
const StoriesSlugRoute = Route.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => StoriesRoute
});
const ArtWallRouteChildren = {
  ArtWallSlugRoute,
  ArtWallSubmitRoute
};
const ArtWallRouteWithChildren = ArtWallRoute._addFileChildren(ArtWallRouteChildren);
const EventsRouteChildren = {
  EventsSlugRoute
};
const EventsRouteWithChildren = EventsRoute._addFileChildren(EventsRouteChildren);
const StoriesRouteChildren = {
  StoriesSlugRoute
};
const StoriesRouteWithChildren = StoriesRoute._addFileChildren(StoriesRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AccessibilityRoute,
  ArtWallRoute: ArtWallRouteWithChildren,
  CheckInRoute,
  CommunityGuidelinesRoute,
  ContactRoute,
  CookiesRoute,
  EventsRoute: EventsRouteWithChildren,
  GetInvolvedRoute,
  HighlightsRoute,
  PartnershipsRoute,
  PrivacyRoute,
  ResourcesRoute,
  StoriesRoute: StoriesRouteWithChildren,
  TermsRoute,
  VoiceRoute,
  AdminArtWallRoute,
  AdminEventInterestRoute,
  PartnershipsPerksRoute
};
const routeTree = Route$o._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$n as R,
  Route$m as a,
  Route$k as b,
  submitCommunityCheckin as c,
  Route$h as d,
  submitContact as e,
  Route$f as f,
  Route$e as g,
  Route$d as h,
  Route$a as i,
  Route$9 as j,
  Route$7 as k,
  getAdminArtWall as l,
  moderateArtWall as m,
  getEventInterestAdmin as n,
  confirmEventInterestOption as o,
  addSuggestedEventInterestOption as p,
  Route$4 as q,
  submitArtWall as r,
  submitIdea as s,
  submitEventInterest as t,
  Route$2 as u,
  submitPerksEnquiry as v,
  Route as w,
  router as x
};
