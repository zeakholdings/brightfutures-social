import { useRef, useState } from "react"
import { useServerFn } from "@tanstack/react-start"
import { ArrowRight } from "lucide-react"
import { submitIdea } from "@/lib/cms/server"

type Fields = { idea: string; name: string; email: string; website: string }
const empty: Fields = { idea: "", name: "", email: "", website: "" }

export function IdeaForm({ categories }: { categories: readonly string[] }) {
  const send = useServerFn(submitIdea)
  const [fields, setFields] = useState(empty)
  const [selected, setSelected] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const ideaRef = useRef<HTMLTextAreaElement>(null)

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((current) => ({ ...current, [e.target.name]: e.target.value }))
    if (status === "error") setStatus("idle")
  }
  const chooseCategory = (category: string) => {
    setSelected(category)
    setFields((current) => ({
      ...current,
      idea: current.idea.trim() ? current.idea : `${category}: `,
    }))
    requestAnimationFrame(() => ideaRef.current?.focus())
  }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      await send({ data: fields })
      setStatus("sent")
      setFields(empty)
      setSelected(null)
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") return <div role="status" className="border-2 border-green bg-cream px-6 py-8 text-forest"><p className="font-display text-3xl">Thanks for the idea.</p><p className="mt-2 text-forest/70">It’s been sent to the committee.</p></div>

  return <form onSubmit={submit} className="rr-block grid gap-8"><div className="hidden" aria-hidden="true"><label>Website<input name="website" value={fields.website} onChange={change} tabIndex={-1} autoComplete="off"/></label></div>
    <fieldset><legend className="font-display text-xl font-semibold text-forest">What kind of thing?</legend><div className="mt-4 flex flex-wrap gap-2.5">{categories.map((category, index) => <button key={category} type="button" aria-pressed={selected === category} onClick={() => chooseCategory(category)} className={`min-h-11 border-2 border-forest px-4 py-2 text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-coral-light aria-pressed:bg-forest aria-pressed:text-cream ${index % 3 === 1 ? "rotate-1" : index % 3 === 2 ? "-rotate-1" : ""}`}>{category}</button>)}</div></fieldset>
    <label className="grid gap-3 text-sm font-bold text-forest"><span className="font-display text-xl">Put your idea here</span><textarea ref={ideaRef} name="idea" required minLength={10} maxLength={3000} rows={8} value={fields.idea} onChange={change} placeholder="What would make student life better, easier or more fun?" className="min-h-56 resize-y border-2 border-forest bg-cream px-5 py-5 font-display text-xl font-normal leading-relaxed text-forest outline-none placeholder:text-forest/35 focus:bg-paper sm:text-2xl"/><span className="font-normal text-forest/55">At least 10 characters. You don’t need to share anything about your personal circumstances.</span></label>
    <div className="grid gap-4 border-t-2 border-forest/15 pt-6 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-semibold text-forest"><span>Name <span className="font-normal text-forest/50">(optional)</span></span><input name="name" autoComplete="name" maxLength={120} value={fields.name} onChange={change} className="min-h-12 border-b-2 border-forest/35 bg-transparent px-1 py-3 font-normal outline-none focus:border-coral"/></label><label className="grid gap-1.5 text-sm font-semibold text-forest"><span>Email <span className="font-normal text-forest/50">(optional)</span></span><input name="email" type="email" autoComplete="email" maxLength={254} value={fields.email} onChange={change} className="min-h-12 border-b-2 border-forest/35 bg-transparent px-1 py-3 font-normal outline-none focus:border-coral"/></label></div>
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"><button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 items-center gap-3 bg-coral px-7 py-3 font-bold text-cream transition-all hover:-translate-y-1 hover:bg-forest disabled:opacity-60">{status === "sending" ? "Sending…" : "Pin it to the board"}{status !== "sending" ? <ArrowRight size={18} aria-hidden="true"/> : null}</button>{status === "error" ? <p role="alert" className="text-sm text-coral">We couldn’t send your idea. Your text is still here, so please try again.</p> : null}</div>
  </form>
}
