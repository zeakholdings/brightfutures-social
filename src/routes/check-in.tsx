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

type Preference = "full_name" | "first_name" | "anonymous"
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
  name: "", email: "", share_publicly: false, public_name_preference: "anonymous", public_excerpt: "",
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
      website_consent: share ? current.website_consent : false,
      social_media_consent: share ? current.social_media_consent : false,
    }))
    setValidation("")
  }
  const validate = () => {
    if (!responseKeys.some((key) => fields[key].trim().length >= 3)) return "Add at least one response before sending your check-in."
    if (fields.share_publicly && !fields.public_excerpt.trim()) return "Write or choose the exact excerpt you are happy for us to consider sharing."
    if (fields.share_publicly && fields.public_name_preference === "first_name" && !fields.name.trim()) return "Add your first name, or choose Anonymous."
    if (fields.share_publicly && fields.public_name_preference === "full_name" && fields.name.trim().split(/\s+/).length < 2) return "Add your full name, or choose a different display preference."
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
    <PageHero title="Your term, your wins." body="University isn’t only about grades. Tell us what’s gone well, what you’re working towards and what you’d like BrightFutures to do next." />
    <section className="bg-cream px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 grid gap-3 border-l-4 border-green bg-paper px-6 py-5 text-sm leading-relaxed text-forest/70">
          <p>This check-in is optional. Answer as much or as little as feels useful.</p>
          <p>You do not need to explain your care or estrangement circumstances.</p>
          <p>Private answers are never automatically published. Sharing requires your explicit consent and a separate manual review.</p>
          <p>This form is not monitored as an emergency, crisis-reporting or counselling service. If you or someone else is in immediate danger, contact emergency services or an existing university support service directly.</p>
        </div>
        {status === "sent" ? <div ref={feedbackRef} tabIndex={-1} role="status" className="rounded-3xl bg-paper p-7 sm:p-10">
          <CheckCircle2 size={36} className="text-green" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl text-forest">Thanks, your check-in has been received.</h2>
          <p className="mt-4 leading-relaxed text-forest/70">Private responses stay private. If you offered an excerpt for public sharing, the committee will still review it first. Consent does not guarantee that it will be published.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-7 min-h-11 rounded-full border border-forest/25 px-6 py-3 font-semibold text-forest hover:border-coral">Send another check-in</button>
        </div> : <form onSubmit={submit} noValidate className="grid gap-12">
          <div className="hidden" aria-hidden="true"><label>Website<input name="website" value={fields.website} onChange={change} tabIndex={-1} autoComplete="off" /></label></div>
          <FormSection title="Something worth celebrating"><TextArea name="highlight" label="What’s been a highlight for you recently?" value={fields.highlight} onChange={change} /></FormSection>
          <FormSection title="Something you’re proud of"><TextArea name="proud_of" label="Big or small, what have you done that you’re pleased about?" value={fields.proud_of} onChange={change} /></FormSection>
          <FormSection title="Looking ahead"><TextArea name="goal_or_challenge" label="Is there something you’d like to achieve, try or work through next term?" value={fields.goal_or_challenge} onChange={change} help="Share only what feels comfortable. This form is not a specialist support service." /></FormSection>
          <FormSection title="Help shape BrightFutures">
            <TextArea name="brightfutures_idea" label="What would you like BrightFutures to do more of?" value={fields.brightfutures_idea} onChange={change} />
            <TextArea name="issue_to_raise" label="Is there anything affecting care-experienced or estranged students that you think BrightFutures should raise or work on?" value={fields.issue_to_raise} onChange={change} />
          </FormSection>
          <fieldset className="grid gap-5 border-t border-forest/15 pt-10"><legend className="font-display text-3xl text-forest">About you <span className="font-body text-sm font-normal text-forest/55">(optional)</span></legend><p className="text-sm leading-relaxed text-forest/65">Add these only if you want attribution or would like us to reply. You do not need a university email address.</p><div className="grid gap-5 sm:grid-cols-2"><Input name="name" label="Name" value={fields.name} onChange={change} autoComplete="name" maxLength={120} /><Input name="email" label="Email address" value={fields.email} onChange={change} autoComplete="email" type="email" maxLength={254} /></div></fieldset>
          <fieldset className="rounded-3xl border border-coral/30 bg-paper p-6 sm:p-8"><legend className="px-2 font-display text-3xl text-forest">Can we celebrate this?</legend><p className="mt-2 text-sm leading-relaxed text-forest/65">Your private answers remain separate. Choosing yes only lets us consider the exact excerpt you approve below.</p><div className="mt-6 grid gap-3"><Radio checked={!fields.share_publicly} onChange={() => setSharing(false)} label="No: keep my response private" /><Radio checked={fields.share_publicly} onChange={() => setSharing(true)} label="Yes: BrightFutures may consider sharing the highlight I’ve approved below" /></div>
            {fields.share_publicly ? <div className="mt-8 grid gap-8 border-t border-forest/15 pt-8">
              <TextArea name="public_excerpt" label="Public excerpt" value={fields.public_excerpt} onChange={change} required help="Write or paste only the exact words you are happy for us to consider sharing. We will not substitute your full private answers." maxLength={1500} />
              <fieldset><legend className="text-sm font-bold text-forest">Display preference</legend><div className="mt-3 grid gap-3 sm:grid-cols-3">{([['full_name','Full name'],['first_name','First name only'],['anonymous','Anonymous']] as const).map(([value,label]) => <Radio key={value} checked={fields.public_name_preference === value} onChange={() => setFields((current) => ({...current, public_name_preference: value}))} label={label} name="public_name_preference" />)}</div></fieldset>
              <fieldset><legend className="text-sm font-bold text-forest">Consent</legend><div className="mt-3 grid gap-4"><Checkbox name="website_consent" checked={fields.website_consent} onChange={change} label="I agree to this approved excerpt being published on brightfutures.social." /><Checkbox name="social_media_consent" checked={fields.social_media_consent} onChange={change} label="I agree to this approved excerpt being shared on BrightFutures social media." /></div><p className="mt-4 text-sm leading-relaxed text-forest/55">Each choice is separate and optional. Social media consent is not required for website publication. Nothing is published automatically.</p></fieldset>
            </div> : null}
          </fieldset>
          <div className="grid gap-4"><p className="text-sm text-forest/60">At least one reflection or idea is required. Everything else is optional unless you choose public sharing.</p>{validation ? <p ref={feedbackRef} tabIndex={-1} role="alert" className="rounded-xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm font-semibold text-coral">{validation}</p> : null}<button type="submit" disabled={status === "sending"} className="min-h-12 w-fit rounded-full bg-coral px-8 py-3 font-semibold text-cream transition-colors hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral disabled:opacity-60">{status === "sending" ? "Sending…" : "Send my check-in"}</button>{status === "error" ? <p ref={feedbackRef} tabIndex={-1} role="alert" className="text-sm font-semibold text-coral">We couldn’t save your check-in just now. Your answers are still here, so please try again safely.</p> : null}</div>
        </form>}
      </div>
    </section>
  </div>
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) { return <fieldset className="grid gap-7 border-t border-forest/15 pt-10"><legend className="font-display text-3xl text-forest">{title}</legend>{children}</fieldset> }
function TextArea({ name, label, value, onChange, help, required = false, maxLength = 4000 }: { name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; help?: string; required?: boolean; maxLength?: number }) { const helpId = help ? `${name}-help` : undefined; return <label className="grid gap-2 text-sm font-bold text-forest"><span>{label}{required ? <span className="text-coral"> *</span> : null}</span><textarea name={name} rows={6} maxLength={maxLength} value={value} onChange={onChange} aria-describedby={helpId} className="min-h-40 resize-y rounded-2xl border border-forest/20 bg-paper px-5 py-4 text-base font-normal leading-relaxed outline-none focus:border-coral focus-visible:ring-2 focus-visible:ring-coral/25" />{help ? <span id={helpId} className="font-normal leading-relaxed text-forest/55">{help}</span> : null}</label> }
function Input({ name, label, value, onChange, type = "text", autoComplete, maxLength }: { name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; autoComplete?: string; maxLength: number }) { return <label className="grid gap-2 text-sm font-bold text-forest">{label}<input name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} value={value} onChange={onChange} className="min-h-12 rounded-xl border border-forest/20 bg-cream px-4 py-3 font-normal outline-none focus:border-coral focus-visible:ring-2 focus-visible:ring-coral/25" /></label> }
function Radio({ checked, onChange, label, name = "share_publicly" }: { checked: boolean; onChange: () => void; label: string; name?: string }) { return <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-forest/15 px-4 py-3 text-sm font-semibold leading-relaxed text-forest has-[:checked]:border-coral has-[:checked]:bg-coral/5"><input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral" />{label}</label> }
function Checkbox({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string }) { return <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-forest"><input type="checkbox" name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 shrink-0 accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral" />{label}</label> }
