import { api } from "./lib.mjs";

// These assignments were reviewed against the source URLs already stored on
// the records. Keep title matching explicit so unknown and newly added records
// remain unclassified for an editor to review.
const reviewedAudiences = new Map([
  ["Greenwich Cares", ["care-experienced-students"]],
  ["GSU Advice Service", ["all-greenwich-students"]],
  ["Money Advice and Support", ["all-greenwich-students"]],
  ["Care Leaver Bursary", ["care-leavers"]],
  ["Greenwich Hardship Fund", ["all-greenwich-students"]],
  ["Student Finance for Estranged Students", ["estranged-students"]],
  ["Accommodation for Care-Experienced and Estranged Students", ["care-experienced-and-estranged-students"]],
  ["Student Wellbeing Hub", ["all-greenwich-students"]],
  ["Spectrum Life: 24/7 Student Support", ["all-greenwich-students"]],
  ["Report + Support", ["all-greenwich-students"]],
  ["Greenwich Careers Service", ["all-greenwich-students"]],
  ["Job Application and Interview Support", ["all-greenwich-students"]],
  ["Future Me", ["care-experienced-students"]],
  ["Completing Your Studies", ["all-greenwich-students"]],
  ["Propel", ["care-experienced-students"]],
  ["Become: Higher Education Advice", ["care-experienced-students"]],
  ["Counselling and Mental Health Support", ["all-greenwich-students"]],
  ["The EaCES Handbook", ["care-experienced-and-estranged-students"]],
  ["All of Us Online Community", ["care-experienced-and-estranged-students"]],
]);

const resources = await api("/items/resources?limit=-1&fields=id,title,audience&sort=display_order,title");
let updated = 0;
let reviewRequired = 0;

for (const resource of resources) {
  const audience = reviewedAudiences.get(resource.title);
  if (!audience) {
    reviewRequired += 1;
    continue;
  }
  if (JSON.stringify(resource.audience) === JSON.stringify(audience)) continue;
  await api(`/items/resources/${resource.id}`, {
    method: "PATCH",
    body: JSON.stringify({ audience }),
  });
  updated += 1;
}

console.log(`Resource audience migration complete: ${updated} updated; ${reviewRequired} left unclassified for CMS review.`);
