import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, CalendarHeart, Lightbulb, Users } from "lucide-react"
import { getSettings } from "@/lib/cms/server"

export const Route = createFileRoute("/get-involved")({ loader: () => getSettings(), head: () => ({ meta: [{ title: "Get Involved | BrightFutures Greenwich" }, { name: "description", content: "Join BrightFutures, take part in events or help shape the society." }, { property: "og:title", content: "Get Involved | BrightFutures Greenwich" }] }), component: GetInvolvedPage })

function GetInvolvedPage() {
  const settings = Route.useLoaderData()
  return <div className="overflow-hidden">
    <section className="relative bg-forest px-6 py-16 text-cream sm:px-8 sm:py-24 lg:py-32">
      <div className="absolute right-[7%] top-[12%] hidden h-72 w-72 rounded-full bg-green lg:block" aria-hidden="true" />
      <div className="absolute right-[12%] top-[25%] hidden w-64 rotate-6 border-2 border-forest bg-cream p-6 font-display text-3xl italic text-forest shadow-[11px_11px_0_#e8734a] lg:block" aria-hidden="true">Come once.<br/>Stay awhile.<br/>Shape it.</div>
      <div className="relative mx-auto max-w-7xl"><div className="max-w-4xl lg:w-[68%]"><h1 className="font-display text-[clamp(3.8rem,8vw,7.8rem)] leading-[.9] tracking-[-.05em]">There’s more than one way <em className="font-normal text-coral-light">in.</em></h1><p className="mt-8 max-w-2xl text-xl leading-relaxed text-cream/75">Come to one thing, join officially, bring an idea or help make it happen. You decide what being part of BrightFutures looks like.</p></div></div>
    </section>
    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
      <div><p className="font-display text-2xl italic text-coral">The formal bit</p><h2 className="mt-3 font-display text-5xl leading-none text-forest sm:text-7xl">Join BrightFutures.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-forest/70">Official membership is free for 2026/27 and is handled through Greenwich Students’ Union. It is the easiest way to hear what is happening and support the society.</p><a href={settings.membership_url} className="mt-8 inline-flex items-center gap-3 bg-coral px-7 py-4 font-bold text-cream shadow-[6px_6px_0_#16332c] transition-transform hover:-translate-y-1">Become an official GSU member <ArrowRight size={18}/></a></div>
      <div className="rotate-2 border-2 border-forest bg-green p-8 text-forest shadow-[12px_12px_0_#16332c]"><Users size={36}/><p className="mt-6 font-display text-3xl">You can still come and meet us first.</p><p className="mt-4 leading-relaxed text-forest/75">Taking part in BrightFutures activities and completing official GSU membership are different things. There is no expected level of involvement.</p></div>
    </div></section>
    <section className="bg-cream-dim px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl">
      <article className="grid gap-8 border-y-2 border-forest py-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><CalendarHeart className="text-coral" size={36}/><h2 className="mt-4 font-display text-5xl text-forest">Come to something.</h2></div><div><p className="max-w-2xl text-lg leading-relaxed text-forest/70">Socials, activities and community moments happen throughout the year. Pick whatever sounds like you; no networking voice required.</p><Link to="/events" className="mt-6 inline-flex items-center gap-2 border-b-2 border-forest pb-1 font-bold text-forest">See what’s on <ArrowRight size={17}/></Link></div></article>
      <article className="grid gap-8 border-b-2 border-forest py-10 lg:ml-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div className="lg:order-2"><Lightbulb className="text-green" size={38}/><h2 className="mt-4 font-display text-5xl text-forest">Bring an idea.</h2></div><div><p className="max-w-2xl text-lg leading-relaxed text-forest/70">Suggest an event, a project, a campaign or something the community should try. Ideas do not need to arrive fully formed.</p><Link to="/contact" className="mt-6 inline-flex items-center gap-2 border-b-2 border-forest pb-1 font-bold text-forest">Share your idea <ArrowRight size={17}/></Link></div></article>
      <article className="mt-14 bg-forest p-8 text-cream sm:p-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12"><div><h2 className="font-display text-4xl sm:text-6xl">Help shape what happens next.</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">Volunteer, ask about the committee, offer a collaboration or simply tell us what would make the society better.</p></div><Link to="/contact" className="mt-8 inline-flex bg-coral px-6 py-4 font-bold lg:mt-0">Talk to the student committee →</Link></article>
    </div></section>
  </div>
}
