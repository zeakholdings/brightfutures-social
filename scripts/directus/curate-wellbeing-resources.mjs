import { api } from "./lib.mjs";

const reviewedOn = process.env.RESOURCE_REVIEWED_ON || "2026-08-17";
const reviewDue = process.env.RESOURCE_REVIEW_DUE || "2027-02-17";
for (const date of [reviewedOn, reviewDue]) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Review dates must use YYYY-MM-DD format");
}

const records = [
  {
    matchTitle: "Spectrum Life: 24/7 Student Support",
    title: "Spectrum Life: 24/7 Student Support",
    description: "Free, confidential, in-the-moment support when you need to talk to somebody, available by phone, WhatsApp or online at any time.",
    organisation: "University of Greenwich / Spectrum Life",
    url: "https://www.gre.ac.uk/articles/public-relations/introducing-spectrum-life-our-new-student-assistance-programme",
    eligibility_note: "Available to registered Greenwich students 24 hours a day, 365 days a year.",
    first_stop_guidance: "You want to talk to a professional now, including outside normal University hours.",
    context_label: "Need to talk to somebody now · 24/7",
    display_order: 12,
  },
  {
    matchTitle: "Student Wellbeing Hub",
    title: "Student Wellbeing Hub",
    description: "The University gateway for ongoing wellbeing support, appointments, information and signposting, including psychological wellbeing, disability and dyslexia support.",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/support/wellbeing",
    eligibility_note: "Free and confidential support for registered Greenwich students, with self-referral available through the Digital Student Centre.",
    first_stop_guidance: "You want ongoing University wellbeing support or are not sure which University service fits.",
    context_label: "Want ongoing University wellbeing support",
    display_order: 13,
  },
  {
    matchTitle: "Counselling and Mental Health Support",
    title: "Counselling and Mental Health Support",
    description: "University counselling, mental-health guidance and psychological wellbeing support. The official page explains the options and how to self-refer through the Digital Student Centre.",
    organisation: "University of Greenwich",
    url: "https://www.gre.ac.uk/support/counselling",
    eligibility_note: "Available to Greenwich students through self-referral. The University states that this is not a crisis or emergency service.",
    first_stop_guidance: "You are looking for counselling, mental-health or psychological wellbeing support.",
    context_label: "Looking for counselling or mental-health support",
    display_order: 14,
  },
  {
    matchTitle: "Report + Support",
    title: "Report + Support",
    description: "The University route to report harassment, bullying, discrimination, a hate incident, sexual misconduct or another covered incident anonymously, or to ask to speak with a trained adviser about options and support.",
    organisation: "University of Greenwich",
    url: "https://reportandsupport.gre.ac.uk/",
    eligibility_note: "For people who have experienced or witnessed relevant behaviour; the official service explains its reporting and support options.",
    first_stop_guidance: "You have experienced or witnessed a reportable incident and want to report it or understand your options.",
    context_label: "Experienced a reportable incident",
    display_order: 15,
  },
];

const current = await api("/items/resources?limit=-1&filter[category][_eq]=wellbeing");
for (const { matchTitle, ...record } of records) {
  const existing = current.find((item) => item.title === matchTitle || item.title === record.title);
  if (!existing) throw new Error(`Wellbeing resource not found: ${matchTitle}`);
  await api(`/items/resources/${existing.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...record,
      category: "wellbeing",
      source_url: record.url,
      last_reviewed: reviewedOn,
      review_due: reviewDue,
      resource_status: "active",
      audience: ["all-greenwich-students"],
      featured: true,
      status: "published",
    }),
  });
}

console.log(`Wellbeing curation complete: ${records.length} existing records updated.`);
