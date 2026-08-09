import { createFileRoute } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | BrightFutures Greenwich" },
      {
        name: "description",
        content: "How BrightFutures Greenwich Society handles your information.",
      },
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div>
      <PageHero eyebrow="Privacy" title="How we handle your information." />
      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl space-y-6 leading-relaxed text-forest/75">
          <p>
            BrightFutures Greenwich Society is a student-led society and
            takes a minimal approach to data. We only collect what's needed
            to run the society, and nothing more.
          </p>
          <p>
            When you contact us or suggest an idea through this site, we use
            the name, email and message you provide solely to respond to you
            and, where you've opted in, to keep you updated about
            BrightFutures events. We don't sell or share this information
            with third parties.
          </p>
          <p>
            Our contact form never asks about care status, estrangement
            status, or other sensitive personal information, and you're
            never required to disclose your background to reach us or join
            the society.
          </p>
          <p>
            This site is cookie-free by default and does not use tracking
            analytics. If that ever changes, this page will be updated
            first.
          </p>
          <p>
            For questions about your data, contact the committee via the{" "}
            <a href="/contact" className="font-semibold text-forest underline">
              contact page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
