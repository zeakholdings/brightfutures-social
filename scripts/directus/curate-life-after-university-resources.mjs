import { api } from "./lib.mjs";

const reviewedOn = process.env.RESOURCE_REVIEWED_ON || "2026-08-17";
const reviewDue = process.env.RESOURCE_REVIEW_DUE || "2027-02-17";
for (const date of [reviewedOn, reviewDue]) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Review dates must use YYYY-MM-DD format");
}

const records = [
  {
    matchTitle: "Completing Your Studies", title: "Completing your studies",
    description: "Greenwich’s practical checklist for finalists, covering results and documents, account access, wellbeing, careers, graduation, further study and alumni support.",
    organisation: "University of Greenwich", url: "https://www.gre.ac.uk/student-services/completing-your-studies",
    eligibility_note: "For Greenwich finalists and recent graduates. Some services have their own time limits or access arrangements.",
    first_stop_guidance: "You’re approaching the end of your course and want one place to check what changes and what support continues.",
    context_label: "Start here · Leaving university", audience: ["all-greenwich-students"], featured: true, display_order: 16,
  },
  {
    title: "Careers support after graduation",
    description: "Greenwich graduates can use Target Connect for appointments, events, application support and graduate opportunities for up to two years after completing their studies.",
    organisation: "University of Greenwich", url: "https://www.gre.ac.uk/careers/get-help-with-job-applications-and-interviews",
    eligibility_note: "For University of Greenwich graduates up to two years after completing their studies. Register with a personal email address and your student ID.",
    first_stop_guidance: "You want help with a CV, application or interview, or you’re looking for graduate roles and careers events.",
    context_label: "Greenwich · Recent graduates", audience: ["all-greenwich-students"], featured: true, display_order: 17,
  },
  {
    title: "Continuing to postgraduate study at Greenwich",
    description: "Information for Greenwich finalists and alumni considering postgraduate study, including the application route and links to current loans, bursaries and scholarships.",
    organisation: "University of Greenwich", url: "https://www.gre.ac.uk/study/apply/continue-to-pg",
    eligibility_note: "For current Greenwich undergraduate students and alumni. Funding has separate course, fee-status and other criteria, so check each current offer before applying.",
    first_stop_guidance: "You’re considering a postgraduate course at Greenwich and want to understand the application and funding routes.",
    context_label: "Greenwich · Further study", audience: ["all-greenwich-students"], featured: false, display_order: 18,
  },
  {
    title: "Greenwich awards ceremonies",
    description: "The official place for ceremony dates, preparing for graduation, what happens on the day and award-document information.",
    organisation: "University of Greenwich", url: "https://www.gre.ac.uk/awards-ceremonies",
    eligibility_note: "For Greenwich students who are eligible to attend an award ceremony. Booking, guest-ticket and ceremony arrangements vary, so use the current official information.",
    first_stop_guidance: "You need the current graduation dates, booking steps or practical ceremony information.",
    context_label: "Greenwich · Graduation", audience: ["all-greenwich-students"], featured: false, display_order: 19,
  },
  {
    title: "Leaving care: support into adulthood",
    description: "Official guidance on support from your council after leaving care, including a personal adviser, pathway planning, suitable housing, education, training and finding work.",
    organisation: "GOV.UK", url: "https://www.gov.uk/leaving-foster-or-local-authority-care",
    eligibility_note: "Entitlements depend on your age and care history. The guidance explains the main rules in England and how to find your council’s local offer.",
    first_stop_guidance: "You want to check what transition support your council should provide, including help with housing or work.",
    context_label: "Practical transition · Care leavers", audience: ["care-leavers"], featured: true, display_order: 20,
  },
];

const current = await api("/items/resources?limit=-1");
for (const { matchTitle, ...record } of records) {
  const existing = current.find((item) => item.title === (matchTitle || record.title) || item.title === record.title);
  const payload = { ...record, category: "life-after-university", source_url: record.url, last_reviewed: reviewedOn, review_due: reviewDue, resource_status: "active", status: "published" };
  if (existing) await api(`/items/resources/${existing.id}`, { method: "PATCH", body: JSON.stringify(payload) });
  else current.push(await api("/items/resources", { method: "POST", body: JSON.stringify(payload) }));
}

const duplicateApplicationSupport = current.find((item) => item.title === "Job Application and Interview Support");
if (duplicateApplicationSupport && duplicateApplicationSupport.status !== "archived") {
  await api(`/items/resources/${duplicateApplicationSupport.id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "archived", resource_status: "archived", last_reviewed: reviewedOn, review_due: reviewDue }),
  });
}

console.log(`Life after university curation complete: ${records.length} records written.`);
