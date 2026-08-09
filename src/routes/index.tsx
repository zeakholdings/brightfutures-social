import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { activityThemes, ideaCards, isUpcoming } from "@/data/events"
import { EventCard } from "@/components/EventCard"
import { IdeaForm } from "@/components/IdeaForm"
import { getEvents, getSettings } from "@/lib/cms/server"

export const Route = createFileRoute("/")({ loader: async () => ({ events: await getEvents(), settings: await getSettings() }), component: Home })
const principles = [["Belong", "Meet people and build your community."], ["Do", "Socials, activities, trips and projects."], ["Speak", "Help shape the experience of students at Greenwich."], ["Grow", "Find opportunities, build skills and make connections beyond university."]] as const

function Home() {
  const { events, settings } = Route.useLoaderData()
  const upcoming = events.filter(e => e.status === "confirmed" && isUpcoming(e)).sort((a, b) => new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime()).slice(0, 3)
  return <div>
    <section className="bg-forest px-6 py-20 text-cream sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="bf-rise text-xs font-bold uppercase tracking-[0.2em] text-coral-light">BrightFutures Greenwich</p>
        <h1 className="bf-rise mt-7 max-w-5xl font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-[6.5rem] [animation-delay:80ms]">Find your people at Greenwich.</h1>
        <div className="mt-10 grid gap-8 border-t border-cream/20 pt-8 lg:grid-cols-[1.4fr_1fr]">
          <p className="max-w-2xl text-xl leading-relaxed text-cream/90">BrightFutures is the student-led community for care-experienced and estranged students at the University of Greenwich.</p>
          <div><p className="leading-relaxed text-cream/70">Socials, opportunities, student voice and a community that’s here throughout university.</p><p className="mt-5 text-xs uppercase tracking-[0.16em] text-cream/50">University of Greenwich Student Society</p></div>
        </div>
        {settings.show_announcement && settings.homepage_announcement ? <a href={settings.homepage_announcement_url || undefined} className="mt-8 block border-l-4 border-coral bg-cream/10 px-5 py-4 text-cream">{settings.homepage_announcement}</a> : null}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href={settings.membership_url} className="bg-coral px-6 py-3.5 text-center font-semibold text-cream hover:bg-coral-light">Join BrightFutures</a><Link to="/events" className="border border-cream/35 px-6 py-3.5 text-center font-semibold hover:bg-cream/10">See what’s happening</Link></div>
      </div>
    </section>

    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl">
      <h2 className="max-w-5xl font-display text-4xl font-medium leading-tight text-forest sm:text-6xl">Meet people, get involved and have your say.</h2>
      <p className="mt-8 max-w-3xl text-xl leading-relaxed text-forest/70">BrightFutures gives care-experienced and estranged students a place to connect throughout the year.</p>
      <div className="mt-16 grid border-t border-forest/25 sm:grid-cols-2 lg:grid-cols-4">{principles.map(([title, body], i) => <div key={title} className={`border-b border-forest/20 py-7 sm:px-6 lg:border-r ${i % 2 === 0 ? "sm:pl-0" : ""}`}><p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{title}</p><p className="mt-3 leading-relaxed text-forest/75">{body}</p></div>)}</div>
    </div></section>

    <section className="bg-cream-dim px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl">
      <div className="flex items-end justify-between gap-6"><h2 className="font-display text-4xl text-forest sm:text-5xl">What’s happening</h2><Link to="/events" className="hidden items-center gap-2 font-semibold text-forest hover:text-coral sm:flex">View all events <ArrowRight size={16}/></Link></div>
      {upcoming.length ? <div className="mt-10 grid gap-x-8 lg:grid-cols-3">{upcoming.map(event => <EventCard key={event.slug} event={event}/>)}</div> : <p className="mt-8 text-forest/65">New dates are being planned. Check back soon or join to hear what’s next.</p>}
      <Link to="/events" className="mt-6 inline-flex items-center gap-2 font-semibold text-forest sm:hidden">View all events <ArrowRight size={16}/></Link>
    </div></section>

    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-green">BrightFutures throughout the year</p><div className="mt-10 grid gap-x-12 md:grid-cols-2">{activityThemes.map(([title, body], i) => <div key={title} className={`grid grid-cols-[3rem_1fr] border-t border-forest/20 py-7 ${i % 2 ? "md:translate-y-10" : ""}`}><span className="font-display text-xl text-coral">0{i+1}</span><div><h3 className="font-display text-2xl text-forest">{title}</h3><p className="mt-2 text-forest/65">{body}</p></div></div>)}</div></div></section>

    <section className="bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]"><p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-light">Student voice</p><div><h2 className="font-display text-4xl leading-tight sm:text-5xl">A stronger collective voice at Greenwich.</h2><p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">We work with students, Greenwich Cares, GSU and the University to raise issues, share experiences and help improve university for the students who come after us.</p><Link to="/about" className="mt-7 inline-flex items-center gap-2 border-b border-cream/40 pb-1 font-semibold">What we stand for <ArrowRight size={16}/></Link></div></div></section>

    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 border-y border-forest/20 py-14 lg:grid-cols-[1fr_1.2fr]"><h2 className="font-display text-4xl text-forest sm:text-5xl">Built by students, for students.</h2><p className="max-w-2xl text-lg leading-relaxed text-forest/70">Members shape what BrightFutures does. Come to a social, join a project, suggest something, help campaign for change or stay connected.</p></div></section>

    <section className="border-y border-forest/15 bg-cream-dim px-6 py-20 sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><div><h2 className="font-display text-4xl text-forest">What should we do next?</h2><p className="mt-4 text-lg text-forest/70">We don’t want to guess what students want. Tell us.</p><div className="mt-7"><IdeaForm/></div></div><ul className="grid grid-cols-2 border-t border-forest/20">{ideaCards.map(idea => <li key={idea} className="border-b border-forest/15 py-3 text-forest/70">{idea}</li>)}</ul></div></section>

    <section className="bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><h2 className="font-display text-5xl sm:text-7xl">Come as you are.</h2><p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">Membership is free. You don’t need to attend everything, know anyone already or explain your circumstances to get involved.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={settings.membership_url} className="bg-coral px-6 py-3 text-center font-semibold">Join BrightFutures</a><Link to="/events" className="border border-cream/30 px-6 py-3 text-center font-semibold">See what’s on</Link></div></div></section>
  </div>
}
