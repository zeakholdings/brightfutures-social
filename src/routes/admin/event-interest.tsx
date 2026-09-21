import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarCheck2, CheckCircle2, UsersRound } from "lucide-react";
import {
  confirmEventInterestOption,
  getEventInterestAdmin,
} from "@/lib/cms/server";

export const Route = createFileRoute("/admin/event-interest")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
    title: "Event interest | BrightFutures",
  }),
  component: EventInterestAdmin,
});

type Summary = Awaited<ReturnType<typeof getEventInterestAdmin>>[number];

function EventInterestAdmin() {
  const load = useServerFn(getEventInterestAdmin);
  const confirmSlot = useServerFn(confirmEventInterestOption);
  const [token, setToken] = useState("");
  const [items, setItems] = useState<Summary[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    try {
      setError("");
      setItems(await load({ data: { token } }));
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We couldn’t open the event planning dashboard.",
      );
    }
  }

  async function choose(eventSlug: string, optionId: string, label: string) {
    if (
      !window.confirm(
        `Confirm “${label}” as the event date? This will close the interest check and publish the event as confirmed.`,
      )
    )
      return;
    const key = `${eventSlug}:${optionId}`;
    try {
      setBusy(key);
      setError("");
      await confirmSlot({ data: { token, eventSlug, optionId } });
      setItems(await load({ data: { token } }));
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We couldn’t confirm that date.",
      );
    } finally {
      setBusy("");
    }
  }

  if (!items)
    return (
      <main className="min-h-[70vh] bg-forest px-6 py-20 text-cream">
        <form
          onSubmit={signIn}
          className="mx-auto max-w-md border border-cream/30 bg-forest-light p-7"
        >
          <p className="text-xs font-extrabold tracking-[.16em] text-coral-light">
            PRIVATE AREA
          </p>
          <h1 className="mt-3 font-display text-4xl">Event planning</h1>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            See member availability, compare the strongest times and confirm the
            final event date.
          </p>
          <label className="mt-6 flex flex-col gap-2 text-sm font-bold">
            Organiser passcode
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="bg-paper px-3 py-3 text-forest"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="mt-5 bg-coral px-5 py-3 font-bold">Open dashboard</button>
          {error ? (
            <p role="alert" className="mt-4 text-sm text-coral-light">
              {error}
            </p>
          ) : null}
        </form>
      </main>
    );

  return (
    <main className="min-h-screen bg-cream px-5 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-extrabold tracking-[.16em] text-coral">
          PRIVATE ORGANISER VIEW
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-5xl text-forest sm:text-6xl">
              Event interest
            </h1>
            <p className="mt-3 max-w-2xl text-forest/65">
              Responses update the same event record. Confirming a slot changes
              the event from an interest check into a normal confirmed event.
            </p>
          </div>
          <button
            onClick={async () => setItems(await load({ data: { token } }))}
            className="w-fit border-b-2 border-forest pb-1 text-sm font-bold text-forest"
          >
            Refresh results
          </button>
        </div>

        {error ? (
          <p role="alert" className="mt-6 border-l-4 border-coral pl-4 text-coral">
            {error}
          </p>
        ) : null}

        <div className="mt-10 grid gap-10">
          {items.map((item) => {
            const interested = item.totals.yes + item.totals.maybe;
            const labels = new Map(item.options.map((option) => [option.id, option.label]));
            return (
              <article
                key={item.slug}
                className="overflow-hidden border-2 border-forest bg-paper"
              >
                <header className="grid gap-6 bg-forest px-6 py-7 text-cream lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[.16em] text-coral-light">
                      {item.status === "interest-check" ? "Planning with members" : "Confirmed"}
                    </p>
                    <h2 className="mt-2 font-display text-4xl">{item.title}</h2>
                    <p className="mt-2 text-sm text-cream/60">/events/{item.slug}</p>
                  </div>
                  <div className="flex gap-3">
                    <Stat value={item.totals.yes} label="Yes" />
                    <Stat value={item.totals.maybe} label="Maybe" />
                    <Stat value={item.totals.no} label="No" />
                  </div>
                </header>

                <div className="grid gap-8 p-6 lg:grid-cols-[1.2fr_.8fr] lg:p-8">
                  <section>
                    <div className="flex items-center gap-3">
                      <CalendarCheck2 className="text-coral" />
                      <h3 className="font-display text-3xl text-forest">
                        Which time works best?
                      </h3>
                    </div>
                    <div className="mt-5 grid gap-3">
                      {item.options.map((option) => {
                        const best = item.bestOptionId === option.id;
                        const percentage = interested
                          ? Math.round((option.available / interested) * 100)
                          : 0;
                        const busyKey = `${item.slug}:${option.id}`;
                        return (
                          <div
                            key={option.id}
                            className={`grid gap-4 border-2 p-4 sm:grid-cols-[1fr_auto] sm:items-center ${best ? "border-green bg-green/10" : "border-forest/15 bg-cream"}`}
                          >
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-bold text-forest">{option.label}</p>
                                {best && item.options.length > 1 ? (
                                  <span className="bg-green px-2 py-1 text-[.68rem] font-extrabold uppercase tracking-widest text-forest">
                                    Strongest
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-1 text-sm text-forest/60">
                                {option.yes} yes · {option.maybe} maybe · {percentage}% of interested members available
                              </p>
                            </div>
                            {item.status === "interest-check" ? (
                              <button
                                type="button"
                                disabled={busy === busyKey}
                                onClick={() => choose(item.slug, option.id, option.label)}
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-coral px-4 py-2 text-sm font-bold text-cream hover:bg-forest disabled:opacity-60"
                              >
                                <CheckCircle2 size={17} />
                                {busy === busyKey ? "Confirming…" : "Confirm this slot"}
                              </button>
                            ) : null}
                          </div>
                        );
                      })}
                      {!item.options.length ? (
                        <p className="border border-forest/15 bg-cream p-4 text-sm text-forest/60">
                          This event has no planning options configured yet.
                        </p>
                      ) : null}
                    </div>
                  </section>

                  <aside>
                    <div className="flex items-center gap-3">
                      <UsersRound className="text-green" />
                      <h3 className="font-display text-3xl text-forest">Recent responses</h3>
                    </div>
                    <div className="mt-5 max-h-[32rem] space-y-3 overflow-y-auto pr-1">
                      {item.recent.map((response) => (
                        <div key={response.id} className="border border-forest/15 bg-cream p-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-coral">
                              {response.attendance}
                            </span>
                            {response.email ? (
                              <span className="text-xs text-forest/45">wants date update</span>
                            ) : null}
                          </div>
                          {response.availability.length ? (
                            <p className="mt-2 text-sm font-semibold text-forest">
                              {response.availability
                                .map((id) => labels.get(id) || id)
                                .join(" · ")}
                            </p>
                          ) : null}
                          {response.comment ? (
                            <p className="mt-2 text-sm leading-relaxed text-forest/65">
                              {response.comment}
                            </p>
                          ) : null}
                          {response.email ? (
                            <p className="mt-2 break-all text-xs text-forest/55">
                              {response.email}
                            </p>
                          ) : null}
                        </div>
                      ))}
                      {!item.recent.length ? (
                        <p className="border border-forest/15 bg-cream p-4 text-sm text-forest/60">
                          No responses yet.
                        </p>
                      ) : null}
                    </div>
                  </aside>
                </div>
              </article>
            );
          })}

          {!items.length ? (
            <div className="border-l-4 border-green bg-green/10 p-6 text-forest/70">
              No interest-check or recently confirmed events to show.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-16 border border-cream/20 px-3 py-2 text-center">
      <p className="font-display text-3xl leading-none">{value}</p>
      <p className="mt-1 text-[.65rem] font-bold uppercase tracking-wider text-cream/55">
        {label}
      </p>
    </div>
  );
}
