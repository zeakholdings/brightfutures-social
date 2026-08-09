import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowRight,
  Compass,
  Heart,
  MessageSquareText,
  Sparkles,
} from "lucide-react"
import { events, ideaCards, journey } from "@/data/events"
import { EventCard } from "@/components/EventCard"

export const Route = createFileRoute("/")({
  component: Home,
})

const features = [
  {
    icon: Heart,
    title: "Find your people",
    body: "Build friendships with students who understand.",
  },
  {
    icon: MessageSquareText,
    title: "Have a voice",
    body: "Help shape change for care-experienced and estranged students.",
  },
  {
    icon: Sparkles,
    title: "Try something new",
    body: "Socials, activities, workshops and opportunities throughout the year.",
  },
  {
    icon: Compass,
    title: "Get connected",
    body: "Find useful support, information and opportunities across Greenwich.",
  },
]

function Home() {
  return (
    <div>
      <Hero />
      <WhatItIs />
      <UpcomingEvents />
      <WhoItsFor />
      <ThisYear />
      <ShapeIt />
      <AboutTeaser />
      <JoinCta />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      <div
        aria-hidden="true"
        className="bf-grain pointer-events-none absolute inset-0 mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="bf-drift pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-green/25 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-[60%_40%_45%_55%/55%_60%_40%_45%] bg-coral/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 sm:px-8 sm:pt-20 lg:pb-32 lg:pt-24">
        <div className="bf-rise inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream/80">
          <span className="h-1.5 w-1.5 rounded-full bg-green-light" />
          University of Greenwich Student Society
        </div>

        <h1 className="bf-rise mt-8 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl [animation-delay:80ms]">
          University is better when you don&rsquo;t have to do it alone.
        </h1>

        <p className="bf-rise mt-7 max-w-xl text-lg leading-relaxed text-cream/75 [animation-delay:160ms]">
          BrightFutures is the student-led community for care-experienced and
          estranged students at the University of Greenwich. Meet people,
          find opportunities, have your voice heard and build your university
          experience on your terms.
        </p>

        <div className="bf-rise mt-10 flex flex-col gap-4 sm:flex-row [animation-delay:240ms]">
          <Link
            to="/get-involved"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-base font-semibold text-cream shadow-[0_16px_35px_-12px_rgba(232,115,74,0.7)] transition-transform hover:-translate-y-0.5 hover:bg-coral-light"
          >
            Join BrightFutures
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            See what&rsquo;s happening
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhatItIs() {
  return (
    <section className="relative bg-cream px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-green">
            What BrightFutures is
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
            A community, not a service.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative flex flex-col gap-4 border-t-2 border-forest/15 pt-6 transition-colors hover:border-coral ${i % 2 === 1 ? "sm:mt-8" : ""}`}
            >
              <f.icon
                size={30}
                strokeWidth={1.6}
                className="text-green transition-transform group-hover:-translate-y-1"
              />
              <h3 className="font-display text-xl text-forest">{f.title}</h3>
              <p className="leading-relaxed text-forest/70">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UpcomingEvents() {
  const upcoming = events.filter((e) => !e.past)
  return (
    <section className="bg-cream-dim px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-coral">
              2026/27 Welcome programme
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
              Upcoming events
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 font-semibold text-forest hover:text-coral"
          >
            View all events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhoItsFor() {
  return (
    <section className="relative overflow-hidden bg-forest px-6 py-24 text-cream sm:px-8 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-3xl -translate-x-1/2 rounded-[50%] bg-green/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Made with care-experienced and estranged students in mind.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
          BrightFutures exists primarily to support care-experienced and
          estranged students &mdash; while building welcoming, inclusive
          activities and opportunities that anyone in the community can be
          part of. You never have to explain your background to belong here.
        </p>
        <p className="mx-auto mt-8 max-w-xl rounded-2xl border border-cream/15 bg-cream/5 px-6 py-5 text-base text-cream/85">
          You decide how involved you want to be. Come to an event, join the
          community, help shape what we do, or just stay connected.
        </p>
      </div>
    </section>
  )
}

function ThisYear() {
  return (
    <section className="bg-cream px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-green">
          This year at BrightFutures
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
          One term, four moments.
        </h2>

        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <div key={step.month} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-3xl text-coral">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-forest/15" />
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-forest/60">
                {step.month}
              </p>
              <h3 className="mt-1 font-display text-2xl text-forest">
                {step.verb}
              </h3>
              <p className="mt-2 leading-relaxed text-forest/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ShapeIt() {
  return (
    <section className="bg-cream-dim px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-coral">
              Shape BrightFutures
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
              What should BrightFutures do this year?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-forest px-6 py-3 font-semibold text-cream transition-colors hover:bg-forest-light"
          >
            Share an idea
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {ideaCards.map((idea, i) => (
            <span
              key={idea}
              className={`rounded-full border border-forest/15 bg-paper px-5 py-2.5 font-medium text-forest/80 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-coral hover:text-forest ${i % 3 === 0 ? "rotate-[-1deg]" : i % 3 === 1 ? "rotate-[0.5deg]" : "rotate-[1deg]"}`}
            >
              {idea}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutTeaser() {
  const objectives = [
    "Create a supportive, inclusive and empowering community.",
    "Amplify the voices and experiences of care-experienced and estranged students.",
    "Support members' personal, academic and professional development.",
  ]
  return (
    <section className="bg-cream px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-green">
            About us
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
            Run by students, for students.
          </h2>
          <p className="mt-6 leading-relaxed text-forest/70">
            BrightFutures is student-led and exists to improve belonging,
            connection and opportunity for care-experienced and estranged
            students at Greenwich. No one runs your university experience but
            you &mdash; we&rsquo;re just here to make it better.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-forest hover:text-coral"
          >
            Read our story <ArrowRight size={16} />
          </Link>
        </div>

        <ul className="flex flex-col gap-5">
          {objectives.map((obj, i) => (
            <li
              key={obj}
              className="flex gap-5 rounded-2xl bg-cream-dim p-6"
            >
              <span className="font-display text-2xl text-coral">
                {i + 1}
              </span>
              <p className="leading-relaxed text-forest/80">{obj}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function JoinCta() {
  return (
    <section className="relative overflow-hidden bg-forest px-6 py-24 text-center text-cream sm:px-8 lg:py-32">
      <div
        aria-hidden="true"
        className="bf-drift pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-[50%_50%_40%_60%/60%_40%_60%_40%] bg-coral/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Your university experience. Your community.
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/get-involved"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-cream shadow-[0_16px_35px_-12px_rgba(232,115,74,0.7)] transition-transform hover:-translate-y-0.5 hover:bg-coral-light"
          >
            Join BrightFutures
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Contact the committee
          </Link>
        </div>
        <p className="mt-6 text-sm text-cream/60">
          Membership is free for 2026/27.
        </p>
      </div>
    </section>
  )
}
