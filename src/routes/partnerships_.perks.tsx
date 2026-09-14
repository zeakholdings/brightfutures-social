import { useEffect, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { ArrowDown, BadgeCheck, Check, CheckCircle2, Coffee, Dumbbell, Scissors, ShoppingBag, Utensils } from "lucide-react"
import { submitPerksEnquiry } from "@/lib/cms/server"

export const Route = createFileRoute("/partnerships_/perks")({
  head: () => ({ meta: [
    { title: "BrightFutures Perks | Partner with us" },
    { name: "description", content: "Join BrightFutures Perks and connect your Greenwich business with a student-led community." },
    { property: "og:title", content: "BrightFutures Perks | Partner with us" },
  ] }),
  component: PerksPage,
})

const steps = [
  ["You choose an offer", "Choose a discount, free extra or other benefit that works for your business. You stay in control of the terms."],
  ["We promote it", "We list your offer through BrightFutures and help our members discover businesses that support their community."],
  ["Students support local", "Members use the offer, discover your business and are encouraged to spend with businesses that support BrightFutures."],
]
const offers = [
  [ShoppingBag, "10% off purchases"], [Coffee, "Free hot drink with a qualifying meal"], [Scissors, "£3 off a haircut"],
  [Dumbbell, "Free introductory fitness session"], [BadgeCheck, "Weekday or off-peak discount"], [Utensils, "Free side with a main purchase"],
] as const
const benefits = ["Dedicated BrightFutures partner listing", "Promotion of your offer", "BrightFutures Perks Partner recognition", "Opportunities to be featured through BrightFutures communications", "Visibility among University of Greenwich students", "Association with a student-led social-impact programme", "No participation fee"]
const faqs = [
  ["Is there a fee to join?", "No. There is currently no participation fee for BrightFutures Perks partners."],
  ["How much discount do we need to offer?", "There is no minimum. You choose an offer that works for your business."],
  ["Can the offer have restrictions?", "Yes. You can set reasonable terms such as specific days, times, products or minimum spend."],
  ["Can we change or withdraw an offer?", "Yes. Just let BrightFutures know so we can keep the listing accurate."],
  ["Who can use BrightFutures Perks?", "BrightFutures Perks is being developed for care-experienced and estranged University of Greenwich students who participate in BrightFutures. We’ll publish the access process before offers go live."],
  ["How will our business be promoted?", "Partners can be listed on BrightFutures.social and may also be featured through BrightFutures social media, communications and activities where appropriate."],
]

function PerksPage() {
  return <div>
    <section className="relative overflow-hidden bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-coral/20" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <span className="inline-flex border border-coral-light/50 bg-coral/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-coral-light">Founding Partners · 2026/27</span>
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">BrightFutures <span className="text-coral-light">Perks</span></h1>
        <p className="mt-6 max-w-3xl font-display text-2xl leading-snug sm:text-3xl">Local businesses supporting students. Students supporting local businesses.</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">We’re inviting Greenwich-area businesses to provide useful offers for care-experienced and estranged students at the University of Greenwich and be recognised as part of a student-led local community.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#join" className="inline-flex min-h-12 items-center justify-center bg-coral px-7 py-3 font-semibold text-cream hover:bg-coral-light hover:text-forest">Become a Founding Partner</a><a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 border border-cream/35 px-7 py-3 font-semibold text-cream hover:border-cream">How it works <ArrowDown size={17} aria-hidden="true" /></a></div>
      </div>
    </section>

    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-coral">Why Perks exists</p><h2 className="mt-5 font-display text-4xl text-forest sm:text-5xl">A stronger local safety net.</h2></div><div className="space-y-5 text-lg leading-relaxed text-forest/70"><p>University can be expensive for everyone, but care-experienced and estranged students may be doing it without the same family or financial safety net that others can fall back on.</p><p>BrightFutures Perks connects our community with local businesses that want to make everyday student life a little easier, while helping students discover and support businesses around Greenwich.</p><p>It is not about charity. It is about building a stronger local community around students who may need it most.</p></div></div></section>

    <section id="how-it-works" className="scroll-mt-24 bg-cream-dim px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><h2 className="font-display text-4xl text-forest sm:text-5xl">How it works</h2><ol className="mt-12 grid border-t border-forest/25 lg:grid-cols-3">{steps.map(([title, body], i) => <li key={title} className={`border-b border-forest/20 py-8 lg:px-8 ${i > 0 ? "lg:border-l" : "lg:pl-0"}`}><span className="font-display text-4xl text-coral">0{i + 1}</span><h3 className="mt-8 font-display text-2xl text-forest">{title}</h3><p className="mt-4 leading-relaxed text-forest/65">{body}</p></li>)}</ol></div></section>

    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-coral">You choose the offer</p><h2 className="mt-5 font-display text-4xl text-forest">An offer that works for you.</h2><p className="mt-5 leading-relaxed text-forest/65">There is no minimum discount. Pick an offer that makes sense for your business.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{offers.map(([Icon, label]) => <div key={label} className="flex min-h-32 items-center gap-5 border border-forest/15 bg-paper p-6"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green/15 text-forest"><Icon size={22} aria-hidden="true" /></span><p className="font-semibold leading-snug text-forest">{label}</p></div>)}</div></div></section>

    <section className="bg-forest px-6 py-20 text-cream sm:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-coral-light">What you get as a partner</p><h2 className="mt-5 font-display text-4xl sm:text-5xl">Recognition with a purpose.</h2><div className="mt-9 border-l-4 border-coral bg-cream/5 p-6"><p className="font-display text-2xl">No participation fee.</p><p className="mt-1 text-lg text-cream/75">You choose the offer.</p></div></div><ul className="grid content-start gap-4">{benefits.map(item => <li key={item} className="flex gap-3 border-b border-cream/15 pb-4 text-cream/80"><Check className="mt-0.5 shrink-0 text-green-light" size={20} aria-hidden="true" />{item}</li>)}</ul></div></section>

    <section className="bg-coral px-6 py-20 text-forest sm:px-8 lg:py-28"><div className="mx-auto max-w-5xl text-center"><p className="text-sm font-bold uppercase tracking-[.16em]">Founding Partners · 2026/27</p><h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl sm:text-5xl">Founding BrightFutures Perks Partners · 2026/27</h2><div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-forest/80"><p>We’re inviting an initial group of Greenwich-area businesses and organisations to help launch BrightFutures Perks.</p><p>Founding partners will help shape the programme from the beginning and will be recognised as part of the original 2026/27 cohort.</p></div><a href="#join" className="mt-8 inline-flex min-h-12 items-center bg-forest px-7 py-3 font-semibold text-cream">Become a Founding Partner</a></div></section>

    <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-4xl"><h2 className="font-display text-4xl text-forest">Questions businesses ask</h2><div className="mt-9 border-t border-forest/20">{faqs.map(([question, answer]) => <details key={question} className="group border-b border-forest/20"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold text-forest marker:content-none">{question}<span className="text-2xl font-normal text-coral transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-3xl pb-6 pr-10 leading-relaxed text-forest/65">{answer}</p></details>)}</div></div></section>

    <JoinSection />
  </div>
}

type Fields = { business: string; name: string; email: string; link: string; offer: string; restrictions: string; message: string; website: string }
const initial: Fields = { business: "", name: "", email: "", link: "", offer: "", restrictions: "", message: "", website: "" }

function JoinSection() {
  const send = useServerFn(submitPerksEnquiry)
  const [fields, setFields] = useState(initial)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const feedback = useRef<HTMLDivElement | HTMLParagraphElement>(null)
  useEffect(() => { if (status === "sent" || status === "error") feedback.current?.focus() }, [status])
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFields(v => ({ ...v, [e.target.name]: e.target.value })); if (status === "error") setStatus("idle") }
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setStatus("sending"); try { await send({ data: fields }); setFields(initial); setStatus("sent") } catch { setStatus("error") } }
  const control = "rounded-xl border border-forest/20 bg-paper px-4 py-3 font-normal outline-none focus:border-coral"
  return <section id="join" className="scroll-mt-24 bg-cream-dim px-6 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-coral">Become a partner</p><h2 className="mt-5 font-display text-4xl text-forest sm:text-5xl">Become a Founding Partner</h2><p className="mt-6 max-w-md text-lg leading-relaxed text-forest/70">You provide an offer that works for your business. We make sure our community knows that you support them.</p><p className="mt-5 max-w-md leading-relaxed text-forest/65">You do not need to have every detail finalised yet. Send us your idea and we can work out the rest together.</p></div><div>{status === "sent" ? <div ref={feedback} tabIndex={-1} role="status" className="bg-paper p-8"><CheckCircle2 className="text-green" size={34} aria-hidden="true"/><h3 className="mt-4 font-display text-3xl text-forest">Enquiry sent</h3><p className="mt-3 text-forest/70">Thank you. The student committee will be in touch to discuss the next steps.</p></div> : <form onSubmit={submit} className="grid gap-5"><p className="text-sm text-forest/60">Tell us a little about your business and the offer you have in mind.</p><div className="hidden" aria-hidden="true"><label>Website<input name="website" value={fields.website} onChange={change} tabIndex={-1} autoComplete="off" /></label></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Business/organisation name" name="business" value={fields.business} onChange={change} required /><Field label="Contact name" name="name" value={fields.name} onChange={change} autoComplete="name" required /></div><Field label="Email" name="email" type="email" value={fields.email} onChange={change} autoComplete="email" required /><Field label="Website or social link" name="link" type="url" value={fields.link} onChange={change} /><label className="grid gap-1.5 text-sm font-semibold text-forest">Proposed offer<textarea name="offer" rows={3} maxLength={1500} value={fields.offer} onChange={change} className={control} /></label><label className="grid gap-1.5 text-sm font-semibold text-forest">Any restrictions<textarea name="restrictions" rows={3} maxLength={1500} value={fields.restrictions} onChange={change} className={control} /></label><label className="grid gap-1.5 text-sm font-semibold text-forest">Message<textarea name="message" rows={4} maxLength={3000} value={fields.message} onChange={change} className={control} /></label><button type="submit" disabled={status === "sending"} className="min-h-12 w-fit bg-coral px-7 py-3 font-semibold text-cream disabled:opacity-60">{status === "sending" ? "Sending…" : "Send partnership enquiry"}</button>{status === "error" ? <p ref={feedback} tabIndex={-1} role="alert" className="text-sm text-coral">We couldn’t save your enquiry. Your entries are still here, so please try again.</p> : null}</form>}</div></div></section>
}

function Field({ label, name, type = "text", value, onChange, autoComplete, required = false }: { label: string; name: keyof Fields; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; autoComplete?: string; required?: boolean }) {
  return <label className="grid gap-1.5 text-sm font-semibold text-forest">{label}<input name={name} type={type} value={value} onChange={onChange} autoComplete={autoComplete} required={required} maxLength={name === "link" ? 500 : name === "business" ? 180 : name === "email" ? 254 : 120} className="rounded-xl border border-forest/20 bg-paper px-4 py-3 font-normal outline-none focus:border-coral" /></label>
}
