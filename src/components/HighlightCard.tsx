import type { MemberHighlight } from "@/lib/cms/types";

export function HighlightCard({ highlight }: { highlight: MemberHighlight }) {
  const showImage = Boolean(highlight.image && highlight.image_alt?.trim());

  return (
    <article className="highlight-note flex h-full min-w-0 flex-col overflow-hidden border-2 border-forest bg-paper shadow-[7px_7px_0_#16332c] transition-transform hover:-translate-y-1">
      {showImage ? (
        <img
          src={highlight.image!}
          alt={highlight.image_alt!.trim()}
          className="aspect-[4/3] w-full border-b-2 border-forest object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {highlight.category ? (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
            {highlight.category}
          </p>
        ) : null}
        <p className="mt-4 whitespace-pre-line break-words font-display text-2xl leading-snug text-forest">
          {highlight.highlight_text}
        </p>
        <footer className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-forest/15 pt-5 text-sm text-forest/60">
          <span className="font-semibold text-forest">
            {highlight.display_name?.trim() || "Anonymous member"}
          </span>
          {highlight.term ? <span>{highlight.term}</span> : null}
        </footer>
      </div>
    </article>
  );
}
