import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"
import { getEvent } from "@/lib/cms/server"
import { safeRichText } from "@/lib/cms/safe-html"

export const Route = createFileRoute("/events/$slug")({
  loader: async ({ params }) => { const event = await getEvent({ data: { slug: params.slug } }); if (!event) throw notFound(); return event },
  head: ({ loaderData, params }) => {
    const title = `${loaderData?.title || "Event"} | BrightFutures Greenwich`
    const description = loaderData?.description || "BrightFutures Greenwich event details."
    const canonical = `https://brightfutures.social/events/${encodeURIComponent(params.slug)}`
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: canonical }], links: [{ rel: "canonical", href: canonical }] }
  },
  component: EventPage,
})

function EventPage() {
  const event = Route.useLoaderData()
  const date = event.startDate ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Europe/London" }).format(new Date(event.startDate)) : "To be confirmed"
  const detail = (label: string, value: string) => <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-coral">{label}</dt><dd className="mt-1 text-forest/75">{value}</dd></div>
  const awaitingDetails = !event.time && !event.location

  return <div><PageHero eyebrow={event.category} title={event.title} body={event.description}/><section className="bg-cream px-6 py-16 sm:px-8 lg:py-24"><article className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[15rem_1fr]"><aside className="border-t border-forest/25 pt-5"><dl className="grid gap-5">{detail("Date", date)}{event.time ? detail("Time", event.time) : null}{event.location ? detail("Venue", event.location) : null}{detail("Category", event.category)}{event.whoFor ? detail("Who it’s for", event.whoFor) : null}{event.costInfo ? detail("Cost", event.costInfo) : null}</dl>{awaitingDetails ? <p className="mt-5 border border-forest/15 bg-paper px-3 py-2 text-sm font-semibold text-forest/65">Details coming soon</p> : null}{event.status === "cancelled" ? <p className="mt-5 bg-coral px-3 py-2 font-semibold text-cream">Cancelled</p> : null}{event.registrationUrl && event.status !== "cancelled" ? <a href={event.registrationUrl} className="mt-6 inline-flex bg-forest px-5 py-3 font-semibold text-cream" rel="noreferrer">Book or RSVP</a> : null}</aside><div>{event.coverImage ? <img src={event.coverImage} alt={event.coverImageAlt || ""} className="mb-8 w-full"/> : null}<section><h2 className="font-display text-3xl text-forest">About this event</h2>{event.body ? <div className="prose mt-4 max-w-none text-forest/75" dangerouslySetInnerHTML={{ __html: safeRichText(event.body) }}/> : <p className="mt-4 leading-relaxed text-forest/70">{event.description}</p>}</section>{event.accessibilityInfo ? <section className="mt-10 border-t border-forest/20 pt-6"><h2 className="font-display text-2xl text-forest">Accessibility</h2><p className="mt-3 whitespace-pre-line text-forest/70">{event.accessibilityInfo}</p></section> : null}<section className="mt-10 border-t border-forest/20 pt-6"><h2 className="font-display text-2xl text-forest">Contact and help</h2>{event.contactInfo ? <p className="mt-3 whitespace-pre-line text-forest/70">{event.contactInfo}</p> : null}<Link to="/contact" className="mt-3 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral">Contact BrightFutures</Link></section><Link to="/events" className="mt-10 inline-flex border-b border-forest pb-1 font-semibold text-forest hover:text-coral">← Back to What’s On</Link></div></article></section></div>
}
