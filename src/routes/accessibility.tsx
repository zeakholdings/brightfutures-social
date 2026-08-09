import { createFileRoute } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility | BrightFutures Greenwich" },
      {
        name: "description",
        content: "The accessibility commitments behind the BrightFutures website.",
      },
    ],
  }),
  component: AccessibilityPage,
})

function AccessibilityPage() {
  return (
    <div>
      <PageHero
        eyebrow="Accessibility"
        title="Built to work for everyone."
      />
      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl space-y-6 leading-relaxed text-forest/75">
          <p>
            This site is built with semantic HTML, keyboard-navigable
            menus and forms, visible focus states, and colour contrast
            that meets WCAG AA guidelines throughout.
          </p>
          <p>
            Animations are subtle and restrained, and automatically reduced
            for anyone with a "prefers reduced motion" setting turned on in
            their browser or device.
          </p>
          <p>
            If you run into anything on this site that's hard to use, please
            tell us &mdash; it helps us fix it. Reach the committee via the{" "}
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
