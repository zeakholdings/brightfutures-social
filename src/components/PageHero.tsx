export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body?: string
}) {
  return (
    <section className="relative overflow-hidden bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-green/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-coral-light">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {body ? (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
            {body}
          </p>
        ) : null}
      </div>
    </section>
  )
}
