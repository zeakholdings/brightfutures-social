import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, CalendarDays, HandHeart, MapPin, Sparkles } from "lucide-react"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/partnerships")({
  head: () => ({ meta: [
    { title: "Partnerships | BrightFutures Greenwich" },
    { name: "description", content: "Partner with BrightFutures to support a welcoming, connected student community in Greenwich." },
    { property: "og:title", content: "Partnerships | BrightFutures Greenwich" },
  ] }),
  component: PartnershipsPage,
})

const routes = [
  { title: "BrightFutures Perks", body: "Offer a useful local benefit and help make Greenwich more affordable and welcoming for care-experienced and estranged students.", icon: Sparkles, live: true },
  { title: "Community Partners", body: "Build practical, lasting connections between students and organisations across Greenwich.", icon: MapPin },
  { title: "Event Partnerships", body: "Work with students on an event, workshop or community activity that adds real value.", icon: CalendarDays },
  { title: "Support BrightFutures", body: "Share skills, resources or other support that helps student-led ideas grow.", icon: HandHeart },
]

function PartnershipsPage() {
  return <div>
    <PageHero title="Partnerships rooted in Greenwich." body="We work with local organisations that want to help students feel connected, supported and at home in their community." />
    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-forest/70 sm:mb-12">We work with local businesses, charities, community organisations, University teams and others who can create useful opportunities for students.</p>
        <div className="grid gap-8 lg:grid-cols-2">
          {routes.map(({ title, body, icon: Icon, live }) => <article key={title} className={`flex min-h-72 flex-col border p-7 sm:p-9 ${live ? "border-coral bg-paper shadow-[8px_8px_0_#e8734a]" : "border-forest/15 bg-cream-dim"}`}>
            <Icon className={live ? "text-coral" : "text-green"} size={30} aria-hidden="true" />
            <h2 className="mt-8 font-display text-3xl text-forest">{title}</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-forest/70">{body}</p>
            {live ? <><p className="mt-5 font-semibold text-forest">No participation fee. You choose the offer.</p><Link to="/partnerships/perks" className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-7 font-semibold text-coral">Explore BrightFutures Perks <ArrowRight size={18} aria-hidden="true" /></Link></> : <Link to="/contact" className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-7 font-semibold text-forest">Start a conversation <ArrowRight size={18} aria-hidden="true" /></Link>}
          </article>)}
        </div>
      </div>
    </section>
  </div>
}
