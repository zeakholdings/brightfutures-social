import { useEffect, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { CheckCircle2 } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { submitCommunityCheckin } from "@/lib/cms/server"

export const Route = createFileRoute("/check-in")({
  head: () => ({
    meta: [
      { title: "Community Check-In | BrightFutures Greenwich" },
      { name: "description", content: "Share a win, something you are working towards, or an idea for BrightFutures in a private community check-in." },
      { property: "og:title", content: "Community Check-In | BrightFutures Greenwich" },
    ],
  }),
  component: CheckInPage,
})

type Preference = "full_name" | "first_name" | "anonymous" | ""
type Fields = {
  highlight: string
  proud_of: string
  goal_or_challenge: string
  brightfutures_idea: string
  issue_to_raise: string
  name: string
  email: string
  share_publicly: boolean
  public_name_preference: Preference
  public_excerpt: string
  website_consent: boolean
  social_media_consent: boolean
  website: string
}

const empty: Fields = {
  highlight: "", proud_of: "", goal_or_challenge: "", brightfutures_idea: "", issue_to_raise: "",
  name: "", email: "", share_publicly: false, public_name_preference: "", public_excerpt: "",
  website_consent: false, social_media_consent: false, website: "",
}

const responseKeys = ["highlight", "proud_of", "goal_or_challenge", "brightfutures_idea", "issue_to_raise"] as const

function CheckInPage() {
  const send = useServerFn(submitCommunityCheckin)
  const [fields, setFields] = useState<Fields>(empty)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [validation, setValidation] = useState("")
  const feedbackRef = useRef<HTMLDivElement | HTMLParagraphElement>(null)

  useEffect(() => {
    if (status === "sent" || status === "error" || validation) feedbackRef.current?.focus()
  }, [status, validation])

  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target
    setFields((current) => ({ ...current, [target.name]: target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value }))
    setValidation("")
    if (status === "error") setStatus("idle")
  }
  const setSharing = (share: boolean) => {
    setFields((current) => ({
      ...current,
      share_publicly: share,
      public_name_preference: share ? current.public_name_preference : "",
      public_excerpt: share ? current.public_excerpt : "",
      website_consent: share ? current.website_consent : false,
      social_media_consent: share ? current.social_media_consent : false,
    }))
    setValidation("")
  }
  const validate = () => {
    if (!responseKeys.some((key) => fields[key].trim().length >= 3)) return "Add something to at least one box before sending your check-in."
    if (fields.share_publicly && !fields.public_excerpt.trim()) return "Add the words you’re happy for us to share."
    if (fields.share_publicly && !fields.public_name_preference) return "Choose how you’d like us to credit you."
    if (fields.share_publicly && fields.public_name_preference === "first_name" && !fields.name.trim()) return "Add your first name, or choose Anonymous."
    if (fields.share_publicly && fields.public_name_preference === "full_name" && fields.name.trim().split(/\s+/).length < 2) return "Add your full name, or choose a different display preference."
    if (fields.share_publicly && !fields.website_consent && !fields.social_media_consent) return "Choose at least one place where we may share your words."
    return ""
  }
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const problem = validate()
    if (problem) { setValidation(problem); return }
    setStatus("sending")
    try {
      await send({ data: fields })
      setFields(empty)
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return <div>
    <PageHero title="Your term, your wins." body="University isn’t only about grades. Tell us what’s gone well, what you’re working towards or what you’d like BrightFutures to do next." />
    <section className="bg-cream px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 grid gap-3 border-l-4 border-green bg-paper px-6 py-5 leading-relaxed text-forest/75">
          <p className="font-semibold text-forest">Answer one question, a few, or all of them. It’s completely up to you.</p>
          <p>Things don’t have to be going perfectly to check in, and you don’t need to explain your care or estrangement circumstances.</p>
        </div>
        {status === "sent" ? <div ref={feedbackRef} tabIndex={-1} role="status" className="rounded-3xl bg-paper p-7 sm:p-10">
          <CheckCircle2 size={36} className="text-green" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl text-forest">Thanks, your check-in has been received.</h2>
          <p className="mt-4 leading-relaxed text-forest/70">Private responses stay private. If you offered an excerpt for public sharing, the committee will still review it first. Consent does not guarantee that it will be published.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-7 min-h-11 rounded-full border border-forest/25 px-6 py-3 font-semibold text-forest hover:border-coral">Send another check-in</button>
        </div> : <form onSubmit={submit} noValidate className="rr-block grid gap-12">
          <div className="hidden" aria-hidden="true"><label>Website<input name="website" value={fields.website} onChange={change} tabIndex={-1} autoComplete="off" /></label></div>
          <FormSection title="Your check-in">
            <Prompt title="Something worth celebrating"><TextArea name="highlight" label="What’s been a highlight for you recently?" value={fields.highlight} onChange={change} placeholder="e.g. passed something, made a friend, joined a society, got through a difficult week…" /></Prompt>
            <Prompt title="Something you’re proud of"><TextArea name="proud_of" label="Big or small, what have you done that you’re pleased about?" value={fields.proud_of} onChange={change} /></Prompt>
            <Prompt title="Looking ahead"><TextArea name="goal_or_challenge" label="Anything you’d like to achieve, try or work through next term?" value={fields.goal_or_challenge} onChange={change} /></Prompt>
          </FormSection>
          <FormSection title="Help shape BrightFutures">
            <Prompt title="What would you like BrightFutures to do more of?"><TextArea name="brightfutures_idea" label="This can cover events, opportunities, resources, peer activities or anything else." value={fields.brightfutures_idea} onChange={change} placeholder="e.g. more socials, careers support, peer meet-ups, practical advice…" /></Prompt>
            <Prompt title="Anything we should raise or work on?"><TextArea name="issue_to_raise" label="Tell us about anything affecting care-experienced or estranged students that we could help address." value={fields.issue_to_raise} onChange={change} /></Prompt>
          </FormSection>
          <fieldset className="grid gap-5 border-t border-forest/15 pt-10"><legend className="font-display text-3xl text-forest">About you <span className="font-body text-sm font-normal text-forest/55">(optional)</span></legend><p className="text-sm leading-relaxed text-forest/65">Leave these blank if you’d rather check in anonymously. Add your name if you want us to know who sent it, and your email if you’d like us to be able to reply. You do not need a university email address.</p><div className="grid gap-5 sm:grid-cols-2"><Input name="name" label="Name" value={fields.name} onChange={change} autoComplete="name" maxLength={120} /><Input name="email" label="Email address" value={fields.email} onChange={change} autoComplete="email" type="email" maxLength={254} /></div></fieldset>
          <fieldset className="rounded-3xl border border-coral/30 bg-paper p-6 sm:p-8"><legend className="px-2 font-display text-3xl text-forest">Can we celebrate one of your wins?</legend><p className="mt-2 text-sm leading-relaxed text-forest/65">If you’d like, you can let us consider sharing a small part of your check-in. Everything else stays private.</p><div className="mt-6 grid gap-3"><Radio checked={!fields.share_publicly} onChange={() => setSharing(false)} label="No thanks — keep my check-in private" /><Radio checked={fields.share_publicly} onChange={() => setSharing(true)} label="Yes — I’d like to share a highlight" /></div>
            {fields.share_publicly ? <div className="mt-8 grid gap-8 rounded-2xl border border-forest/10 bg-cream/60 p-5 sm:p-6">
              <TextArea name="public_excerpt" label="Words you’re happy for us to share" value={fields.public_excerpt} onChange={change} required help="Write or paste only the words you’d be comfortable with BrightFutures potentially sharing publicly. We won’t substitute anything else from your private check-in." maxLength={1500} />
              <fieldset><legend className="text-sm font-bold text-forest">How should we credit you?</legend><div className="mt-3 grid gap-3 sm:grid-cols-3">{([['anonymous','Anonymous'],['first_name','First name'],['full_name','Full name']] as const).map(([value,label]) => <Radio key={value} checked={fields.public_name_preference === value} onChange={() => { setFields((current) => ({...current, public_name_preference: value})); setValidation("") }} label={label} name="public_name_preference" />)}</div></fieldset>
              <fieldset><legend className="text-sm font-bold text-forest">Where may we share it?</legend><div className="mt-3 grid gap-4"><Checkbox name="website_consent" checked={fields.website_consent} onChange={change} label="BrightFutures website" /><Checkbox name="social_media_consent" checked={fields.social_media_consent} onChange={change} label="BrightFutures social media" /></div><p className="mt-4 text-sm leading-relaxed text-forest/55">Choose either or both. Nothing is published automatically; BrightFutures reviews anything before it is shared.</p></fieldset>
            </div> : null}
          </fieldset>
          <aside className="rounded-2xl border border-forest/10 bg-paper/60 px-5 py-4 text-sm leading-relaxed text-forest/60"><p><span className="font-semibold text-forest/75">Need urgent support?</span> BrightFutures Check-In is not an emergency, crisis-reporting, counselling or safeguarding service. If you or someone else is in immediate danger, contact emergency services or an existing university support service directly.</p></aside>
          <div className="grid gap-4">{validation ? <p ref={feedbackRef} tabIndex={-1} role="alert" className="rounded-xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm font-semibold text-coral">{validation}</p> : null}<button type="submit" disabled={status === "sending"} className="min-h-12 w-fit rounded-full bg-coral px-8 py-3 font-semibold text-cream transition-colors hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral disabled:opacity-60">{status === "sending" ? "Sending…" : "Send my check-in"}</button>{status === "error" ? <p ref={feedbackRef} tabIndex={-1} role="alert" className="text-sm font-semibold text-coral">We couldn’t save your check-in just now. Your answers are still here, so please try again safely.</p> : null}</div>
        </form>}
      </div>
    </section>
  </div>
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) { return <fieldset className="grid gap-7 border-t border-forest/15 pt-10"><legend className="font-display text-3xl text-forest">{title}</legend>{children}</fieldset> }
function Prompt({ title, children }: { title: string; children: React.ReactNode }) { return <div className="grid gap-3"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold text-forest">{title}</h3><OptionalLabel /></div>{children}</div> }
function OptionalLabel() { return <span className="rounded-full bg-green/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-forest/65">Optional</span> }
function TextArea({ name, label, value, onChange, help, placeholder, required = false, maxLength = 4000 }: { name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; help?: string; placeholder?: string; required?: boolean; maxLength?: number }) { const helpId = help ? `${name}-help` : undefined; return <label className="grid gap-2 text-sm font-medium leading-relaxed text-forest/70"><span>{label}{required ? <span className="text-coral"> *</span> : null}</span><textarea name={name} rows={6} maxLength={maxLength} value={value} onChange={onChange} placeholder={placeholder} aria-describedby={helpId} className="min-h-40 resize-y rounded-2xl border border-forest/20 bg-paper px-5 py-4 text-base font-normal leading-relaxed text-forest outline-none placeholder:text-forest/40 focus:border-coral focus-visible:ring-2 focus-visible:ring-coral/25" />{help ? <span id={helpId} className="font-normal leading-relaxed text-forest/55">{help}</span> : null}</label> }
function Input({ name, label, value, onChange, type = "text", autoComplete, maxLength }: { name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; autoComplete?: string; maxLength: number }) { return <label className="grid gap-2 text-sm font-bold text-forest">{label}<input name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} value={value} onChange={onChange} className="min-h-12 rounded-xl border border-forest/20 bg-cream px-4 py-3 font-normal outline-none focus:border-coral focus-visible:ring-2 focus-visible:ring-coral/25" /></label> }
function Radio({ checked, onChange, label, name = "share_publicly" }: { checked: boolean; onChange: () => void; label: string; name?: string }) { return <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-forest/15 px-4 py-3 text-sm font-semibold leading-relaxed text-forest has-[:checked]:border-coral has-[:checked]:bg-coral/5"><input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral" />{label}</label> }
function Checkbox({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string }) { return <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-forest"><input type="checkbox" name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 shrink-0 accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral" />{label}</label> }
