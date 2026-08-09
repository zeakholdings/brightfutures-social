import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { site } from "@/data/site"

import "../styles.css"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: `${site.fullName} | Care-Experienced & Estranged Student Community`,
      },
      {
        name: "description",
        content:
          "BrightFutures is the student-led community for care-experienced and estranged students at the University of Greenwich. Meet people, join events, find opportunities and have your voice heard.",
      },
      { property: "og:site_name", content: site.fullName },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#16332c" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-cream text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-cream focus:font-body"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center gap-4">
      <p className="font-display text-lg text-green">404</p>
      <h1 className="font-display text-4xl">This page wandered off.</h1>
      <p className="max-w-md text-forest/70">
        Whatever you were looking for isn't here. Let's get you back to
        somewhere useful.
      </p>
      <a
        href="/"
        className="mt-2 rounded-full bg-forest px-6 py-3 text-cream font-semibold hover:bg-forest-light transition-colors"
      >
        Back to home
      </a>
    </div>
  )
}
