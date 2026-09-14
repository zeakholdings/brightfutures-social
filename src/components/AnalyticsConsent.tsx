import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"

const PREFERENCE_KEY = "brightfutures.cookie-preferences"
const WEBSITE_ID = "d1cf0c73-b736-451d-afca-563bff2cd6b1"
const ANALYTICS_SCRIPT_ID = "zeak-insights-analytics"
const RECORDER_SCRIPT_ID = "zeak-insights-recorder"
const SESSION_RECORDING_ENABLED = import.meta.env.VITE_ZEAK_SESSION_RECORDING_ENABLED === "true"
let formProtectionObserver: MutationObserver | null = null

type Preferences = {
  version: 1
  analytics: boolean
  sessionRecording: boolean
}

function readPreferences(): Preferences | null {
  try {
    const value = window.localStorage.getItem(PREFERENCE_KEY)
    if (!value) return null
    const parsed = JSON.parse(value) as Partial<Preferences>
    if (parsed.version !== 1 || typeof parsed.analytics !== "boolean" || typeof parsed.sessionRecording !== "boolean") return null
    return { version: 1, analytics: parsed.analytics, sessionRecording: parsed.analytics && parsed.sessionRecording }
  } catch {
    return null
  }
}

function addScript(id: string, src: string) {
  if (document.getElementById(id)) return
  const script = document.createElement("script")
  script.id = id
  script.defer = true
  script.src = src
  script.dataset.websiteId = WEBSITE_ID
  document.head.appendChild(script)
}

function protectFormsFromRecording() {
  const protect = (root: ParentNode) => {
    root.querySelectorAll("form").forEach((form) => form.classList.add("rr-block"))
  }
  protect(document)
  if (formProtectionObserver) return
  formProtectionObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) {
        if (node.matches("form")) node.classList.add("rr-block")
        protect(node)
      }
    }))
  })
  formProtectionObserver.observe(document.body, { childList: true, subtree: true })
}

function applyPreferences(preferences: Preferences) {
  if (preferences.analytics) {
    addScript(ANALYTICS_SCRIPT_ID, "https://analytics.zeak.dev/script.js")
  }
  if (preferences.analytics && preferences.sessionRecording && SESSION_RECORDING_ENABLED) {
    protectFormsFromRecording()
    addScript(RECORDER_SCRIPT_ID, "https://analytics.zeak.dev/recorder.js")
  }
}

export function AnalyticsConsent() {
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [ready, setReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [sessionRecording, setSessionRecording] = useState(false)

  useEffect(() => {
    const stored = readPreferences()
    setPreferences(stored)
    setAnalytics(stored?.analytics ?? false)
    setSessionRecording(stored?.sessionRecording ?? false)
    if (stored) applyPreferences(stored)
    setReady(true)

    const openSettings = () => {
      const current = readPreferences()
      setAnalytics(current?.analytics ?? false)
      setSessionRecording(current?.sessionRecording ?? false)
      setSettingsOpen(true)
    }
    window.addEventListener("brightfutures:open-cookie-settings", openSettings)
    return () => window.removeEventListener("brightfutures:open-cookie-settings", openSettings)
  }, [])

  const save = (next: Preferences) => {
    const mustStopLoadedTracking = Boolean(
      (preferences?.analytics && !next.analytics) ||
      (preferences?.sessionRecording && !next.sessionRecording),
    )
    window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(next))
    setPreferences(next)
    setSettingsOpen(false)
    if (mustStopLoadedTracking) {
      window.location.reload()
      return
    }
    applyPreferences(next)
  }

  if (!ready || (preferences && !settingsOpen)) return null

  if (!settingsOpen) {
    return <aside className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-4xl border-2 border-forest border-t-8 border-t-coral bg-paper p-5 text-forest shadow-[8px_8px_0_#16332c] sm:inset-x-6 sm:bottom-6 sm:p-7" aria-label="Cookie and analytics choices">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
        <div>
          <h2 className="font-display text-3xl leading-tight text-forest">Cookies &amp; analytics</h2>
          <p className="mt-2 text-sm leading-relaxed text-forest/75">We use ZEAK Insights to understand how people use BrightFutures and improve the website and its services. Analytics and optional session recording stay off unless you choose them.</p>
          <p className="mt-2 text-xs leading-relaxed text-forest/60">The analytics tracker does not set cookies. We store your choice in your browser. Read our <Link to="/cookies" className="font-bold underline decoration-coral decoration-2 underline-offset-2">Cookie Policy</Link>.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:max-w-sm md:flex-wrap md:justify-end">
          <button type="button" onClick={() => save({ version: 1, analytics: true, sessionRecording: false })} className="min-h-11 bg-forest px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-light">Allow analytics</button>
          <button type="button" onClick={() => save({ version: 1, analytics: false, sessionRecording: false })} className="min-h-11 border-2 border-forest px-5 py-2.5 text-sm font-bold text-forest transition-colors hover:bg-cream">Reject</button>
          <button type="button" onClick={() => setSettingsOpen(true)} className="min-h-11 px-3 py-2.5 text-sm font-bold text-forest underline decoration-coral decoration-2 underline-offset-2">Manage choices</button>
        </div>
      </div>
    </aside>
  }

  return <div className="fixed inset-0 z-[130] grid place-items-end bg-forest/55 p-4 sm:place-items-center" role="presentation">
    <section role="dialog" aria-modal="true" aria-labelledby="privacy-settings-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto border-2 border-forest border-t-8 border-t-coral bg-paper p-6 shadow-[10px_10px_0_#16332c] sm:p-8">
      <h2 id="privacy-settings-title" className="font-display text-3xl text-forest">Cookie and privacy settings</h2>
      <p className="mt-3 text-sm leading-relaxed text-forest/65">Essential storage is always active. It remembers these choices and supports website features.</p>
      <label className="mt-6 flex items-start justify-between gap-5 border-t border-forest/15 pt-5">
        <span><strong className="text-forest">ZEAK Insights analytics</strong><span className="mt-1 block text-sm leading-relaxed text-forest/65">Collects aggregate information such as pages viewed, referrers, device type, browser, operating system, screen size, language and approximate country. The tracker does not set cookies.</span></span>
        <input type="checkbox" checked={analytics} onChange={(event) => { setAnalytics(event.target.checked); if (!event.target.checked) setSessionRecording(false) }} className="mt-1 h-5 w-5 shrink-0 accent-coral" />
      </label>
      <label className="mt-5 flex items-start justify-between gap-5 border-t border-forest/15 pt-5">
        <span><strong className="text-forest">Session recording</strong><span className="mt-1 block text-sm leading-relaxed text-forest/65">Would record clicks, scrolling and navigation to help us understand usability. Form areas are blocked. This remains technically disabled until BrightFutures completes the additional ZEAK Insights privacy configuration.</span></span>
        <input type="checkbox" checked={sessionRecording} disabled={!analytics || !SESSION_RECORDING_ENABLED} onChange={(event) => setSessionRecording(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-coral disabled:opacity-40" />
      </label>
      <p className="mt-5 text-xs leading-relaxed text-forest/55">You can change or withdraw your choice at any time. See the <Link to="/cookies" className="font-semibold underline">Cookie Policy</Link> and <Link to="/privacy" className="font-semibold underline">Privacy Policy</Link>.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => save({ version: 1, analytics, sessionRecording: analytics && sessionRecording })} className="min-h-11 bg-forest px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-light">Save choices</button>
        {preferences ? <button type="button" onClick={() => setSettingsOpen(false)} className="min-h-11 px-4 py-2.5 text-sm font-semibold text-forest underline">Cancel</button> : null}
      </div>
    </section>
  </div>
}
