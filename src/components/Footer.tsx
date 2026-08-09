import { Link } from "@tanstack/react-router"
import { Instagram, Mail } from "lucide-react"
import { footerLinks, site } from "@/data/site"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-cream/90">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl">
              Bright<span className="text-coral-light">Futures</span>{" "}
              Greenwich Society
            </p>
            <p className="mt-3 text-sm text-cream/60">{site.university}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.instagram}
                className="rounded-full border border-cream/25 p-2.5 transition-colors hover:border-coral hover:text-coral-light"
                aria-label="BrightFutures on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-cream/25 p-2.5 transition-colors hover:border-coral hover:text-coral-light"
                aria-label="Email BrightFutures"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-3 sm:gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} BrightFutures Greenwich Society
            &mdash; a student-led society at the {site.university}.
          </p>
          <p>Independently run by students, for students.</p>
        </div>
      </div>
    </footer>
  )
}
