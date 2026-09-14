export const site = {
  name: "BrightFutures",
  fullName: "BrightFutures Greenwich Society",
  university: "University of Greenwich",
  domain: "brightfutures.social",
  tagline:
    "The student-led community for care-experienced and estranged students at the University of Greenwich.",
  email: "hello@brightfutures.social",
  // Social URLs are managed in the Directus site_settings singleton.
  instagram: null,
  joinUrl: "https://www.greenwichsu.co.uk/societies/18691/",
}

export const nav = [
  { label: "Home", to: "/" },
  { label: "What’s On", to: "/events" },
  { label: "About", to: "/about" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Partnerships", to: "/partnerships" },
  { label: "Resources", to: "/resources" },
  { label: "News & Stories", to: "/stories" },
] as const

export const footerGroups = [
  { label: "Explore", links: [
    { label: "What’s On", to: "/events" }, { label: "About", to: "/about" },
    { label: "News & Stories", to: "/stories" }, { label: "Member Highlights", to: "/highlights" },
  ] },
  { label: "Get involved", links: [
    { label: "Join us", to: "/get-involved" }, { label: "Community Check-In", to: "/check-in" },
    { label: "Partnerships", to: "/partnerships" }, { label: "You Said / We’re Doing", to: "/voice" },
  ] },
  { label: "Information", links: [
    { label: "Resources", to: "/resources" }, { label: "Contact", to: "/contact" },
    { label: "Accessibility", to: "/accessibility" }, { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ] },
] as const
