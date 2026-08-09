export const site = {
  name: "BrightFutures",
  fullName: "BrightFutures Greenwich Society",
  university: "University of Greenwich",
  domain: "brightfutures.social",
  tagline:
    "The student-led community for care-experienced and estranged students at the University of Greenwich.",
  email: "hello@brightfutures.social",
  instagram: "https://instagram.com/", // placeholder — update with confirmed handle
  joinUrl: "/get-involved",
}

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
] as const

export const footerLinks = [
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Accessibility", to: "/accessibility" },
] as const
