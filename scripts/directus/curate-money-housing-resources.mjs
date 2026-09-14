import { api } from "./lib.mjs";

const reviewedOn = process.env.RESOURCE_REVIEWED_ON || "2026-08-17";
if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedOn)) {
  throw new Error("RESOURCE_REVIEWED_ON must use YYYY-MM-DD format");
}

const standardReviewDue = process.env.RESOURCE_REVIEW_DUE || "2027-02-17";
const fundingReviewDue = process.env.FUNDING_REVIEW_DUE || "2026-10-15";
for (const date of [standardReviewDue, fundingReviewDue]) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Review dates must use YYYY-MM-DD format");
}

const records = [
  {
    matchTitle: "Money Advice and Support",
    title: "Greenwich Money Advice and Support",
    description: "The University’s Student Fees and Funding team helps with Student Finance, fees, budgeting, bursaries and financial hardship. Current students can ask through the Digital Student Centre or self-refer for detailed support.",
    category: "money-funding",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/finance/money-advice",
    eligibility_note: "For Greenwich students, applicants and alumni; the contact route depends on whether you are a current student.",
    first_stop_guidance: "You’re short of money, Student Finance has gone wrong or you’re unsure what funding you can access.",
    context_label: null,
    audience: ["all-greenwich-students"],
    featured: true,
    display_order: 3,
    review_due: standardReviewDue,
  },
  {
    matchTitle: "Care Leaver Bursary",
    title: "Care Leaver Bursary",
    description: "A University of Greenwich bursary for eligible undergraduate and postgraduate taught students joining directly from local-authority care. Check the current criteria and submit the requested evidence to the University.",
    category: "money-funding",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/bursaries/care-leaver-bursary",
    eligibility_note: "The University currently lists age, home-fee status, course, Student Loans Company support and evidence of care-leaver status among its criteria.",
    first_stop_guidance: null,
    context_label: "Check current criteria",
    audience: ["care-leavers"],
    featured: true,
    display_order: 4,
    review_due: fundingReviewDue,
  },
  {
    matchTitle: "Greenwich Hardship Fund",
    title: "Greenwich Hardship Fund",
    description: "Discretionary University support for eligible students facing sudden financial difficulty. It is not intended as a main source of funding or for tuition fees; check the official page for the current application status.",
    category: "money-funding",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/finance/funding-your-studies/access-to-learning-fund",
    eligibility_note: "The University publishes detailed residence, registration, funding and financial-assessment criteria for each application cycle.",
    first_stop_guidance: null,
    context_label: "Check whether applications are open",
    audience: ["all-greenwich-students"],
    featured: true,
    display_order: 5,
    review_due: fundingReviewDue,
  },
  {
    matchTitle: "Student Finance for Estranged Students",
    title: "Student Finance England: estranged students",
    description: "Official guidance on applying for independent status when you are estranged from your parents, including the evidence Student Finance England may request.",
    category: "money-funding",
    organisation: "Student Loans Company / GOV.UK",
    url: "https://www.gov.uk/government/publications/applying-for-student-finance-as-an-estranged-student",
    eligibility_note: "This guidance applies in England to new and continuing undergraduate and postgraduate students. Student Finance England assesses each application and its evidence.",
    first_stop_guidance: null,
    context_label: null,
    audience: ["estranged-students"],
    featured: true,
    display_order: 6,
    review_due: standardReviewDue,
  },
  {
    title: "Other Greenwich bursaries and financial support",
    description: "There may be other Greenwich funding available depending on your circumstances. Check the University's current bursaries and financial-support information.",
    category: "money-funding",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/finance/funding-your-studies/scholarships-and-bursaries",
    eligibility_note: "Awards have different criteria, availability and application arrangements; use the University’s current list to choose what to check.",
    first_stop_guidance: null,
    context_label: "Curated funding gateway",
    audience: ["all-greenwich-students"],
    featured: false,
    display_order: 7,
    review_due: fundingReviewDue,
  },
  {
    title: "University of Greenwich Accommodation Services",
    description: "The University’s route for halls applications, current accommodation information and contact with Accommodation Services. Use it when applying, asking about availability or dealing with a problem in Greenwich halls.",
    category: "accommodation",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/accommodation",
    eligibility_note: "Application routes and availability vary for new, current, partner-college and short-course students; check the current University guidance.",
    first_stop_guidance: "You want to apply for Greenwich halls or need help with University-managed accommodation.",
    context_label: "University accommodation",
    audience: ["all-greenwich-students"],
    featured: true,
    display_order: 8,
    review_due: standardReviewDue,
  },
  {
    matchTitle: "Accommodation for Care-Experienced and Estranged Students",
    title: "Accommodation for care-experienced and estranged students",
    description: "Greenwich’s guidance on priority for halls and requests to extend a standard contract to 52 weeks, including summer. Tell Accommodation Services during the application process and follow its summer-housing steps.",
    category: "accommodation",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/accommodation/special-requirements",
    eligibility_note: "For care leavers, care-experienced and estranged students. Priority is not a guarantee: not every hall is available in summer and the University’s process and availability apply.",
    first_stop_guidance: "You need halls during Christmas, Easter or summer, or want your circumstances considered in your application.",
    context_label: "Halls and vacation accommodation",
    audience: ["care-experienced-and-estranged-students"],
    featured: true,
    display_order: 9,
    review_due: standardReviewDue,
  },
  {
    title: "GSU housing and private-renting advice",
    description: "Free, confidential and independent general housing advice and signposting from GSU. Ask about a tenancy before signing, rent, deposits, disrepair, eviction or another private-renting problem.",
    category: "accommodation",
    organisation: "Greenwich Students’ Union",
    url: "https://www.greenwichsu.co.uk/advice/housing/",
    eligibility_note: "For University of Greenwich students. GSU gives general advice and can refer you to specialist housing services when needed.",
    first_stop_guidance: "You have a private-renting or tenancy problem and want independent student advice.",
    context_label: "Independent student advice",
    audience: ["all-greenwich-students"],
    featured: true,
    display_order: 10,
    review_due: standardReviewDue,
  },
  {
    title: "Urgent housing help: homeless or at risk",
    description: "If you have nowhere safe to stay or may lose your accommodation, use GOV.UK to contact the appropriate council’s professional homelessness service now. You can also ask GSU Advice to help you understand other support routes.",
    category: "accommodation",
    organisation: "GOV.UK",
    url: "https://www.gov.uk/homelessness-help-from-council",
    eligibility_note: "The council will assess what help it must provide under the rules that apply to your circumstances. The GOV.UK service helps you find the appropriate council.",
    first_stop_guidance: "You have nowhere safe to stay tonight, have been asked to leave or may soon lose your accommodation.",
    context_label: "Urgent professional help",
    audience: ["all-greenwich-students"],
    featured: true,
    display_order: 11,
    review_due: standardReviewDue,
  },
];

const current = await api("/items/resources?limit=-1");
let changed = 0;
for (const { matchTitle, ...record } of records) {
  const existing = current.find((item) => item.title === (matchTitle || record.title) || item.title === record.title);
  const payload = {
    ...record,
    source_url: record.url,
    last_reviewed: reviewedOn,
    resource_status: "active",
    status: "published",
  };
  if (existing) {
    await api(`/items/resources/${existing.id}`, { method: "PATCH", body: JSON.stringify(payload) });
  } else {
    const created = await api("/items/resources", { method: "POST", body: JSON.stringify(payload) });
    current.push(created);
  }
  changed += 1;
}

const unite = current.find((item) => item.title === "Unite Foundation Scholarship");
if (unite && unite.status !== "archived") {
  await api(`/items/resources/${unite.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: "archived",
      resource_status: "archived",
      last_reviewed: reviewedOn,
      source_url: "https://www.unitefoundation.org.uk/scholarship/",
      review_due: fundingReviewDue,
    }),
  });
  changed += 1;
}

console.log(`Money and housing curation complete: ${changed} records written.`);
