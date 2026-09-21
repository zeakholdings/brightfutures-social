import { T as TSS_SERVER_FUNCTION, c as createServerFn, b as getRequestHeaders } from "../server.js";
import { readItems, createDirectus, staticToken, rest, updateItem, createItem } from "@directus/sdk";
import { createHash } from "node:crypto";
import { z } from "zod";
import { e as events } from "./events-DkYfSDFO.js";
import { c as safeCmsRequest, d as cmsClient, r as readCommittee, b as fallbackCommittee, e as assetUrl, g as readSettings, a as fallbackSettings } from "./settings-DGJdzXcl.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const checkedResources = [
  {
    "id": 1,
    "title": "Greenwich Cares",
    "description": "Dedicated support for care-experienced students from applying to Greenwich through university and into employment, including named support, finance and accommodation.",
    "category": "university-support",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/support/care-leavers",
    "featured": true,
    "display_order": 1,
    "eligibility_note": "Greenwich supports all care-experienced students, even where someone does not meet the statutory care-leaver definition.",
    "context_label": "Greenwich · Care-experienced",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/support/care-leavers",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-experienced-students"
    ],
    "first_stop_guidance": "You’re care-experienced or estranged and aren’t sure which University support applies to you."
  },
  {
    "id": 2,
    "title": "GSU Advice Service",
    "description": "Free, confidential and independent advice from GSU on academic issues, housing and other problems affecting students.",
    "category": "university-support",
    "organisation": "Greenwich Students' Union",
    "url": "https://www.greenwichsu.co.uk/advice/",
    "featured": true,
    "display_order": 2,
    "eligibility_note": "Available to University of Greenwich students. It is independent from the University.",
    "context_label": "Greenwich · Independent advice",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.greenwichsu.co.uk/advice/",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You have an academic, housing or University problem and want advice independent from the University."
  },
  {
    "id": 3,
    "title": "Greenwich Money Advice and Support",
    "description": "The University’s Student Fees and Funding team helps with Student Finance, fees, budgeting, bursaries and financial hardship. Current students can ask through the Digital Student Centre or self-refer for detailed support.",
    "category": "money-funding",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/finance/money-advice",
    "featured": true,
    "display_order": 3,
    "eligibility_note": "For Greenwich students, applicants and alumni; the contact route depends on whether you are a current student.",
    "context_label": null,
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/finance/money-advice",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You’re short of money, Student Finance has gone wrong or you’re unsure what funding you can access."
  },
  {
    "id": 4,
    "title": "Care Leaver Bursary",
    "description": "A University of Greenwich bursary for eligible undergraduate and postgraduate taught students joining directly from local-authority care. Check the current criteria and submit the requested evidence to the University.",
    "category": "money-funding",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/bursaries/care-leaver-bursary",
    "featured": true,
    "display_order": 4,
    "eligibility_note": "The University currently lists age, home-fee status, course, Student Loans Company support and evidence of care-leaver status among its criteria.",
    "context_label": "Check current criteria",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/bursaries/care-leaver-bursary",
    "review_due": "2026-10-15",
    "resource_status": "active",
    "audience": [
      "care-leavers"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 5,
    "title": "Greenwich Hardship Fund",
    "description": "Discretionary University support for eligible students facing sudden financial difficulty. It is not intended as a main source of funding or for tuition fees; check the official page for the current application status.",
    "category": "money-funding",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/finance/funding-your-studies/access-to-learning-fund",
    "featured": true,
    "display_order": 5,
    "eligibility_note": "The University publishes detailed residence, registration, funding and financial-assessment criteria for each application cycle.",
    "context_label": "Check whether applications are open",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/finance/funding-your-studies/access-to-learning-fund",
    "review_due": "2026-10-15",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 6,
    "title": "Student Finance England: estranged students",
    "description": "Official guidance on applying for independent status when you are estranged from your parents, including the evidence Student Finance England may request.",
    "category": "money-funding",
    "organisation": "Student Loans Company / GOV.UK",
    "url": "https://www.gov.uk/government/publications/applying-for-student-finance-as-an-estranged-student",
    "featured": true,
    "display_order": 6,
    "eligibility_note": "This guidance applies in England to new and continuing undergraduate and postgraduate students. Student Finance England assesses each application and its evidence.",
    "context_label": null,
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gov.uk/government/publications/applying-for-student-finance-as-an-estranged-student",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "estranged-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 21,
    "title": "Other Greenwich bursaries and financial support",
    "description": "There may be other Greenwich funding available depending on your circumstances. Check the University's current bursaries and financial-support information.",
    "category": "money-funding",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/finance/funding-your-studies/scholarships-and-bursaries",
    "featured": false,
    "display_order": 7,
    "eligibility_note": "Awards have different criteria, availability and application arrangements; use the University’s current list to choose what to check.",
    "context_label": "Curated funding gateway",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/finance/funding-your-studies/scholarships-and-bursaries",
    "review_due": "2026-10-15",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 22,
    "title": "University of Greenwich Accommodation Services",
    "description": "The University’s route for halls applications, current accommodation information and contact with Accommodation Services. Use it when applying, asking about availability or dealing with a problem in Greenwich halls.",
    "category": "accommodation",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/accommodation",
    "featured": true,
    "display_order": 8,
    "eligibility_note": "Application routes and availability vary for new, current, partner-college and short-course students; check the current University guidance.",
    "context_label": "University accommodation",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/accommodation",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You want to apply for Greenwich halls or need help with University-managed accommodation."
  },
  {
    "id": 7,
    "title": "Accommodation for care-experienced and estranged students",
    "description": "Greenwich’s guidance on priority for halls and requests to extend a standard contract to 52 weeks, including summer. Tell Accommodation Services during the application process and follow its summer-housing steps.",
    "category": "accommodation",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/accommodation/special-requirements",
    "featured": true,
    "display_order": 9,
    "eligibility_note": "For care leavers, care-experienced and estranged students. Priority is not a guarantee: not every hall is available in summer and the University’s process and availability apply.",
    "context_label": "Halls and vacation accommodation",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/accommodation/special-requirements",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-experienced-and-estranged-students"
    ],
    "first_stop_guidance": "You need halls during Christmas, Easter or summer, or want your circumstances considered in your application."
  },
  {
    "id": 23,
    "title": "GSU housing and private-renting advice",
    "description": "Free, confidential and independent general housing advice and signposting from GSU. Ask about a tenancy before signing, rent, deposits, disrepair, eviction or another private-renting problem.",
    "category": "accommodation",
    "organisation": "Greenwich Students’ Union",
    "url": "https://www.greenwichsu.co.uk/advice/housing/",
    "featured": true,
    "display_order": 10,
    "eligibility_note": "For University of Greenwich students. GSU gives general advice and can refer you to specialist housing services when needed.",
    "context_label": "Independent student advice",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.greenwichsu.co.uk/advice/housing/",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You have a private-renting or tenancy problem and want independent student advice."
  },
  {
    "id": 24,
    "title": "Urgent housing help: homeless or at risk",
    "description": "If you have nowhere safe to stay or may lose your accommodation, use GOV.UK to contact the appropriate council’s professional homelessness service now. You can also ask GSU Advice to help you understand other support routes.",
    "category": "accommodation",
    "organisation": "GOV.UK",
    "url": "https://www.gov.uk/homelessness-help-from-council",
    "featured": true,
    "display_order": 11,
    "eligibility_note": "The council will assess what help it must provide under the rules that apply to your circumstances. The GOV.UK service helps you find the appropriate council.",
    "context_label": "Urgent professional help",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gov.uk/homelessness-help-from-council",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You have nowhere safe to stay tonight, have been asked to leave or may soon lose your accommodation."
  },
  {
    "id": 10,
    "title": "Spectrum Life: 24/7 Student Support",
    "description": "Free, confidential, in-the-moment support when you need to talk to somebody, available by phone, WhatsApp or online at any time.",
    "category": "wellbeing",
    "organisation": "University of Greenwich / Spectrum Life",
    "url": "https://www.gre.ac.uk/articles/public-relations/introducing-spectrum-life-our-new-student-assistance-programme",
    "featured": true,
    "display_order": 12,
    "eligibility_note": "Available to registered Greenwich students 24 hours a day, 365 days a year.",
    "context_label": "Need to talk to somebody now · 24/7",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/articles/public-relations/introducing-spectrum-life-our-new-student-assistance-programme",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You want to talk to a professional now, including outside normal University hours."
  },
  {
    "id": 12,
    "title": "Greenwich Careers Service",
    "description": "Careers advice, work experience, placements, mentoring, employer events, job opportunities and application support.",
    "category": "careers",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/careers",
    "featured": true,
    "display_order": 13,
    "eligibility_note": "Available to Greenwich students, with support continuing after graduation in some areas.",
    "context_label": "Greenwich · Careers",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/careers",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 9,
    "title": "Student Wellbeing Hub",
    "description": "The University gateway for ongoing wellbeing support, appointments, information and signposting, including psychological wellbeing, disability and dyslexia support.",
    "category": "wellbeing",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/support/wellbeing",
    "featured": true,
    "display_order": 13,
    "eligibility_note": "Free and confidential support for registered Greenwich students, with self-referral available through the Digital Student Centre.",
    "context_label": "Want ongoing University wellbeing support",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/support/wellbeing",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You want ongoing University wellbeing support or are not sure which University service fits."
  },
  {
    "id": 18,
    "title": "Counselling and Mental Health Support",
    "description": "University counselling, mental-health guidance and psychological wellbeing support. The official page explains the options and how to self-refer through the Digital Student Centre.",
    "category": "wellbeing",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/support/counselling",
    "featured": true,
    "display_order": 14,
    "eligibility_note": "Available to Greenwich students through self-referral. The University states that this is not a crisis or emergency service.",
    "context_label": "Looking for counselling or mental-health support",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/support/counselling",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You are looking for counselling, mental-health or psychological wellbeing support."
  },
  {
    "id": 14,
    "title": "Future Me",
    "description": "Community, one-to-one careers mentoring and career-development activities for care-experienced young people.",
    "category": "careers",
    "organisation": "Rees Foundation",
    "url": "https://www.reesfoundation.org/future-me.html",
    "featured": true,
    "display_order": 15,
    "eligibility_note": "Designed for care-experienced people aged 16-25. Includes virtual and in-person community activities and careers support.",
    "context_label": "External · Care-experienced",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.reesfoundation.org/future-me.html",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-experienced-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 11,
    "title": "Report + Support",
    "description": "The University route to report harassment, bullying, discrimination, a hate incident, sexual misconduct or another covered incident anonymously, or to ask to speak with a trained adviser about options and support.",
    "category": "wellbeing",
    "organisation": "University of Greenwich",
    "url": "https://reportandsupport.gre.ac.uk/",
    "featured": true,
    "display_order": 15,
    "eligibility_note": "For people who have experienced or witnessed relevant behaviour; the official service explains its reporting and support options.",
    "context_label": "Experienced a reportable incident",
    "last_reviewed": "2026-08-17",
    "source_url": "https://reportandsupport.gre.ac.uk/",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You have experienced or witnessed a reportable incident and want to report it or understand your options."
  },
  {
    "id": 15,
    "title": "Completing your studies",
    "description": "Greenwich’s practical checklist for finalists, covering results and documents, account access, wellbeing, careers, graduation, further study and alumni support.",
    "category": "life-after-university",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/student-services/completing-your-studies",
    "featured": true,
    "display_order": 16,
    "eligibility_note": "For Greenwich finalists and recent graduates. Some services have their own time limits or access arrangements.",
    "context_label": "Start here · Leaving university",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/student-services/completing-your-studies",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You’re approaching the end of your course and want one place to check what changes and what support continues."
  },
  {
    "id": 25,
    "title": "Careers support after graduation",
    "description": "Greenwich graduates can use Target Connect for appointments, events, application support and graduate opportunities for up to two years after completing their studies.",
    "category": "life-after-university",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/careers/get-help-with-job-applications-and-interviews",
    "featured": true,
    "display_order": 17,
    "eligibility_note": "For University of Greenwich graduates up to two years after completing their studies. Register with a personal email address and your student ID.",
    "context_label": "Greenwich · Recent graduates",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/careers/get-help-with-job-applications-and-interviews",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You want help with a CV, application or interview, or you’re looking for graduate roles and careers events."
  },
  {
    "id": 16,
    "title": "Propel",
    "description": "Search universities for care-experienced student support including accommodation, bursaries, grants and named contacts, plus help navigating higher education.",
    "category": "university-support",
    "organisation": "Become",
    "url": "https://becomecharity.org.uk/get-support/propel/",
    "featured": true,
    "display_order": 17,
    "eligibility_note": "Designed particularly for care-experienced young people considering or progressing through higher education.",
    "context_label": "External · Care-experienced",
    "last_reviewed": "2026-08-17",
    "source_url": "https://becomecharity.org.uk/get-support/propel/",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-experienced-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 17,
    "title": "Become: Higher Education Advice",
    "description": "Specialist advice on university, funding and accessing support for care-experienced young people, with access to Become's free Care Advice Line.",
    "category": "university-support",
    "organisation": "Become",
    "url": "https://becomecharity.org.uk/get-information/resources/faq/",
    "featured": true,
    "display_order": 18,
    "eligibility_note": "Become provides advice to care-experienced young people; its Care Advice Line is free and can help with further and higher education questions.",
    "context_label": "External · Care-experienced",
    "last_reviewed": "2026-08-17",
    "source_url": "https://becomecharity.org.uk/get-information/resources/faq/",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-experienced-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 26,
    "title": "Continuing to postgraduate study at Greenwich",
    "description": "Information for Greenwich finalists and alumni considering postgraduate study, including the application route and links to current loans, bursaries and scholarships.",
    "category": "life-after-university",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/study/apply/continue-to-pg",
    "featured": false,
    "display_order": 18,
    "eligibility_note": "For current Greenwich undergraduate students and alumni. Funding has separate course, fee-status and other criteria, so check each current offer before applying.",
    "context_label": "Greenwich · Further study",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/study/apply/continue-to-pg",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You’re considering a postgraduate course at Greenwich and want to understand the application and funding routes."
  },
  {
    "id": 27,
    "title": "Greenwich awards ceremonies",
    "description": "The official place for ceremony dates, preparing for graduation, what happens on the day and award-document information.",
    "category": "life-after-university",
    "organisation": "University of Greenwich",
    "url": "https://www.gre.ac.uk/awards-ceremonies",
    "featured": false,
    "display_order": 19,
    "eligibility_note": "For Greenwich students who are eligible to attend an award ceremony. Booking, guest-ticket and ceremony arrangements vary, so use the current official information.",
    "context_label": "Greenwich · Graduation",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gre.ac.uk/awards-ceremonies",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "all-greenwich-students"
    ],
    "first_stop_guidance": "You need the current graduation dates, booking steps or practical ceremony information."
  },
  {
    "id": 19,
    "title": "The EaCES Handbook",
    "description": "A peer-created handbook covering student finance, accommodation, wellbeing, relationships, careers, university life and other practical issues.",
    "category": "university-support",
    "organisation": "Estranged and Care Experienced Students (EaCES)",
    "url": "https://sites.google.com/view/eaces-handbook/home",
    "featured": true,
    "display_order": 19,
    "eligibility_note": "Created by estranged and care-experienced students and graduates. It is a peer resource rather than a professional support service.",
    "context_label": "Peer resource · CE & estranged",
    "last_reviewed": "2026-08-17",
    "source_url": "https://sites.google.com/view/eaces-handbook/home",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-experienced-and-estranged-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 20,
    "title": "All of Us Online Community",
    "description": "A national online community where care-experienced and estranged HE students can connect, share information and find meet-ups and opportunities.",
    "category": "university-support",
    "organisation": "All of Us / Unite Foundation",
    "url": "https://allofus.uk/online-student-network/",
    "featured": true,
    "display_order": 20,
    "eligibility_note": "For people who self-identify as care-experienced or estranged and are currently in UK higher education; recent graduates can remain involved for up to two years after graduating.",
    "context_label": "Peer community · CE & estranged",
    "last_reviewed": "2026-08-17",
    "source_url": "https://allofus.uk/online-student-network/",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-experienced-and-estranged-students"
    ],
    "first_stop_guidance": null
  },
  {
    "id": 28,
    "title": "Leaving care: support into adulthood",
    "description": "Official guidance on support from your council after leaving care, including a personal adviser, pathway planning, suitable housing, education, training and finding work.",
    "category": "life-after-university",
    "organisation": "GOV.UK",
    "url": "https://www.gov.uk/leaving-foster-or-local-authority-care",
    "featured": true,
    "display_order": 20,
    "eligibility_note": "Entitlements depend on your age and care history. The guidance explains the main rules in England and how to find your council’s local offer.",
    "context_label": "Practical transition · Care leavers",
    "last_reviewed": "2026-08-17",
    "source_url": "https://www.gov.uk/leaving-foster-or-local-authority-care",
    "review_due": "2027-02-17",
    "resource_status": "active",
    "audience": [
      "care-leavers"
    ],
    "first_stop_guidance": "You want to check what transition support your council should provide, including help with housing or work."
  }
];
const PUBLIC_EVENT_STATUSES = ["interest-check", "confirmed", "completed"];
async function readPublicEvents() {
  return safeCmsRequest(
    "Events",
    () => cmsClient().request(
      readItems("events", {
        filter: { status: { _in: [...PUBLIC_EVENT_STATUSES] } },
        sort: ["start_date", "sort"],
        limit: 200
      })
    ),
    [],
    validEvents
  );
}
async function readPublicEvent(slug) {
  const rows = await safeCmsRequest(
    "Event detail",
    () => cmsClient().request(
      readItems("events", {
        filter: {
          slug: { _eq: slug },
          status: { _in: [...PUBLIC_EVENT_STATUSES] }
        },
        limit: 1
      })
    ),
    [],
    validEvents
  );
  return rows[0] ?? null;
}
const validEvents = (value) => Array.isArray(value) && value.every((item) => {
  if (!item || typeof item !== "object") return false;
  const event = item;
  const status = event.status;
  const validStatus = PUBLIC_EVENT_STATUSES.includes(status);
  const validDate = status === "interest-check" ? !event.start_date || Number.isFinite(Date.parse(event.start_date)) : typeof event.start_date === "string" && Number.isFinite(Date.parse(event.start_date));
  return typeof event.title === "string" && typeof event.slug === "string" && validStatus && validDate && [
    "social",
    "coffee-connect",
    "community",
    "opportunity",
    "voice-advocacy",
    "wellbeing",
    "trips",
    "seasonal"
  ].includes(event.category);
});
const publishedFilter = {
  status: { _eq: "published" },
  published_at: { _lte: "$NOW" }
};
const validPosts = (value) => Array.isArray(value) && value.every(
  (item) => !!item && typeof item === "object" && typeof item.title === "string" && typeof item.slug === "string" && typeof item.published_at === "string" && Number.isFinite(Date.parse(item.published_at))
);
async function readPosts() {
  return safeCmsRequest(
    "Stories",
    () => cmsClient().request(
      readItems("posts", {
        filter: publishedFilter,
        sort: ["-featured", "-published_at"],
        limit: 100
      })
    ),
    [],
    validPosts
  );
}
async function readPost(slug) {
  const rows = await safeCmsRequest(
    "Story detail",
    () => cmsClient().request(
      readItems("posts", {
        filter: { ...publishedFilter, slug: { _eq: slug } },
        limit: 1
      })
    ),
    [],
    validPosts
  );
  return rows[0] ?? null;
}
const categories = [
  "money-funding",
  "university-support",
  "life-after-university",
  "greenwich-support",
  "accommodation",
  "money",
  "wellbeing",
  "careers",
  "opportunities",
  "community"
];
const reviewStatuses = ["active", "needs-review", "archived"];
const audiences = [
  "all-greenwich-students",
  "care-experienced-students",
  "care-leavers",
  "estranged-students",
  "care-experienced-and-estranged-students"
];
const isDate = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T12:00:00Z`));
const safeUrl = (value) => {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};
function normaliseResources(value) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item;
    if (typeof row.id !== "string" && typeof row.id !== "number" || typeof row.title !== "string" || !row.title.trim() || !categories.some((category) => category === row.category)) return [];
    return [{
      ...row,
      title: row.title.trim(),
      first_stop_guidance: typeof row.first_stop_guidance === "string" ? row.first_stop_guidance.trim() || null : null,
      url: safeUrl(row.url),
      source_url: safeUrl(row.source_url),
      last_reviewed: isDate(row.last_reviewed) ? row.last_reviewed : null,
      review_due: isDate(row.review_due) ? row.review_due : null,
      resource_status: reviewStatuses.some((status) => status === row.resource_status) ? row.resource_status : null,
      audience: Array.isArray(row.audience) ? row.audience.filter(
        (entry) => audiences.some((audience) => audience === entry)
      ) : null
    }];
  });
}
const validResources = (value) => Array.isArray(value);
async function readResources() {
  return safeCmsRequest(
    "Resources",
    () => cmsClient().request(
      readItems("resources", {
        filter: { status: { _eq: "published" } },
        sort: ["display_order", "title"]
      })
    ).then(normaliseResources),
    [],
    validResources
  );
}
const validSocialCards = (value) => Array.isArray(value) && value.every(
  (card) => !!card && typeof card === "object" && typeof card.image === "string" && typeof card.image_alt === "string" && card.image_alt.trim().length > 0
);
async function readSocialCards() {
  return safeCmsRequest(
    "Homepage social cards",
    () => cmsClient().request(
      readItems("homepage_social_cards", {
        filter: { status: { _eq: "published" } },
        sort: ["display_order"],
        limit: 3
      })
    ),
    [],
    validSocialCards
  );
}
const publicFields$1 = [
  "id",
  "status",
  "display_name",
  "highlight_text",
  "category",
  "term",
  "published_at",
  "image",
  "image_alt",
  "display_order"
];
const validHighlights = (value) => Array.isArray(value) && value.every(
  (item) => !!item && typeof item === "object" && item.status === "published" && typeof item.highlight_text === "string" && item.highlight_text.trim().length > 0 && typeof item.published_at === "string" && Number.isFinite(Date.parse(item.published_at))
);
async function readPublishedHighlights() {
  return safeCmsRequest(
    "Published member highlights",
    () => cmsClient().request(
      readItems("member_highlights", {
        fields: [...publicFields$1],
        filter: {
          status: { _eq: "published" },
          published_at: { _lte: "$NOW" }
        },
        sort: ["display_order", "-published_at"],
        limit: 100
      })
    ),
    [],
    validHighlights
  );
}
const publicFields = [
  "id",
  "status",
  "title",
  "theme",
  "what_members_said",
  "what_brightfutures_did",
  "current_status",
  "public_update",
  "published_at",
  "display_order"
];
const actionStatuses = /* @__PURE__ */ new Set([
  "heard",
  "raised",
  "in_progress",
  "completed"
]);
const validActions = (value) => Array.isArray(value) && value.every((row) => {
  if (!row || typeof row !== "object") return false;
  const action = row;
  return action.status === "published" && typeof action.title === "string" && action.title.trim().length > 0 && typeof action.what_members_said === "string" && action.what_members_said.trim().length > 0 && typeof action.what_brightfutures_did === "string" && action.what_brightfutures_did.trim().length > 0 && actionStatuses.has(action.current_status) && typeof action.published_at === "string" && Number.isFinite(Date.parse(action.published_at));
});
async function readPublishedCommunityActions() {
  return safeCmsRequest(
    "Published community actions",
    () => cmsClient().request(
      readItems("community_actions", {
        fields: [...publicFields],
        filter: {
          status: { _eq: "published" },
          published_at: { _lte: "$NOW" }
        },
        sort: ["display_order", "-published_at"],
        limit: 100
      })
    ),
    [],
    validActions
  );
}
const fields = ["slug", "title", "submission_type", "display_name", "is_anonymous", "description", "text_content", "file", "alt_text", "theme_slug", "content_note", "reveal_content", "featured", "published_at"];
function artWallReadClient() {
  const token = process.env.DIRECTUS_ART_WALL_TOKEN || process.env.DIRECTUS_SERVER_TOKEN;
  if (!token) throw new Error("Art Wall data is temporarily unavailable.");
  return createDirectus(process.env.DIRECTUS_URL || "https://cms.brightfutures.social").with(staticToken(token)).with(rest());
}
function publicWork(item) {
  return { slug: item.slug, title: item.title, type: item.submission_type, displayName: item.is_anonymous ? "Anonymous" : item.display_name || "Anonymous", isAnonymous: !!item.is_anonymous, description: item.description || null, textContent: item.text_content || null, imageUrl: item.file ? `/art-wall/media/${encodeURIComponent(item.file)}` : null, altText: item.alt_text || null, theme: item.theme_slug || null, contentNote: item.content_note || null, revealContent: !!item.reveal_content, featured: !!item.featured, publishedAt: item.published_at || null };
}
async function readPublishedArtWall() {
  return safeCmsRequest("art wall", () => artWallReadClient().request(readItems("art_wall_submissions", { fields: [...fields], filter: { moderation_status: { _eq: "approved" }, removed_at: { _null: true }, published_at: { _nnull: true } }, sort: ["-featured", "-published_at"], limit: 100 })), [], (value) => Array.isArray(value)).then((items) => items.map(publicWork));
}
async function readPublishedArtWallItem(slug) {
  const result = await safeCmsRequest("art wall work", () => artWallReadClient().request(readItems("art_wall_submissions", { fields: [...fields], filter: { slug: { _eq: slug }, moderation_status: { _eq: "approved" }, removed_at: { _null: true } }, limit: 1 })), [], (value) => Array.isArray(value));
  return result[0] ? publicWork(result[0]) : null;
}
const cache = /* @__PURE__ */ new Map();
async function cached(key, fetcher, fallback, seconds = 120) {
  const hit = cache.get(key);
  if (hit && hit.until > Date.now()) return hit.value;
  try {
    const value = await fetcher();
    cache.set(key, {
      value,
      until: Date.now() + seconds * 1e3
    });
    return value;
  } catch (error) {
    console.error(`[CMS] ${key} could not be loaded.`, error instanceof Error ? error.message : "Unknown error");
    return hit?.value ?? fallback;
  }
}
const categoryMap = {
  Social: "social",
  "Coffee & Connect": "coffee-connect",
  Community: "community",
  Opportunity: "opportunity",
  "Voice & Advocacy": "voice-advocacy",
  Wellbeing: "wellbeing",
  Trips: "trips",
  Seasonal: "seasonal"
};
const categoryLabels = {
  social: "Social",
  "coffee-connect": "Coffee & Connect",
  community: "Community",
  opportunity: "Opportunity",
  "voice-advocacy": "Voice & Advocacy",
  wellbeing: "Wellbeing",
  trips: "Trips",
  seasonal: "Seasonal"
};
function localFallback() {
  return events.filter((e) => e.status === "confirmed" || e.status === "completed" || e.status === "cancelled").filter((e) => e.startDate).map((e, i) => ({
    id: `local-${i}`,
    title: e.title,
    slug: e.slug,
    status: e.status,
    academic_year: e.academicYear,
    category: categoryMap[e.category],
    start_date: `${e.startDate}T12:00:00.000Z`,
    time_display: e.time,
    location: e.location,
    description: e.description,
    body: e.body,
    who_for: e.whoFor,
    cost_info: e.costInfo,
    contact_info: e.contactInfo,
    registration_url: e.registrationUrl,
    featured: e.featured
  }));
}
function toEvent(event) {
  const correctedWelcome = event.slug === "greenwich-cares-welcome" && event.title === "Greenwich Cares Welcome" ? events.find((item) => item.slug === event.slug) : void 0;
  return {
    title: correctedWelcome?.title || event.title,
    slug: event.slug,
    startDate: event.start_date || void 0,
    endDate: event.end_date || void 0,
    time: event.time_display || void 0,
    interestOptions: normaliseInterestOptions(event.interest_options),
    interestClosesAt: event.interest_closes_at || void 0,
    location: event.location || void 0,
    category: categoryLabels[event.category],
    description: correctedWelcome?.description || event.description || "",
    academicYear: event.academic_year,
    status: event.status === "draft" ? "provisional" : event.status,
    featured: !!event.featured,
    registrationUrl: event.registration_url || void 0,
    body: event.body || correctedWelcome?.body || void 0,
    whoFor: event.who_for || void 0,
    costInfo: event.cost_info || void 0,
    contactInfo: event.contact_info || void 0,
    coverImage: assetUrl(event.cover_image),
    coverImageAlt: event.cover_image_alt || void 0,
    accessibilityInfo: event.accessibility_info || void 0
  };
}
const getEventsServer_createServerFn_handler = createServerRpc({
  id: "167ba15ae4b55098241e92911773c71357230c664dc9ee89cdb333f13968f6a2",
  name: "getEventsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getEventsServer.__executeServer(opts));
const getEventsServer = createServerFn({
  method: "GET"
}).handler(getEventsServer_createServerFn_handler, async () => {
  try {
    return (await cached("events", readPublicEvents, localFallback(), 15)).map(toEvent);
  } catch (error) {
    console.error("[CMS] Events data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return localFallback().map(toEvent);
  }
});
const getEventServer_createServerFn_handler = createServerRpc({
  id: "a30e69df17a1a918144bf392c07f3fab99574c478668839d59e598b1c0642bd2",
  name: "getEventServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getEventServer.__executeServer(opts));
const getEventServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(160)
})).handler(getEventServer_createServerFn_handler, async ({
  data
}) => {
  try {
    const value = await readPublicEvent(data.slug);
    return value ? toEvent(value) : localFallback().map(toEvent).find((e) => e.slug === data.slug) ?? null;
  } catch (error) {
    console.error("[CMS] Event data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return localFallback().map(toEvent).find((e) => e.slug === data.slug) ?? null;
  }
});
const eventInterestInput = z.object({
  eventSlug: z.string().min(1).max(160),
  respondentId: z.string().uuid(),
  attendance: z.enum(["yes", "maybe", "no"]),
  availability: z.array(z.string().min(1).max(100)).max(20),
  suggestedSlots: z.array(z.object({
    start: z.string().datetime(),
    end: z.string().datetime().optional()
  })).max(5),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  website: z.string().max(0)
});
function normaliseSuggestedSlots(value) {
  const now = Date.now();
  const unique = /* @__PURE__ */ new Set();
  return value.map((slot) => {
    const start = new Date(slot.start);
    const end = slot.end ? new Date(slot.end) : void 0;
    if (!Number.isFinite(start.getTime()) || start.getTime() <= now) throw new Error("Suggested times need to be in the future.");
    if (end && (!Number.isFinite(end.getTime()) || end <= start)) throw new Error("A suggested end time must be after its start time.");
    const normalised = {
      start: start.toISOString(),
      ...end ? {
        end: end.toISOString()
      } : {}
    };
    const key = `${normalised.start}|${normalised.end || ""}`;
    if (unique.has(key)) throw new Error("Please remove duplicate suggested times.");
    unique.add(key);
    return normalised;
  });
}
function friendlyPollTime(value) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/London"
  }).format(new Date(value)).replace(":00", "").replace(/\s/g, "").toLowerCase();
}
function friendlyPollLabel(start, end) {
  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/London"
  }).format(new Date(start));
  if (!end) return `${date}, ${friendlyPollTime(start)}`;
  const sameDay = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/London"
  }).format(new Date(start)) === new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/London"
  }).format(new Date(end));
  return sameDay ? `${date}, ${friendlyPollTime(start)}–${friendlyPollTime(end)}` : `${date}, ${friendlyPollTime(start)} → ${friendlyPollTime(end)}`;
}
function normaliseInterestOptions(value) {
  if (!Array.isArray(value)) return [];
  const options = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const option = raw;
    const start = typeof option.start === "string" && Number.isFinite(Date.parse(option.start)) ? option.start : void 0;
    const end = typeof option.end === "string" && Number.isFinite(Date.parse(option.end)) ? option.end : void 0;
    const customLabel = typeof option.label === "string" ? option.label.trim().slice(0, 220) : "";
    if (!start && !customLabel) continue;
    const label = customLabel || friendlyPollLabel(start, end);
    const existingId = typeof option.id === "string" ? option.id.trim().slice(0, 100) : "";
    const generatedId = `slot-${(start ? `${start}-${end || ""}` : label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90)}`;
    options.push({
      id: existingId || generatedId,
      label,
      start,
      end
    });
  }
  return options;
}
const submitEventInterest_createServerFn_handler = createServerRpc({
  id: "f1ab7c0b6166accfed88280ccdaabb970ab14de12c54e3e08afd850d55b760eb",
  name: "submitEventInterest",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitEventInterest.__executeServer(opts));
const submitEventInterest = createServerFn({
  method: "POST"
}).validator(eventInterestInput).handler(submitEventInterest_createServerFn_handler, async ({
  data
}) => {
  const event = await readPublicEvent(data.eventSlug);
  if (!event || event.status !== "interest-check") throw new Error("This interest check is not currently open.");
  if (event.interest_closes_at && Date.parse(event.interest_closes_at) <= Date.now()) throw new Error("This interest check has now closed.");
  const options = normaliseInterestOptions(event.interest_options);
  const allowed = new Set(options.map((option) => option.id));
  if (data.availability.some((id) => !allowed.has(id))) throw new Error("One of the selected times is no longer available.");
  const suggestedSlots = data.attendance === "no" ? [] : normaliseSuggestedSlots(data.suggestedSlots);
  const info = requestInfo(`event-interest:${data.eventSlug}`);
  const client = privateClient();
  const existing = await client.request(readItems("event_interest_responses", {
    filter: {
      _and: [{
        event_slug: {
          _eq: data.eventSlug
        }
      }, {
        respondent_id: {
          _eq: data.respondentId
        }
      }]
    },
    fields: ["id"],
    limit: 1
  }));
  const payload = {
    event_slug: data.eventSlug,
    respondent_id: data.respondentId,
    attendance: data.attendance,
    availability: data.attendance === "no" ? [] : data.availability,
    // Send an empty array explicitly when suggestions were removed, so an
    // update cannot leave stale suggested times on the respondent's record.
    suggested_slots: suggestedSlots,
    email: data.email || null,
    ...info
  };
  if (existing[0]?.id) {
    await client.request(updateItem("event_interest_responses", existing[0].id, payload));
    return {
      ok: true,
      updated: true
    };
  }
  await client.request(createItem("event_interest_responses", payload));
  return {
    ok: true,
    updated: false
  };
});
function interestAdminToken() {
  return process.env.EVENT_INTEREST_ADMIN_TOKEN || process.env.ART_WALL_ADMIN_TOKEN || "";
}
const getEventInterestAdmin_createServerFn_handler = createServerRpc({
  id: "80974fb0f7b33011b47694fc02a6d825f92dd7a33f3923daad093b0a38a25aac",
  name: "getEventInterestAdmin",
  filename: "src/lib/cms/server.ts"
}, (opts) => getEventInterestAdmin.__executeServer(opts));
const getEventInterestAdmin = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500)
})).handler(getEventInterestAdmin_createServerFn_handler, async ({
  data
}) => {
  const expected = interestAdminToken();
  if (!expected || data.token !== expected) throw new Error("That organiser passcode was not recognised.");
  const client = privateClient();
  const [events2, responses] = await Promise.all([client.request(readItems("events", {
    filter: {
      status: {
        _in: ["interest-check", "confirmed"]
      }
    },
    fields: ["title", "slug", "status", "start_date", "interest_options", "interest_closes_at", "date_updated"],
    sort: ["-date_updated"],
    limit: 100
  })), client.request(readItems("event_interest_responses", {
    fields: ["id", "event_slug", "attendance", "availability", "suggested_slots", "email", "date_created"],
    sort: ["-date_created"],
    limit: 1e3
  }))]);
  return events2.filter((event) => event.status === "interest-check" || normaliseInterestOptions(event.interest_options).length > 0).map((event) => {
    const options = normaliseInterestOptions(event.interest_options);
    const rows = responses.filter((row) => row.event_slug === event.slug);
    const selected = (row) => Array.isArray(row.availability) ? row.availability.filter((value) => typeof value === "string") : [];
    const optionStats = options.map((option) => {
      const yes = rows.filter((row) => row.attendance === "yes" && selected(row).includes(option.id)).length;
      const maybe = rows.filter((row) => row.attendance === "maybe" && selected(row).includes(option.id)).length;
      return {
        id: option.id,
        label: option.label,
        yes,
        maybe,
        available: yes + maybe
      };
    });
    const ranked = [...optionStats].sort((a, b) => b.yes * 2 + b.maybe - (a.yes * 2 + a.maybe));
    const groupedSuggestions = /* @__PURE__ */ new Map();
    for (const row of rows) {
      if (!Array.isArray(row.suggested_slots)) continue;
      for (const raw of row.suggested_slots) {
        if (!raw || typeof raw !== "object") continue;
        const slot = raw;
        if (typeof slot.start !== "string" || !Number.isFinite(Date.parse(slot.start))) continue;
        const end = typeof slot.end === "string" && Number.isFinite(Date.parse(slot.end)) ? slot.end : void 0;
        const roundedStart = new Date(Math.round(Date.parse(slot.start) / 18e5) * 18e5).toISOString();
        const roundedEnd = end ? new Date(Math.round(Date.parse(end) / 18e5) * 18e5).toISOString() : void 0;
        const key = `${roundedStart}|${roundedEnd || ""}`;
        const current = groupedSuggestions.get(key);
        groupedSuggestions.set(key, current ? {
          ...current,
          count: current.count + 1
        } : {
          start: roundedStart,
          ...roundedEnd ? {
            end: roundedEnd
          } : {},
          count: 1
        });
      }
    }
    return {
      slug: event.slug,
      title: event.title,
      status: event.status,
      startDate: event.start_date || null,
      closesAt: event.interest_closes_at || null,
      totals: {
        yes: rows.filter((row) => row.attendance === "yes").length,
        maybe: rows.filter((row) => row.attendance === "maybe").length,
        no: rows.filter((row) => row.attendance === "no").length,
        responses: rows.length
      },
      options: optionStats,
      bestOptionId: ranked[0]?.id || null,
      suggestedSlots: [...groupedSuggestions.values()].sort((a, b) => b.count - a.count),
      recent: rows.slice(0, 40).map((row) => ({
        id: String(row.id),
        attendance: row.attendance,
        availability: selected(row),
        suggestedSlots: Array.isArray(row.suggested_slots) ? row.suggested_slots.filter((slot) => !!slot && typeof slot === "object" && typeof slot.start === "string") : [],
        email: row.email || null,
        createdAt: row.date_created || null
      }))
    };
  });
});
const confirmEventInterestOption_createServerFn_handler = createServerRpc({
  id: "9b37ff50e44e43d83acb40e62f5764407be1d4450cae698cc36e2750173f072d",
  name: "confirmEventInterestOption",
  filename: "src/lib/cms/server.ts"
}, (opts) => confirmEventInterestOption.__executeServer(opts));
const confirmEventInterestOption = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500),
  eventSlug: z.string().min(1).max(160),
  optionId: z.string().min(1).max(100)
})).handler(confirmEventInterestOption_createServerFn_handler, async ({
  data
}) => {
  const expected = interestAdminToken();
  if (!expected || data.token !== expected) throw new Error("That organiser passcode was not recognised.");
  const client = privateClient();
  const rows = await client.request(readItems("events", {
    filter: {
      _and: [{
        slug: {
          _eq: data.eventSlug
        }
      }, {
        status: {
          _eq: "interest-check"
        }
      }]
    },
    fields: ["id", "interest_options"],
    limit: 1
  }));
  const event = rows[0];
  if (!event) throw new Error("That interest check is no longer open.");
  const option = normaliseInterestOptions(event.interest_options).find((item) => item.id === data.optionId);
  if (!option?.start || !Number.isFinite(Date.parse(option.start))) throw new Error("That option does not have a valid start date.");
  const formatTime = (value) => new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Europe/London"
  }).format(new Date(value));
  const timeDisplay = option.end && Number.isFinite(Date.parse(option.end)) ? `${formatTime(option.start)}–${formatTime(option.end)}` : formatTime(option.start);
  await client.request(updateItem("events", event.id, {
    start_date: option.start,
    end_date: option.end || null,
    time_display: timeDisplay,
    status: "confirmed"
  }));
  cache.delete("events");
  return {
    ok: true
  };
});
const addSuggestedEventInterestOption_createServerFn_handler = createServerRpc({
  id: "b2cdcd64ebe52183f7fb032f30c6dff86fbffcfce4242fe4ad0f0bb1c1288507",
  name: "addSuggestedEventInterestOption",
  filename: "src/lib/cms/server.ts"
}, (opts) => addSuggestedEventInterestOption.__executeServer(opts));
const addSuggestedEventInterestOption = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500),
  eventSlug: z.string().min(1).max(160),
  start: z.string().datetime(),
  end: z.string().datetime().optional()
})).handler(addSuggestedEventInterestOption_createServerFn_handler, async ({
  data
}) => {
  const expected = interestAdminToken();
  if (!expected || data.token !== expected) throw new Error("That organiser passcode was not recognised.");
  const [slot] = normaliseSuggestedSlots([{
    start: data.start,
    ...data.end ? {
      end: data.end
    } : {}
  }]);
  const client = privateClient();
  const rows = await client.request(readItems("events", {
    filter: {
      _and: [{
        slug: {
          _eq: data.eventSlug
        }
      }, {
        status: {
          _eq: "interest-check"
        }
      }]
    },
    fields: ["id", "interest_options"],
    limit: 1
  }));
  const event = rows[0];
  if (!event) throw new Error("That interest check is no longer open.");
  const options = normaliseInterestOptions(event.interest_options);
  if (options.some((option) => option.start === slot.start && (option.end || void 0) === slot.end)) return {
    ok: true,
    alreadyAdded: true
  };
  await client.request(updateItem("events", event.id, {
    interest_options: [...options, {
      id: `slot-${createHash("sha256").update(`${slot.start}|${slot.end || ""}`).digest("hex").slice(0, 16)}`,
      label: friendlyPollLabel(slot.start, slot.end),
      ...slot
    }]
  }));
  cache.delete("events");
  return {
    ok: true,
    alreadyAdded: false
  };
});
const withPostAsset = (post) => ({
  ...post,
  featured_image: assetUrl(post.featured_image) || null
});
const getPostsServer_createServerFn_handler = createServerRpc({
  id: "c45ff4ca2ad39500b15a2d254a9d296b9127c74f01b3f11bf8947feab407ffae",
  name: "getPostsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getPostsServer.__executeServer(opts));
const getPostsServer = createServerFn({
  method: "GET"
}).handler(getPostsServer_createServerFn_handler, async () => {
  try {
    return (await cached("posts", readPosts, [])).map(withPostAsset);
  } catch (error) {
    console.error("[CMS] Stories could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return [];
  }
});
const getPostServer_createServerFn_handler = createServerRpc({
  id: "fa34e5b0534a94c006a3e171388e1107cb7c112967d1e42778325fe11244b5e0",
  name: "getPostServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getPostServer.__executeServer(opts));
const getPostServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(160)
})).handler(getPostServer_createServerFn_handler, async ({
  data
}) => {
  try {
    const post = await cached(`post:${data.slug}`, () => readPost(data.slug), null);
    return post ? withPostAsset(post) : null;
  } catch (error) {
    console.error("[CMS] Story data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
});
const getCommitteeServer_createServerFn_handler = createServerRpc({
  id: "b3e4b99703b24021917134ff1c670baad0d008cb52d022fb9ca1bf998430f57a",
  name: "getCommitteeServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getCommitteeServer.__executeServer(opts));
const getCommitteeServer = createServerFn({
  method: "GET"
}).handler(getCommitteeServer_createServerFn_handler, async () => {
  try {
    const people = await cached("committee", readCommittee, fallbackCommittee);
    return (people.length ? people : fallbackCommittee).map((person) => ({
      ...person,
      portrait_original: assetUrl(person.portrait_original) || null,
      portrait_stylised: assetUrl(person.portrait_stylised) || null,
      photo: assetUrl(person.photo) || null
    }));
  } catch (error) {
    console.error("[CMS] Committee data could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return fallbackCommittee;
  }
});
const getSocialCardsServer_createServerFn_handler = createServerRpc({
  id: "01179dcb172c360d8e7fb04e5b2124ff7acb0f36caba4694f36c35a37e7715c8",
  name: "getSocialCardsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getSocialCardsServer.__executeServer(opts));
const getSocialCardsServer = createServerFn({
  method: "GET"
}).handler(getSocialCardsServer_createServerFn_handler, async () => {
  const cards = await cached("homepage-social-cards", readSocialCards, []);
  return cards.slice(0, 3).map((card) => ({
    ...card,
    image: assetUrl(card.image) || ""
  })).filter((card) => card.image && card.image_alt.trim());
});
const getHighlightsServer_createServerFn_handler = createServerRpc({
  id: "c3e2c9fa7efaa05d66fa8d6dd66845d4a95e73ba84399382ced6dde0531d8667",
  name: "getHighlightsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getHighlightsServer.__executeServer(opts));
const getHighlightsServer = createServerFn({
  method: "GET"
}).handler(getHighlightsServer_createServerFn_handler, async () => {
  const highlights = await cached("published-member-highlights", readPublishedHighlights, [], 15);
  return highlights.map((highlight) => {
    const hasApprovedImage = Boolean(highlight.image && highlight.image_alt?.trim());
    return {
      ...highlight,
      image: hasApprovedImage ? assetUrl(highlight.image) || null : null,
      image_alt: hasApprovedImage ? highlight.image_alt.trim() : null
    };
  });
});
const getCommunityActionsServer_createServerFn_handler = createServerRpc({
  id: "25f68e7f8034139322a52ff40c945b50570f0049e8ff782d6efb590f9a9f472b",
  name: "getCommunityActionsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getCommunityActionsServer.__executeServer(opts));
const getCommunityActionsServer = createServerFn({
  method: "GET"
}).handler(getCommunityActionsServer_createServerFn_handler, async () => cached("published-community-actions", readPublishedCommunityActions, []));
const getResourcesServer_createServerFn_handler = createServerRpc({
  id: "eaae13ebb87b84f971ba35b626367e8223d33586d24bdddd6aba26fa9380e657",
  name: "getResourcesServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getResourcesServer.__executeServer(opts));
const getResourcesServer = createServerFn({
  method: "GET"
}).handler(getResourcesServer_createServerFn_handler, async () => {
  try {
    const resources = await cached("resources", readResources, checkedResources);
    return resources.length ? resources : checkedResources;
  } catch (error) {
    console.error("[CMS] Resources could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return [];
  }
});
const getSiteSettingsServer_createServerFn_handler = createServerRpc({
  id: "16e14e768e3171f904fc62d3dbb8dc36725cb4721585d80f8a3376cd273b2af5",
  name: "getSiteSettingsServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getSiteSettingsServer.__executeServer(opts));
const getSiteSettingsServer = createServerFn({
  method: "GET"
}).handler(getSiteSettingsServer_createServerFn_handler, async () => {
  try {
    return await cached("settings", readSettings, fallbackSettings, 300);
  } catch (error) {
    console.error("[CMS] Site settings could not be loaded.", error instanceof Error ? error.message : "Unknown error");
    return fallbackSettings;
  }
});
const getArtWallServer_createServerFn_handler = createServerRpc({
  id: "b9912b87cdaa1dcb81915ca0751c4a889dabe2af3548a987fc49841c209df331",
  name: "getArtWallServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getArtWallServer.__executeServer(opts));
const getArtWallServer = createServerFn({
  method: "GET"
}).handler(getArtWallServer_createServerFn_handler, () => readPublishedArtWall());
const getArtWallItemServer_createServerFn_handler = createServerRpc({
  id: "4f9bd158e5051dc0a00bd239dd82192a245c029d1b4900ae72c0c8340ab69911",
  name: "getArtWallItemServer",
  filename: "src/lib/cms/server.ts"
}, (opts) => getArtWallItemServer.__executeServer(opts));
const getArtWallItemServer = createServerFn({
  method: "GET"
}).validator(z.object({
  slug: z.string().min(1).max(180)
})).handler(getArtWallItemServer_createServerFn_handler, ({
  data
}) => readPublishedArtWallItem(data.slug));
const limits = /* @__PURE__ */ new Map();
function requestInfo(bucket) {
  const headers = getRequestHeaders();
  const ip = (headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown").split(",")[0].trim();
  const key = `${bucket}:${createHash("sha256").update(ip).digest("hex")}`;
  const now = Date.now();
  const recent = (limits.get(key) || []).filter((t) => t > now - 60 * 60 * 1e3);
  if (recent.length >= 5) throw new Error("Too many submissions. Please try again later.");
  recent.push(now);
  limits.set(key, recent);
  return {
    ip_hash: key.split(":")[1],
    user_agent: headers.get("user-agent")?.slice(0, 500) || null
  };
}
function privateClient() {
  const url = process.env.DIRECTUS_URL || "https://cms.brightfutures.social";
  const token = process.env.DIRECTUS_SERVER_TOKEN;
  if (!token) throw new Error("Submissions are temporarily unavailable.");
  return createDirectus(url).with(staticToken(token)).with(rest());
}
function artWallToken() {
  return process.env.DIRECTUS_ART_WALL_TOKEN || process.env.DIRECTUS_SERVER_TOKEN;
}
function artWallClient() {
  const url = process.env.DIRECTUS_URL || "https://cms.brightfutures.social";
  const token = artWallToken();
  if (!token) throw new Error("Art Wall submissions are temporarily unavailable.");
  return createDirectus(url).with(staticToken(token)).with(rest());
}
const artCleanText = (maximum) => z.string().max(maximum).transform((value) => value.normalize("NFKC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim());
const artWallInput = z.object({
  submissionType: z.enum(["drawing", "painting", "digital-art", "photography", "poetry", "writing", "mixed-media", "other"]),
  title: artCleanText(160).pipe(z.string().min(1)),
  displayPreference: z.enum(["first-name", "chosen-name", "anonymous"]),
  displayName: artCleanText(120),
  contactEmail: z.string().trim().email().max(254),
  description: artCleanText(2e3),
  textContent: artCleanText(12e3),
  altText: artCleanText(700),
  themeSlug: z.union([z.literal(""), z.string().max(100)]),
  contentNote: artCleanText(280),
  consentGiven: z.boolean(),
  guidelinesAccepted: z.boolean(),
  website: z.string().max(0),
  image: z.union([z.literal(""), z.string().max(14e6)]),
  imageName: z.string().max(180),
  imageType: z.string().max(100)
}).superRefine((data, ctx) => {
  const visual = !["poetry", "writing"].includes(data.submissionType);
  if (visual && !data.image) ctx.addIssue({
    code: "custom",
    path: ["image"],
    message: "Choose an image of your work before submitting."
  });
  if (["poetry", "writing"].includes(data.submissionType) && !data.textContent) ctx.addIssue({
    code: "custom",
    path: ["textContent"],
    message: "Add your poem or writing before submitting."
  });
  if (data.displayPreference === "chosen-name" && !data.displayName) ctx.addIssue({
    code: "custom",
    path: ["displayName"],
    message: "Add the name you would like displayed."
  });
  if (!data.consentGiven) ctx.addIssue({
    code: "custom",
    path: ["consentGiven"],
    message: "Please confirm you have permission to share this work."
  });
  if (!data.guidelinesAccepted) ctx.addIssue({
    code: "custom",
    path: ["guidelinesAccepted"],
    message: "Please confirm you have read the submission guidelines."
  });
});
const acceptedImageTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp"]);
function dataUrlToImage(value, mime) {
  if (!acceptedImageTypes.has(mime)) throw new Error("That file type is not supported. Please use a JPG, PNG or WEBP image.");
  const match = /^data:([a-z/+.-]+);base64,([a-zA-Z0-9+/=]+)$/.exec(value);
  if (!match || match[1] !== mime) throw new Error("We couldn't read that image. Please choose the original file and try again.");
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 10 * 1024 * 1024) throw new Error("That image is too large. Please choose an image smaller than 10 MB.");
  return new Blob([bytes], {
    type: mime
  });
}
async function uploadArtWallImage(dataUrl, mime) {
  const image = dataUrlToImage(dataUrl, mime);
  const extension = mime === "image/jpeg" ? "jpg" : mime.split("/")[1];
  const form = new FormData();
  form.append("file", image, `art-wall-${crypto.randomUUID()}.${extension}`);
  form.append("folder", process.env.DIRECTUS_ART_WALL_FOLDER || "");
  const response = await fetch(`${(process.env.DIRECTUS_URL || "https://cms.brightfutures.social").replace(/\/$/, "")}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${artWallToken()}`
    },
    body: form
  });
  if (!response.ok) throw new Error("We couldn't upload that image. Your form hasn't been submitted yet, so please try again.");
  const payload = await response.json();
  if (!payload.data?.id) throw new Error("We couldn't upload that image. Your form hasn't been submitted yet, so please try again.");
  return payload.data.id;
}
const submitArtWall_createServerFn_handler = createServerRpc({
  id: "bdab7f1e78aa648a707ba0708a2b93b5fbe1a5553422cca0059c9f77d19bb798",
  name: "submitArtWall",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitArtWall.__executeServer(opts));
const submitArtWall = createServerFn({
  method: "POST"
}).validator(artWallInput).handler(submitArtWall_createServerFn_handler, async ({
  data
}) => {
  requestInfo("art-wall");
  const file = data.image ? await uploadArtWallImage(data.image, data.imageType) : null;
  const displayName = data.displayPreference === "anonymous" ? null : data.displayPreference === "first-name" ? data.displayName.split(/\s+/)[0] || null : data.displayName;
  const baseSlug = data.title.toLocaleLowerCase("en-GB").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "untitled-work";
  await artWallClient().request(createItem("art_wall_submissions", {
    slug: `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`,
    title: data.title,
    submission_type: data.submissionType,
    display_name: displayName,
    is_anonymous: data.displayPreference === "anonymous",
    contact_email: data.contactEmail,
    description: data.description || null,
    text_content: data.textContent || null,
    file,
    alt_text: data.altText || null,
    theme_slug: data.themeSlug || null,
    content_note: data.contentNote || null,
    moderation_status: "pending",
    consent_given: true,
    guidelines_accepted: true
  }));
  return {
    ok: true
  };
});
const getAdminArtWall_createServerFn_handler = createServerRpc({
  id: "8922217af96945bf53b011f674b4e730d6e947d0b314a5ea7db68775bd0d976a",
  name: "getAdminArtWall",
  filename: "src/lib/cms/server.ts"
}, (opts) => getAdminArtWall.__executeServer(opts));
const getAdminArtWall = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500)
})).handler(getAdminArtWall_createServerFn_handler, async ({
  data
}) => {
  if (!process.env.ART_WALL_ADMIN_TOKEN || data.token !== process.env.ART_WALL_ADMIN_TOKEN) throw new Error("That moderation passcode was not recognised.");
  const rows = await artWallClient().request(readItems("art_wall_submissions", {
    fields: ["id", "slug", "title", "submission_type", "display_name", "is_anonymous", "contact_email", "description", "text_content", "file", "alt_text", "theme_slug", "content_note", "reveal_content", "featured", "published_at", "moderation_status", "moderation_notes", "requires_safeguarding_review", "submitted_at"],
    sort: ["-submitted_at"],
    limit: 200
  }));
  return rows.map((r) => ({
    id: String(r.id),
    slug: String(r.slug || ""),
    title: String(r.title),
    type: r.submission_type,
    displayName: r.is_anonymous ? "Anonymous" : r.display_name || "Anonymous",
    isAnonymous: !!r.is_anonymous,
    description: r.description || null,
    textContent: r.text_content || null,
    imageUrl: null,
    fileId: r.file || null,
    altText: r.alt_text || null,
    theme: r.theme_slug || null,
    contentNote: r.content_note || null,
    revealContent: !!r.reveal_content,
    featured: !!r.featured,
    publishedAt: r.published_at || null,
    contactEmail: String(r.contact_email),
    moderationStatus: r.moderation_status,
    moderationNotes: r.moderation_notes || null,
    requiresSafeguardingReview: !!r.requires_safeguarding_review,
    submittedAt: r.submitted_at || null
  }));
});
const moderateArtWall_createServerFn_handler = createServerRpc({
  id: "e564a3a974a9b387b8e68a41262a1e8cabf3e424c9dd5b402f08f3fde650cfc1",
  name: "moderateArtWall",
  filename: "src/lib/cms/server.ts"
}, (opts) => moderateArtWall.__executeServer(opts));
const moderateArtWall = createServerFn({
  method: "POST"
}).validator(z.object({
  token: z.string().min(1).max(500),
  id: z.string().uuid(),
  action: z.enum(["approve", "reject", "remove", "restore", "feature", "unfeature", "safeguard", "unsafeguard"]),
  notes: artCleanText(2e3)
})).handler(moderateArtWall_createServerFn_handler, async ({
  data
}) => {
  if (!process.env.ART_WALL_ADMIN_TOKEN || data.token !== process.env.ART_WALL_ADMIN_TOKEN) throw new Error("Your moderation session has expired. Please sign in again.");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const changes = {
    moderation_notes: data.notes || null
  };
  if (data.action === "approve") Object.assign(changes, {
    moderation_status: "approved",
    reviewed_at: now,
    published_at: now,
    removed_at: null
  });
  if (data.action === "reject") Object.assign(changes, {
    moderation_status: "rejected",
    reviewed_at: now
  });
  if (data.action === "remove") Object.assign(changes, {
    moderation_status: "removed",
    removed_at: now
  });
  if (data.action === "restore") Object.assign(changes, {
    moderation_status: "approved",
    removed_at: null,
    published_at: now
  });
  if (data.action === "feature") changes.featured = true;
  if (data.action === "unfeature") changes.featured = false;
  if (data.action === "safeguard") changes.requires_safeguarding_review = true;
  if (data.action === "unsafeguard") changes.requires_safeguarding_review = false;
  await artWallClient().request(updateItem("art_wall_submissions", data.id, changes));
  return {
    ok: true
  };
});
const contactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(180),
  message: z.string().trim().min(10).max(5e3),
  website: z.string().max(0)
});
const submitContact_createServerFn_handler = createServerRpc({
  id: "4aa391040c420b87535c6025a32bce7c0a6d1c213d55d23200e47cfbf94b15c8",
  name: "submitContact",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitContact.__executeServer(opts));
const submitContact = createServerFn({
  method: "POST"
}).validator(contactInput).handler(submitContact_createServerFn_handler, async ({
  data
}) => {
  const info = requestInfo("contact");
  await privateClient().request(createItem("contact_messages", {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: "new",
    source_page: "/contact",
    ...info
  }));
  return {
    ok: true
  };
});
const perksEnquiryInput = z.object({
  business: z.string().trim().min(1).max(180),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  link: z.string().trim().max(500),
  offer: z.string().trim().max(1500),
  restrictions: z.string().trim().max(1500),
  message: z.string().trim().max(3e3),
  website: z.string().max(0)
});
const submitPerksEnquiry_createServerFn_handler = createServerRpc({
  id: "dbf6c5ea319bc9c376955563f80f383f29da4244784cc0e323652989763a041a",
  name: "submitPerksEnquiry",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitPerksEnquiry.__executeServer(opts));
const submitPerksEnquiry = createServerFn({
  method: "POST"
}).validator(perksEnquiryInput).handler(submitPerksEnquiry_createServerFn_handler, async ({
  data
}) => {
  const info = requestInfo("perks-enquiry");
  const details = [`Business/organisation: ${data.business}`, `Website or social link: ${data.link || "Not provided"}`, `Proposed offer: ${data.offer || "To be discussed"}`, `Restrictions: ${data.restrictions || "To be discussed"}`, `Message: ${data.message || "No additional message"}`].join("\n\n");
  await privateClient().request(createItem("contact_messages", {
    name: data.name,
    email: data.email,
    subject: `BrightFutures Perks enquiry — ${data.business}`,
    message: details,
    status: "new",
    source_page: "/partnerships/perks",
    ...info
  }));
  return {
    ok: true
  };
});
const ideaInput = z.object({
  idea: z.string().trim().min(10).max(3e3),
  name: z.string().trim().max(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  website: z.string().max(0)
});
const submitIdea_createServerFn_handler = createServerRpc({
  id: "db88b5907e38d3c14d850e46b5ce7f7f08fdb0c79cb8eac32e983360a3a50531",
  name: "submitIdea",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitIdea.__executeServer(opts));
const submitIdea = createServerFn({
  method: "POST"
}).validator(ideaInput).handler(submitIdea_createServerFn_handler, async ({
  data
}) => {
  requestInfo("idea");
  await privateClient().request(createItem("ideas", {
    idea: data.idea,
    name: data.name || null,
    email: data.email || null,
    status: "new"
  }));
  return {
    ok: true
  };
});
const cleanText = (maximum) => z.string().max(maximum).transform((value) => value.normalize("NFKC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim());
const checkinInput = z.object({
  highlight: cleanText(4e3),
  proud_of: cleanText(4e3),
  goal_or_challenge: cleanText(4e3),
  brightfutures_idea: cleanText(4e3),
  issue_to_raise: cleanText(4e3),
  name: cleanText(120),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  share_publicly: z.boolean(),
  public_name_preference: z.union([z.enum(["full_name", "first_name", "anonymous"]), z.literal("")]),
  public_excerpt: cleanText(1500),
  website_consent: z.boolean(),
  social_media_consent: z.boolean(),
  website: z.string().max(0)
}).superRefine((data, context) => {
  const responses = [data.highlight, data.proud_of, data.goal_or_challenge, data.brightfutures_idea, data.issue_to_raise];
  if (!responses.some((value) => value.length >= 3)) context.addIssue({
    code: "custom",
    path: ["highlight"],
    message: "Add something to at least one box before sending your check-in."
  });
  if (data.share_publicly && !data.public_excerpt) context.addIssue({
    code: "custom",
    path: ["public_excerpt"],
    message: "Choose the exact excerpt that may be considered for sharing."
  });
  if (data.share_publicly && !data.public_name_preference) context.addIssue({
    code: "custom",
    path: ["public_name_preference"],
    message: "Choose how you would like to be credited."
  });
  if (data.share_publicly && !data.website_consent && !data.social_media_consent) context.addIssue({
    code: "custom",
    path: ["website_consent"],
    message: "Choose at least one place where the excerpt may be shared."
  });
  if (!data.share_publicly && (data.website_consent || data.social_media_consent)) context.addIssue({
    code: "custom",
    path: ["share_publicly"],
    message: "Sharing consent cannot be given while the response is private."
  });
  if (data.share_publicly && data.public_name_preference === "first_name" && !data.name) context.addIssue({
    code: "custom",
    path: ["name"],
    message: "Add your first name for first-name attribution."
  });
  if (data.share_publicly && data.public_name_preference === "full_name" && data.name.split(/\s+/).filter(Boolean).length < 2) context.addIssue({
    code: "custom",
    path: ["name"],
    message: "Add your full name for full-name attribution."
  });
});
const submitCommunityCheckin_createServerFn_handler = createServerRpc({
  id: "afb8f434e238e65bf496fdd6da6ebd8237b98ccaf92ab71d253f313560605a90",
  name: "submitCommunityCheckin",
  filename: "src/lib/cms/server.ts"
}, (opts) => submitCommunityCheckin.__executeServer(opts));
const submitCommunityCheckin = createServerFn({
  method: "POST"
}).validator(checkinInput).handler(submitCommunityCheckin_createServerFn_handler, async ({
  data
}) => {
  requestInfo("community-checkin");
  const consentGiven = data.website_consent || data.social_media_consent;
  await privateClient().request(createItem("community_checkins", {
    highlight: data.highlight || null,
    proud_of: data.proud_of || null,
    goal_or_challenge: data.goal_or_challenge || null,
    brightfutures_idea: data.brightfutures_idea || null,
    issue_to_raise: data.issue_to_raise || null,
    name: data.name || null,
    email: data.email || null,
    share_publicly: data.share_publicly,
    public_name_preference: data.share_publicly ? data.public_name_preference : "anonymous",
    public_excerpt: data.share_publicly ? data.public_excerpt : null,
    website_consent: data.website_consent,
    social_media_consent: data.social_media_consent,
    consent_recorded_at: consentGiven ? (/* @__PURE__ */ new Date()).toISOString() : null
  }));
  return {
    ok: true
  };
});
export {
  addSuggestedEventInterestOption_createServerFn_handler,
  confirmEventInterestOption_createServerFn_handler,
  getAdminArtWall_createServerFn_handler,
  getArtWallItemServer_createServerFn_handler,
  getArtWallServer_createServerFn_handler,
  getCommitteeServer_createServerFn_handler,
  getCommunityActionsServer_createServerFn_handler,
  getEventInterestAdmin_createServerFn_handler,
  getEventServer_createServerFn_handler,
  getEventsServer_createServerFn_handler,
  getHighlightsServer_createServerFn_handler,
  getPostServer_createServerFn_handler,
  getPostsServer_createServerFn_handler,
  getResourcesServer_createServerFn_handler,
  getSiteSettingsServer_createServerFn_handler,
  getSocialCardsServer_createServerFn_handler,
  moderateArtWall_createServerFn_handler,
  submitArtWall_createServerFn_handler,
  submitCommunityCheckin_createServerFn_handler,
  submitContact_createServerFn_handler,
  submitEventInterest_createServerFn_handler,
  submitIdea_createServerFn_handler,
  submitPerksEnquiry_createServerFn_handler
};
