import { useLoaderData, Link, useRouterState, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useMemo } from "react";
import { X, Menu, Instagram, Mail, List, ChevronUp } from "lucide-react";
import { n as nav, f as footerLinks, s as site, a as fallbackSettings, b as fallbackCommittee } from "./settings-DwAPQC0V.js";
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
function Footer() {
  const settings = useLoaderData({ from: "__root__" });
  return /* @__PURE__ */ jsxs("footer", { className: "relative overflow-hidden border-t-8 border-coral bg-forest text-cream/90", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-28 -right-24 h-72 w-72 rounded-full border-[2.5rem] border-green/20", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-6 py-14 sm:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-[1.3fr_.7fr] lg:items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex", "aria-label": "BrightFutures home", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/BrightFutures%20Logo%20transparent.png",
              alt: "BrightFutures",
              className: "h-28 w-auto sm:h-32"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 font-display text-2xl text-cream", children: "Greenwich Society" }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-md leading-relaxed text-cream/70", children: "Student-led community for care-experienced and estranged students at the University of Greenwich." }),
          /* @__PURE__ */ jsx("a", { href: settings.membership_url, className: "mt-7 inline-flex bg-coral px-5 py-3 font-bold text-cream transition-transform hover:-translate-y-1", children: "Official GSU membership →" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3", children: [
            settings.instagram_url ? /* @__PURE__ */ jsx("a", { href: settings.instagram_url, className: "rounded-full border border-cream/25 p-2.5 transition-colors hover:border-coral hover:text-coral-light", "aria-label": "BrightFutures on Instagram", children: /* @__PURE__ */ jsx(Instagram, { size: 18 }) }) : null,
            settings.contact_email ? /* @__PURE__ */ jsx(
              "a",
              {
                href: `mailto:${settings.contact_email}`,
                className: "rounded-full border border-cream/25 p-2.5 transition-colors hover:border-coral hover:text-coral-light",
                "aria-label": "Email BrightFutures",
                children: /* @__PURE__ */ jsx(Mail, { size: 18 })
              }
            ) : null
          ] })
        ] }),
        /* @__PURE__ */ jsx("nav", { "aria-label": "Footer", className: "grid grid-cols-2 gap-x-8 gap-y-4 border-t border-cream/20 pt-6 lg:border-t-0 lg:pt-0", children: footerLinks.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            to: link.to,
            className: "w-fit border-b border-transparent text-sm font-semibold text-cream/70 transition-colors hover:border-coral hover:text-cream",
            children: link.label
          },
          link.to
        )) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-3xl text-sm leading-relaxed text-cream/60", children: "BrightFutures HQ is a Vibes in Care CIC project and an independent platform supporting BrightFutures Society." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-14 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " BrightFutures Greenwich Society, a student-led society at the ",
          site.university,
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "UoG Student Society" })
      ] })
    ] })
  ] });
}
const legalPages = /* @__PURE__ */ new Set(["/privacy", "/terms", "/community-guidelines"]);
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
  public_name_preference: z.enum(["full_name", "first_name", "anonymous"]),
  public_excerpt: cleanText(1500),
  website_consent: z.boolean(),
  social_media_consent: z.boolean(),
  website: z.string().max(0)
}).superRefine((data, context) => {
  const responses = [data.highlight, data.proud_of, data.goal_or_challenge, data.brightfutures_idea, data.issue_to_raise];
  if (!responses.some((value) => value.length >= 3)) context.addIssue({
    code: "custom",
    path: ["highlight"],
    message: "Add at least one response before sending your check-in."
  });
  if (data.share_publicly && !data.public_excerpt) context.addIssue({
    code: "custom",
    path: ["public_excerpt"],
    message: "Choose the exact excerpt that may be considered for sharing."
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
const Route$i = createRootRoute({
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
const $$splitComponentImporter$h = () => import("./index-DBzTE8KV.js");
const Route$h = createFileRoute("/")({
  loader: async () => {
    const [events, settings, socialCards, highlights, communityActions] = await Promise.all([getEvents(), getSettings(), getSocialCards(), getHighlights(), getCommunityActions()]);
    return {
      events,
      settings,
      socialCards,
      highlights,
      communityActions
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./about-BAyf5Ti0.js");
const Route$g = createFileRoute("/about")({
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
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./accessibility-DpLTG6fJ.js");
const Route$f = createFileRoute("/accessibility")({
  head: () => ({
    meta: [{
      title: "Accessibility | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "The accessibility approach behind the BrightFutures website."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./check-in-BzWyOfw5.js");
const Route$e = createFileRoute("/check-in")({
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
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./community-guidelines-rN3wiWQ5.js");
const Route$d = createFileRoute("/community-guidelines")({
  head: () => ({
    meta: [{
      title: "Community Guidelines | BrightFutures HQ"
    }, {
      name: "description",
      content: "Guidelines for participating in BrightFutures HQ community features."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./contact-BMc4O7Zw.js");
const Route$c = createFileRoute("/contact")({
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
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./events-Dh_-LwMU.js");
const Route$b = createFileRoute("/events")({
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
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./get-involved-BXp3EDwP.js");
const Route$a = createFileRoute("/get-involved")({
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
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./highlights-C-1vj9HS.js");
const Route$9 = createFileRoute("/highlights")({
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
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./partnerships-P8jsKWTe.js");
const Route$8 = createFileRoute("/partnerships")({
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
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./privacy-DDg_sa31.js");
const Route$7 = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy | BrightFutures HQ"
    }, {
      name: "description",
      content: "How BrightFutures HQ and Vibes in Care CIC handle personal information."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./resources-Blpda1Cc.js");
const Route$6 = createFileRoute("/resources")({
  loader: async () => getResources(),
  head: () => ({
    meta: [{
      title: "Resources | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Money, housing, wellbeing, university support and careers resources for Greenwich students."
    }, {
      property: "og:title",
      content: "Resources | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./stories--cuShana.js");
const Route$5 = createFileRoute("/stories")({
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
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./terms-Df0YZCeL.js");
const Route$4 = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms of Service | BrightFutures HQ"
    }, {
      name: "description",
      content: "Terms for accessing and using BrightFutures HQ."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./voice-C3BkWGKs.js");
const Route$3 = createFileRoute("/voice")({
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
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./events._slug-BXQhDHYk.js");
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
const $$splitComponentImporter$1 = () => import("./partnerships_.perks-CDbT-5ml.js");
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
const $$splitComponentImporter = () => import("./stories._slug-Oai8fTvG.js");
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
const IndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const AboutRoute = Route$g.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$i
});
const AccessibilityRoute = Route$f.update({
  id: "/accessibility",
  path: "/accessibility",
  getParentRoute: () => Route$i
});
const CheckInRoute = Route$e.update({
  id: "/check-in",
  path: "/check-in",
  getParentRoute: () => Route$i
});
const CommunityGuidelinesRoute = Route$d.update({
  id: "/community-guidelines",
  path: "/community-guidelines",
  getParentRoute: () => Route$i
});
const ContactRoute = Route$c.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$i
});
const EventsRoute = Route$b.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$i
});
const GetInvolvedRoute = Route$a.update({
  id: "/get-involved",
  path: "/get-involved",
  getParentRoute: () => Route$i
});
const HighlightsRoute = Route$9.update({
  id: "/highlights",
  path: "/highlights",
  getParentRoute: () => Route$i
});
const PartnershipsRoute = Route$8.update({
  id: "/partnerships",
  path: "/partnerships",
  getParentRoute: () => Route$i
});
const PrivacyRoute = Route$7.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$i
});
const ResourcesRoute = Route$6.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => Route$i
});
const StoriesRoute = Route$5.update({
  id: "/stories",
  path: "/stories",
  getParentRoute: () => Route$i
});
const TermsRoute = Route$4.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$i
});
const VoiceRoute = Route$3.update({
  id: "/voice",
  path: "/voice",
  getParentRoute: () => Route$i
});
const EventsSlugRoute = Route$2.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => EventsRoute
});
const PartnershipsPerksRoute = Route$1.update({
  id: "/partnerships_/perks",
  path: "/partnerships/perks",
  getParentRoute: () => Route$i
});
const StoriesSlugRoute = Route.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => StoriesRoute
});
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
  CheckInRoute,
  CommunityGuidelinesRoute,
  ContactRoute,
  EventsRoute: EventsRouteWithChildren,
  GetInvolvedRoute,
  HighlightsRoute,
  PartnershipsRoute,
  PrivacyRoute,
  ResourcesRoute,
  StoriesRoute: StoriesRouteWithChildren,
  TermsRoute,
  VoiceRoute,
  PartnershipsPerksRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Route$h as R,
  Route$g as a,
  submitCommunityCheckin as b,
  Route$c as c,
  submitContact as d,
  Route$b as e,
  Route$a as f,
  Route$9 as g,
  Route$6 as h,
  Route$5 as i,
  Route$3 as j,
  Route$2 as k,
  submitPerksEnquiry as l,
  Route as m,
  router as r,
  submitIdea as s
};
