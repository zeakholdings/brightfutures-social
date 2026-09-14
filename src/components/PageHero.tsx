import type { ReactNode } from "react"

export function PageHero({
  title,
  body,
  eyebrow,
  visual,
  quiet = false,
}: {
  eyebrow?: string
  title: string
  body?: string
  visual?: ReactNode
  quiet?: boolean
}) {
  return (
    <section className={`relative overflow-hidden bg-forest px-6 text-cream sm:px-8 ${quiet ? "py-12 sm:py-16" : "py-16 sm:py-24 lg:py-28"}`}>
      {!quiet ? <><div className="pointer-events-none absolute -right-20 -top-28 h-96 w-96 rounded-full border-[3rem] border-green/25" aria-hidden="true" /><div className="pointer-events-none absolute bottom-8 right-[12%] hidden h-20 w-20 rotate-12 border-2 border-coral/70 lg:block" aria-hidden="true" /></> : null}
      <div className={`relative mx-auto max-w-7xl ${visual ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] lg:gap-20" : ""}`}>
        <div className={visual ? "" : "max-w-5xl"}>
          {eyebrow ? <p className="mb-4 text-xs font-extrabold uppercase tracking-[.18em] text-coral-light">{eyebrow}</p> : null}
          <h1 className={`max-w-4xl font-display font-medium tracking-[-.045em] ${quiet ? "text-4xl leading-tight sm:text-5xl" : "text-[clamp(3.4rem,7vw,7rem)] leading-[.92]"}`}>
            {title}
          </h1>
          {body ? (
            <p className={`max-w-2xl text-lg leading-relaxed text-cream/75 ${quiet ? "mt-5" : "mt-8 border-l-4 border-coral pl-5 sm:text-xl"}`}>
              {body}
            </p>
          ) : null}
        </div>
        {visual ? <div className="relative rotate-2 border-2 border-forest bg-cream p-5 text-forest shadow-[12px_12px_0_#e8734a]">{visual}</div> : null}
      </div>
    </section>
  )
}
