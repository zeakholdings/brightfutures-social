import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { getCommittee } from "@/lib/cms/server";
import { fallbackCommittee } from "@/lib/cms/committee";
import type { CommitteeMember } from "@/lib/cms/types";

export const Route = createFileRoute("/about")({
  loader: async () => {
    try {
      const committee = await getCommittee();
      return Array.isArray(committee) && committee.length ? committee : fallbackCommittee;
    } catch (error) {
      console.error("Committee data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
      return fallbackCommittee;
    }
  },
  head: () => ({
    meta: [
      { title: "About | BrightFutures Greenwich" },
      { name: "description", content: "Why BrightFutures exists and what the student-led Greenwich society stands for." },
      { property: "og:title", content: "About | BrightFutures Greenwich" },
    ],
  }),
  component: AboutPage,
});

const promises = [
  ["Find each other", "A place for care-experienced and estranged students to meet, make friends and support one another, without having to explain everything first."],
  ["Make things happen", "Socials, activities, workshops and opportunities shaped around what students actually want from their time at Greenwich."],
  ["Say it together", "Space to raise issues, share what is and isn’t working and push for practical changes that help current and future students."],
] as const;

function portraitFor(person: CommitteeMember) {
  return person.portrait_stylised || person.portrait_original || person.photo || null;
}

function CommitteePortrait({ person, index }: { person: CommitteeMember; index: number }) {
  const portrait = portraitFor(person);
  const alt = person.portrait_alt || person.photo_alt || `Portrait of ${person.name}`;
  if (portrait) return <img src={portrait} alt={alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />;
  const initials = person.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2);
  const treatments = ["bg-green", "bg-coral", "bg-coral-light"];
  return (
    <div className={`relative flex h-full items-center justify-center overflow-hidden ${treatments[index % treatments.length]}`} role="img" aria-label={`${person.name}, ${person.role}`}>
      <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full border-[20px] border-forest/15" />
      <div className="absolute bottom-8 left-8 h-20 w-20 rotate-12 border-2 border-forest/25" />
      <span className="relative font-display text-[7rem] font-semibold leading-none tracking-[-0.08em] text-forest sm:text-[9rem]">{initials}</span>
      <svg viewBox="0 0 180 50" className="absolute bottom-10 right-6 w-32 text-cream" fill="none" aria-hidden="true"><path d="M5 31c35-28 58 19 93-3 23-15 44-12 76 6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
    </div>
  );
}

function AboutPage() {
  const loaded = Route.useLoaderData();
  const people = Array.isArray(loaded) && loaded.length ? loaded : fallbackCommittee;
  const honoraryPresidents = people.filter((person) => person.role.toLowerCase() === "honorary president");
  const committee = people.filter((person) => person.role.toLowerCase() !== "honorary president");
  return (
    <div className="overflow-hidden">
      <section className="relative bg-forest px-6 py-16 text-cream sm:px-8 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block" aria-hidden="true">
          <div className="absolute right-[8%] top-[8%] h-80 w-80 rounded-full bg-green" />
          <div className="absolute right-[18%] top-[24%] w-72 rotate-6 border-2 border-forest bg-cream p-7 text-forest shadow-[12px_12px_0_#e8734a]">
            <p className="font-display text-4xl italic leading-[1.05]">Made with students, not simply for them.</p>
          </div>
          <div className="absolute bottom-[10%] right-[8%] -rotate-6 rounded-full border-2 border-cream bg-coral px-6 py-3 text-sm font-extrabold uppercase tracking-widest">Greenwich</div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl lg:w-[68%]">
            <h1 className="font-display text-[clamp(3.8rem,8vw,7.8rem)] font-medium leading-[0.9] tracking-[-0.05em]">A society shaped by the <em className="font-normal text-coral-light">students</em> in it.</h1>
            <p className="mt-9 max-w-2xl text-xl leading-relaxed text-cream/75">BrightFutures is a student-led community for care-experienced and estranged students at Greenwich. It exists because university is better when there are people around who get it.</p>
          </div>
          <div className="relative mt-12 h-36 lg:hidden" aria-hidden="true"><div className="absolute left-2 h-28 w-28 rounded-full bg-green" /><div className="absolute left-20 top-5 rotate-3 border-2 border-forest bg-cream px-5 py-4 font-display text-xl italic text-forest shadow-[7px_7px_0_#e8734a]">Made with students.</div></div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div><h2 className="font-display text-5xl leading-none text-forest sm:text-7xl">More than somewhere to show up.</h2><div className="mt-8 inline-block -rotate-2 bg-coral px-5 py-2 text-sm font-extrabold uppercase tracking-widest text-cream">Come as you are</div></div>
            <div className="space-y-7 text-lg leading-relaxed text-forest/75"><p className="font-display text-3xl leading-snug text-forest">We make room for friendships, events, projects and ideas that students actually want.</p><p>You can come along occasionally, stay connected or help run things. There’s no expected level of involvement and no need to explain your circumstances.</p><p>We also speak up. Students can share their experiences, raise issues together and help shape a better university experience for the people who come after us.</p></div>
          </div>
          <div className="mt-20 border-y-2 border-forest">
            {promises.map(([title, body], index) => (
              <article key={title} className={`grid gap-4 border-b border-forest/25 py-8 last:border-b-0 sm:grid-cols-[0.8fr_1.2fr] sm:gap-10 ${index === 1 ? "sm:ml-12" : index === 2 ? "sm:-ml-6" : ""}`}>
                <h3 className="font-display text-3xl font-semibold text-forest sm:text-4xl">{title}</h3><p className="max-w-2xl leading-relaxed text-forest/70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-coral px-6 py-20 text-forest sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="relative mx-auto h-80 w-full max-w-md" aria-hidden="true">
            <div className="absolute left-2 top-5 h-64 w-64 rounded-full bg-green" />
            <div className="absolute left-[16%] top-[16%] w-[76%] -rotate-5 border-2 border-forest bg-cream p-7 shadow-[12px_12px_0_#16332c]"><p className="font-display text-4xl italic leading-tight">Our table.<br />Our agenda.</p><div className="mt-7 flex gap-3"><span className="h-4 w-4 rounded-full bg-coral" /><span className="h-4 w-4 rounded-full bg-green" /><span className="h-4 w-4 rounded-full bg-forest" /></div></div>
          </div>
          <div><h2 className="font-display text-5xl leading-none sm:text-7xl">Students make the decisions.</h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-forest/80">BrightFutures is a University of Greenwich student society operating through Greenwich Students’ Union. We work with GSU, Greenwich Cares and university staff when it helps, but we are not a University department.</p></div>
        </div>
      </section>

      <section className="bg-cream-dim px-6 py-20 sm:px-8 lg:py-32" aria-labelledby="committee-heading">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 border-b-2 border-forest pb-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <h2 id="committee-heading" className="font-display text-6xl leading-[0.92] tracking-tight text-forest sm:text-8xl">Meet the people making it happen.</h2>
            <p className="max-w-md text-lg leading-relaxed text-forest/70 lg:justify-self-end">The committee is made up of Greenwich students. We organise the calendar, keep conversations moving and make sure members shape what comes next.</p>
          </div>
          <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {committee.map((person, index) => (
              <li key={person.id || person.name} className="group">
                <div className="relative aspect-[4/5] w-full max-w-64 overflow-hidden border-2 border-forest bg-cream shadow-[8px_8px_0_#16332c]"><CommitteePortrait person={person} index={index} /></div>
                <div className="mt-7 border-t border-forest/30 pt-5"><h3 className="font-display text-4xl text-forest">{person.name}</h3><p className="mt-2 font-bold text-coral">{person.role}</p>{person.bio ? <p className="mt-4 max-w-sm leading-relaxed text-forest/70">{person.bio}</p> : <p className="mt-4 max-w-sm leading-relaxed text-forest/60">Part of the student team shaping BrightFutures this year.</p>}</div>
              </li>
            ))}
          </ul>
          {honoraryPresidents.map((person, index) => (
            <article key={person.id || person.name} className="mt-20 grid gap-8 border-t-2 border-forest pt-10 sm:grid-cols-[12rem_1fr] sm:items-start lg:mt-24 lg:gap-12">
              <div className="relative aspect-[4/5] w-48 overflow-hidden border-2 border-forest bg-cream shadow-[6px_6px_0_#16332c] sm:w-full"><CommitteePortrait person={person} index={committee.length + index} /></div>
              <div className="max-w-3xl">
                <p className="font-display text-2xl font-semibold text-coral">Honorary President</p>
                <h3 className="mt-3 font-display text-4xl text-forest sm:text-5xl">{person.name}</h3>
                {person.bio ? <p className="mt-5 whitespace-pre-line leading-relaxed text-forest/70">{person.bio}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest px-6 py-20 text-cream sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end"><div><Sparkles className="mb-6 text-green-light" size={34} aria-hidden="true" /><h2 className="font-display text-5xl leading-none sm:text-7xl">There’s room for you here.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">Join the community, come to something when it suits you, or tell us what you’d like BrightFutures to become.</p></div><Link to="/get-involved" className="inline-flex w-fit items-center gap-3 bg-coral px-7 py-4 font-bold text-cream">Get involved <ArrowRight size={18} /></Link></div>
      </section>
    </div>
  );
}
