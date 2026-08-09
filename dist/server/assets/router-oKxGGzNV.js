import { useLoaderData, Link, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { X, Menu, Instagram, Mail } from "lucide-react";
import { n as nav, s as site, f as footerLinks } from "./site-7ycwNZvd.js";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { z } from "zod";
import "@directus/sdk";
function Header() {
  const [open, setOpen] = useState(false);
  const settings = useLoaderData({ from: "__root__" });
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 border-b border-forest/15 bg-cream", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/",
          className: "font-display text-xl font-semibold tracking-tight text-forest",
          onClick: () => setOpen(false),
          children: [
            "Bright",
            /* @__PURE__ */ jsx("span", { className: "text-coral", children: "Futures" })
          ]
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
  return /* @__PURE__ */ jsx("footer", { className: "bg-forest text-cream/90", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 py-16 sm:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-12 lg:flex-row lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-sm", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-display text-2xl", children: [
          "Bright",
          /* @__PURE__ */ jsx("span", { className: "text-coral-light", children: "Futures" }),
          " ",
          "Greenwich Society"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-cream/60", children: site.university }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-cream/70", children: "Student-led community for care-experienced and estranged students at the University of Greenwich." }),
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
      /* @__PURE__ */ jsx("nav", { "aria-label": "Footer", className: "grid grid-cols-2 gap-3 sm:gap-4", children: footerLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.to,
          className: "text-sm text-cream/70 transition-colors hover:text-cream",
          children: link.label
        },
        link.to
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-14 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " BrightFutures Greenwich Society, a student-led society at the ",
        site.university,
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "University of Greenwich Student Society" })
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
const getEvents = createServerFn({
  method: "GET"
}).handler(createSsrRpc("97cf24593d000dd8735d294a9e5bd054a1de012f9cdba637796c4260dad62c90"));
const getEvent = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  slug: z.string().min(1).max(160)
})).handler(createSsrRpc("da5d5e7c6a98c5867b58e70c3ffbb05b616b7326b7d075b7e02ac7ac75cc5c27"));
const getPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("af214f0fb0dc2dae3e31084372f146d3d45d8669321db45200cdfb7512d69a3c"));
const getPost = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  slug: z.string().min(1).max(160)
})).handler(createSsrRpc("122b63dadd6013ce07711c6f6adf11e0189689d985e5150d8270c5c6a519835b"));
const getCommittee = createServerFn({
  method: "GET"
}).handler(createSsrRpc("fb02a6da83d4153732d971fdb19d0daa1b5b381d591d9f88f47abd925c9d831a"));
const getResources = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3b30cfae46732db35f7b3b362bf9f00d961a9d340c2715de16982ed2b795aae2"));
const getSettings = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b4396753f9b2dc456bf0409ca2461bf3365f5495fc1934377067d30876ef45d8"));
const contactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(180),
  message: z.string().trim().min(10).max(5e3),
  website: z.string().max(0)
});
const submitContact = createServerFn({
  method: "POST"
}).inputValidator(contactInput).handler(createSsrRpc("4aa391040c420b87535c6025a32bce7c0a6d1c213d55d23200e47cfbf94b15c8"));
const ideaInput = z.object({
  idea: z.string().trim().min(10).max(3e3),
  name: z.string().trim().max(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  website: z.string().max(0)
});
const submitIdea = createServerFn({
  method: "POST"
}).inputValidator(ideaInput).handler(createSsrRpc("db88b5907e38d3c14d850e46b5ce7f7f08fdb0c79cb8eac32e983360a3a50531"));
const Route$b = createRootRoute({
  loader: () => getSettings(),
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
      { rel: "icon", href: "/favicon.ico" },
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
const $$splitComponentImporter$a = () => import("./stories-BRXNjWjW.js");
const Route$a = createFileRoute("/stories")({
  loader: () => getPosts(),
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
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./resources-B0fQQEEo.js");
const Route$9 = createFileRoute("/resources")({
  loader: () => getResources(),
  head: () => ({
    meta: [{
      title: "Resources | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "Useful Greenwich support, information and opportunities collected by BrightFutures."
    }, {
      property: "og:title",
      content: "Resources | BrightFutures Greenwich"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./privacy-DWm1o3Wt.js");
const Route$8 = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "How BrightFutures Greenwich Society handles your information."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./get-involved-DIrLpxi2.js");
const Route$7 = createFileRoute("/get-involved")({
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
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./events-BU1OGn0i.js");
const Route$6 = createFileRoute("/events")({
  loader: () => getEvents(),
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
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contact-CN5Jryy9.js");
const Route$5 = createFileRoute("/contact")({
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
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./accessibility-tEie3ryP.js");
const Route$4 = createFileRoute("/accessibility")({
  head: () => ({
    meta: [{
      title: "Accessibility | BrightFutures Greenwich"
    }, {
      name: "description",
      content: "The accessibility commitments behind the BrightFutures website."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-DqFu-3Fd.js");
const Route$3 = createFileRoute("/about")({
  loader: () => getCommittee(),
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
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-DJ2HwEbk.js");
const Route$2 = createFileRoute("/")({
  loader: async () => ({
    events: await getEvents(),
    settings: await getSettings()
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./stories._slug-Dbc-k0D8.js");
const Route$1 = createFileRoute("/stories/$slug")({
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
    loaderData
  }) => ({
    meta: [{
      title: loaderData?.seo_title || `${loaderData?.title || "Story"} | BrightFutures Greenwich`
    }, {
      name: "description",
      content: loaderData?.seo_description || loaderData?.excerpt || "News from BrightFutures Greenwich."
    }, {
      property: "og:title",
      content: loaderData?.seo_title || loaderData?.title || "BrightFutures story"
    }, {
      property: "og:description",
      content: loaderData?.seo_description || loaderData?.excerpt || ""
    }, ...loaderData?.featured_image ? [{
      property: "og:image",
      content: loaderData.featured_image
    }] : []]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./events._slug-B6N5_jtO.js");
const Route = createFileRoute("/events/$slug")({
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
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData?.title || "Event"} | BrightFutures Greenwich`
    }, {
      name: "description",
      content: loaderData?.description || "BrightFutures Greenwich event details."
    }, {
      property: "og:title",
      content: loaderData?.title || "BrightFutures event"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const StoriesRoute = Route$a.update({
  id: "/stories",
  path: "/stories",
  getParentRoute: () => Route$b
});
const ResourcesRoute = Route$9.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => Route$b
});
const PrivacyRoute = Route$8.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$b
});
const GetInvolvedRoute = Route$7.update({
  id: "/get-involved",
  path: "/get-involved",
  getParentRoute: () => Route$b
});
const EventsRoute = Route$6.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$b
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$b
});
const AccessibilityRoute = Route$4.update({
  id: "/accessibility",
  path: "/accessibility",
  getParentRoute: () => Route$b
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const StoriesSlugRoute = Route$1.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => StoriesRoute
});
const EventsSlugRoute = Route.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => EventsRoute
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
  ContactRoute,
  EventsRoute: EventsRouteWithChildren,
  GetInvolvedRoute,
  PrivacyRoute,
  ResourcesRoute,
  StoriesRoute: StoriesRouteWithChildren
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Route$a as R,
  Route$9 as a,
  Route$7 as b,
  Route$6 as c,
  Route$5 as d,
  Route$3 as e,
  submitIdea as f,
  Route$2 as g,
  Route$1 as h,
  Route as i,
  router as r,
  submitContact as s
};
