import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Home,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { getResources } from "@/lib/cms/server";
import type { Resource, ResourceAudience } from "@/lib/cms/types";

export const Route = createFileRoute("/resources")({
  loader: async (): Promise<Resource[]> => getResources(),
  head: () => ({
    meta: [
      { title: "Resources | BrightFutures Greenwich" },
      { name: "description", content: "Find checked money, housing, university, wellbeing and careers support for Greenwich students." },
      { property: "og:title", content: "Resources | BrightFutures Greenwich" },
    ],
  }),
  component: ResourcesPage,
});

const categories = [
  { id: "money-funding", label: "Money", prompt: "Money is tight", description: "Funding, bursaries and practical money help.", Icon: Banknote },
  { id: "accommodation", label: "Housing", prompt: "I need housing help", description: "Halls, renting and somewhere safe to stay.", Icon: Home },
  { id: "university-support", label: "University", prompt: "I need help at uni", description: "Independent advice and support at Greenwich.", Icon: GraduationCap },
  { id: "wellbeing", label: "Wellbeing", prompt: "I’m not doing okay", description: "Someone to talk to and ongoing support.", Icon: HeartHandshake },
  { id: "careers", label: "Careers", prompt: "I want work or opportunities", description: "Jobs, experience, mentoring and applications.", Icon: BriefcaseBusiness },
  { id: "life-after-university", label: "After university", prompt: "I’m graduating / thinking ahead", description: "Next steps, graduation and what comes after.", Icon: Sparkles },
] as const;

type DirectoryCategory = (typeof categories)[number]["id"];
type AudienceFilter = "" | ResourceAudience;

const audienceLabels: Record<ResourceAudience, string> = {
  "all-greenwich-students": "Everyone",
  "care-experienced-students": "Care-experienced",
  "care-leavers": "Care leavers",
  "estranged-students": "Estranged students",
  "care-experienced-and-estranged-students": "Care-experienced & estranged",
};

const categoryAliases: Partial<Record<Resource["category"], DirectoryCategory>> = {
  money: "money-funding",
  "greenwich-support": "university-support",
  opportunities: "careers",
  community: "university-support",
};

function categoryOf(resource: Resource): DirectoryCategory | null {
  const category = categoryAliases[resource.category] || resource.category;
  return categories.some(({ id }) => id === category) ? category as DirectoryCategory : null;
}

function formatReviewed(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function audienceFor(resource: Resource) {
  return resource.audience?.map((item) => audienceLabels[item]).filter(Boolean) || [];
}

function ResourceCard({ resource }: { resource: Resource }) {
  const category = categories.find(({ id }) => id === categoryOf(resource));
  const Icon = category?.Icon || Sparkles;
  const audiences = audienceFor(resource);
  const status = resource.context_label?.toLowerCase().includes("check") ? resource.context_label : null;

  return (
    <article className="group flex h-full flex-col border border-forest/15 bg-paper p-5 transition duration-200 hover:-translate-y-1 hover:border-forest/35 hover:shadow-[5px_6px_0_#f1e9d8] focus-within:border-forest/45 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.11em] text-forest/60"><span className="grid size-8 place-items-center rounded-full bg-cream-dim text-forest"><Icon size={15} aria-hidden="true" /></span>{category?.label}</span>
        {status ? <span className="max-w-40 border border-coral/35 bg-coral-light/25 px-2 py-1 text-right text-[10px] font-bold leading-tight text-forest">{status}</span> : null}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold leading-[1.04] text-forest">{resource.title}</h3>
      {resource.organisation ? <p className="mt-2 text-sm font-bold text-coral">{resource.organisation}</p> : null}
      {resource.description ? <p className="mt-3 text-sm leading-relaxed text-forest/70">{resource.description}</p> : null}
      {audiences.length ? <div className="mt-5 flex flex-wrap gap-2">{audiences.map((audience) => <span key={audience} className="border border-green/35 bg-green/10 px-2.5 py-1 text-xs font-semibold text-forest">{audience}</span>)}</div> : null}
      <div className="mt-auto pt-6">
        {resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 bg-forest px-4 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral">Visit resource <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a> : null}
        {(resource.first_stop_guidance || resource.eligibility_note || resource.last_reviewed) ? <details className="mt-4 border-t border-forest/15 pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-forest marker:content-none">More details <ChevronDown size={16} aria-hidden="true" /></summary>
          <div className="space-y-3 pt-4 text-sm leading-relaxed text-forest/68">
            {resource.first_stop_guidance ? <p><strong className="text-forest">Good first stop if…</strong><br />{resource.first_stop_guidance}</p> : null}
            {resource.eligibility_note ? <p>{resource.eligibility_note}</p> : null}
            {formatReviewed(resource.last_reviewed) ? <p className="flex items-center gap-1.5 text-xs text-forest/50"><Check size={13} aria-hidden="true" /> Checked {formatReviewed(resource.last_reviewed)}</p> : null}
          </div>
        </details> : null}
      </div>
    </article>
  );
}

function RecommendedCard({ resource }: { resource: Resource }) {
  return <article className="flex flex-col border-2 border-forest bg-paper p-6 shadow-[7px_7px_0_#e8734a] sm:p-7">
    <p className="text-xs font-extrabold uppercase tracking-[.12em] text-coral">{resource.organisation}</p>
    <h3 className="mt-3 font-display text-3xl leading-none text-forest">{resource.title}</h3>
    <p className="mt-4 leading-relaxed text-forest/72">{resource.description}</p>
    {resource.first_stop_guidance ? <p className="mt-5 border-l-2 border-green pl-3 text-sm leading-relaxed text-forest/80"><strong>Good first stop if…</strong> {resource.first_stop_guidance}</p> : null}
    <div className="mt-5 flex flex-wrap gap-2">{audienceFor(resource).map((audience) => <span key={audience} className="border border-forest/20 px-2.5 py-1 text-xs font-bold text-forest">{audience}</span>)}</div>
    {resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 font-bold text-forest underline decoration-coral decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral">Visit resource <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a> : null}
  </article>;
}

function ResourcesPage() {
  const resources = Route.useLoaderData();
  const resultsRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DirectoryCategory | "">("");
  const [audience, setAudience] = useState<AudienceFilter>("");
  const hasFilters = Boolean(query || category || audience);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory = !category || categoryOf(resource) === category;
      const matchesAudience = !audience || resource.audience?.includes(audience) || (audience !== "all-greenwich-students" && resource.audience?.includes("all-greenwich-students"));
      const searchable = [resource.title, resource.organisation, resource.description, resource.context_label, categoryOf(resource), ...audienceFor(resource)].filter(Boolean).join(" ").toLowerCase();
      return matchesCategory && matchesAudience && (!needle || searchable.includes(needle));
    });
  }, [resources, query, category, audience]);

  const recommended = useMemo(() => {
    const preferred = ["Greenwich Cares", "GSU Advice Service", "Greenwich Money Advice and Support", "Student Wellbeing Hub"];
    return preferred.map((title) => resources.find((resource) => resource.title === title)).filter((resource): resource is Resource => Boolean(resource)).slice(0, 4);
  }, [resources]);

  const urgent = resources.filter((resource) => resource.title === "Urgent housing help: homeless or at risk" || resource.title.includes("Spectrum Life"));
  const overallReview = resources.length && resources.every((resource) => resource.last_reviewed)
    ? resources.reduce((oldest, resource) => resource.last_reviewed! < oldest ? resource.last_reviewed! : oldest, resources[0].last_reviewed!)
    : null;

  const clear = () => { setQuery(""); setCategory(""); setAudience(""); };
  const chooseCategory = (id: DirectoryCategory) => {
    setCategory((current) => current === id ? "" : id);
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return <div className="overflow-hidden bg-cream">
    <section className="relative bg-forest px-5 py-14 text-cream sm:px-8 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute right-[7%] top-12 hidden size-56 rounded-full border-[28px] border-green/70 lg:block" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-extrabold tracking-[.18em] text-coral-light">RESOURCES &amp; SUPPORT</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-display text-[clamp(3.4rem,7vw,6.6rem)] leading-[.88] tracking-[-.045em]">What do you need <em className="font-normal text-coral-light">help</em> with?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/78">Money, housing, uni, wellbeing, work or figuring out what comes next. Start with what’s happening right now.</p>
          </div>
          <p className="hidden border-l border-cream/25 pl-5 text-sm leading-relaxed text-cream/70 lg:block">The links we’d send to a friend — checked, clear and ready when you need them.</p>
        </div>
        <label className="relative mt-9 block max-w-3xl" htmlFor="hero-resource-search"><span className="sr-only">Search support resources</span><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-forest" size={21} aria-hidden="true" /><input id="hero-resource-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search support, bursaries, housing, careers…" className="min-h-15 w-full border-2 border-transparent bg-paper py-4 pl-14 pr-5 text-base text-forest placeholder:text-forest/48 focus:border-coral focus:outline-none" /></label>
        <p className="mt-4 text-sm text-cream/70"><strong className="text-cream">{resources.length} checked resources</strong>{overallReview ? <> <span aria-hidden="true">·</span> last review {formatReviewed(overallReview)}</> : null}</p>
      </div>
    </section>

    <section className="bg-cream-dim px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="start-heading">
      <div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-extrabold tracking-[.15em] text-coral">START HERE</p><h2 id="start-heading" className="mt-2 font-display text-4xl leading-none text-forest sm:text-5xl">What’s happening?</h2></div><p className="max-w-md text-sm leading-relaxed text-forest/65">Choose what feels most useful. You can change it at any time.</p></div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.map(({ id, prompt, description, Icon }) => { const count = resources.filter((resource) => categoryOf(resource) === id).length; const selected = category === id; return <button key={id} type="button" aria-pressed={selected} onClick={() => chooseCategory(id)} className="group min-h-44 border border-forest/20 bg-paper p-5 text-left transition hover:-translate-y-1 hover:border-forest hover:shadow-[5px_6px_0_#85b978] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-cream">
          <span className="flex items-start justify-between"><span className="grid size-10 place-items-center rounded-full bg-green/20 text-forest group-aria-pressed:bg-coral group-aria-pressed:text-forest"><Icon size={20} aria-hidden="true" /></span><span className="text-xs font-bold opacity-65">{count} resources</span></span><span className="mt-5 block font-display text-2xl leading-none">{prompt}</span><span className="mt-2 block text-sm leading-relaxed opacity-70">{description}</span>
        </button>; })}</div>
      </div>
    </section>

    {urgent.length ? <section className="bg-forest-light px-5 py-8 text-cream sm:px-8" aria-labelledby="urgent-heading"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[15rem_1fr]"><div><p className="text-xs font-extrabold tracking-[.16em] text-coral-light">SUPPORT THAT CAN’T WAIT</p><h2 id="urgent-heading" className="mt-2 font-display text-3xl leading-none">Need help right now?</h2></div><div className="grid gap-3 md:grid-cols-2">{urgent.map((resource) => <a key={resource.id} href={resource.url || undefined} target="_blank" rel="noreferrer" className="group border border-cream/25 bg-forest/25 p-4 transition hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral"><span className="flex items-center justify-between gap-4 font-bold">{resource.title}<ExternalLink size={16} aria-hidden="true" /></span><span className="mt-2 block text-sm leading-relaxed text-cream/75">{resource.description}</span><span className="mt-3 inline-block text-xs font-bold text-coral-light">Open support <span className="sr-only">(opens in a new tab)</span></span></a>)}</div></div></section> : null}

    {recommended.length ? <section className="bg-cream px-5 py-16 sm:px-8 lg:py-24" aria-labelledby="recommended-heading"><div className="mx-auto max-w-7xl"><p className="text-xs font-extrabold tracking-[.16em] text-coral">A FEW FRIENDLY POINTERS</p><h2 id="recommended-heading" className="mt-2 font-display text-5xl leading-none text-forest sm:text-6xl">Good places to start</h2><p className="mt-4 max-w-2xl leading-relaxed text-forest/65">A small shortlist for when you’re not quite sure which door to knock on first.</p><div className="mt-9 grid gap-6 lg:grid-cols-2">{recommended.map((resource) => <RecommendedCard key={resource.id} resource={resource} />)}</div></div></section> : null}

    <section ref={resultsRef} id="resources-results" className="scroll-mt-24 border-t border-forest/15 bg-cream-dim px-5 py-16 sm:px-8 lg:py-20" aria-labelledby="finder-heading">
      <div className="mx-auto max-w-7xl"><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end"><div><p className="text-xs font-extrabold tracking-[.16em] text-coral">SUPPORT FINDER</p><h2 id="finder-heading" className="mt-2 font-display text-5xl leading-none text-forest sm:text-6xl">Find your next step</h2></div><p className="text-sm leading-relaxed text-forest/60">Tags are a guide; the official provider decides eligibility.</p></div>
        <div className="sticky top-[5.5rem] z-20 mt-8 border border-forest/15 bg-paper p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-end"><label className="block"><span className="mb-2 block text-sm font-bold text-forest">Search</span><span className="relative block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-forest/55" size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all resources" className="min-h-11 w-full border border-forest/30 bg-cream px-10 py-2 text-sm text-forest focus:border-coral focus:outline-none" /></span></label>
            <fieldset><legend className="mb-2 text-sm font-bold text-forest">Category</legend><div className="flex max-w-full gap-2 overflow-x-auto pb-1">{([{ id: "", label: "All" }, ...categories] as Array<{ id: DirectoryCategory | ""; label: string }>).map((item) => <button key={item.id} type="button" onClick={() => setCategory(item.id)} aria-pressed={category === item.id} className="min-h-10 shrink-0 border border-forest/25 px-3 text-sm font-bold text-forest transition aria-pressed:bg-forest aria-pressed:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">{item.label}</button>)}</div></fieldset>
            <label className="block"><span className="mb-2 block text-sm font-bold text-forest">Audience</span><select value={audience} onChange={(event) => setAudience(event.target.value as AudienceFilter)} className="min-h-11 w-full border border-forest/30 bg-cream px-3 text-sm text-forest focus:border-coral focus:outline-none"><option value="">Everyone</option>{Object.entries(audienceLabels).filter(([value]) => value !== "all-greenwich-students").map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-forest/10 pt-4" aria-live="polite"><p className="mr-auto text-sm text-forest/65"><strong className="text-forest">{filtered.length}</strong> {filtered.length === 1 ? "resource" : "resources"} found</p>{category ? <span className="inline-flex items-center gap-1 bg-green/15 px-2 py-1 text-xs font-bold text-forest">{categories.find((item) => item.id === category)?.label}<button type="button" onClick={() => setCategory("")} aria-label="Remove category filter"><X size={13} /></button></span> : null}{audience ? <span className="inline-flex items-center gap-1 bg-green/15 px-2 py-1 text-xs font-bold text-forest">{audienceLabels[audience]}<button type="button" onClick={() => setAudience("")} aria-label="Remove audience filter"><X size={13} /></button></span> : null}{hasFilters ? <button type="button" onClick={clear} className="min-h-10 px-2 text-sm font-bold text-forest underline decoration-coral decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">Clear filters</button> : null}</div>
        </div>
        {filtered.length ? <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div> : <div className="mt-9 border-2 border-dashed border-forest/25 bg-paper px-6 py-12 text-center"><Search className="mx-auto text-green" size={32} aria-hidden="true" /><h3 className="mt-4 font-display text-3xl text-forest">We couldn’t find a match for that.</h3><p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-forest/65">Try a broader search, or BrightFutures can point you towards an appropriate service.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={clear} className="min-h-11 bg-forest px-4 text-sm font-bold text-cream">Clear filters</button><Link to="/contact" className="inline-flex min-h-11 items-center px-4 text-sm font-bold text-forest underline decoration-coral decoration-2 underline-offset-4">Contact BrightFutures</Link></div></div>}
      </div>
    </section>

    <section className="bg-forest px-5 py-14 text-cream sm:px-8 sm:py-18"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-xs font-extrabold tracking-[.16em] text-coral-light">KEEP IT USEFUL</p><h2 className="mt-2 font-display text-5xl leading-none">Something missing?</h2><p className="mt-4 max-w-2xl leading-relaxed text-cream/75">If there’s a service, bursary or opportunity other students should know about, tell us.</p></div><Link to="/contact" className="inline-flex min-h-12 w-fit items-center gap-2 bg-coral px-5 py-3 text-sm font-bold text-forest transition hover:bg-coral-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream">Suggest a resource <ArrowRight size={17} aria-hidden="true" /></Link></div></section>
  </div>;
}
