import { createFileRoute, Link } from "@tanstack/react-router"
import { PageHero } from "@/components/PageHero"

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [
    { title: "Cookie Policy | BrightFutures HQ" },
    { name: "description", content: "How BrightFutures HQ uses browser storage and ZEAK Insights." },
  ] }),
  component: CookiePolicy,
})

function CookiePolicy() {
  return <div><PageHero title="Cookie Policy" body="Last updated: 23 August 2026" />
    <article className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-3xl space-y-9 leading-relaxed text-forest/75">
      <Section title="About this policy"><p>This policy explains how BrightFutures HQ uses cookies and browser storage. BrightFutures HQ is a project of Vibes in Care CIC.</p></Section>
      <Section title="Essential preference storage"><p>We store your cookie and privacy choices in your browser&apos;s local storage under <code>brightfutures.cookie-preferences</code>. This is necessary to remember whether you accepted or rejected optional analytics and session recording. It does not track you across websites.</p></Section>
      <Section title="ZEAK Insights analytics"><p>ZEAK Insights is our self-hosted website analytics service, operated by ZEAK for BrightFutures. It helps us understand how visitors use the website and improve the website and its services.</p><p>If you allow analytics, it collects usage information including pages viewed, page titles, referrer URLs, browser language, screen size, browser, operating system, device type and approximate country. We do not use it to identify logged-in users or attach names, email addresses or form contents to analytics events.</p><p>The standard analytics tracker does not set cookies or store an analytics identifier in local storage. It can read its standard local opt-out flag. We nevertheless ask for your choice before loading it, and it remains off if you reject analytics.</p></Section>
      <Section title="Session recording"><p>ZEAK Insights can also provide session recordings showing interactions such as clicks, scrolling and navigation. This is a separate optional choice intended to help us understand website usability.</p><p>Session recording is currently disabled while BrightFutures completes additional privacy configuration. It will only load after both analytics and session-recording consent, and only when the required privacy safeguards have been enabled. Forms are marked for blocking so information entered into them is not recorded.</p><p>ZEAK Insights documents a 30-day retention period for session replays. No separate retention period for our self-hosted aggregate analytics is currently configured or documented, so we do not state one here.</p></Section>
      <Section title="Change or withdraw your choice"><p>Use the Cookie settings link in the website footer at any time. Rejecting or withdrawing analytics stops the optional scripts from loading on the next page load; the settings interface reloads the page when needed to stop tracking already active on that page.</p><p>Clearing this site&apos;s local storage will remove your saved choice and we will ask again.</p></Section>
      <Section title="More information"><p>Read our <Link to="/privacy" className="font-semibold text-forest underline">Privacy Policy</Link> for more information about how BrightFutures HQ handles personal information.</p></Section>
    </div></article>
  </div>
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="space-y-3"><h2 className="font-display text-2xl text-forest">{title}</h2>{children}</section>
}
