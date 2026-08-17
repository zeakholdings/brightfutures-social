import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CommunityActionCard } from "@/components/CommunityActionCard";
import { PageHero } from "@/components/PageHero";
import { getCommunityActions } from "@/lib/cms/server";
import type { CommunityAction } from "@/lib/cms/types";

export const Route = createFileRoute("/voice")({
  loader: async (): Promise<CommunityAction[]> => getCommunityActions(),
  head: () => ({
    meta: [
      { title: "You Said. We’re Doing. | BrightFutures Greenwich" },
      {
        name: "description",
        content: "See how BrightFutures responds to themes and ideas raised by our community.",
      },
      { property: "og:title", content: "You Said. We’re Doing. | BrightFutures Greenwich" },
      {
        property: "og:description",
        content: "Theme-level updates on how community feedback helps shape BrightFutures.",
      },
    ],
  }),
  component: VoicePage,
});

function VoicePage() {
  const actions = Route.useLoaderData();
  return (
    <div>
      <PageHero
        eyebrow="Community voice"
        title="You said. We’re doing."
        body="We listen for shared themes, turn them into practical actions and report back on what happens next."
      />
      <section className="bg-cream px-6 py-16 sm:px-8 lg:py-24" aria-labelledby="actions-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="actions-heading" className="font-display text-3xl text-forest sm:text-4xl">
            What we’re acting on
          </h2>
          {actions.length ? (
            <div className="mt-10 grid items-stretch gap-7 lg:grid-cols-2">
              {actions.map((action) => (
                <CommunityActionCard key={action.id} action={action} />
              ))}
            </div>
          ) : (
            <p className="mt-8 max-w-2xl border-l-4 border-coral bg-paper px-6 py-5 leading-relaxed text-forest/70">
              We’ll share theme-level updates here when there is a published action to report.
            </p>
          )}
        </div>
      </section>
      <section className="bg-forest px-6 py-16 text-cream sm:px-8 lg:py-20" aria-labelledby="voice-cta-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="voice-cta-heading" className="font-display text-3xl sm:text-4xl">Have something we should hear?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-cream/75">
            Your feedback helps shape BrightFutures. The community check-in is a private way to share what matters to you.
          </p>
          <Link to="/check-in" className="mt-7 inline-flex items-center gap-2 bg-coral px-6 py-3 font-semibold text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream">
            Go to the community check-in <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
