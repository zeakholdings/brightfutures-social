import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";

const policyId = randomUUID();
const permissionPosts = [];
const fieldPosts = [];
const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  const method = request.method || "GET";
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    response.setHeader("content-type", "application/json");
    const send = (data, status = 200) => {
      response.statusCode = status;
      response.end(status === 204 ? "" : JSON.stringify({ data }));
    };
    if (method === "GET" && url.pathname.startsWith("/collections/"))
      return send({ collection: url.pathname.split("/").pop(), meta: {} });
    if (method === "PATCH" && url.pathname.startsWith("/collections/"))
      return send({});
    if (method === "GET" && url.pathname.startsWith("/fields/"))
      return send([]);
    if (method === "POST" && url.pathname.startsWith("/fields/")) {
      fieldPosts.push({ collection: url.pathname.split("/").pop(), ...JSON.parse(body) });
      return send({});
    }
    if (url.pathname === "/policies")
      return send([
        {
          id: policyId,
          name: "$t:public_label",
          description: "$t:public_description",
          admin_access: false,
          app_access: false,
          roles: [],
        },
      ]);
    if (url.pathname === "/access")
      return send([
        {
          id: randomUUID(),
          role: null,
          user: null,
          policy: {
            id: policyId,
            name: "$t:public_label",
            admin_access: false,
            app_access: false,
          },
        },
      ]);
    if (url.pathname === "/roles") return send([]);
    if (method === "GET" && url.pathname === "/permissions") return send([]);
    if (method === "POST" && url.pathname === "/permissions") {
      const payload = JSON.parse(body);
      permissionPosts.push(payload);
      return send({ id: randomUUID(), ...payload });
    }
    return send({}, 200);
  });
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string")
  throw new Error("Mock Directus server did not start");
const child = spawn(process.execPath, ["scripts/directus/setup.mjs"], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    DIRECTUS_URL: `http://127.0.0.1:${address.port}`,
    DIRECTUS_ADMIN_TOKEN: "test-token",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let stderr = "";
child.stderr.on("data", (chunk) => {
  stderr += chunk;
});
const exitCode = await new Promise((resolve) => child.on("close", resolve));
server.close();
if (exitCode !== 0) throw new Error(`Directus 11 setup test failed: ${stderr}`);
if (permissionPosts.length !== 8)
  throw new Error(
    `Expected 8 public read permissions, received ${permissionPosts.length}`,
  );
if (
  permissionPosts.some(
    (permission) =>
      permission.policy !== policyId || permission.action !== "read",
  )
)
  throw new Error(
    "A permission was posted without the resolved Directus 11 policy ID",
  );
if (
  permissionPosts.some((permission) =>
    ["contact_messages", "ideas", "community_checkins"].includes(permission.collection),
  )
)
  throw new Error("A private submission collection received public access");
const forbiddenFields = ["care_history", "reasons_for_estrangement", "placement_history", "date_of_birth", "student_id", "home_address", "social_worker_details", "medical_history"];
if (fieldPosts.some((posted) => forbiddenFields.includes(posted.field)))
  throw new Error("A prohibited sensitive field was created");
for (const collection of ["community_checkins", "member_highlights", "community_actions"])
  if (!fieldPosts.some((posted) => posted.collection === collection))
    throw new Error(`${collection} fields were not configured`);
if (!fieldPosts.some((posted) => posted.collection === "event_interest_responses" && posted.field === "respondent_id"))
  throw new Error("event_interest_responses is missing the anonymous respondent_id field");
for (const collection of ["member_highlights", "community_actions"]) {
  const permission = permissionPosts.find((posted) => posted.collection === collection);
  if (!permission || !JSON.stringify(permission.permissions).includes('"published"'))
    throw new Error(`${collection} is missing a published-only public filter`);
  if (collection === "member_highlights" && permission.fields.includes("source_checkin"))
    throw new Error("source_checkin was exposed through the public policy");
}
console.log("Directus 11 anonymous policy resolution test passed.");
