import { createFileRoute, Link } from "@tanstack/react-router"
import {
  CalendarHeart,
  Handshake,
  Lightbulb,
  UserPlus,
  Users,
  Vote,
} from "lucide-react"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved | BrightFutures Greenwich" },
      {
        name: "description",
        content:
          "There's no one way to be part of BrightFutures. Join as a member, come to an event, volunteer, join the committee, or suggest an idea.",
      },
      {
        property: "og:title",
        content: "Get Involved | BrightFutures Greenwich",
      },
    ],
  }),
  component: GetInvolvedPage,
})

const options = [
  {
    icon: UserPlus,
    title: "Join as a member",
    body: "Membership is free for 2026/27 and takes a couple of minutes. It's the easiest way to hear what's happening and feel part of things.",
    cta: "Become a member",
    to: "/contact",
  },
  {
    icon: CalendarHeart,
    title: "Attend an event",
    body: "No membership required to come along. Check the events page and just turn up — that's genuinely all it takes.",
    cta: "See upcoming events",
    to: "/events",
  },
  {
    icon: Handshake,
    title: "Volunteer with BrightFutures",
    body: "Help out at events, welcome new members, or lend a hand behind the scenes. Flexible, low-pressure, and appreciated.",
    cta: "Offer to help",
    to: "/contact",
  },
  {
    icon: Vote,
    title: "Join the committee",
    body: "Committee roles open up across the year, not just at elections. If you've got an idea for a role, pitch it.",
    cta: "Ask about committee roles",
    to: "/contact",
  },
  {
    icon: Users,
    title: "Collaborate with us",
    body: "Run a society, service, or department that wants to work with BrightFutures? We're open to partnerships that genuinely benefit our members.",
    cta: "Start a conversation",
    to: "/contact",
  },
  {
    icon: Lightbulb,
    title: "Suggest an event",
    body: "Got an idea for a social, workshop, trip or campaign? This is the community deciding what BrightFutures does — tell us.",
    cta: "Share an idea",
    to: "/contact",
  },
]

function GetInvolvedPage() {
  return (
    <div>
      <PageHero
        eyebrow="Get involved"
        title="There's no single way in."
        body="Come to one event a year or help run the society — both count. Pick whatever fits how you want to spend your time at Greenwich."
      />

      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((opt, i) => (
            <div
              key={opt.title}
              className={`flex flex-col gap-4 rounded-2xl bg-cream-dim p-7 ${i % 5 === 2 ? "lg:mt-6" : ""}`}
            >
              <opt.icon size={28} strokeWidth={1.6} className="text-green" />
              <h3 className="font-display text-xl text-forest">
                {opt.title}
              </h3>
              <p className="flex-1 leading-relaxed text-forest/70">
                {opt.body}
              </p>
              <Link
                to={opt.to}
                className="mt-1 inline-flex w-fit items-center gap-1.5 font-semibold text-forest hover:text-coral"
              >
                {opt.cta} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
