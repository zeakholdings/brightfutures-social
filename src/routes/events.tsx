import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"
import { EventCard } from "@/components/EventCard"
import { isUpcoming, type EventCategory } from "@/data/events"
import { getEvents } from "@/lib/cms/server"

export const Route = createFileRoute("/events")({ loader: () => getEvents(), head: () => ({ meta: [{ title: "What’s On | BrightFutures Greenwich" }, { name: "description", content: "See upcoming and past BrightFutures events at the University of Greenwich." }, { property: "og:title", content: "What’s On | BrightFutures Greenwich" }] }), component: EventsPage })
const filters: Array<EventCategory | "All"> = ["All", "Social", "Coffee & Connect", "Community", "Opportunity", "Voice & Advocacy", "Wellbeing", "Trips", "Seasonal"]
function EventsPage() {
 const events = Route.useLoaderData(); const [active, setActive] = useState<EventCategory | "All">("All"); const [year, setYear] = useState("All")
 const years = [...new Set(events.map(e => e.academicYear))]
 const match = (category: EventCategory, academicYear: string) => (active === "All" || category === active) && (year === "All" || academicYear === year)
 const upcoming = useMemo(() => events.filter(e => e.status !== "cancelled" && isUpcoming(e) && match(e.category, e.academicYear)), [events, active, year])
 const past = useMemo(() => events.filter(e => !isUpcoming(e) && match(e.category, e.academicYear)).sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime()), [events, active, year])
 return <div><PageHero eyebrow="What’s on" title="Things to do. People to meet." body="Socials, activities, opportunities and community moments happen throughout the year. Confirmed details appear here as soon as we have them."/>
 <section className="bg-cream px-6 py-16 sm:px-8 lg:py-20"><div className="mx-auto max-w-7xl">
  <div className="flex flex-col gap-5 border-b border-forest/20 pb-8"><div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter events by category">{filters.map(f => <button key={f} type="button" onClick={() => setActive(f)} aria-pressed={active === f} className={`border-b py-1 text-sm font-semibold ${active === f ? "border-coral text-forest" : "border-transparent text-forest/55 hover:text-forest"}`}>{f}</button>)}</div><label className="flex items-center gap-3 text-sm text-forest/65">Academic year<select value={year} onChange={e => setYear(e.target.value)} className="border border-forest/20 bg-cream px-3 py-2 text-forest"><option>All</option>{years.map(y => <option key={y}>{y}</option>)}</select></label></div>
  <h2 className="mt-12 font-display text-4xl text-forest">Upcoming</h2>{upcoming.length ? <div className="mt-5">{upcoming.map(e => <EventCard key={e.slug} event={e} compact/>)}</div> : <p className="mt-6 text-forest/60">Nothing in this category is scheduled yet.</p>}
 </div></section>
 <section className="bg-cream-dim px-6 py-16 sm:px-8 lg:py-20"><div className="mx-auto max-w-7xl"><h2 className="font-display text-4xl text-forest">Past events</h2>{past.length ? <div className="mt-5">{past.map(e => <EventCard key={e.slug} event={e} compact/>)}</div> : <p className="mt-6 max-w-xl text-forest/60">Past events will build into an archive here as the year goes on.</p>}</div></section></div>
}
