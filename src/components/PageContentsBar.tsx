import { useEffect, useMemo, useRef, useState } from "react"
import { useRouterState } from "@tanstack/react-router"
import { ChevronUp, List, X } from "lucide-react"

type SectionLink = { id: string; label: string }
const legalPages = new Set(["/privacy", "/cookies", "/terms", "/community-guidelines"])

function headingId(label: string, index: number) {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return slug || `section-${index + 1}`
}

export function PageContentsBar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [sections, setSections] = useState<SectionLink[]>([])
  const [activeId, setActiveId] = useState("")
  const [open, setOpen] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
    if (!legalPages.has(pathname)) {
      setSections([])
      setActiveId("")
      return
    }
    let cleanup = () => {}
    const frame = window.requestAnimationFrame(() => {
      const headings = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2"))
      const used = new Set<string>()
      const links = headings.map((heading, index) => {
        const label = heading.textContent?.trim() || `Section ${index + 1}`
        let id = heading.id || headingId(label, index)
        let suffix = 2
        while (used.has(id) || (!heading.id && document.getElementById(id))) id = `${headingId(label, index)}-${suffix++}`
        heading.id = id
        heading.classList.add("scroll-mt-28")
        used.add(id)
        return { id, label }
      })
      setSections(links)
      setActiveId(links[0]?.id || "")

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (visible[0]) setActiveId(visible[0].target.id)
        },
        { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
      )
      headings.forEach((heading) => observer.observe(heading))

      const updateFromScroll = () => {
        const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= window.innerHeight * 0.22)
        if (passed.length) setActiveId(passed[passed.length - 1].id)
      }
      window.addEventListener("scroll", updateFromScroll, { passive: true })
      updateFromScroll()
      cleanup = () => {
        observer.disconnect()
        window.removeEventListener("scroll", updateFromScroll)
      }
    })
    return () => {
      window.cancelAnimationFrame(frame)
      cleanup()
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    closeButton.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  const activeLabel = useMemo(
    () => sections.find((section) => section.id === activeId)?.label || sections[0]?.label || "Page contents",
    [activeId, sections],
  )

  if (!legalPages.has(pathname) || !sections.length) return null

  return <>
    <div className="h-16" aria-hidden="true" />
    {open ? <div className="fixed inset-0 z-[70] bg-forest/45" aria-hidden="true" onClick={() => setOpen(false)} /> : null}
    {open ? <aside id="page-contents-panel" role="dialog" aria-modal="true" aria-labelledby="page-contents-title" className="fixed inset-x-3 bottom-[4.75rem] z-[80] mx-auto max-h-[min(70vh,38rem)] max-w-2xl overflow-y-auto border border-forest/15 bg-paper shadow-2xl sm:inset-x-6">
      <div className="sticky top-0 flex items-center justify-between gap-6 border-b border-forest/15 bg-paper px-5 py-4 sm:px-6">
        <div><p className="text-xs font-bold uppercase tracking-[.16em] text-coral">On this page</p><h2 id="page-contents-title" className="mt-1 font-display text-2xl text-forest">Choose a section</h2></div>
        <button ref={closeButton} type="button" onClick={() => setOpen(false)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-forest/20 text-forest hover:border-coral" aria-label="Close page contents"><X size={21} aria-hidden="true" /></button>
      </div>
      <nav aria-label="On this page" className="p-3 sm:p-4"><ol className="grid gap-1">{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} aria-current={section.id === activeId ? "location" : undefined} onClick={() => setOpen(false)} className={`flex min-h-12 items-center gap-4 px-4 py-3 text-sm transition-colors ${section.id === activeId ? "bg-forest font-bold text-cream" : "font-semibold text-forest hover:bg-cream-dim"}`}><span className={`font-display text-lg ${section.id === activeId ? "text-coral-light" : "text-coral"}`}>{String(index + 1).padStart(2, "0")}</span><span>{section.label}</span></a></li>)}</ol></nav>
    </aside> : null}
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-cream/15 bg-forest text-cream shadow-[0_-8px_30px_rgba(22,51,44,.18)]">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-3"><List size={19} className="shrink-0 text-coral-light" aria-hidden="true" /><div className="min-w-0"><p className="text-[.65rem] font-bold uppercase tracking-[.14em] text-cream/55">On this page</p><p className="truncate text-sm font-semibold text-cream">{activeLabel}</p></div></div>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="page-contents-panel" className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-cream/25 px-4 text-sm font-bold text-cream hover:border-coral-light"><span className="hidden sm:inline">{open ? "Close" : "View contents"}</span><span className="sm:hidden">{open ? "Close" : "Contents"}</span><ChevronUp size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" /></button>
      </div>
    </div>
  </>
}
