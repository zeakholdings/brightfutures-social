import type { Resource } from "@/lib/cms/types";

/**
 * A checked snapshot of the published directory, captured on 14 September 2026.
 * The CMS remains the source of truth; this keeps the support finder useful if it
 * is temporarily unavailable and makes the full live directory auditable in git.
 */
export const checkedResources = [
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
] satisfies Resource[];
