const site = {
  fullName: "BrightFutures Greenwich Society",
  university: "University of Greenwich",
  tagline: "The student-led community for care-experienced and estranged students at the University of Greenwich.",
  email: "hello@brightfutures.social",
  // placeholder; update with confirmed handle
  joinUrl: "https://www.greenwichsu.co.uk/societies/18691/"
};
const nav = [
  { label: "Home", to: "/" },
  { label: "What’s On", to: "/events" },
  { label: "About", to: "/about" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Resources", to: "/resources" },
  { label: "News & Stories", to: "/stories" }
];
const footerLinks = [
  { label: "About", to: "/about" },
  { label: "What’s On", to: "/events" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Resources", to: "/resources" },
  { label: "News & Stories", to: "/stories" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Accessibility", to: "/accessibility" }
];
export {
  footerLinks as f,
  nav as n,
  site as s
};
