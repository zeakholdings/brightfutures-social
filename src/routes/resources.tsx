import { createFileRoute } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources | BrightFutures Greenwich" },
      {
        name: "description",
        content:
          "Useful support, information and opportunities for care-experienced and estranged students at the University of Greenwich.",
      },
      {
        property: "og:title",
        content: "Resources | BrightFutures Greenwich",
      },
    ],
  }),
  component: ResourcesPage,
})

const categories = [
  {
    title: "University support",
    body: "General wellbeing, disability and academic support services across the University of Greenwich.",
  },
  {
    title: "Greenwich Cares",
    body: "The university's dedicated support for care-experienced and estranged students.",
  },
  {
    title: "Accommodation",
    body: "Guidance on housing during and between terms, including year-round accommodation options.",
  },
  {
    title: "Wellbeing",
    body: "Mental health and wellbeing services, both on campus and further afield.",
  },
  {
    title: "Money and finance",
    body: "Bursaries, hardship funds and financial guidance for care-experienced and estranged students.",
  },
  {
    title: "Careers and employability",
    body: "Support with placements, internships and life after graduation.",
  },
  {
    title: "Community and opportunities",
    body: "Wider networks, charities and opportunities for care-experienced students beyond Greenwich.",
  },
]

function ResourcesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Useful things, in one place."
        body="We're building out this page with confirmed contacts and links. Where details aren't ready yet, we say so rather than guess — check back as this fills in."
      />

      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="flex flex-col gap-3 rounded-2xl border border-dashed border-forest/20 bg-cream-dim p-6"
              >
                <h3 className="font-display text-lg text-forest">
                  {cat.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-forest/65">
                  {cat.body}
                </p>
                <span className="text-sm font-semibold text-forest/40">
                  Details coming soon
                </span>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl leading-relaxed text-forest/60">
            Know a resource that should be listed here? Let the committee
            know through the{" "}
            <a href="/contact" className="font-semibold text-forest underline">
              contact page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
