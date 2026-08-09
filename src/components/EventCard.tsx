import { CalendarDays, MapPin } from "lucide-react"
import type { Event } from "@/data/events"

const categoryStyles: Record<Event["category"], string> = {
  Social: "bg-coral/15 text-coral",
  Community: "bg-green/15 text-green",
  "Check-In": "bg-forest/10 text-forest",
  Opportunity: "bg-coral-light/25 text-forest",
}

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl bg-paper p-7 shadow-soft ring-1 ring-forest/5 transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[event.category]}`}
        >
          {event.category}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-forest/60">
          <CalendarDays size={15} />
          {event.date}
        </span>
      </div>

      <h3 className="font-display text-2xl text-forest">{event.title}</h3>
      <p className="flex-1 leading-relaxed text-forest/70">
        {event.description}
      </p>

      <div className="flex items-center gap-1.5 text-sm text-forest/55">
        <MapPin size={15} />
        {event.location ?? "Details coming soon"}
      </div>

      {event.rsvp ? (
        <a
          href={event.rsvp}
          className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-light"
        >
          RSVP
        </a>
      ) : (
        <span className="mt-1 inline-flex w-fit items-center justify-center rounded-full border border-dashed border-forest/25 px-5 py-2.5 text-sm font-medium text-forest/50">
          RSVP coming soon
        </span>
      )}
    </article>
  )
}
