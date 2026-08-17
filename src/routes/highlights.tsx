import { createFileRoute } from "@tanstack/react-router";
import { HighlightCard } from "@/components/HighlightCard";
import { PageHero } from "@/components/PageHero";
import { getHighlights } from "@/lib/cms/server";
import type { MemberHighlight } from "@/lib/cms/types";

export const Route = createFileRoute("/highlights")({
  loader: async (): Promise<MemberHighlight[]> => getHighlights(),
  head: () => ({
    meta: [
      { title: "Member Highlights | BrightFutures Greenwich" },
      {
        name: "description",
        content: "Celebrate the things BrightFutures members are building, trying and achieving.",
      },
      {
        property: "og:title",
        content: "Member Highlights | BrightFutures Greenwich",
      },
      {
        property: "og:description",
        content: "Small wins, big wins and the things our community chooses to celebrate.",
      },
    ],
  }),
  component: HighlightsPage,
});

function HighlightsPage() {
  const highlights = Route.useLoaderData();

  return (
    <div>
      <PageHero
        eyebrow="Member highlights"
        title="Small wins. Big wins. Your wins."
        body="BrightFutures is about more than belonging. We want to celebrate the things our members are building, trying and achieving, in whatever form that takes."
      />
      <section className="relative overflow-hidden bg-green/20 px-6 py-16 sm:px-8 lg:py-24" aria-labelledby="highlights-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="highlights-heading" className="font-display text-4xl text-forest sm:text-6xl">
            Celebrated by our community
          </h2>
          {highlights.length ? (
            <div className="mt-12 grid items-stretch gap-9 md:grid-cols-2 lg:grid-cols-3">
              {highlights.map((highlight) => (
                <HighlightCard key={highlight.id} highlight={highlight} />
              ))}
            </div>
          ) : (
            <div className="mt-10 max-w-2xl border-l-4 border-coral bg-paper px-6 py-6 sm:px-8">
              <p className="text-lg leading-relaxed text-forest/70">
                We’ll share member highlights here when people choose to celebrate them with the community.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
