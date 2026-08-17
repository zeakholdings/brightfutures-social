import { Link, useLoaderData } from "@tanstack/react-router"
import { Instagram, Mail } from "lucide-react"
import { footerLinks, site } from "@/data/site"

export function Footer() {
  const settings = useLoaderData({ from: "__root__" })
  return (
    <footer className="relative overflow-hidden border-t-8 border-coral bg-forest text-cream/90">
      <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full border-[2.5rem] border-green/20" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr] lg:items-start">
          <div className="max-w-xl">
            <Link to="/" className="inline-flex" aria-label="BrightFutures home">
              <img
                src="/BrightFutures%20Logo%20transparent.png"
                alt="BrightFutures"
                className="h-28 w-auto sm:h-32"
              />
            </Link>
            <p className="mt-4 font-display text-2xl text-cream">Greenwich Society</p>
            <p className="mt-5 max-w-md leading-relaxed text-cream/70">Student-led community for care-experienced and estranged students at the University of Greenwich.</p>
            <a href={settings.membership_url} className="mt-7 inline-flex bg-coral px-5 py-3 font-bold text-cream transition-transform hover:-translate-y-1">Official GSU membership →</a>
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

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-cream/20 pt-6 lg:border-t-0 lg:pt-0">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="w-fit border-b border-transparent text-sm font-semibold text-cream/70 transition-colors hover:border-coral hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-cream/60">BrightFutures HQ is a Vibes in Care CIC project and an independent platform supporting BrightFutures Society.</p>

        <div className="mt-14 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} BrightFutures Greenwich Society, a
            student-led society at the {site.university}.
          </p>
          <p>UoG Student Society</p>
        </div>
      </div>
    </footer>
  )
}
