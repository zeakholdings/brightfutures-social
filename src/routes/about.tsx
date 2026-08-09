import { createFileRoute } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | BrightFutures Greenwich" },
      {
        name: "description",
        content:
          "BrightFutures is a student-led society at the University of Greenwich, built by and for care-experienced and estranged students.",
      },
      { property: "og:title", content: "About | BrightFutures Greenwich" },
    ],
  }),
  component: AboutPage,
})

const objectives = [
  {
    title: "Community",
    body: "Create a supportive, inclusive and empowering community.",
  },
  {
    title: "Voice",
    body: "Amplify the voices and experiences of care-experienced and estranged students.",
  },
  {
    title: "Growth",
    body: "Support members' personal, academic and professional development.",
  },
]

const committee = [
  { role: "President", name: "To be confirmed" },
  { role: "Treasurer", name: "To be confirmed" },
  { role: "Committee Member", name: "To be confirmed" },
  { role: "Committee Member", name: "To be confirmed" },
]

function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About BrightFutures"
        title="Built by students who know what's missing."
        body="BrightFutures started because a handful of students at Greenwich noticed a gap — no space that was built specifically around what it's like to be care-experienced or estranged at university. So they built one."
      />

      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="space-y-6 text-lg leading-relaxed text-forest/75">
            <p>
              BrightFutures Greenwich Society is a student-led community for
              care-experienced and estranged students at the University of
              Greenwich. We're not a support service and we're not run by
              staff &mdash; we're a society, led by students, for students.
            </p>
            <p>
              That matters because it means the people making decisions
              about what this community does have actually lived the thing
              it's built around. Every event, campaign and idea starts with
              a student who thought &ldquo;we should do this.&rdquo;
            </p>
            <p>
              We exist to improve belonging, connection and opportunity for
              our members &mdash; through socials, check-ins, advocacy and
              whatever else the community decides matters this year.
            </p>
          </div>

          <div className="space-y-4">
            {objectives.map((o, i) => (
              <div
                key={o.title}
                className="rounded-2xl border border-forest/10 bg-cream-dim p-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl text-coral">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-forest">
                    {o.title}
                  </h3>
                </div>
                <p className="mt-2 leading-relaxed text-forest/70">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dim px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-green">
            Student-led, always
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
            Our relationship with Greenwich
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-forest/70">
            BrightFutures is a registered student society at the University
            of Greenwich, operating under Greenwich Students&rsquo; Union. We
            work closely with the Students&rsquo; Union and university staff
            where it helps our members &mdash; but decisions about what
            BrightFutures does, and how, are made by the student committee.
            We are not a department of the University and we don&rsquo;t
            speak on its behalf; we&rsquo;re a community that happens to be
            based here.
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-coral">
            Committee
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
            The people behind it
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-forest/70">
            Our committee for 2026/27 is being finalised. Names and
            introductions will appear here soon &mdash; if you're interested
            in joining the committee yourself, get in touch.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {committee.map((member, i) => (
              <div
                key={`${member.role}-${i}`}
                className="rounded-2xl border border-dashed border-forest/20 p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 font-display text-xl text-forest/40">
                  ?
                </div>
                <p className="mt-4 font-display text-lg text-forest">
                  {member.role}
                </p>
                <p className="mt-1 text-sm text-forest/50">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
