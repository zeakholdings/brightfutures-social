import { Link } from "@tanstack/react-router"
import type { Event } from "@/data/events"
const formatDate = (event: Event) => event.dateLabel || (event.startDate ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(event.startDate.includes("T") ? event.startDate : `${event.startDate}T12:00:00`)) : "To be confirmed")
export function EventCard({ event, compact = false }: { event: Event; compact?: boolean }) {
  const parts = event.startDate ? { day: new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(new Date(event.startDate)), month: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(new Date(event.startDate)) } : null
  const awaitingDetails = !event.time && !event.location
  return <article className={`group relative border-t-2 border-forest py-7 transition-transform hover:translate-x-1 ${compact ? "lg:grid lg:grid-cols-[10rem_1fr_auto] lg:gap-8" : "flex h-full flex-col"}`}>
    <div className="text-sm text-forest/65">{parts ? <p className="font-display leading-none text-forest"><span className="text-6xl font-semibold tracking-[-.06em]">{parts.day}</span><span className="ml-2 text-xl uppercase">{parts.month}</span></p> : <p className="font-display text-3xl text-forest">{formatDate(event)}</p>}{event.time ? <p className="mt-2 font-semibold">{event.time}</p> : null}<p className="mt-2 w-fit bg-coral px-2 py-1 text-[.68rem] font-bold uppercase tracking-[0.12em] text-cream">{event.category}</p></div>
    <div className={compact ? "mt-4 lg:mt-0" : "mt-6 flex flex-1 flex-col"}><h3 className="font-display text-2xl text-forest"><Link to="/events/$slug" params={{ slug: event.slug }} className="hover:text-coral">{event.title}</Link></h3><p className="mt-3 max-w-2xl leading-relaxed text-forest/70">{event.description}</p>{event.location ? <p className="mt-4 text-sm text-forest/55">{event.location}</p> : null}{awaitingDetails ? <p className="mt-4 w-fit border border-forest/15 bg-paper px-3 py-2 text-sm font-semibold text-forest/65">Details coming soon</p> : null}</div>
    <Link to="/events/$slug" params={{ slug: event.slug }} className="mt-5 inline-flex h-fit w-fit border-b-2 border-forest pb-1 text-sm font-bold text-forest hover:text-coral lg:mt-0">View event →</Link>
  </article>
}
