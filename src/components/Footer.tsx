import { useId, useState } from "react"
import { Link, useLoaderData } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { footerGroups, site } from "@/data/site"

type FooterGroup = (typeof footerGroups)[number]
const focusStyles = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-light"

function FooterNavLinks({ group }: { group: FooterGroup }) {
  return <ul className="space-y-1.5">{group.links.map((link) => <li key={link.to}>
    <Link to={link.to} className={`inline-flex min-h-9 items-center text-sm font-semibold text-cream/70 transition-colors hover:text-cream ${focusStyles}`}>{link.label}</Link>
  </li>)}</ul>
}

function FooterNavGroup({ group }: { group: FooterGroup }) {
  const headingId = `footer-${group.label.replace(/\s/g, "-").toLowerCase()}`
  return <section aria-labelledby={headingId}>
    <h3 id={headingId} className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-coral-light">{group.label}</h3>
    <FooterNavLinks group={group} />
  </section>
}

function FooterAccordion({ group }: { group: FooterGroup }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return <div className="border-b border-cream/20">
    <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)} className={`flex min-h-12 w-full items-center justify-between py-2 text-left font-bold text-cream ${focusStyles}`}>
      <span>{group.label}</span>
      <Plus className={`h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-45" : ""}`} aria-hidden="true" />
    </button>
    <div id={panelId} hidden={!open} className="pb-4 pl-1"><FooterNavLinks group={group} /></div>
  </div>
}

function FooterIdentity({ membershipUrl }: { membershipUrl: string }) {
  return <div className="grid border-y border-cream/20 sm:grid-cols-2">
    <section className="py-6 sm:pr-8 lg:py-7" aria-labelledby="footer-society">
      <h3 id="footer-society" className="font-display text-2xl tracking-[0.01em] text-cream">BrightFutures Society</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/65">Student society at the University of Greenwich.</p>
      <a href={membershipUrl} className={`mt-3 inline-flex min-h-10 items-center text-sm font-bold text-coral-light underline decoration-coral-light/40 underline-offset-4 hover:text-cream ${focusStyles}`}>Greenwich Students’ Union membership</a>
    </section>
    <section className="border-t border-cream/20 py-6 sm:border-l sm:border-t-0 sm:pl-8 lg:py-7" aria-labelledby="footer-hq">
      <h3 id="footer-hq" className="font-display text-2xl tracking-[0.01em] text-cream">BrightFutures HQ</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/65">A Vibes in Care CIC project supporting BrightFutures Society.</p>
    </section>
  </div>
}

export function Footer() {
  const settings = useLoaderData({ from: "__root__" })
  return <footer className="border-t-8 border-coral bg-forest text-cream/90">
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(28rem,.9fr)] lg:gap-16">
        <div>
          <h2 className="max-w-2xl font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] tracking-[0.01em] text-cream">Find your people.<br />Stay connected.</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/75 sm:text-lg">BrightFutures is the student-led community for care-experienced and estranged students at the University of Greenwich.</p>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <a href={settings.membership_url} className={`inline-flex min-h-12 items-center justify-center border-2 border-coral bg-coral px-6 py-3 font-extrabold text-cream shadow-[5px_5px_0_#f6f0df] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none ${focusStyles}`}>Join BrightFutures</a>
            {settings.instagram_url ? <a href={settings.instagram_url} target="_blank" rel="noreferrer" aria-label="BrightFutures on Instagram (opens in a new tab)" className={`inline-flex min-h-12 items-center justify-center border-2 border-cream/40 px-6 py-3 font-bold text-cream transition-colors hover:border-cream hover:bg-cream hover:text-forest ${focusStyles}`}>Instagram <span className="ml-2" aria-hidden="true">↗</span></a> : null}
          </div>
        </div>
        <nav aria-label="Footer navigation" className="hidden grid-cols-3 gap-x-8 md:grid">
          {footerGroups.map((group) => <FooterNavGroup key={group.label} group={group} />)}
        </nav>
      </div>

      <nav aria-label="Footer navigation" className="mt-9 border-t border-cream/20 md:hidden">
        {footerGroups.map((group) => <FooterAccordion key={group.label} group={group} />)}
      </nav>
      <div className="mt-10 lg:mt-14"><FooterIdentity membershipUrl={settings.membership_url} /></div>
      <div className="mt-6 flex flex-col gap-4 text-sm text-cream/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Legal links">
          <Link to="/privacy" className={`min-h-10 content-center hover:text-cream ${focusStyles}`}>Privacy</Link><span aria-hidden="true">·</span>
          <Link to="/terms" className={`min-h-10 content-center hover:text-cream ${focusStyles}`}>Terms</Link><span aria-hidden="true">·</span>
          <Link to="/accessibility" className={`min-h-10 content-center hover:text-cream ${focusStyles}`}>Accessibility</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} {site.fullName}</p>
        <button type="button" onClick={() => window.dispatchEvent(new Event("brightfutures:open-cookie-settings"))} className={`min-h-10 w-fit underline underline-offset-4 hover:text-cream ${focusStyles}`}>Cookie settings</button>
      </div>
    </div>
  </footer>
}
