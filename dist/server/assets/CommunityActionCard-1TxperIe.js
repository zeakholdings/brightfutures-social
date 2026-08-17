import { jsxs, jsx } from "react/jsx-runtime";
const statusLabels = {
  heard: "Heard",
  raised: "Raised",
  in_progress: "In progress",
  completed: "Completed"
};
const statusStyles = {
  heard: "border-forest/25 bg-cream-dim text-forest",
  raised: "border-coral/35 bg-coral/10 text-forest",
  in_progress: "border-green/40 bg-green/10 text-forest",
  completed: "border-forest bg-forest text-cream"
};
function CommunityActionCard({ action }) {
  return /* @__PURE__ */ jsxs("article", { className: "flex h-full min-w-0 flex-col border-2 border-forest bg-paper p-6 shadow-[7px_7px_0_#e8734a] sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        action.theme ? /* @__PURE__ */ jsx("p", { className: "break-words text-xs font-bold uppercase tracking-[0.16em] text-coral", children: action.theme }) : null,
        /* @__PURE__ */ jsx("h3", { className: "mt-2 break-words font-display text-2xl leading-tight text-forest", children: action.title })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: `shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[action.current_status]}`, children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Status: " }),
        statusLabels[action.current_status]
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-7 grid gap-0 border-2 border-forest sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-coral/15 p-5", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display text-2xl text-forest", children: "You said" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-line break-words leading-relaxed text-forest/70", children: action.what_members_said })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t-2 border-forest bg-green/15 p-5 sm:border-l-2 sm:border-t-0", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display text-2xl text-forest", children: action.current_status === "completed" ? "What we did" : "What we’re doing" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-line break-words leading-relaxed text-forest/70", children: action.what_brightfutures_did })
      ] })
    ] }),
    action.public_update?.trim() ? /* @__PURE__ */ jsxs("div", { className: "mt-6 border-l-4 border-green bg-cream-dim px-4 py-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.12em] text-forest/60", children: "Latest update" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 whitespace-pre-line break-words text-sm leading-relaxed text-forest/75", children: action.public_update })
    ] }) : null
  ] });
}
export {
  CommunityActionCard as C
};
