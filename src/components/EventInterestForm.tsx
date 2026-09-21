import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CalendarPlus2, Clock3, Trash2 } from "lucide-react";
import type { EventInterestOption } from "@/data/events";
import { submitEventInterest } from "@/lib/cms/server";

type Attendance = "yes" | "maybe" | "no";
type Fields = {
  attendance: Attendance;
  availability: string[];
  suggestedSlots: SuggestedSlotDraft[];
  email: string;
  website: string;
};

type SuggestedSlotDraft = { date: string; startTime: string; endTime: string };

const emptySuggestion = (): SuggestedSlotDraft => ({ date: "", startTime: "", endTime: "" });

function respondentStorageKey(eventSlug: string) {
  return `brightfutures:event-interest:${eventSlug}:respondent-id`;
}

function newRespondentId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
    return crypto.randomUUID();
  if (typeof crypto === "undefined" || typeof crypto.getRandomValues !== "function")
    throw new Error("Your browser cannot create an anonymous response ID. Please try a current browser.");

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function respondentIdFor(eventSlug: string) {
  const key = respondentStorageKey(eventSlug);
  try {
    const stored = window.localStorage.getItem(key);
    if (stored && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(stored))
      return stored;
    const id = newRespondentId();
    window.localStorage.setItem(key, id);
    return id;
  } catch {
    // Storage can be disabled. The submission remains anonymous, but cannot be
    // associated with a later edit from this browser.
    return newRespondentId();
  }
}

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
    suggestedSlots: [],
    email: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const closed = useMemo(
    () => !!closesAt && Number.isFinite(Date.parse(closesAt)) && Date.parse(closesAt) <= Date.now(),
    [closesAt],
  );

  const chooseAttendance = (attendance: Attendance) => {
    setFields((current) => ({
      ...current,
      attendance,
      availability: attendance === "no" ? [] : current.availability,
      suggestedSlots: attendance === "no" ? [] : current.suggestedSlots,
    }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };

  const toggleOption = (id: string) => {
    setFields((current) => ({
      ...current,
      availability: current.availability.includes(id)
        ? current.availability.filter((value) => value !== id)
        : [...current.availability, id],
    }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };

  const updateSuggestion = (index: number, field: keyof SuggestedSlotDraft, value: string) => {
    setFields((current) => ({
      ...current,
      suggestedSlots: current.suggestedSlots.map((slot, slotIndex) =>
        slotIndex === index ? { ...slot, [field]: value } : slot,
      ),
    }));
    if (status === "error") setStatus("idle");
    setErrorMessage("");
  };

  const suggestedSlots = fields.suggestedSlots
    .filter((slot) => slot.date && slot.startTime)
    .map((slot) => ({
      start: new Date(`${slot.date}T${slot.startTime}`).toISOString(),
      ...(slot.endTime ? { end: new Date(`${slot.date}T${slot.endTime}`).toISOString() } : {}),
    }));

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
          suggestedSlots,
          respondentId: respondentIdFor(eventSlug),
          email: fields.email,
          website: fields.website,
        },
      });
      void result;
      window.location.assign(`${window.location.pathname}#interest-check`);
    } catch (reason) {
      setErrorMessage(reason instanceof Error && reason.message ? reason.message : "We couldn’t save that response. Your choices are still here, so please try again.");
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

  const attendanceOptions: Array<{ value: Attendance; label: string; detail: string }> = [
    { value: "yes", label: "Yes", detail: "I’d be up for it" },
    { value: "maybe", label: "Maybe", detail: "Depends on the date" },
    { value: "no", label: "Not this one", detail: "Probably not" },
  ];

  return (
    <section id="interest-check" className="relative scroll-mt-24 overflow-hidden border-2 border-forest bg-paper px-5 py-7 sm:px-7 sm:py-8">
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
                <p className="mt-4 border border-forest/15 bg-cream px-4 py-3 text-sm text-forest/65">Date options are being added. You can still tell us you’re interested and suggest a time below.</p>
              )}
            </fieldset>
          ) : null}

          {fields.attendance !== "no" ? (
            <fieldset className="border-t-2 border-forest/15 pt-7">
              <legend className="font-display text-xl font-semibold text-forest">None of these work? Suggest another time</legend>
              <p className="mt-1 text-sm text-forest/55">Share up to five times that would suit you. These stay separate until an organiser adds one to the poll.</p>
              <div className="mt-4 grid gap-4">
                {fields.suggestedSlots.map((slot, index) => (
                  <div key={index} className="border-2 border-forest/20 bg-cream p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-bold text-forest">Suggested time {index + 1}</p>
                      <button type="button" onClick={() => setFields((current) => ({ ...current, suggestedSlots: current.suggestedSlots.filter((_, slotIndex) => slotIndex !== index) }))} className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-coral hover:text-forest">
                        <Trash2 size={16} aria-hidden="true" /> Remove
                      </button>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <label className="grid gap-1 text-sm font-semibold text-forest">Date<input type="date" value={slot.date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => updateSuggestion(index, "date", event.target.value)} className="min-h-11 border-2 border-forest/25 bg-paper px-3 font-normal outline-none focus:border-coral" required /></label>
                      <label className="grid gap-1 text-sm font-semibold text-forest">Start time<input type="time" value={slot.startTime} onChange={(event) => updateSuggestion(index, "startTime", event.target.value)} className="min-h-11 border-2 border-forest/25 bg-paper px-3 font-normal outline-none focus:border-coral" required /></label>
                      <label className="grid gap-1 text-sm font-semibold text-forest">End time <span className="font-normal text-forest/50">(optional)</span><input type="time" value={slot.endTime} onChange={(event) => updateSuggestion(index, "endTime", event.target.value)} className="min-h-11 border-2 border-forest/25 bg-paper px-3 font-normal outline-none focus:border-coral" /></label>
                    </div>
                  </div>
                ))}
              </div>
              {fields.suggestedSlots.length < 5 ? <button type="button" onClick={() => setFields((current) => ({ ...current, suggestedSlots: [...current.suggestedSlots, emptySuggestion()] }))} className="mt-4 inline-flex min-h-11 items-center gap-2 border-2 border-forest px-4 py-2 text-sm font-bold text-forest hover:bg-forest hover:text-cream"><CalendarPlus2 size={17} aria-hidden="true" /> Add another date/time</button> : null}
            </fieldset>
          ) : null}

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
            <p className="max-w-sm text-xs leading-relaxed text-forest/50">Submitting again from this browser updates your response. Other people on the same Wi-Fi can respond separately.</p>
          </div>
          {status === "error" ? <p role="alert" className="border-l-4 border-coral pl-3 text-sm font-semibold text-coral">{errorMessage}</p> : null}
        </form>
      </div>
    </section>
  );
}
