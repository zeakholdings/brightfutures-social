import { createFileRoute } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility | BrightFutures Greenwich" }, { name: "description", content: "The accessibility approach behind the BrightFutures website." }] }),
  component: AccessibilityPage,
})

function AccessibilityPage() {
  return <div><PageHero eyebrow="Accessibility" title="Built to work for everyone."/><section className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-3xl space-y-8 leading-relaxed text-forest/75">
    <p>The site has been designed with WCAG 2.2 AA accessibility principles in mind. This is not a claim of full conformance, and the site has not yet had a complete formal accessibility audit.</p>
    <section><h2 className="font-display text-2xl text-forest">What we have put in place</h2><ul className="mt-3 list-disc space-y-2 pl-6"><li>A skip link and clear page landmarks</li><li>One main heading on each public page and a logical heading structure</li><li>Keyboard-operable navigation and forms with visible focus indicators</li><li>Associated form labels, clear required-field guidance and status messages</li><li>Alternative text for published content images</li><li>Responsive layouts that support mobile screens and browser text scaling</li><li>Reduced animation when your device requests reduced motion</li></ul></section>
    <section><h2 className="font-display text-2xl text-forest">Tell us about a problem</h2><p className="mt-3">If anything on this site is hard to use, please tell us what happened and which page you were using. Reach the committee through the <a href="/contact" className="font-semibold text-forest underline">contact page</a>.</p></section>
  </div></section></div>
}
