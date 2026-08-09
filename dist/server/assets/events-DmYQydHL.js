const events = [
  { slug: "greenwich-cares-welcome", startDate: "2026-09-09", title: "Greenwich Cares Welcome", description: "Meet BrightFutures and find out what the community has planned.", location: "Details coming soon", category: "Community", academicYear: "2026/27", status: "confirmed", featured: true },
  { slug: "find-your-people", startDate: "2026-09-15", title: "BrightFutures: Find Your People", description: "Come along, meet other students and get to know BrightFutures.", location: "Details coming soon", category: "Social", academicYear: "2026/27", status: "confirmed", featured: true },
  { slug: "coffee-and-connect", dateLabel: "Late September", title: "Coffee & Connect", description: "A relaxed chance to grab a drink and meet other students.", location: "Details coming soon", category: "Coffee & Connect", academicYear: "2026/27", status: "provisional", featured: true },
  { slug: "settling-in-check-in", dateLabel: "Mid-October", title: "Settling In Check-In", description: "A low-key chance to reconnect once university gets going.", location: "Details coming soon", category: "Wellbeing", academicYear: "2026/27", status: "provisional", featured: false },
  { slug: "christmas-together", dateLabel: "December", title: "BrightFutures Christmas Together", description: "Food, games and an end-of-term get-together.", location: "Details coming soon", category: "Seasonal", academicYear: "2026/27", status: "provisional", featured: false }
];
const dateValue = (event) => event.startDate ? new Date(event.startDate.includes("T") ? event.startDate : `${event.startDate}T23:59:59`).getTime() : Number.MAX_SAFE_INTEGER;
function isUpcoming(event, now = /* @__PURE__ */ new Date()) {
  if (event.status === "completed" || event.status === "cancelled") return false;
  return !event.startDate || dateValue(event) >= now.getTime();
}
const activityThemes = [["Welcome", "Helping new and returning students find their feet."], ["Social", "Coffee, food, activities, trips and things people actually want to do."], ["Connect", "Meeting people and building friendships."], ["Opportunity", "Careers, skills, projects, workshops and collaborations."], ["Voice", "Advocacy, campaigns and helping improve Greenwich."], ["Celebrate", "Community moments, seasonal events and end-of-year activities."]];
const ideaCards = ["Socials", "Trips", "Food", "Careers", "Workshops", "Campaigns", "Creative projects", "Something else"];
export {
  activityThemes as a,
  ideaCards as b,
  events as e,
  isUpcoming as i
};
