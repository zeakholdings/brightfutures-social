import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getResources } from "@/lib/cms/server";
import type { Resource, ResourceAudience } from "@/lib/cms/types";

export const Route = createFileRoute("/resources")({
  loader: async (): Promise<Resource[]> => getResources(),
  head: () => ({
    meta: [
      { title: "Resources | BrightFutures Greenwich" },
      {
        name: "description",
        content:
          "Money, housing, wellbeing, university support and careers resources for Greenwich students.",
      },
      { property: "og:title", content: "Resources | BrightFutures Greenwich" },
    ],
  }),
  component: ResourcesPage,
});

const categoryDetails = [
  ["money-funding", "Money & funding", "I need help with money", "Bursaries, hardship support and Student Finance."],
  ["accommodation", "Housing", "I need somewhere to live or housing help", "Halls, holidays and housing help."],
  ["university-support", "University support", "I need help with university", "People and services at Greenwich."],
  ["wellbeing", "Wellbeing", "I’m struggling or need wellbeing support", "When things aren’t feeling manageable."],
  ["careers", "Careers & opportunities", "I want careers or opportunities", "Jobs, applications, placements and experience."],
  ["life-after-university", "Life after university", "I’m graduating or thinking about life after uni", "Graduating, moving on and figuring out the next bit."],
] as const;

type DirectoryCategory = (typeof categoryDetails)[number][0];

const categoryLabels = Object.fromEntries(
  categoryDetails.map(([slug, label]) => [slug, label]),
) as Record<DirectoryCategory, string>;

const audienceLabels: Record<ResourceAudience, string> = {
  "all-greenwich-students": "All Greenwich students",
  "care-experienced-students": "Care-experienced students",
  "care-leavers": "Care leavers",
  "estranged-students": "Estranged students",
  "care-experienced-and-estranged-students": "Care-experienced & estranged students",
};

const categoryAliases: Partial<Record<Resource["category"], DirectoryCategory>> = {
  money: "money-funding",
  "greenwich-support": "university-support",
  opportunities: "careers",
  community: "university-support",
};

function directoryCategory(resource: Resource): DirectoryCategory | null {
  const category = categoryAliases[resource.category] || resource.category;
  return category in categoryLabels ? (category as DirectoryCategory) : null;
}

function isGreenwichCares(resource: Resource) {
  return `${resource.title} ${resource.organisation || ""}`
    .toLowerCase()
    .includes("greenwich cares");
}

function reviewedDate(value: string, dateStyle: "long" | "monthYear" = "monthYear") {
  return new Intl.DateTimeFormat("en-GB", dateStyle === "long"
    ? { day: "numeric", month: "long", year: "numeric" }
    : { month: "long", year: "numeric" }).format(
    new Date(value.includes("T") ? value : `${value}T12:00:00`),
  );
}

function ResourceDetails({ resource, featured = false }: { resource: Resource; featured?: boolean }) {
  const audience = resource.audience?.map((value) => audienceLabels[value]).filter(Boolean) || [];

  return (
    <article
      className={featured
        ? "relative border-t-2 border-forest bg-paper px-5 py-7 shadow-[6px_6px_0_#e8734a] sm:px-7 sm:py-8"
        : "border-t border-forest/20 py-7 first:border-t-0 sm:py-8"}
    >
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_10.5rem] sm:items-center sm:gap-8">
        <div className="min-w-0">
          <h3 className={`break-words font-display font-semibold leading-[1.08] text-forest ${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{resource.title}</h3>
          {resource.organisation ? <p className="mt-1.5 text-sm font-semibold text-coral">{resource.organisation}</p> : null}
          {resource.description ? <p className="mt-3 max-w-3xl leading-relaxed text-forest/70">{resource.description}</p> : null}
          {resource.first_stop_guidance ? (
            <div className="mt-4 max-w-3xl border-l-2 border-green pl-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-forest/55">Good first stop if…</p>
              <p className="mt-1 text-sm leading-relaxed text-forest/80">{resource.first_stop_guidance}</p>
            </div>
          ) : null}
          {audience.length ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-forest/60">
              <span className="font-semibold text-forest/75">Who it’s for:</span>{" "}
              {audience.join("; ")}
            </p>
          ) : null}
          {resource.eligibility_note ? (
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-forest/55">
              {resource.eligibility_note}
            </p>
          ) : null}
          {audience.length || resource.eligibility_note ? (
            <p className="mt-1.5 text-xs text-forest/45">
              {resource.last_reviewed ? `Checked ${reviewedDate(resource.last_reviewed)}. ` : ""}The official provider decides eligibility.
            </p>
          ) : resource.last_reviewed ? <p className="mt-1.5 text-xs text-forest/45">Checked {reviewedDate(resource.last_reviewed)}.</p> : null}
        </div>
        {resource.url ? (
          <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 bg-forest px-5 py-3.5 text-sm font-bold text-cream transition-transform hover:-translate-y-1 sm:w-full sm:justify-center">
            Visit resource <ExternalLink size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ResourcesPage() {
  const resources = Route.useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<ResourceAudience | "">("");
  const audienceFilteredResources = selectedAudience
    ? resources.filter((resource) => resource.audience?.includes(selectedAudience))
    : resources;
  // Only make an overall claim when every displayed resource has been checked.
  // The oldest date is conservative when records were reviewed on different days.
  const overallReview = resources.length && resources.every((resource) => resource.last_reviewed)
    ? resources.reduce<string>((oldest, resource) =>
        resource.last_reviewed! < oldest ? resource.last_reviewed! : oldest,
      resources[0].last_reviewed!)
    : null;
  const featured = audienceFilteredResources.find(isGreenwichCares);
  const startHerePriorities = [
    "greenwich cares",
    "gsu advice",
    "money advice",
    "student wellbeing hub",
    "accommodation for care-experienced",
  ];
  const startHere = [
    ...audienceFilteredResources.filter((resource) => resource.featured),
    ...startHerePriorities.map((term) => audienceFilteredResources.find((resource) =>
      `${resource.title} ${resource.organisation || ""}`.toLowerCase().includes(term),
    )),
  ]
    .filter((resource): resource is Resource => !!resource)
    .filter((resource, index, list) => list.findIndex((item) => item.id === resource.id) === index)
    .slice(0, 5);
  const recommended = selectedCategory
    ? startHere.filter((resource) => directoryCategory(resource) === selectedCategory)
    : startHere;
  const visibleCategories = selectedCategory
    ? categoryDetails.filter(([slug]) => slug === selectedCategory)
    : categoryDetails;
  const selectedLabel = selectedCategory ? categoryLabels[selectedCategory] : null;
  const selectedAudienceLabel = selectedAudience ? audienceLabels[selectedAudience] : null;
  const resultCount = selectedCategory
    ? audienceFilteredResources.filter((resource) => directoryCategory(resource) === selectedCategory).length
    : audienceFilteredResources.length;

  return (
    <div className="overflow-hidden bg-cream">
      <section className="relative bg-forest px-6 py-16 text-cream sm:px-8 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block" aria-hidden="true">
          <div className="absolute right-[8%] top-[7%] h-72 w-72 rounded-full bg-green" />
          <div className="absolute right-[15%] top-[24%] w-72 rotate-3 border-2 border-forest bg-cream p-7 text-forest shadow-[12px_12px_0_#e8734a]">
            <p className="font-display text-4xl italic leading-tight">The links we’d send to a friend.</p>
            <svg viewBox="0 0 220 55" className="mt-7 w-full" fill="none"><path d="M5 32c40-25 70 17 111-5 30-16 56-10 99 7" stroke="#5c9a5f" strokeWidth="6" strokeLinecap="round" /></svg>
          </div>
          <div className="absolute bottom-[9%] right-[7%] -rotate-6 bg-coral px-5 py-3 text-xs font-extrabold uppercase tracking-[0.15em]">Keep this handy</div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl lg:w-[68%]">
            <h1 className="font-display text-[clamp(3.8rem,8vw,7.8rem)] font-medium leading-[0.88] tracking-[-0.05em]">Need a hand with <em className="font-normal text-coral-light">something?</em></h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/78 sm:text-xl">Money, housing, uni support, wellbeing, careers — we’ve pulled together the places that are actually worth knowing about.</p>
            {overallReview ? <p className="mt-4 text-sm text-cream/60">Information last reviewed: {reviewedDate(overallReview, "long")}</p> : null}
          </div>
          <div className="relative mt-12 h-32 lg:hidden" aria-hidden="true"><div className="absolute left-1 top-1 h-24 w-24 rounded-full bg-green" /><div className="absolute left-14 top-5 rotate-2 border-2 border-forest bg-cream px-5 py-4 font-display text-xl italic text-forest shadow-[7px_7px_0_#e8734a]">Keep this handy.</div></div>
        </div>
      </section>

      <section className="bg-cream-dim px-6 py-14 sm:px-8 lg:py-20" aria-labelledby="category-heading">
        <div className="mx-auto max-w-7xl">
          <div className="border-b-2 border-forest pb-6">
            <h2 id="category-heading" className="font-display text-4xl text-forest sm:text-5xl">What do you need help with?</h2>
            <p className="mt-3 text-forest/62">Jump straight to what you need.</p>
          </div>
          <nav className="mt-2" aria-label="Filter resources by what you need">
            {categoryDetails.map(([slug, , journey, description]) => (
              <button key={slug} type="button" aria-pressed={selectedCategory === slug} onClick={(event) => {
                setSelectedCategory(slug);
                if (event.detail > 0) window.setTimeout(() => document.getElementById("resources-results")?.scrollIntoView(), 0);
              }} className="group grid w-full gap-1 border-b border-forest/20 px-2 py-5 text-left text-forest transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-coral aria-pressed:bg-paper sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-6 sm:px-4">
                <span className="font-display text-2xl font-semibold">{journey}</span>
                <span className="pr-4 text-sm leading-relaxed text-forest/62">{description}</span>
                <ArrowRight className="mt-2 transition-transform group-hover:translate-x-1 sm:mt-0" size={19} aria-hidden="true" />
              </button>
            ))}
            {selectedCategory ? <button type="button" onClick={() => setSelectedCategory(null)} className="mt-5 font-bold text-forest underline decoration-coral decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral">Show all resources</button> : null}
          </nav>
        </div>
      </section>

      <section id="resources-results" className="scroll-mt-24 bg-cream px-6 py-16 sm:scroll-mt-28 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {!resources.length ? (
            <div className="relative max-w-3xl border-l-4 border-coral py-3 pl-6 sm:pl-9">
              <div className="absolute -right-20 -top-8 hidden h-36 w-36 rounded-full border-[18px] border-green/30 sm:block" aria-hidden="true" />
              <h2 className="font-display text-4xl leading-tight text-forest sm:text-6xl">We’re putting this together properly.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-forest/70">Rather than filling this page with random links, we’re checking the services we recommend first. Got one we should know about?</p>
              <Link to="/contact" className="mt-7 inline-flex items-center gap-2 bg-forest px-6 py-3.5 font-bold text-cream">Tell us about a resource <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          ) : (
            <>
              <div className="mb-12 max-w-sm lg:mb-16">
                <label htmlFor="audience-filter" className="block text-sm font-semibold text-forest">Filter by audience <span className="font-normal text-forest/55">(optional)</span></label>
                <select id="audience-filter" value={selectedAudience} onChange={(event) => setSelectedAudience(event.target.value as ResourceAudience | "")} className="mt-2 w-full border border-forest/35 bg-paper px-3 py-3 text-sm text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">
                  <option value="">All audiences</option>
                  {Object.entries(audienceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <p className="mt-2 text-xs leading-relaxed text-forest/55">Tags are a guide only. Check the provider’s criteria before applying.</p>
              </div>
              {startHere.length ? (
                <section aria-labelledby="start-here-heading">
                  <div className="border-b-2 border-forest pb-6">
                    <h2 id="start-here-heading" className="font-display text-5xl leading-none text-forest sm:text-6xl">Recommended starting points</h2>
                    <p className="mt-3 max-w-2xl text-forest/62">{selectedLabel ? `Useful places to try first for ${selectedLabel.toLowerCase()}.` : "A few useful Greenwich places to try first."}</p>
                  </div>
                  {recommended.length ? (
                    <div className="mt-7 space-y-3">{recommended.map((resource) => <ResourceDetails key={resource.id} resource={resource} featured={resource.id === featured?.id} />)}</div>
                  ) : (
                    <p className="mt-6 border-l-2 border-green pl-4 text-sm text-forest/60">No single starting point is highlighted for this need yet. The checked options are below.</p>
                  )}
                </section>
              ) : null}

              <section className={startHere.length ? "mt-20 lg:mt-28" : ""} aria-labelledby="browse-heading">
                <div className="border-b-2 border-forest pb-6">
                  <h2 id="browse-heading" className="font-display text-5xl leading-none text-forest sm:text-6xl">Relevant resources</h2>
                  <p className="mt-3 text-sm text-forest/62" aria-live="polite">{selectedAudienceLabel ? `${resultCount} resource${resultCount === 1 ? "" : "s"} tagged for ${selectedAudienceLabel.toLowerCase()}${selectedLabel ? ` in ${selectedLabel.toLowerCase()}` : ""}.` : selectedLabel ? `Showing ${selectedLabel.toLowerCase()} resources.` : `All ${resources.length} checked places, grouped by what you need.`}</p>
                </div>
                <div>
                  {visibleCategories.map(([slug, label, , description]) => {
                    const categoryResources = audienceFilteredResources.filter((resource) => directoryCategory(resource) === slug);
                    return (
                      <section key={slug} id={slug} className="scroll-mt-28 border-b-2 border-forest/25 py-12 last:border-b-0 sm:scroll-mt-32 sm:py-16" aria-labelledby={`${slug}-heading`}>
                        <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
                          <h3 id={`${slug}-heading`} className="font-display text-4xl leading-none text-forest sm:text-5xl">{label}</h3>
                          <p className="max-w-xl text-forest/60 lg:pt-2">{description}</p>
                        </div>
                        {categoryResources.length ? (
                          <div className="mt-7 lg:ml-[calc(36%+1.5rem)]">{categoryResources.map((resource) => <ResourceDetails key={resource.id} resource={resource} />)}</div>
                        ) : (
                          <p className="mt-6 border-l-2 border-green pl-4 text-sm text-forest/55">{selectedAudience ? "No resources with this audience tag in this section." : "Nothing checked for this section yet."}</p>
                        )}
                      </section>
                    );
                  })}
                </div>
              </section>
              <aside className="mt-12 border-t border-forest/20 pt-7 text-forest/70" aria-labelledby="not-sure-heading">
                <h2 id="not-sure-heading" className="font-display text-2xl font-semibold text-forest">Not sure where to start?</h2>
                <p className="mt-2 max-w-3xl leading-relaxed">BrightFutures can help you find the right service. We’re a student community, though, rather than an advice, counselling or emergency service.</p>
                <p className="mt-4 text-sm">Something missing? <Link to="/contact" className="font-bold text-forest underline decoration-coral decoration-2 underline-offset-4">Tell us about a resource</Link>.</p>
              </aside>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
