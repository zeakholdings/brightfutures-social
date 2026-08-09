import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"
import { EventCard } from "@/components/EventCard"
import { events, type EventCategory } from "@/data/events"

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events | BrightFutures Greenwich" },
      {
        name: "description",
        content:
          "See what's on at BrightFutures — welcome socials, check-ins, community events and opportunities for care-experienced and estranged students at Greenwich.",
      },
      { property: "og:title", content: "Events | BrightFutures Greenwich" },
    ],
  }),
  component: EventsPage,
})

const filters: Array<EventCategory | "All"> = [
  "All",
  "Social",
  "Community",
  "Check-In",
  "Opportunity",
]

function EventsPage() {
  const [active, setActive] = useState<EventCategory | "All">("All")

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => !e.past)
        .filter((e) => active === "All" || e.category === active),
    [active],
  )
  const past = events.filter((e) => e.past)

  return (
    <div>
      <PageHero
        eyebrow="What's on"
        title="Events built around belonging."
        body="From the 2026/27 Welcome programme to relaxed catch-ups throughout term, every event is a chance to find your people. Times and locations are confirmed as soon as we have them."
      />

      <section className="bg-cream px-6 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter events by category"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                  active === f
                    ? "border-forest bg-forest text-cream"
                    : "border-forest/20 text-forest/70 hover:border-forest/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {upcoming.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <p className="mt-14 text-center text-forest/60">
              Nothing in this category yet &mdash; check back soon.
            </p>
          )}
        </div>
      </section>

      <section className="bg-cream-dim px-6 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-medium text-forest">
            Past events
          </h2>
          {past.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <p className="mt-4 max-w-xl leading-relaxed text-forest/60">
              BrightFutures is just getting started for 2026/27 &mdash; our
              first events will appear here once they've happened, building
              a record of everything the community gets up to.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
