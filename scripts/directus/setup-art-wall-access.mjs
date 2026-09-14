import { randomUUID } from "node:crypto";
import { api, apiPath } from "./lib.mjs";

const token = process.env.DIRECTUS_ART_WALL_TOKEN;
if (!token || token.length < 32) throw new Error("DIRECTUS_ART_WALL_TOKEN must be a long, server-only token.");

const policyName = "BrightFutures Art Wall Runtime";
const userEmail = "art-wall-runtime@brightfutures.social";
const folderName = "BrightFutures Art Wall private media";
const collections = await api(apiPath("/folders", { limit: -1, fields: "id,name" }));
let folder = collections.find((item) => item.name === folderName);
if (!folder) folder = await api("/folders", { method: "POST", body: JSON.stringify({ name: folderName }) });

const policies = await api(apiPath("/policies", { limit: -1, fields: "id,name,admin_access,app_access" }));
let policy = policies.find((item) => item.name === policyName);
if (policy?.admin_access || policy?.app_access) throw new Error("Refusing to use an administrator or app-access policy for Art Wall runtime access.");
if (!policy) policy = await api("/policies", { method: "POST", body: JSON.stringify({ name: policyName, icon: "palette", description: "Server-only, least-privilege access for BrightFutures Art Wall submissions, moderation and private media delivery.", admin_access: false, app_access: false }) });

const users = await api(apiPath("/users", { limit: -1, fields: "id,email" }));
let user = users.find((item) => item.email === userEmail);
const userPayload = { first_name: "Art Wall", last_name: "Runtime", email: userEmail, status: "active", provider: "default", token };
if (user) await api(`/users/${user.id}`, { method: "PATCH", body: JSON.stringify(userPayload) });
else user = await api("/users", { method: "POST", body: JSON.stringify(userPayload) });

const accesses = await api(apiPath("/access", { limit: -1, fields: "id,user,policy" }));
if (!accesses.some((item) => item.user === user.id && item.policy === policy.id)) await api("/access", { method: "POST", body: JSON.stringify({ user: user.id, policy: policy.id }) });

async function getPermissions(collection, action) { return api(apiPath("/permissions", { limit: -1, fields: "id", "filter[policy][_eq]": policy.id, "filter[collection][_eq]": collection, "filter[action][_eq]": action })); }
async function grant(collection, action, fields = ["*"], rule = {}, presets = {}) {
  const existing = await getPermissions(collection, action);
  const body = { policy: policy.id, collection, action, permissions: rule, validation: {}, presets, fields };
  if (existing[0]) await api(`/permissions/${existing[0].id}`, { method: "PATCH", body: JSON.stringify(body) });
  else await api("/permissions", { method: "POST", body: JSON.stringify(body) });
  for (const duplicate of existing.slice(1)) await api(`/permissions/${duplicate.id}`, { method: "DELETE" });
}

await grant("art_wall_submissions", "create");
await grant("art_wall_submissions", "read");
await grant("art_wall_submissions", "update");
const fileFields = ["id", "storage", "filename_disk", "filename_download", "title", "type", "folder", "uploaded_on", "modified_on", "charset", "filesize", "width", "height"];
await grant("directus_files", "create", fileFields, {}, { folder: folder.id });
await grant("directus_files", "read", fileFields, { folder: { _eq: folder.id } });
console.log("Dedicated Art Wall runtime policy, user and private media folder are ready.");
