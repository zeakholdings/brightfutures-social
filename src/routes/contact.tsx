import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { CheckCircle2, Mail } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { site } from "@/data/site"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | BrightFutures Greenwich" },
      {
        name: "description",
        content:
          "Get in touch with the BrightFutures committee — ask a question, share an idea, or find out how to get involved.",
      },
      { property: "og:title", content: "Contact | BrightFutures Greenwich" },
    ],
  }),
  component: ContactPage,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join("&")
}

function ContactPage() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [updates, setUpdates] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...fields,
          updates: updates ? "yes" : "no",
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Talk to the committee."
        body="Questions, ideas, offers to help, or just want to say hello — this goes straight to the students running BrightFutures."
      />

      <section className="bg-cream px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-2xl text-forest">
              Prefer email?
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-forest hover:text-coral"
            >
              <Mail size={18} />
              {site.email}
            </a>
            <p className="mt-6 max-w-sm leading-relaxed text-forest/65">
              We aim to reply within a few days during term time. Nothing you
              send here is shared beyond the committee.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-forest/50">
              This form is for general enquiries only. We don&rsquo;t ask
              about care or estrangement status here &mdash; you never need
              to disclose that to reach us.
            </p>
          </div>

          <div>
            {status === "sent" ? (
              <div className="flex flex-col items-start gap-3 rounded-2xl bg-cream-dim p-8">
                <CheckCircle2 size={32} className="text-green" />
                <h3 className="font-display text-2xl text-forest">
                  Message sent
                </h3>
                <p className="leading-relaxed text-forest/70">
                  Thanks for reaching out &mdash; someone from the committee
                  will get back to you soon.
                </p>
              </div>
            ) : (
              <form
                name="contact"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don&rsquo;t fill this out if you&rsquo;re human:{" "}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="University email"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Field
                  label="Subject"
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-forest"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={fields.message}
                    onChange={handleChange}
                    className="rounded-xl border border-forest/20 bg-paper px-4 py-3 text-forest outline-none transition-colors focus:border-coral"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-forest/70">
                  <input
                    type="checkbox"
                    checked={updates}
                    onChange={(e) => setUpdates(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-forest/30 text-coral focus:ring-coral"
                  />
                  I&rsquo;d like to hear about future BrightFutures events.
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 w-fit rounded-full bg-coral px-7 py-3 font-semibold text-cream transition-colors hover:bg-coral-light disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>

                {status === "error" ? (
                  <p role="alert" className="text-sm text-coral">
                    Something went wrong sending that &mdash; please try
                    again, or email us directly.
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-forest">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="rounded-xl border border-forest/20 bg-paper px-4 py-3 text-forest outline-none transition-colors focus:border-coral"
      />
    </div>
  )
}
