import { useState } from "react"
import { Link, useLoaderData } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import { nav } from "@/data/site"

export function Header() {
  const [open, setOpen] = useState(false)
  const settings = useLoaderData({ from: "__root__" })

  return (
    <header className="sticky top-0 z-50 border-b border-forest/15 bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-forest"
          onClick={() => setOpen(false)}
        >
          Bright<span className="text-coral">Futures</span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-[0.95rem] font-medium text-forest/75 transition-colors hover:text-forest"
              activeProps={{ className: "text-forest font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={settings.membership_url}
            className="bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-light"
          >
            Join BrightFutures
          </a>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-forest lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-forest/10 bg-cream px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-forest/10 px-2 py-3 text-lg font-medium text-forest/85"
                  activeProps={{ className: "text-coral font-semibold" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={settings.membership_url}
                onClick={() => setOpen(false)}
                className="block bg-forest px-5 py-3 text-center font-semibold text-cream"
              >
                Join BrightFutures
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
