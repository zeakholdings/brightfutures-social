import { Link, useLoaderData } from "@tanstack/react-router"
import { Instagram, Mail } from "lucide-react"
import { footerLinks, site } from "@/data/site"

export function Footer() {
  const settings = useLoaderData({ from: "__root__" })
  return (
    <footer className="bg-forest text-cream/90">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl">
              Bright<span className="text-coral-light">Futures</span>{" "}
              Greenwich Society
            </p>
            <p className="mt-3 text-sm text-cream/60">{site.university}</p>
            <p className="mt-4 leading-relaxed text-cream/70">Student-led community for care-experienced and estranged students at the University of Greenwich.</p>
            <div className="mt-6 flex gap-3">
              {settings.instagram_url ? <a href={settings.instagram_url} className="rounded-full border border-cream/25 p-2.5 transition-colors hover:border-coral hover:text-coral-light" aria-label="BrightFutures on Instagram"><Instagram size={18}/></a> : null}
              {settings.contact_email ? <a
                href={`mailto:${settings.contact_email}`}
                className="rounded-full border border-cream/25 p-2.5 transition-colors hover:border-coral hover:text-coral-light"
                aria-label="Email BrightFutures"
              >
                <Mail size={18} />
              </a> : null}
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
            &copy; {new Date().getFullYear()} BrightFutures Greenwich Society, a
            student-led society at the {site.university}.
          </p>
          <p>University of Greenwich Student Society</p>
        </div>
      </div>
    </footer>
  )
}
