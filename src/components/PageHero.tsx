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
    <section className="bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
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
