import { api } from "./lib.mjs";

const guidanceByName = [
  ["greenwich cares", "You’re care-experienced or estranged and aren’t sure which University support applies to you."],
  ["gsu advice", "You have an academic, housing or University problem and want advice independent from the University."],
  ["money advice", "You’re short of money, Student Finance has gone wrong or you’re unsure what funding you can access."],
];

const resources = await api("/items/resources?limit=-1&sort=display_order,title");
let updated = 0;

for (const resource of resources) {
  if (resource.first_stop_guidance) continue;
  const searchableName = `${resource.title || ""} ${resource.organisation || ""}`.toLowerCase();
  const match = guidanceByName.find(([name]) => searchableName.includes(name));
  if (!match) continue;

  await api(`/items/resources/${resource.id}`, {
    method: "PATCH",
    body: JSON.stringify({ first_stop_guidance: match[1] }),
  });
  updated += 1;
}

console.log(`First-stop guidance migration complete: ${updated} resource records updated.`);
