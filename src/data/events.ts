// Event data lives here for now. Shape is deliberately flat and JSON-serialisable
// so it can be moved to a CMS or a static JSON/API source later without changing
// any component code — components only ever consume the `Event` type below.

export type EventCategory = "Social" | "Community" | "Check-In" | "Opportunity"

export interface Event {
  slug: string
  date: string // human-readable, since exact times are not always confirmed
  isoDate?: string // used for sorting when known
  title: string
  description: string
  location?: string
  category: EventCategory
  rsvp?: string // link to RSVP form/page; omitted when not yet available
  past?: boolean
}

export const events: Event[] = [
  {
    slug: "greenwich-cares-welcome",
    date: "9 September",
    isoDate: "2026-09-09",
    title: "Greenwich Cares Welcome",
    description:
      "Meet BrightFutures and find out what we're doing this year. A first look at the community before term properly begins.",
    location: "Details coming soon",
    category: "Community",
  },
  {
    slug: "find-your-people",
    date: "15 September",
    isoDate: "2026-09-15",
    title: "BrightFutures: Find Your People",
    description:
      "Our official 2026/27 Welcome Social. Come and meet the people you'll be spending the year with.",
    location: "Details coming soon",
    category: "Social",
  },
  {
    slug: "coffee-and-connect",
    date: "Late September",
    title: "Coffee & Connect",
    description:
      "A smaller, relaxed space to grab a drink and meet other students. No pressure, just good company.",
    location: "Details coming soon",
    category: "Social",
  },
  {
    slug: "settling-in-check-in",
    date: "Mid-October",
    title: "Settling In Check-In",
    description:
      "How are you, actually? A relaxed space to reconnect once university gets going.",
    location: "Details coming soon",
    category: "Check-In",
  },
  {
    slug: "christmas-together",
    date: "December",
    title: "BrightFutures Christmas Together",
    description: "Food, games and an end-of-term celebration.",
    location: "Details coming soon",
    category: "Community",
  },
]

export const journey = [
  {
    month: "September",
    verb: "Belong",
    description: "Welcome events and new connections.",
  },
  {
    month: "October",
    verb: "Settle",
    description: "Check-ins and navigating university life.",
  },
  {
    month: "November",
    verb: "Connect",
    description: "Social activities and opportunities.",
  },
  {
    month: "December",
    verb: "Celebrate",
    description: "End-of-term community and Christmas event.",
  },
] as const

export const ideaCards = [
  "More socials",
  "Trips",
  "Careers and employability",
  "Wellbeing activities",
  "Campaigns and advocacy",
  "Creative projects",
  "Workshops",
  "Coffee meet-ups",
] as const
