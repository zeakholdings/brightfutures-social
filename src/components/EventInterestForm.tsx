import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import type { EventInterestOption } from "@/data/events";
import { submitEventInterest } from "@/lib/cms/server";

type Attendance = "yes" | "maybe" | "no";
type Fields = {
  attendance: Attendance;
  availability: string[];
  comment: string;
  email: string;
  website: string;
};

export function EventInterestForm({
  eventSlug,
  options,
  closesAt,
}: {
  eventSlug: string;
  options: EventInterestOption[];
  closesAt?: string;
}) {
  const send = useServerFn(submitEventInterest);
  const [fields, setFields] = useState<Fields>({
    attendance: "yes",
    availability: [],
    comment: "",
    email: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [updated, setUpdated] = useState(false);
  const closed = useMemo(
    () => !!closesAt && Number.isFinite(Date.parse(closesAt)) && Date.parse(closesAt) <= Date.now(),
    [closesAt],
  );

  const chooseAttendance = (attendance: Attendance) => {
    setFields((current) => ({
      ...current,
      attendance,
      availability: attendance === "no" ? [] : current.availability,
    }));
    if (status === "error") setStatus("idle");
  };

  const toggleOption = (id: string) => {
    setFields((current) => ({
      ...current,
      availability: current.availability.includes(id)
        ? current.availability.filter((value) => value !== id)
        : [...current.availability, id],
    }));
    if (status === "error") setStatus("idle");
  };

  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status === "error") setStatus("idle");
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (closed) return;
    setStatus("sending");
    try {
      const result = await send({
        data: {
          eventSlug,
          attendance: fields.attendance,
          availability: fields.availability,
          comment: fields.comment,
          email: fields.email,
          website: fields.website,
        },
      });
      setUpdated(!!result.updated);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (closed)
    return (
      <section className="border-2 border-forest bg-paper px-6 py-7 text-forest">
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-coral">Interest check closed</p>
        <h2 className="mt-3 font-display text-3xl">Thanks for helping us plan it.</h2>
        <p className="mt-2 text-forest/70">We’re working through everyone’s availability and will update this page when the date is confirmed.</p>
      </section>
    );

  if (status === "sent")
    return (
      <section role="status" className="border-2 border-green bg-paper px-6 py-8 text-forest">
        <div className="flex size-11 items-center justify-center rounded-full bg-green text-forest"><Check size={22} /></div>
        <h2 className="mt-4 font-display text-3xl">Got it. Thanks.</h2>
        <p className="mt-2 max-w-xl text-forest/70">
          {updated
            ? "We’ve updated your previous response, so you won’t be counted twice."
            : "Your availability has been added to the interest check."}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 border-b-2 border-forest pb-1 text-sm font-bold text-forest hover:text-coral">
          Change my response
        </button>
      </section>
    );

  const attendanceOptions: Array<{ value: Attendance; label: string; detail: string }> = [
    { value: "yes", label: "Yes", detail: "I’d be up for it" },
    { value: "maybe", label: "Maybe", detail: "Depends on the date" },
    { value: "no", label: "Not this one", detail: "Probably not" },
  ];

  return (
    <section className="relative overflow-hidden border-2 border-forest bg-paper px-5 py-7 sm:px-7 sm:py-8">
      <div className="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full border-[22px] border-green/30" aria-hidden="true" />
      <div className="relative">
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-coral">Help choose the date</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl leading-none text-forest sm:text-5xl">When works for you?</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-forest/70">This one isn’t booked yet. Tell us if you’d come and tick every time you could make. We’ll use the responses to choose the strongest option.</p>

        <form onSubmit={submit} className="mt-8 grid gap-8">
          <div className="hidden" aria-hidden="true">
            <label>Website<input name="website" value={fields.website} onChange={change} tabIndex={-1} autoComplete="off" /></label>
          </div>

          <fieldset>
            <legend className="font-display text-xl font-semibold text-forest">Would you come?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {attendanceOptions.map((item) => {
                const active = fields.attendance === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => chooseAttendance(item.value)}
                    aria-pressed={active}
                    className={`min-h-24 border-2 px-4 py-4 text-left transition-all hover:-translate-y-0.5 ${active ? "border-forest bg-forest text-cream" : "border-forest/25 bg-cream text-forest hover:border-forest"}`}
                  >
                    <span className="block font-display text-2xl">{item.label}</span>
                    <span className={`mt-1 block text-xs font-semibold ${active ? "text-cream/70" : "text-forest/55"}`}>{item.detail}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {fields.attendance !== "no" ? (
            <fieldset>
              <legend className="font-display text-xl font-semibold text-forest">Which times could you make?</legend>
              <p className="mt-1 text-sm text-forest/55">Tick as many as work. You don’t have to choose just one.</p>
              {options.length ? (
                <div className="mt-4 grid gap-3">
                  {options.map((option) => {
                    const active = fields.availability.includes(option.id);
                    return (
                      <label key={option.id} className={`flex cursor-pointer items-center gap-4 border-2 px-4 py-4 transition-colors ${active ? "border-forest bg-coral-light" : "border-forest/20 bg-cream hover:border-forest/50"}`}>
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleOption(option.id)}
                          className="size-5 accent-[var(--color-forest)]"
                        />
                        <Clock3 size={19} className="shrink-0 text-coral" aria-hidden="true" />
                        <span className="font-semibold text-forest">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 border border-forest/15 bg-cream px-4 py-3 text-sm text-forest/65">Date options are being added. You can still tell us you’re interested and leave a note below.</p>
              )}
            </fieldset>
          ) : null}

          <label className="grid gap-2 text-sm font-bold text-forest">
            <span className="font-display text-xl">Anything you’d like us to include? <span className="font-body text-sm font-normal text-forest/50">(optional)</span></span>
            <textarea
              name="comment"
              value={fields.comment}
              onChange={change}
              maxLength={1200}
              rows={4}
              placeholder="A stop on the walk, accessibility needs, something that would make you more likely to come…"
              className="resize-y border-2 border-forest/25 bg-cream px-4 py-4 font-normal leading-relaxed text-forest outline-none placeholder:text-forest/35 focus:border-coral"
            />
          </label>

          <label className="grid gap-2 border-t border-forest/15 pt-6 text-sm font-semibold text-forest">
            <span>Email me when the date is confirmed <span className="font-normal text-forest/50">(optional)</span></span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={change}
              maxLength={254}
              placeholder="you@example.com"
              className="min-h-12 border-b-2 border-forest/35 bg-transparent px-1 py-3 font-normal outline-none focus:border-coral"
            />
          </label>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 items-center gap-3 bg-coral px-7 py-3 font-bold text-cream transition-all hover:-translate-y-1 hover:bg-forest disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send my availability"}
              {status !== "sending" ? <ArrowRight size={18} aria-hidden="true" /> : null}
            </button>
            <p className="max-w-sm text-xs leading-relaxed text-forest/50">Submitting again from the same connection updates your response rather than counting you twice.</p>
          </div>
          {status === "error" ? <p role="alert" className="border-l-4 border-coral pl-3 text-sm font-semibold text-coral">We couldn’t save that response. Your choices are still here, so please try again.</p> : null}
        </form>
      </div>
    </section>
  );
}
