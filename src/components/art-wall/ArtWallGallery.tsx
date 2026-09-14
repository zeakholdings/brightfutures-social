import { useMemo, useState } from "react"
import type { ArtWallSubmission } from "@/data/art-wall"
import { galleryType } from "@/data/art-wall"
import { ArtWallCard } from "./ArtWallCard"
const filters = ["All", "Art", "Photography", "Poetry", "Writing", "Mixed media"] as const
export function ArtWallGallery({ works }: { works: ArtWallSubmission[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const shown = useMemo(() => works.filter((work) => filter === "All" || galleryType(work.type) === filter), [works, filter])
  return <><div className="-mx-1 flex gap-2 overflow-x-auto pb-3" role="toolbar" aria-label="Filter the Art Wall">{filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`min-h-11 shrink-0 border px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${filter === item ? "border-forest bg-forest text-cream" : "border-forest/25 bg-paper text-forest hover:border-forest"}`}>{item}</button>)}</div>
  {shown.length ? <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3">{shown.map((work, index) => <div key={work.slug} className="mb-6"><ArtWallCard work={work} index={index} /></div>)}</div> : <p className="mt-10 border-l-4 border-coral bg-paper p-6 text-forest/70">No pieces match that filter yet. Try another way into the wall.</p>}</>
}
