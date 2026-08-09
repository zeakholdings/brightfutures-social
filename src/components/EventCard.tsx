import { Link } from "@tanstack/react-router"
import type { Event } from "@/data/events"
const formatDate = (event: Event) => event.dateLabel || (event.startDate ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(event.startDate.includes("T") ? event.startDate : `${event.startDate}T12:00:00`)) : "Date coming soon")
export function EventCard({ event, compact = false }: { event: Event; compact?: boolean }) {
  return <article className={`border-t border-forest/25 py-6 ${compact ? "lg:grid lg:grid-cols-[10rem_1fr_auto] lg:gap-8" : "flex h-full flex-col"}`}>
    <div className="text-sm text-forest/65"><p className="font-semibold text-forest">{formatDate(event)}</p>{event.time ? <p className="mt-1">{event.time}</p> : null}<p className="mt-2 uppercase tracking-[0.12em] text-coral">{event.category}</p></div>
    <div className={compact ? "mt-4 lg:mt-0" : "mt-6 flex flex-1 flex-col"}><h3 className="font-display text-2xl text-forest"><Link to="/events/$slug" params={{ slug: event.slug }} className="hover:text-coral">{event.title}</Link></h3><p className="mt-3 max-w-2xl leading-relaxed text-forest/70">{event.description}</p>{event.location ? <p className="mt-4 text-sm text-forest/55">{event.location}</p> : null}</div>
    <Link to="/events/$slug" params={{ slug: event.slug }} className="mt-5 inline-flex h-fit w-fit border-b border-forest pb-1 text-sm font-semibold text-forest hover:text-coral lg:mt-0">Details</Link>
  </article>
}
