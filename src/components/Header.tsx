import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import { nav, site } from "@/data/site"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur-md">
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
          <Link
            to={site.joinUrl}
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_10px_25px_-10px_rgba(232,115,74,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-coral-light"
          >
            Join BrightFutures
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-forest lg:hidden"
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
                  className="block rounded-lg px-2 py-3 text-lg font-medium text-forest/85"
                  activeProps={{ className: "text-coral font-semibold" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to={site.joinUrl}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-coral px-5 py-3 text-center font-semibold text-cream"
              >
                Join BrightFutures
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
