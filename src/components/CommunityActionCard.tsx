import type { CommunityAction, CommunityActionStatus } from "@/lib/cms/types";

const statusLabels: Record<CommunityActionStatus, string> = {
  heard: "Heard",
  raised: "Raised",
  in_progress: "In progress",
  completed: "Completed",
};

const statusStyles: Record<CommunityActionStatus, string> = {
  heard: "border-forest/25 bg-cream-dim text-forest",
  raised: "border-coral/35 bg-coral/10 text-forest",
  in_progress: "border-green/40 bg-green/10 text-forest",
  completed: "border-forest bg-forest text-cream",
};

export function CommunityActionCard({ action }: { action: CommunityAction }) {
  return (
    <article className="flex h-full min-w-0 flex-col border-2 border-forest bg-paper p-6 shadow-[7px_7px_0_#e8734a] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          {action.theme ? (
            <p className="break-words text-xs font-bold uppercase tracking-[0.16em] text-coral">
              {action.theme}
            </p>
          ) : null}
          <h3 className="mt-2 break-words font-display text-2xl leading-tight text-forest">
            {action.title}
          </h3>
        </div>
        <p className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[action.current_status]}`}>
          <span className="sr-only">Status: </span>
          {statusLabels[action.current_status]}
        </p>
      </div>
      <div className="mt-7 grid gap-0 border-2 border-forest sm:grid-cols-2">
        <div className="bg-coral/15 p-5">
          <h4 className="font-display text-2xl text-forest">You said</h4>
          <p className="mt-2 whitespace-pre-line break-words leading-relaxed text-forest/70">
            {action.what_members_said}
          </p>
        </div>
        <div className="border-t-2 border-forest bg-green/15 p-5 sm:border-l-2 sm:border-t-0">
          <h4 className="font-display text-2xl text-forest">
            {action.current_status === "completed" ? "What we did" : "What we’re doing"}
          </h4>
          <p className="mt-2 whitespace-pre-line break-words leading-relaxed text-forest/70">
            {action.what_brightfutures_did}
          </p>
        </div>
      </div>
      {action.public_update?.trim() ? (
        <div className="mt-6 border-l-4 border-green bg-cream-dim px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-forest/60">Latest update</p>
          <p className="mt-1 whitespace-pre-line break-words text-sm leading-relaxed text-forest/75">
            {action.public_update}
          </p>
        </div>
      ) : null}
    </article>
  );
}
