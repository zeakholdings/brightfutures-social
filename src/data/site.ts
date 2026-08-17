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

export const footerLinks = [
  { label: "About", to: "/about" },
  { label: "What’s On", to: "/events" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Partnerships", to: "/partnerships" },
  { label: "Resources", to: "/resources" },
  { label: "News & Stories", to: "/stories" },
  { label: "Member Highlights", to: "/highlights" },
  { label: "You Said / We’re Doing", to: "/voice" },
  { label: "Community Check-In", to: "/check-in" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Community Guidelines", to: "/community-guidelines" },
  { label: "Accessibility", to: "/accessibility" },
] as const
