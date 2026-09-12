import { createFileRoute } from "@tanstack/react-router"
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  FileText,
  Gauge,
  ListChecks,
  LogOut,
  Megaphone,
  Mic2,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Users,
} from "lucide-react"
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Voices of Change Studio | BrightFutures" },
      { name: "description", content: "Private BrightFutures podcast production workspace." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: StudioPage,
})

type Session = { name: string; role: string }
type Episode = {
  id: string
  episodeNumber?: string
  title: string
  status: string
  owner?: string
  host?: string
  recordingDate?: string
  releaseDate?: string
  coreIdea?: string
  purpose?: string
  desiredOutcome?: string
  questions?: string
  sensitivities?: string
  updatedAt?: string
}
type Task = {
  id: string
  episodeId?: string
  title: string
  owner?: string
  dueDate?: string
  status: string
  priority?: string
  notes?: string
}
type ScriptVersion = {
  id: string
  episodeId: string
  version: number
  status: string
  content: string
  updatedAt?: string
  updatedBy?: string
}
type Contributor = {
  id: string
  episodeId?: string
  name: string
  role?: string
  email?: string
  invitationStatus?: string
  consentStatus?: string
  boundaries?: string
}
type MarketingAsset = {
  id: string
  episodeId?: string
  type: string
  platform?: string
  owner?: string
  dueDate?: string
  status: string
  copy?: string
}
type Member = { id: string; name: string; role?: string; email?: string }
type Activity = { id: string; actor?: string; action?: string; label?: string; at?: string; collection?: string }

type CollectionMap = {
  episodes: Episode
  tasks: Task
  scripts: ScriptVersion
  contributors: Contributor
  marketing: MarketingAsset
  members: Member
  activity: Activity
}

type Tab = "dashboard" | "episodes" | "scripts" | "tasks" | "contributors" | "marketing" | "team"

const EPISODE_STATUSES = [
  "Idea",
  "Approved",
  "Guest Outreach",
  "Scheduled",
  "Recorded",
  "Editing",
  "Review",
  "Social Content",
  "Scheduled for Release",
  "Published",
]
const TASK_STATUSES = ["To do", "In progress", "Waiting", "Done"]

const SEED_EPISODES: Omit<Episode, "id">[] = [
  {
    episodeNumber: "01",
    title: "The Care Cliff: What Happens When Support Suddenly Ends?",
    status: "Approved",
    coreIdea: "Explore repeated transition points where support reduces just as care-experienced young people are expected to become more independent, including the transition through university and graduation.",
    desiredOutcome: "Help listeners understand that transition is not a single event at 18 and identify what better support through university and graduate life could look like.",
    questions: "What does the care cliff feel like?\nDoes turning 18 mean somebody is ready for independence?\nWhat changes when university support ends?\nWhat would a better transition look like?",
    sensitivities: "Mental health, isolation, care transitions and potentially difficult personal experiences. Lived experience should lead and nobody should feel expected to disclose trauma.",
  },
  {
    episodeNumber: "02",
    title: "Is the System Really Preparing Young People for Adulthood?",
    status: "Idea",
    coreIdea: "Explore adultification, independence and the pressure placed on care-experienced young people to appear capable before they feel ready.",
    desiredOutcome: "Challenge the assumption that independence means somebody no longer needs care, guidance or emotional support.",
  },
  {
    episodeNumber: "03",
    title: "Who Am I When My Story Is Written by Other People?",
    status: "Idea",
    coreIdea: "Explore identity, professional records and what it means when significant parts of childhood have been documented through other people's perspectives.",
    desiredOutcome: "Create a conversation about identity and ownership of personal stories without asking contributors to disclose the contents of their care files.",
    sensitivities: "Care records, childhood experiences and identity. Contributors should set boundaries before recording.",
  },
  {
    episodeNumber: "04",
    title: "Care Stigma, Criminalisation and Self-Belief",
    status: "Idea",
    coreIdea: "Examine how stigma, policing, school exclusion and behavioural labels can affect identity and self-belief without framing care-experienced young people as inherently criminal.",
    desiredOutcome: "A conversation about stigma, identity and possibility rather than a simplistic conversation about care and crime.",
  },
  {
    episodeNumber: "05",
    title: "If We Could Change the Care System, What Would We Change?",
    status: "Idea",
    coreIdea: "A BrightFutures member-led roundtable that turns lived experience into a small number of clear proposals for change.",
    desiredOutcome: "Finish with practical ideas young people believe would make the care and leaving-care system better.",
  },
  {
    episodeNumber: "06",
    title: "Who Made Us Believe More Was Possible?",
    status: "Idea",
    coreIdea: "A warmer conversation about role models, relationships, aspiration, representation and the people who helped care-experienced students imagine more for themselves.",
    desiredOutcome: "Celebrate relationships and social capital without pretending individual resilience solves structural problems.",
  },
  {
    episodeNumber: "07",
    title: "The Care-Experienced Student Experience Across Universities",
    status: "Idea",
    coreIdea: "Compare student experiences across institutions and identify what universities can learn from one another without turning the episode into a league table.",
    desiredOutcome: "Begin building a cross-university conversation and explore whether there should be a minimum national offer for care-experienced students.",
  },
  {
    episodeNumber: "08",
    title: "What Does Good Support Actually Feel Like?",
    status: "Idea",
    coreIdea: "Move beyond lists of services and ask what consistency, trust, follow-up, flexibility and relationship-based support actually feel like to students.",
    desiredOutcome: "Create a student-led description of meaningful support that can be useful beyond the podcast itself.",
  },
  {
    episodeNumber: "Special",
    title: "Voices of Change Roundtable: What Have We Learned?",
    status: "Idea",
    coreIdea: "Bring members together to reflect on themes across the series, what changed their thinking and what Voices of Change should investigate next.",
    desiredOutcome: "Close the calendar year with reflection, learning and priorities for 2027.",
  },
]

const SEED_MEMBERS: Omit<Member, "id">[] = [
  { name: "Arshan Mahi", role: "Podcast Lead" },
  { name: "April S Williams", role: "BrightFutures team" },
  { name: "Pragati Sahu", role: "BrightFutures team" },
  { name: "Faduma Hussein", role: "BrightFutures team" },
]

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "same-origin",
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || "Request failed")
  return data as T
}

async function loadCollection<K extends keyof CollectionMap>(collection: K): Promise<CollectionMap[K][]> {
  const data = await api<{ records: CollectionMap[K][] }>(`/api/studio/data?collection=${collection}`)
  return data.records
}

async function saveRecord<K extends keyof CollectionMap>(collection: K, record: Partial<CollectionMap[K]>) {
  const data = await api<{ record: CollectionMap[K] }>(`/api/studio/data?collection=${collection}`, {
    method: "POST",
    body: JSON.stringify({ record }),
  })
  return data.record
}

function StudioPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [checking, setChecking] = useState(true)
  const [tab, setTab] = useState<Tab>("dashboard")
  const [error, setError] = useState("")

  useEffect(() => {
    api<{ session: Session }>("/api/studio/session")
      .then((data) => setSession(data.session))
      .catch(() => setSession(null))
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div className="min-h-[70vh] grid place-items-center bg-cream px-6">
        <div className="flex items-center gap-3 text-forest"><RefreshCw className="h-5 w-5 animate-spin" /> Opening Voices of Change Studio…</div>
      </div>
    )
  }

  if (!session) return <LoginScreen onLogin={setSession} />

  return (
    <StudioWorkspace
      session={session}
      tab={tab}
      setTab={setTab}
      error={error}
      setError={setError}
      onLogout={async () => {
        await api("/api/studio/session", { method: "DELETE" }).catch(() => undefined)
        setSession(null)
      }}
    />
  )
}

function LoginScreen({ onLogin }: { onLogin: (session: Session) => void }) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError("")
    try {
      const data = await api<{ session: Session }>("/api/studio/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
      })
      onLogin(data.session)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in")
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="min-h-[72vh] bg-forest text-cream px-6 py-16 grid place-items-center">
      <div className="w-full max-w-md rounded-[2rem] bg-cream text-ink p-8 shadow-2xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-coral text-forest"><Mic2 /></div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-green">BrightFutures</p>
          <h1 className="mt-2 font-display text-4xl leading-tight">Voices of Change Studio</h1>
          <p className="mt-3 text-sm text-forest/70">Private production workspace for the podcast team.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Your name">
            <input value={name} onChange={(e) => setName(e.target.value)} required className="studio-input" placeholder="e.g. Arshan" />
          </Field>
          <Field label="Team access code">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="studio-input" placeholder="••••••••" />
          </Field>
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-forest px-5 py-3 font-semibold text-cream transition hover:bg-forest-light disabled:opacity-60">
            {busy ? "Signing in…" : "Enter studio"}
          </button>
        </form>
      </div>
    </section>
  )
}

function StudioWorkspace({
  session,
  tab,
  setTab,
  error,
  setError,
  onLogout,
}: {
  session: Session
  tab: Tab
  setTab: (tab: Tab) => void
  error: string
  setError: (value: string) => void
  onLogout: () => void
}) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [scripts, setScripts] = useState<ScriptVersion[]>([])
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [marketing, setMarketing] = useState<MarketingAsset[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [activity, setActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const seeded = useRef(false)

  async function refresh() {
    setLoading(true)
    setError("")
    try {
      const [episodeData, taskData, scriptData, contributorData, marketingData, memberData, activityData] = await Promise.all([
        loadCollection("episodes"),
        loadCollection("tasks"),
        loadCollection("scripts"),
        loadCollection("contributors"),
        loadCollection("marketing"),
        loadCollection("members"),
        loadCollection("activity"),
      ])

      if (episodeData.length === 0 && !seeded.current) {
        seeded.current = true
        await Promise.all([
          ...SEED_EPISODES.map((episode) => saveRecord("episodes", episode)),
          ...SEED_MEMBERS.map((member) => saveRecord("members", member)),
        ])
        return refresh()
      }

      setEpisodes(episodeData.sort((a, b) => String(a.episodeNumber || "").localeCompare(String(b.episodeNumber || ""), undefined, { numeric: true })))
      setTasks(taskData)
      setScripts(scriptData)
      setContributors(contributorData)
      setMarketing(marketingData)
      setMembers(memberData)
      setActivity(activityData.sort((a, b) => String(b.at || "").localeCompare(String(a.at || ""))))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load studio data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const nav: { id: Tab; label: string; icon: typeof Gauge }[] = [
    { id: "dashboard", label: "Dashboard", icon: Gauge },
    { id: "episodes", label: "Episodes", icon: Mic2 },
    { id: "scripts", label: "Scripts", icon: FileText },
    { id: "tasks", label: "Tasks", icon: ListChecks },
    { id: "contributors", label: "Contributors", icon: Users },
    { id: "marketing", label: "Marketing", icon: Megaphone },
    { id: "team", label: "Team", icon: Users },
  ]

  return (
    <div className="bg-[#f4f1e8] min-h-screen text-slate-900 font-body">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-xl shadow-forest/5">
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-forest px-6 py-5 text-cream lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-forest"><Mic2 className="h-6 w-6" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-green">BrightFutures</p>
                <h1 className="font-display text-2xl">Voices of Change Studio</h1>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-white/10 px-4 py-2">Signed in as <strong>{session.name}</strong></span>
              <button onClick={refresh} className="rounded-xl p-2 hover:bg-white/10" aria-label="Refresh"><RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} /></button>
              <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20"><LogOut className="h-4 w-4" /> Sign out</button>
            </div>
          </header>

          <div className="grid lg:grid-cols-[230px_1fr]">
            <aside className="border-b border-slate-200 bg-[#fbfaf6] p-3 lg:min-h-[760px] lg:border-b-0 lg:border-r">
              <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
                {nav.map((item) => {
                  const Icon = item.icon
                  return (
                    <button key={item.id} onClick={() => setTab(item.id)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${tab === item.id ? "bg-forest text-cream shadow" : "text-forest hover:bg-forest/5"}`}>
                      <Icon className="h-4 w-4" /> {item.label}
                    </button>
                  )
                })}
              </nav>
            </aside>

            <main className="min-w-0 p-5 sm:p-7 lg:p-9">
              {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
              {loading && episodes.length === 0 ? (
                <div className="grid min-h-[500px] place-items-center text-forest/60"><RefreshCw className="h-7 w-7 animate-spin" /></div>
              ) : (
                <>
                  {tab === "dashboard" && <Dashboard episodes={episodes} tasks={tasks} activity={activity} />}
                  {tab === "episodes" && <EpisodesPanel episodes={episodes} members={members} onSaved={refresh} />}
                  {tab === "scripts" && <ScriptsPanel episodes={episodes} scripts={scripts} onSaved={refresh} />}
                  {tab === "tasks" && <TasksPanel episodes={episodes} tasks={tasks} members={members} onSaved={refresh} />}
                  {tab === "contributors" && <ContributorsPanel episodes={episodes} contributors={contributors} onSaved={refresh} />}
                  {tab === "marketing" && <MarketingPanel episodes={episodes} marketing={marketing} members={members} onSaved={refresh} />}
                  {tab === "team" && <TeamPanel members={members} onSaved={refresh} />}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ episodes, tasks, activity }: { episodes: Episode[]; tasks: Task[]; activity: Activity[] }) {
  const published = episodes.filter((e) => e.status === "Published").length
  const active = episodes.filter((e) => !["Idea", "Published"].includes(e.status)).length
  const openTasks = tasks.filter((t) => t.status !== "Done").length
  const overdue = tasks.filter((t) => t.status !== "Done" && t.dueDate && new Date(t.dueDate) < new Date()).length
  const upcoming = [...episodes]
    .filter((e) => e.recordingDate || e.releaseDate)
    .sort((a, b) => String(a.recordingDate || a.releaseDate).localeCompare(String(b.recordingDate || b.releaseDate)))
    .slice(0, 6)

  return (
    <div className="space-y-8">
      <PageTitle eyebrow="Production overview" title="Everything the team needs to move episodes forward." subtitle="See what is active, what is blocked and what needs attention next." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Episodes" value={episodes.length} icon={Mic2} />
        <Stat label="In production" value={active} icon={CircleDot} />
        <Stat label="Open tasks" value={openTasks} icon={ListChecks} />
        <Stat label="Overdue" value={overdue} icon={CalendarDays} warning={overdue > 0} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <Panel title="Episode pipeline" subtitle={`${published} published so far`}>
          <div className="space-y-3">
            {episodes.slice(0, 8).map((episode) => (
              <div key={episode.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3">
                <div className="min-w-0"><p className="truncate font-semibold">{episode.episodeNumber ? `${episode.episodeNumber}. ` : ""}{episode.title}</p><p className="mt-1 text-xs text-slate-500">{episode.owner || "Owner not assigned"}</p></div>
                <Status>{episode.status}</Status>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Recent activity" subtitle="Shared team history">
          <div className="space-y-4">
            {activity.slice(0, 8).map((item) => (
              <div key={item.id} className="flex gap-3 text-sm"><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green" /><div><p><strong>{item.actor || "Team"}</strong> {item.action || "updated"} <span className="font-medium">{item.label}</span></p><p className="mt-1 text-xs text-slate-400">{formatDateTime(item.at)}</p></div></div>
            ))}
            {activity.length === 0 && <Empty text="Activity will appear here as the team works." />}
          </div>
        </Panel>
      </div>
      {upcoming.length > 0 && <Panel title="Upcoming dates" subtitle="Recording and release milestones"><div className="grid gap-3 md:grid-cols-2">{upcoming.map((episode) => <div key={episode.id} className="rounded-xl bg-[#f8f6f0] p-4"><p className="font-semibold">{episode.title}</p><div className="mt-2 flex gap-4 text-xs text-slate-500">{episode.recordingDate && <span>Record {formatDate(episode.recordingDate)}</span>}{episode.releaseDate && <span>Release {formatDate(episode.releaseDate)}</span>}</div></div>)}</div></Panel>}
    </div>
  )
}

function EpisodesPanel({ episodes, members, onSaved }: { episodes: Episode[]; members: Member[]; onSaved: () => Promise<void> }) {
  const [selectedId, setSelectedId] = useState(episodes[0]?.id || "")
  const [creating, setCreating] = useState(false)
  const selected = episodes.find((e) => e.id === selectedId)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><PageTitle eyebrow="Episode development" title="Move each episode from idea to published." subtitle="Every episode keeps its brief, ownership, dates and production status together." /><button onClick={() => setCreating(true)} className="studio-primary"><Plus className="h-4 w-4" /> New episode</button></div>
      {creating && <EpisodeForm members={members} onCancel={() => setCreating(false)} onSaved={async () => { setCreating(false); await onSaved() }} />}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-4">
          {EPISODE_STATUSES.map((status) => {
            const list = episodes.filter((e) => e.status === status)
            return <div key={status} className="w-[280px] rounded-2xl bg-[#f5f4ef] p-3"><div className="mb-3 flex items-center justify-between px-1"><h3 className="text-sm font-bold text-forest">{status}</h3><span className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">{list.length}</span></div><div className="space-y-3">{list.map((episode) => <button key={episode.id} onClick={() => setSelectedId(episode.id)} className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow ${selectedId === episode.id ? "border-green ring-2 ring-green/20" : "border-slate-200"}`}><p className="text-xs font-bold uppercase tracking-widest text-coral">{episode.episodeNumber || "Episode"}</p><p className="mt-2 font-semibold leading-snug">{episode.title}</p><p className="mt-3 text-xs text-slate-500">{episode.owner || "Unassigned"}</p></button>)}{list.length === 0 && <p className="px-2 py-6 text-center text-xs text-slate-400">No episodes</p>}</div></div>
          })}
        </div>
      </div>
      {selected && <EpisodeForm key={selected.id} episode={selected} members={members} onSaved={onSaved} />}
    </div>
  )
}

function EpisodeForm({ episode, members, onSaved, onCancel }: { episode?: Episode; members: Member[]; onSaved: () => Promise<void>; onCancel?: () => void }) {
  const [form, setForm] = useState<Partial<Episode>>(episode || { status: "Idea" })
  const [busy, setBusy] = useState(false)
  const update = (key: keyof Episode, value: string) => setForm((current) => ({ ...current, [key]: value }))

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true)
    try { await saveRecord("episodes", form); await onSaved() } finally { setBusy(false) }
  }

  return <Panel title={episode ? `Edit ${episode.episodeNumber || "episode"}` : "Create episode"} subtitle="The episode brief stays attached to the production record."><form onSubmit={submit} className="grid gap-5 lg:grid-cols-2"><Field label="Episode number"><input className="studio-input" value={form.episodeNumber || ""} onChange={(e) => update("episodeNumber", e.target.value)} /></Field><Field label="Status"><select className="studio-input" value={form.status || "Idea"} onChange={(e) => update("status", e.target.value)}>{EPISODE_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field><Field label="Title" wide><input required className="studio-input" value={form.title || ""} onChange={(e) => update("title", e.target.value)} /></Field><Field label="Owner"><select className="studio-input" value={form.owner || ""} onChange={(e) => update("owner", e.target.value)}><option value="">Unassigned</option>{members.map((m) => <option key={m.id}>{m.name}</option>)}</select></Field><Field label="Host"><input className="studio-input" value={form.host || ""} onChange={(e) => update("host", e.target.value)} /></Field><Field label="Recording date"><input type="date" className="studio-input" value={form.recordingDate || ""} onChange={(e) => update("recordingDate", e.target.value)} /></Field><Field label="Release date"><input type="date" className="studio-input" value={form.releaseDate || ""} onChange={(e) => update("releaseDate", e.target.value)} /></Field><Field label="Core idea" wide><textarea rows={4} className="studio-input" value={form.coreIdea || ""} onChange={(e) => update("coreIdea", e.target.value)} /></Field><Field label="Purpose / why this episode" wide><textarea rows={3} className="studio-input" value={form.purpose || ""} onChange={(e) => update("purpose", e.target.value)} /></Field><Field label="Questions / prompts" wide><textarea rows={7} className="studio-input" value={form.questions || ""} onChange={(e) => update("questions", e.target.value)} placeholder="One question per line" /></Field><Field label="Sensitive topics / boundaries" wide><textarea rows={4} className="studio-input" value={form.sensitivities || ""} onChange={(e) => update("sensitivities", e.target.value)} /></Field><Field label="Desired outcome" wide><textarea rows={3} className="studio-input" value={form.desiredOutcome || ""} onChange={(e) => update("desiredOutcome", e.target.value)} /></Field><div className="flex gap-3 lg:col-span-2"><button disabled={busy} className="studio-primary"><Save className="h-4 w-4" /> {busy ? "Saving…" : "Save episode"}</button>{onCancel && <button type="button" onClick={onCancel} className="studio-secondary">Cancel</button>}</div></form></Panel>
}

function ScriptsPanel({ episodes, scripts, onSaved }: { episodes: Episode[]; scripts: ScriptVersion[]; onSaved: () => Promise<void> }) {
  const [episodeId, setEpisodeId] = useState(episodes[0]?.id || "")
  const versions = useMemo(() => scripts.filter((s) => s.episodeId === episodeId).sort((a, b) => b.version - a.version), [scripts, episodeId])
  const latest = versions[0]
  const [draft, setDraft] = useState("")
  const [status, setStatus] = useState("Draft")
  const [busy, setBusy] = useState(false)

  useEffect(() => { setDraft(latest?.content || defaultScriptTemplate(episodes.find((e) => e.id === episodeId))); setStatus(latest?.status || "Draft") }, [episodeId, latest?.id])

  async function saveVersion() {
    if (!episodeId || !draft.trim()) return
    setBusy(true)
    try {
      await saveRecord("scripts", { episodeId, version: (latest?.version || 0) + 1, status, content: draft })
      await onSaved()
    } finally { setBusy(false) }
  }

  return <div className="space-y-8"><PageTitle eyebrow="Script workspace" title="Draft, review and version episode run sheets." subtitle="Keep the opening, prompts, research notes and close together without forcing the conversation to sound scripted." /><div className="grid gap-6 xl:grid-cols-[1fr_300px]"><Panel title="Current script" subtitle={latest ? `Working from v${latest.version}, last saved by ${latest.updatedBy || "team"}` : "No saved version yet"}><div className="space-y-4"><div className="grid gap-4 md:grid-cols-[1fr_180px]"><Field label="Episode"><select className="studio-input" value={episodeId} onChange={(e) => setEpisodeId(e.target.value)}>{episodes.map((e) => <option value={e.id} key={e.id}>{e.episodeNumber ? `${e.episodeNumber}. ` : ""}{e.title}</option>)}</select></Field><Field label="Review status"><select className="studio-input" value={status} onChange={(e) => setStatus(e.target.value)}><option>Draft</option><option>Needs Review</option><option>Approved</option></select></Field></div><textarea className="min-h-[560px] w-full resize-y rounded-2xl border border-slate-200 bg-[#fffdf8] p-6 font-mono text-sm leading-7 outline-none focus:border-green focus:ring-4 focus:ring-green/10" value={draft} onChange={(e) => setDraft(e.target.value)} /><button onClick={saveVersion} disabled={busy} className="studio-primary"><Save className="h-4 w-4" /> {busy ? "Saving…" : `Save as version ${(latest?.version || 0) + 1}`}</button></div></Panel><Panel title="Version history" subtitle="Every save creates a new snapshot"><div className="space-y-3">{versions.map((version) => <button key={version.id} onClick={() => { setDraft(version.content); setStatus(version.status) }} className="w-full rounded-xl border border-slate-200 p-3 text-left hover:border-green"><div className="flex items-center justify-between"><strong>Version {version.version}</strong><Status>{version.status}</Status></div><p className="mt-2 text-xs text-slate-500">{version.updatedBy || "Team"} · {formatDateTime(version.updatedAt)}</p></button>)}{versions.length === 0 && <Empty text="Your first saved script will appear here." />}</div></Panel></div></div>
}

function TasksPanel({ episodes, tasks, members, onSaved }: { episodes: Episode[]; tasks: Task[]; members: Member[]; onSaved: () => Promise<void> }) {
  const [title, setTitle] = useState("")
  const [episodeId, setEpisodeId] = useState("")
  const [owner, setOwner] = useState("")
  const [dueDate, setDueDate] = useState("")

  async function addTask(event: FormEvent) {
    event.preventDefault(); if (!title.trim()) return
    await saveRecord("tasks", { title, episodeId, owner, dueDate, status: "To do", priority: "Normal" })
    setTitle(""); setDueDate(""); await onSaved()
  }
  async function move(task: Task, status: string) { await saveRecord("tasks", { ...task, status }); await onSaved() }

  return <div className="space-y-8"><PageTitle eyebrow="Team task board" title="Know who owns the next action." subtitle="Assign work to episodes, give it a deadline and move it through the board." /><Panel title="Add task"><form onSubmit={addTask} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"><input required className="studio-input xl:col-span-2" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} /><select className="studio-input" value={episodeId} onChange={(e) => setEpisodeId(e.target.value)}><option value="">General / no episode</option>{episodes.map((e) => <option key={e.id} value={e.id}>{e.episodeNumber || ""} {e.title}</option>)}</select><select className="studio-input" value={owner} onChange={(e) => setOwner(e.target.value)}><option value="">Unassigned</option>{members.map((m) => <option key={m.id}>{m.name}</option>)}</select><div className="flex gap-2"><input type="date" className="studio-input min-w-0" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><button className="studio-primary !px-4"><Plus className="h-4 w-4" /></button></div></form></Panel><div className="grid gap-4 xl:grid-cols-4">{TASK_STATUSES.map((status) => <div key={status} className="rounded-2xl bg-[#f5f4ef] p-4"><div className="mb-4 flex items-center justify-between"><h3 className="font-bold text-forest">{status}</h3><span className="text-xs text-slate-400">{tasks.filter((t) => t.status === status).length}</span></div><div className="space-y-3">{tasks.filter((t) => t.status === status).map((task) => <div key={task.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="font-semibold leading-snug">{task.title}</p><p className="mt-2 text-xs text-slate-500">{task.owner || "Unassigned"}{task.dueDate ? ` · ${formatDate(task.dueDate)}` : ""}</p>{task.episodeId && <p className="mt-1 line-clamp-1 text-xs text-slate-400">{episodes.find((e) => e.id === task.episodeId)?.title}</p>}<div className="mt-4 flex flex-wrap gap-2">{TASK_STATUSES.filter((s) => s !== status).slice(status === "Done" ? -1 : 0, status === "Done" ? undefined : 2).map((next) => <button key={next} onClick={() => move(task, next)} className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold hover:bg-green/20">{next}</button>)}</div></div>)}{tasks.filter((t) => t.status === status).length === 0 && <Empty text="Nothing here." />}</div></div>)}</div></div>
}

function ContributorsPanel({ episodes, contributors, onSaved }: { episodes: Episode[]; contributors: Contributor[]; onSaved: () => Promise<void> }) {
  const [form, setForm] = useState<Partial<Contributor>>({ invitationStatus: "Not contacted", consentStatus: "Pending" })
  const update = (key: keyof Contributor, value: string) => setForm((c) => ({ ...c, [key]: value }))
  async function submit(event: FormEvent) { event.preventDefault(); await saveRecord("contributors", form); setForm({ invitationStatus: "Not contacted", consentStatus: "Pending" }); await onSaved() }
  return <div className="space-y-8"><PageTitle eyebrow="Guests and contributors" title="Track outreach, consent and boundaries responsibly." subtitle="Keep practical production details together while respecting what contributors do and do not want to discuss." /><Panel title="Add contributor"><form onSubmit={submit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><input required className="studio-input" placeholder="Name" value={form.name || ""} onChange={(e) => update("name", e.target.value)} /><select className="studio-input" value={form.episodeId || ""} onChange={(e) => update("episodeId", e.target.value)}><option value="">Not assigned to an episode</option>{episodes.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}</select><input className="studio-input" placeholder="Role / contribution" value={form.role || ""} onChange={(e) => update("role", e.target.value)} /><input className="studio-input" placeholder="Email" value={form.email || ""} onChange={(e) => update("email", e.target.value)} /><select className="studio-input" value={form.invitationStatus || "Not contacted"} onChange={(e) => update("invitationStatus", e.target.value)}><option>Not contacted</option><option>Invited</option><option>Accepted</option><option>Declined</option></select><select className="studio-input" value={form.consentStatus || "Pending"} onChange={(e) => update("consentStatus", e.target.value)}><option>Pending</option><option>Confirmed</option><option>Not required yet</option></select><textarea className="studio-input md:col-span-2" rows={2} placeholder="Boundaries / prep notes" value={form.boundaries || ""} onChange={(e) => update("boundaries", e.target.value)} /><button className="studio-primary w-fit"><Plus className="h-4 w-4" /> Add contributor</button></form></Panel><div className="grid gap-4 lg:grid-cols-2">{contributors.map((person) => <div key={person.id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-xl">{person.name}</h3><p className="mt-1 text-sm text-slate-500">{person.role || "Contributor"}</p></div><Status>{person.invitationStatus || "Not contacted"}</Status></div><p className="mt-4 text-sm text-slate-600">{episodes.find((e) => e.id === person.episodeId)?.title || "No episode assigned"}</p><div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2"><span>Consent: <strong>{person.consentStatus || "Pending"}</strong></span>{person.email && <span>{person.email}</span>}</div>{person.boundaries && <div className="mt-4 rounded-xl bg-[#f8f6f0] p-3 text-sm"><strong className="text-forest">Boundaries / notes</strong><p className="mt-1 whitespace-pre-wrap text-slate-600">{person.boundaries}</p></div>}</div>)}{contributors.length === 0 && <Empty text="No contributors have been added yet." />}</div></div>
}

function MarketingPanel({ episodes, marketing, members, onSaved }: { episodes: Episode[]; marketing: MarketingAsset[]; members: Member[]; onSaved: () => Promise<void> }) {
  const [form, setForm] = useState<Partial<MarketingAsset>>({ type: "Announcement", status: "Planned", platform: "Instagram" })
  const update = (key: keyof MarketingAsset, value: string) => setForm((c) => ({ ...c, [key]: value }))
  async function submit(event: FormEvent) { event.preventDefault(); await saveRecord("marketing", form); setForm({ type: "Announcement", status: "Planned", platform: "Instagram" }); await onSaved() }
  return <div className="space-y-8"><PageTitle eyebrow="Marketing campaign" title="Turn each recording into weeks of useful content." subtitle="Plan announcements, teasers, clips, quote cards, questions and follow-up content against the episode itself." /><Panel title="Add marketing asset"><form onSubmit={submit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><select className="studio-input" value={form.episodeId || ""} onChange={(e) => update("episodeId", e.target.value)}><option value="">Choose episode</option>{episodes.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}</select><select className="studio-input" value={form.type || "Announcement"} onChange={(e) => update("type", e.target.value)}>{["Announcement","Guest reveal","Teaser","Quote card","Clip","Discussion question","Release post","Follow-up post"].map((v) => <option key={v}>{v}</option>)}</select><select className="studio-input" value={form.platform || "Instagram"} onChange={(e) => update("platform", e.target.value)}>{["Instagram","TikTok","LinkedIn","YouTube","All platforms"].map((v) => <option key={v}>{v}</option>)}</select><select className="studio-input" value={form.owner || ""} onChange={(e) => update("owner", e.target.value)}><option value="">Unassigned</option>{members.map((m) => <option key={m.id}>{m.name}</option>)}</select><input type="date" className="studio-input" value={form.dueDate || ""} onChange={(e) => update("dueDate", e.target.value)} /><select className="studio-input" value={form.status || "Planned"} onChange={(e) => update("status", e.target.value)}><option>Planned</option><option>Drafting</option><option>Needs approval</option><option>Scheduled</option><option>Published</option></select><textarea rows={3} className="studio-input md:col-span-2" placeholder="Caption / creative brief / clip note" value={form.copy || ""} onChange={(e) => update("copy", e.target.value)} /><button className="studio-primary w-fit"><Plus className="h-4 w-4" /> Add asset</button></form></Panel><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#f8f6f0] text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Episode</th><th className="px-5 py-3">Asset</th><th className="px-5 py-3">Platform</th><th className="px-5 py-3">Owner</th><th className="px-5 py-3">Due</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{marketing.map((asset) => <tr key={asset.id}><td className="max-w-[280px] px-5 py-4 font-medium">{episodes.find((e) => e.id === asset.episodeId)?.title || "—"}</td><td className="px-5 py-4">{asset.type}</td><td className="px-5 py-4">{asset.platform}</td><td className="px-5 py-4">{asset.owner || "—"}</td><td className="px-5 py-4">{formatDate(asset.dueDate)}</td><td className="px-5 py-4"><Status>{asset.status}</Status></td></tr>)}</tbody></table></div>{marketing.length === 0 && <div className="p-8"><Empty text="Add the first promo asset for an episode." /></div>}</div></div>
}

function TeamPanel({ members, onSaved }: { members: Member[]; onSaved: () => Promise<void> }) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  async function submit(event: FormEvent) { event.preventDefault(); await saveRecord("members", { name, role, email }); setName(""); setRole(""); setEmail(""); await onSaved() }
  return <div className="space-y-8"><PageTitle eyebrow="Team" title="Keep production ownership visible." subtitle="Use team members in episode ownership, task assignment and marketing responsibility." /><Panel title="Add team member"><form onSubmit={submit} className="grid gap-4 md:grid-cols-4"><input required className="studio-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><input className="studio-input" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} /><input className="studio-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><button className="studio-primary"><Plus className="h-4 w-4" /> Add member</button></form></Panel><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{members.map((member) => <div key={member.id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-forest text-lg font-bold text-cream">{member.name.slice(0,1).toUpperCase()}</div><h3 className="font-display text-xl">{member.name}</h3><p className="mt-1 text-sm text-slate-500">{member.role || "Team member"}</p>{member.email && <p className="mt-3 text-xs text-slate-400">{member.email}</p>}</div>)}</div></div>
}

function defaultScriptTemplate(episode?: Episode) {
  return `# ${episode?.title || "Episode title"}\n\n## Cold open\n\n\n## Host introduction\n\nWhy are we having this conversation now?\n\n## Section 1\n\nQuestions / prompts:\n${episode?.questions || "- Question 1\n- Question 2"}\n\n## Section 2\n\nQuestions / prompts:\n- \n\n## What needs to change?\n\n- \n\n## Final question\n\n- \n\n## Close\n\nResources / support information to mention:\n- \n\nCall to action:\n- \n`
}

function PageTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) { return <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-green">{eyebrow}</p><h2 className="mt-2 max-w-4xl font-display text-3xl leading-tight text-forest sm:text-4xl">{title}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{subtitle}</p></div> }
function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) { return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-5"><h3 className="font-display text-xl text-forest">{title}</h3>{subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}</div>{children}</section> }
function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) { return <label className={`block ${wide ? "lg:col-span-2" : ""}`}><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>{children}</label> }
function Status({ children }: { children?: React.ReactNode }) { return <span className="inline-flex rounded-full bg-forest/8 px-2.5 py-1 text-[11px] font-bold text-forest">{children || "—"}</span> }
function Empty({ text }: { text: string }) { return <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">{text}</div> }
function Stat({ label, value, icon: Icon, warning }: { label: string; value: number; icon: typeof Mic2; warning?: boolean }) { return <div className={`rounded-2xl border p-5 ${warning ? "border-coral bg-coral/10" : "border-slate-200 bg-white"}`}><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-500">{label}</p><Icon className="h-5 w-5 text-forest" /></div><p className="mt-4 font-display text-4xl text-forest">{value}</p></div> }
function formatDate(value?: string) { if (!value) return "—"; const date = new Date(`${value}T12:00:00`); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) }
function formatDateTime(value?: string) { if (!value) return "Just now"; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) }
