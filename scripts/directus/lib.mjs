const url = (process.env.DIRECTUS_URL || "https://cms.brightfutures.social").replace(/\/$/, "")
const token = process.env.DIRECTUS_ADMIN_TOKEN
if (!token) throw new Error("DIRECTUS_ADMIN_TOKEN is required for CMS setup and seed commands")
export async function api(path, options = {}) { const response = await fetch(`${url}${path}`, { ...options, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers } }); if (!response.ok) throw new Error(`${options.method || "GET"} ${path} failed (${response.status}): ${await response.text()}`); if (response.status === 204) return null; return (await response.json()).data }
export const field = (field, type, schema = {}, meta = {}) => ({ field, type, schema: { is_nullable: true, ...schema }, meta: { interface: type === "text" ? "input-multiline" : type === "boolean" ? "boolean" : type === "timestamp" ? "datetime" : "input", width: "full", ...meta } })
export const select = (fieldName, choices, defaultValue) => field(fieldName, "string", { default_value: defaultValue }, { interface: "select-dropdown", options: { choices: choices.map(value => ({ text: value, value })) } })
