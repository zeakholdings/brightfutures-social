import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Instagram, MapPin } from "lucide-react";
import { activityThemes, ideaCards, isUpcoming } from "@/data/events";
import { IdeaForm } from "@/components/IdeaForm";
import { HighlightCard } from "@/components/HighlightCard";
import { CommunityActionCard } from "@/components/CommunityActionCard";
import { getCommunityActions, getEvents, getHighlights, getSettings, getSocialCards } from "@/lib/cms/server";
import type { CommunityAction, Event, MemberHighlight, SiteSettings, SocialCard } from "@/lib/cms/types";

export const Route = createFileRoute("/")({
  loader: async (): Promise<{
    events: Event[];
    settings: SiteSettings;
    socialCards: SocialCard[];
    highlights: MemberHighlight[];
    communityActions: CommunityAction[];
  }> => {
    const [events, settings, socialCards, highlights, communityActions] = await Promise.all([
      getEvents(), getSettings(), getSocialCards(), getHighlights(), getCommunityActions(),
    ]);
    return { events, settings, socialCards, highlights, communityActions };
  },
  component: Home,
});

const realLife = [
  ["A familiar face on campus", "Come for coffee, a meal or a low-key catch-up. No networking voice required."],
  ["Plans worth leaving the library for", "Trips, creative projects, seasonal get-togethers and whatever members want to try next."],
  ["Room to say what needs saying", "Share what university is actually like and help turn lived experience into practical change."],
  ["People in your corner", "Find opportunities, swap knowledge and stay connected through the busy and difficult bits too."],
] as const;

const dateParts = (event: Event) => {
  if (!event.startDate) return { day: event.dateLabel || "TBC", month: "" };
  const date = new Date(event.startDate.includes("T") ? event.startDate : `${event.startDate}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(date),
  };
};

function EventPoster({ event, index }: { event: Event; index: number }) {
  const date = dateParts(event);
  const colours = ["bg-coral text-cream", "bg-green text-forest", "bg-cream text-forest"];
  return (
    <article className={`event-poster relative flex min-h-[31rem] flex-col overflow-hidden border-2 border-forest p-6 sm:p-8 ${colours[index % colours.length]}`}>
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[18px] border-current opacity-15" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <div className="font-display leading-none">
          <span className="block text-[5.5rem] font-semibold tracking-[-0.07em] sm:text-8xl">{date.day}</span>
          {date.month ? <span className="ml-1 block text-2xl uppercase tracking-[0.08em]">{date.month}</span> : null}
        </div>
        <span className="max-w-28 border border-current px-3 py-2 text-right text-[0.68rem] font-bold uppercase tracking-[0.14em]">{event.category}</span>
      </div>
      <div className="mt-auto pt-16">
        <h3 className="font-display text-3xl font-semibold leading-[1.05] sm:text-4xl">
          <Link to="/events/$slug" params={{ slug: event.slug }} className="after:absolute after:inset-0">{event.title}</Link>
        </h3>
        <p className="mt-4 max-w-sm leading-relaxed opacity-80">{event.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-current/30 pt-4 text-sm font-semibold">
          {event.time ? <span>{event.time}</span> : null}
          {event.location ? <span className="inline-flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" />{event.location}</span> : null}
          {!event.time && !event.location ? <span>Details coming soon</span> : null}
        </div>
      </div>
    </article>
  );
}

function Home() {
  const { events, settings, socialCards, highlights, communityActions } = Route.useLoaderData();
  const upcoming = events
    .filter((event) => event.status === "confirmed" && isUpcoming(event))
    .sort((a, b) => new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime())
    .slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[calc(100svh-77px)] bg-forest px-6 py-14 text-cream sm:px-8 sm:py-20 lg:flex lg:items-center lg:py-24">
        <div className="hero-orbit pointer-events-none absolute inset-y-0 right-0 hidden w-[49%] lg:block" aria-hidden="true">
          <div className="absolute right-[7%] top-[4%] h-[34rem] w-[34rem] rounded-full border border-cream/20" />
          <div className="absolute right-[13%] top-[12%] h-[27rem] w-[27rem] rounded-full bg-green" />
          <div className="absolute right-[8%] top-[25%] h-52 w-72 rotate-6 border-2 border-forest bg-cream p-6 text-forest shadow-[12px_12px_0_#e8734a]">
            <p className="font-display text-4xl italic leading-tight">Greenwich,<br />meet your people.</p>
            <div className="mt-8 h-1 w-20 bg-coral" />
          </div>
          <div className="absolute bottom-[12%] right-[37%] rotate-[-9deg] rounded-full bg-coral px-7 py-4 font-bold uppercase tracking-[0.12em] text-cream">you’re invited</div>
          <svg className="absolute bottom-[10%] right-[6%] w-44 text-cream" viewBox="0 0 180 120" fill="none">
            <path d="M8 98c42-78 89-86 156-27M130 45l35 26-39 17" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="max-w-4xl lg:w-[62%]">
            <h1 className="bf-rise font-display text-[clamp(3.8rem,9vw,8.6rem)] font-medium leading-[0.86] tracking-[-0.055em] [animation-delay:80ms]">
              Find your<br /><em className="font-normal text-coral-light">people</em> at<br />Greenwich.
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
              A student-led community for care-experienced and estranged students, here for the good nights, honest conversations and everything in between.
            </p>
            {settings.show_announcement && settings.homepage_announcement ? (
              <a href={settings.homepage_announcement_url || undefined} className="mt-7 block max-w-xl border-l-4 border-coral bg-cream/10 px-5 py-4">{settings.homepage_announcement}</a>
            ) : null}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={settings.membership_url} className="bg-coral px-7 py-4 text-center font-bold text-cream transition-transform hover:-translate-y-1">Join BrightFutures</a>
              <Link to="/events" className="border border-cream/40 px-7 py-4 text-center font-bold transition-colors hover:bg-cream hover:text-forest">What’s happening</Link>
            </div>
          </div>
          <div className="relative mt-14 h-48 lg:hidden" aria-hidden="true">
            <div className="absolute left-[8%] top-2 h-40 w-40 rounded-full bg-green" />
            <div className="absolute left-[28%] top-8 rotate-3 border-2 border-forest bg-cream p-5 text-forest shadow-[8px_8px_0_#e8734a]"><p className="font-display text-2xl italic">Greenwich,<br />meet your people.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="font-display text-5xl leading-[0.98] tracking-tight text-forest sm:text-7xl">So, what does it actually feel like?</h2>
              <div className="mt-8 w-28 -rotate-3 bg-green px-4 py-2 text-center text-sm font-extrabold uppercase tracking-widest text-forest">Good question</div>
            </div>
            <div className="space-y-0">
              {realLife.map(([title, body], index) => (
                <article key={title} className={`border-t border-forest/25 py-7 sm:grid sm:grid-cols-[1fr_1.25fr] sm:gap-8 ${index === 1 ? "sm:ml-12" : index === 2 ? "sm:-ml-8" : ""}`}>
                  <h3 className="font-display text-2xl font-semibold text-forest sm:text-3xl">{title}</h3>
                  <p className="mt-3 leading-relaxed text-forest/70 sm:mt-0">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-dim px-6 py-20 sm:px-8 lg:py-28" aria-labelledby="events-heading">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="events-heading" className="font-display text-6xl leading-none tracking-tight text-forest sm:text-8xl">Coming up</h2>
            <Link to="/events" className="inline-flex w-fit items-center gap-2 border-b-2 border-forest pb-1 font-bold text-forest hover:text-coral">All events <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          {upcoming.length ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-0">
              {upcoming.map((event, index) => <EventPoster key={event.slug} event={event} index={index} />)}
            </div>
          ) : <p className="mt-10 text-lg text-forest/65">New dates are being planned. Check back soon or join to hear what’s next.</p>}
        </div>
      </section>

      {(highlights.length || communityActions.length) ? (
        <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28" aria-labelledby="noticeboard-heading">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 border-b-2 border-forest pb-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <h2 id="noticeboard-heading" className="font-display text-5xl text-forest sm:text-6xl">From the community</h2>
              <p className="max-w-sm text-forest/65">Member stories and the changes we’re working on together.</p>
            </div>
            {highlights.length ? <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{highlights.slice(0, 3).map((item) => <HighlightCard key={item.id} highlight={item} />)}</div> : null}
            {communityActions.length ? <div className="mt-10 grid gap-7 lg:grid-cols-3">{communityActions.slice(0, 3).map((item) => <CommunityActionCard key={item.id} action={item} />)}</div> : null}
            <div className="mt-8 flex flex-wrap gap-6">
              {highlights.length ? <Link to="/highlights" className="inline-flex items-center gap-2 font-bold text-forest">All highlights <ArrowRight size={16} /></Link> : null}
              {communityActions.length ? <Link to="/voice" className="inline-flex items-center gap-2 font-bold text-forest">What we’re acting on <ArrowRight size={16} /></Link> : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="year-strip bg-forest py-20 text-cream lg:py-28" aria-labelledby="year-heading">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-end">
            <h2 id="year-heading" className="font-display text-5xl leading-none sm:text-7xl">BrightFutures,<br /><em className="font-normal text-green-light">all year long.</em></h2>
            <p className="max-w-xl text-lg leading-relaxed text-cream/70 lg:justify-self-end">The rhythm changes with the term. The community stays, with reasons to meet, make things and speak up from welcome week to summer.</p>
          </div>
        </div>
        <div className="mt-14 overflow-x-auto pb-8" tabIndex={0} aria-label="BrightFutures activities throughout the year">
          <div className="mx-auto flex w-max min-w-full items-center px-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))]">
            {activityThemes.map(([title, body], index) => (
              <article key={title} className={`year-stop relative w-[17rem] shrink-0 border-l border-cream/25 px-6 py-8 sm:w-[20rem] ${index % 2 ? "translate-y-8" : "-translate-y-2"}`}>
                <span className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-coral ring-4 ring-forest" aria-hidden="true" />
                <h3 className="font-display text-3xl text-cream">{title}</h3>
                <p className="mt-3 leading-relaxed text-cream/65">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-coral px-6 py-20 text-forest sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="voice-collage relative mx-auto h-[24rem] w-full max-w-lg" aria-hidden="true">
            <div className="absolute left-4 top-8 h-72 w-72 rounded-full bg-green" />
            <div className="absolute left-[18%] top-[18%] w-[72%] -rotate-6 border-2 border-forest bg-cream p-7 shadow-[12px_12px_0_#16332c]">
              <p className="font-display text-4xl italic leading-tight">There’s power in saying it together.</p>
              <svg viewBox="0 0 220 60" className="mt-8 w-full"><path d="M5 35c42-29 69 15 111-7 27-14 53-13 98 8" fill="none" stroke="#e8734a" strokeWidth="6" strokeLinecap="round" /></svg>
            </div>
          </div>
          <div>
            <h2 className="font-display text-5xl leading-[1.02] sm:text-7xl">A stronger collective voice at Greenwich.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-forest/80">We work with students, Greenwich Cares, GSU and the University to raise issues, share experiences and help improve university for the students who come after us.</p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b-2 border-forest pb-1 font-bold">What we stand for <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      {settings.instagram_url ? (
        <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28" aria-labelledby="instagram-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div><h2 id="instagram-heading" className="font-display text-5xl text-forest sm:text-6xl">See what we’re up to</h2><p className="mt-4 max-w-xl text-forest/70">Event announcements, society updates and moments from across the year.</p></div>
              <a href={settings.instagram_url} rel="noreferrer" aria-label="Follow BrightFutures on Instagram" className="inline-flex w-fit items-center gap-3 bg-forest px-6 py-3.5 font-bold text-cream"><Instagram size={19} /> Follow on Instagram</a>
            </div>
            {socialCards.length ? <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{socialCards.map((card, index) => <li key={card.id} className={`bg-paper ${index % 2 ? "lg:translate-y-8" : ""}`}>{card.post_url ? <a href={card.post_url} rel="noreferrer" aria-label={card.caption ? `${card.caption} : view on Instagram` : "View this BrightFutures post on Instagram"}><img src={card.image} alt={card.image_alt} className="aspect-square w-full object-cover" /></a> : <img src={card.image} alt={card.image_alt} className="aspect-square w-full object-cover" />}{card.caption ? <p className="p-5 leading-relaxed text-forest/70">{card.caption}</p> : null}</li>)}</ul> : null}
          </div>
        </section>
      ) : null}

      <section className="ideas-board relative bg-green px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <h2 className="font-display text-6xl leading-[0.94] tracking-tight text-forest sm:text-7xl">What should we do next?</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-forest/75">We don’t want to guess what students want. Put your idea on the board, big, small, serious or a bit weird.</p>
            <ArrowDownRight className="mt-8 hidden h-20 w-20 text-forest lg:block" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div className="relative rotate-[0.5deg] border-2 border-forest bg-paper p-5 shadow-[14px_14px_0_#16332c] sm:p-8 lg:p-10">
            <span className="absolute -top-4 left-1/2 h-8 w-32 -translate-x-1/2 -rotate-2 bg-coral-light/80" aria-hidden="true" />
            <IdeaForm categories={ideaCards} />
          </div>
        </div>
      </section>

      <section className="relative bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28">
        <div className="absolute right-[8%] top-10 hidden rotate-6 border border-cream/40 px-5 py-3 text-sm font-bold uppercase tracking-widest sm:block" aria-hidden="true">free to join</div>
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-4xl font-display text-6xl leading-[0.94] sm:text-8xl">Come as you are.</h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">Membership is free. You don’t need to attend everything, know anyone already or explain your circumstances to get involved.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={settings.membership_url} className="bg-coral px-7 py-4 text-center font-bold">Join BrightFutures</a><Link to="/events" className="border border-cream/30 px-7 py-4 text-center font-bold">See what’s on</Link></div>
        </div>
      </section>
    </div>
  );
}
