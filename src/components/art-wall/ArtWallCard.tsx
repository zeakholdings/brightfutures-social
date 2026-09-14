import { Link } from "@tanstack/react-router"
import type { ArtWallSubmission } from "@/data/art-wall"
import { typeLabel } from "@/data/art-wall"

export function ArtWallCard({ work, index = 0 }: { work: ArtWallSubmission; index?: number }) {
  const textWork = work.type === "poetry" || work.type === "writing"
  return <article className={`group relative break-inside-avoid border border-forest/15 bg-paper p-4 shadow-[4px_5px_0_rgba(22,51,44,.12)] transition-transform hover:-translate-y-1 motion-reduce:transition-none ${index % 3 === 1 ? "md:translate-y-6" : ""}`}>
    <Link to="/art-wall/$slug" params={{ slug: work.slug }} className="absolute inset-0 z-10" aria-label={`Read ${work.title} by ${work.displayName || "Anonymous"}`} />
    {work.imageUrl ? <img src={work.imageUrl} alt={work.altText || ""} loading="lazy" className="w-full bg-cream-dim object-contain" /> : null}
    {textWork ? <div className="min-h-48 bg-cream p-5"><p className="line-clamp-6 whitespace-pre-wrap font-display text-xl leading-relaxed text-forest">{work.textContent}</p></div> : null}
    <div className="pt-4"><p className="text-[.68rem] font-extrabold uppercase tracking-[.14em] text-coral">{typeLabel(work.type)}</p><h3 className="mt-1 font-display text-2xl leading-tight text-forest">{work.title}</h3><p className="mt-1 text-sm text-forest/60">Shared by {work.isAnonymous ? "Anonymous" : work.displayName}</p></div>
  </article>
}
