import { api, apiPath, field, select } from "./lib.mjs";

const collections = {
  events: {
    fields: [
      field("title", "string", { is_nullable: false }),
      field("slug", "string", { is_nullable: false, is_unique: true }),
      select(
        "status",
        ["draft", "provisional", "interest-check", "confirmed", "cancelled", "completed"],
        "draft",
      ),
      field("academic_year", "string"),
      select("category", [
        "social",
        "coffee-connect",
        "community",
        "opportunity",
        "voice-advocacy",
        "wellbeing",
        "trips",
        "seasonal",
      ]),
      field("start_date", "timestamp"),
      field("end_date", "timestamp"),
      field("time_display", "string"),
      field("interest_options", "json", {}, {
        interface: "list",
        options: {
          template: "{{start}} · {{label}}",
          fields: [
            {
              field: "start",
              name: "Start",
              type: "timestamp",
              meta: {
                interface: "datetime",
                width: "half",
                required: true,
                note: "Choose the proposed date and start time.",
              },
            },
            {
              field: "end",
              name: "End",
              type: "timestamp",
              meta: {
                interface: "datetime",
                width: "half",
                note: "Optional end time.",
              },
            },
            {
              field: "label",
              name: "Display wording",
              type: "string",
              meta: {
                interface: "input",
                width: "full",
                note: "Optional. Leave blank and BrightFutures will create a friendly date/time label automatically.",
              },
            },
          ],
        },
        note: "Interest Check only. Use Add Item to build poll choices; drag items to reorder them. No JSON editing is needed.",
      }),
      field("interest_closes_at", "timestamp", {}, {
        note: "Optional closing time for availability responses. Leave blank to keep the interest check open.",
      }),
      field("location", "string"),
      field("description", "text"),
      field("body", "text", {}, { interface: "input-rich-text-html" }),
      field("who_for", "text"),
      field("cost_info", "string"),
      field("contact_info", "text"),
      field("registration_url", "string"),
      field("featured", "boolean", { default_value: false }),
      field(
        "cover_image",
        "uuid",
        {},
        { interface: "file-image", special: ["file"] },
      ),
      field("cover_image_alt", "string"),
      field("accessibility_info", "text"),
      field("published_at", "timestamp"),
      field("sort", "integer"),
    ],
    icon: "event",
  },
  posts: {
    fields: [
      field("title", "string", { is_nullable: false }),
      field("slug", "string", { is_nullable: true, is_unique: true }, {
        note: "Generated from the title for new posts. You can edit it manually.",
      }),
      select("status", ["draft", "review", "published", "archived"], "draft"),
      field("excerpt", "text"),
      field("body", "text", {}, { interface: "input-rich-text-html" }),
      field(
        "featured_image",
        "uuid",
        {},
        { interface: "file-image", special: ["file"] },
      ),
      field("featured_image_alt", "string"),
      field("author_name", "string"),
      select("category", [
        "society",
        "events",
        "student-voice",
        "opportunities",
        "history",
        "podcast",
      ]),
      field("published_at", "timestamp", {}, {
        note: "Optional for drafts. Set automatically the first time a post is published if left blank.",
      }),
      field("featured", "boolean", { default_value: false }),
      field("seo_title", "string", {}, {
        note: "Defaults to post title if left blank.",
      }),
      field("seo_description", "text", {}, {
        note: "Defaults to post excerpt if left blank.",
      }),
    ],
    icon: "article",
  },
  committee: {
    fields: [
      field("name", "string", { is_nullable: false }),
      field("role", "string", { is_nullable: false }),
      field("role_short", "string"),
      field("bio", "text"),
      field(
        "portrait_original",
        "uuid",
        {},
        {
          interface: "file-image",
          special: ["file"],
          note: "Original committee portrait. This is used whenever no stylised portrait is available.",
        },
      ),
      field(
        "portrait_stylised",
        "uuid",
        {},
        {
          interface: "file-image",
          special: ["file"],
          note: "Optional approved stylised version of the original portrait.",
        },
      ),
      field("portrait_alt", "string", {}, { note: "Describe the portrait for visitors who cannot see it." }),
      field(
        "photo",
        "uuid",
        {},
        { interface: "file-image", special: ["file"] },
      ),
      field("photo_alt", "string"),
      field("email", "string"),
      field("display_order", "integer"),
      field("active", "boolean", { default_value: true }),
      field("academic_year", "string"),
    ],
    icon: "groups",
  },
  homepage_social_cards: {
    fields: [
      field(
        "image",
        "uuid",
        { is_nullable: false },
        { interface: "file-image", special: ["file"] },
      ),
      field(
        "image_alt",
        "string",
        { is_nullable: false },
        {
          note: "Required. Describe the image for visitors who cannot see it.",
        },
      ),
      field("caption", "text"),
      field("post_url", "string"),
      field("display_order", "integer"),
      select("status", ["draft", "published"], "draft"),
    ],
    icon: "photo_library",
  },
  resources: {
    fields: [
      field("title", "string", { is_nullable: false }),
      field("description", "text"),
      select("category", [
        "money-funding",
        "accommodation",
        "wellbeing",
        "university-support",
        "careers",
        "life-after-university",
      ]),
      field("organisation", "string"),
      field("url", "string"),
      field("eligibility_note", "text"),
      field("first_stop_guidance", "text", {}, {
        note: "Optional. Complete the thought ‘Good first stop if…’ in one short sentence, using student-friendly language.",
      }),
      field("context_label", "string"),
      field("last_reviewed", "date", {}, {
        note: "Date this resource and its source were last checked.",
      }),
      field("source_url", "string", {}, {
        note: "Required review source. Enter a complete http:// or https:// URL.",
        validation: { _and: [{ source_url: { _regex: "^https?://[^\\s]+$" } }] },
        validation_message: "Enter a valid URL beginning with http:// or https://.",
      }),
      field("review_due", "date", {}, {
        note: "Optional next review or expiry date. Overdue records remain published until an editor changes their publication status.",
      }),
      select("resource_status", ["active", "needs-review", "archived"], "active"),
      field("audience", "json", {}, {
        interface: "select-multiple-checkbox",
        options: {
          choices: [
            { text: "All Greenwich students", value: "all-greenwich-students" },
            { text: "Care-experienced students", value: "care-experienced-students" },
            { text: "Care leavers", value: "care-leavers" },
            { text: "Estranged students", value: "estranged-students" },
            { text: "Care-experienced & estranged students", value: "care-experienced-and-estranged-students" },
          ],
        },
        note: "Optional. Select only audiences confirmed by the official source. More than one may be selected; leave blank when eligibility is unclear.",
      }),
      field("featured", "boolean", { default_value: false }),
      field("display_order", "integer"),
      select("status", ["draft", "published", "archived"], "draft"),
    ],
    icon: "book",
  },
  site_settings: {
    singleton: true,
    fields: [
      field("site_name", "string"),
      field("tagline", "text"),
      field("membership_url", "string"),
      field("instagram_url", "string"),
      field("contact_email", "string"),
      field("homepage_announcement", "text"),
      field("homepage_announcement_url", "string"),
      field("show_announcement", "boolean", { default_value: false }),
      field("default_seo_title", "string"),
      field("default_seo_description", "text"),
    ],
    icon: "settings",
  },
  contact_messages: {
    fields: [
      field("name", "string", { is_nullable: false }),
      field("email", "string", { is_nullable: false }),
      field("subject", "string", { is_nullable: false }),
      field("message", "text", { is_nullable: false }),
      select("status", ["new", "read", "replied", "closed"], "new"),
      field("source_page", "string"),
      field("ip_hash", "string"),
      field("user_agent", "text"),
      field(
        "date_created",
        "timestamp",
        {},
        { special: ["date-created"], readonly: true },
      ),
    ],
    icon: "mail",
    hidden: true,
  },
  ideas: {
    fields: [
      field("idea", "text", { is_nullable: false }),
      field("name", "string"),
      field("email", "string"),
      select(
        "status",
        ["new", "reviewing", "planned", "done", "not-proceeding"],
        "new",
      ),
      field(
        "internal_notes",
        "text",
        {},
        {
          note: "Admin-only. Exclude this field from non-administrator editor permissions.",
        },
      ),
      field(
        "date_created",
        "timestamp",
        {},
        { special: ["date-created"], readonly: true },
      ),
    ],
    icon: "lightbulb",
  },
  event_interest_responses: {
    fields: [
      field("event_slug", "string", { is_nullable: false }),
      select("attendance", ["yes", "maybe", "no"], "yes"),
      field("availability", "json", {}, {
        interface: "tags",
        note: "Selected option IDs from the event's interest_options field.",
      }),
      field("suggested_slots", "json", {}, {
        interface: "list",
        note: "Structured member-suggested date/time slots. These are private and are not poll options until an organiser adds one.",
      }),
      field("comment", "text"),
      field("email", "string", {}, {
        note: "Optional. Used only if the member asks to hear when the date is confirmed.",
      }),
      field("ip_hash", "string", {}, {
        note: "One-way server-side hash used to replace repeat responses from the same connection rather than double-counting them.",
      }),
      field("user_agent", "text"),
      field("date_created", "timestamp", {}, { special: ["date-created"], readonly: true }),
      field("date_updated", "timestamp", {}, { special: ["date-updated"], readonly: true }),
    ],
    icon: "how_to_vote",
    hidden: false,
  },
  community_checkins: {
    fields: [
      select("status", ["new", "reviewed", "action_needed", "closed"], "new"),
      field("date_created", "timestamp", {}, { special: ["date-created"], readonly: true }),
      field("date_updated", "timestamp", {}, { special: ["date-updated"], readonly: true }),
      field("term", "string"),
      field("highlight", "text"),
      field("proud_of", "text"),
      field("goal_or_challenge", "text"),
      field("brightfutures_idea", "text"),
      field("issue_to_raise", "text"),
      field("name", "string"),
      field("email", "string"),
      field("share_publicly", "boolean", { default_value: false }),
      select("public_name_preference", ["full_name", "first_name", "anonymous"], "anonymous"),
      field("public_excerpt", "text"),
      field("website_consent", "boolean", { default_value: false }),
      field("social_media_consent", "boolean", { default_value: false }),
      field("consent_recorded_at", "timestamp"),
      field("reviewed_at", "timestamp"),
      field("reviewed_by", "uuid", { foreign_key_table: "directus_users", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"], options: { template: "{{first_name}} {{last_name}}" } }),
      field("internal_notes", "text", {}, { note: "Private administrative notes. Never expose through public or service policies." }),
    ],
    icon: "how_to_reg",
    hidden: false,
  },
  member_highlights: {
    fields: [
      select("status", ["draft", "review", "published", "archived"], "draft"),
      field("date_created", "timestamp", {}, { special: ["date-created"], readonly: true }),
      field("date_updated", "timestamp", {}, { special: ["date-updated"], readonly: true }),
      field("title", "string", { is_nullable: false }),
      field("slug", "string", { is_nullable: false, is_unique: true }),
      field("display_name", "string"),
      field("highlight_text", "text", { is_nullable: false }),
      select("category", ["Academic", "Work & careers", "Wellbeing", "Community", "Relationships & connection", "Trying something new", "Personal milestone", "Other"], "Other"),
      field("term", "string"),
      field("published_at", "timestamp"),
      field("image", "uuid", {}, { interface: "file-image", special: ["file"] }),
      field("image_alt", "string"),
      field("source_checkin", "integer", { foreign_key_table: "community_checkins", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"], note: "Internal provenance only. This link never publishes a check-in." }),
      field("website_consent_confirmed", "boolean", { default_value: false }),
      field("social_consent_confirmed", "boolean", { default_value: false }),
      field("consent_confirmed_at", "timestamp"),
      field("display_order", "integer"),
    ],
    icon: "campaign",
  },
  community_actions: {
    fields: [
      select("status", ["draft", "published", "archived"], "draft"),
      field("title", "string", { is_nullable: false }),
      field("theme", "string"),
      field("what_members_said", "text", { is_nullable: false }),
      field("what_brightfutures_did", "text", { is_nullable: false }),
      select("current_status", ["heard", "raised", "in_progress", "completed"], "heard"),
      field("public_update", "text"),
      field("published_at", "timestamp"),
      field("display_order", "integer"),
    ],
    icon: "forum",
  },
};
collections.events.fields.push(
  field(
    "date_created",
    "timestamp",
    {},
    { special: ["date-created"], readonly: true },
  ),
  field(
    "date_updated",
    "timestamp",
    {},
    { special: ["date-updated"], readonly: true },
  ),
  field(
    "user_created",
    "uuid",
    {},
    { special: ["user-created"], readonly: true },
  ),
  field(
    "user_updated",
    "uuid",
    {},
    { special: ["user-updated"], readonly: true },
  ),
);
collections.posts.fields.push(
  field(
    "date_created",
    "timestamp",
    {},
    { special: ["date-created"], readonly: true },
  ),
  field(
    "date_updated",
    "timestamp",
    {},
    { special: ["date-updated"], readonly: true },
  ),
);
for (const [name, definition] of Object.entries(collections)) {
  const existing = await api(`/collections/${name}`).catch(() => null);
  if (!existing)
    await api("/collections", {
      method: "POST",
      body: JSON.stringify({
        collection: name,
        meta: {
          icon: definition.icon,
          singleton: !!definition.singleton,
          hidden: !!definition.hidden,
        },
        schema: {},
      }),
    });
  else
    await api(`/collections/${name}`, {
      method: "PATCH",
      body: JSON.stringify({
        meta: {
          icon: definition.icon,
          singleton: !!definition.singleton,
          hidden: !!definition.hidden,
        },
      }),
    });
  const current = await api(`/fields/${name}`);
  for (const spec of definition.fields) {
    const present = current.some((item) => item.field === spec.field);
    if (present)
      await api(`/fields/${name}/${spec.field}`, {
        method: "PATCH",
        body: JSON.stringify({ meta: spec.meta, schema: spec.schema }),
      });
    else
      await api(`/fields/${name}`, {
        method: "POST",
        body: JSON.stringify(spec),
      });
  }
}

// A file-image interface also needs an M2O relation to directus_files. Without
// it, Directus renders the selector but the Data Studio cannot bind a UUID to
// the parent item. These fields pre-date this relation setup, so add it in
// place to preserve their columns and existing UUID values.
for (const field of ["portrait_original", "portrait_stylised", "photo"]) {
  const existing = await api(`/relations/committee/${field}`).catch(() => null);
  if (!existing) {
    await api("/relations", {
      method: "POST",
      body: JSON.stringify({
        collection: "committee",
        field,
        related_collection: "directus_files",
        schema: { on_delete: "SET NULL" },
        meta: {
          many_collection: "committee",
          many_field: field,
          one_collection: "directus_files",
          one_field: null,
          one_deselect_action: "nullify",
        },
      }),
    });
  }
}

const publicRules = [
  ["events", "read", { status: { _in: ["interest-check", "confirmed", "completed"] } }],
  [
    "posts",
    "read",
    {
      _and: [
        { status: { _eq: "published" } },
        { published_at: { _lte: "$NOW" } },
      ],
    },
  ],
  ["committee", "read", { active: { _eq: true } }],
  ["homepage_social_cards", "read", { status: { _eq: "published" } }],
  ["resources", "read", { status: { _eq: "published" } }],
  ["site_settings", "read", {}],
  ["member_highlights", "read", { _and: [{ status: { _eq: "published" } }, { published_at: { _lte: "$NOW" } }] }, ["id", "status", "title", "slug", "display_name", "highlight_text", "category", "term", "published_at", "image", "image_alt", "display_order"]],
  ["community_actions", "read", { _and: [{ status: { _eq: "published" } }, { published_at: { _lte: "$NOW" } }] }, ["id", "status", "title", "theme", "what_members_said", "what_brightfutures_did", "current_status", "public_update", "published_at", "display_order"]],
];

async function resolvePublicPolicy() {
  const policies = await api(
    apiPath("/policies", {
      limit: -1,
      fields:
        "id,name,description,admin_access,app_access,roles.role.id,roles.role.name",
    }),
  );
  const accessRows = await api(
    apiPath("/access", {
      limit: -1,
      fields:
        "id,role,user,policy.id,policy.name,policy.description,policy.admin_access,policy.app_access",
      "filter[role][_null]": true,
      "filter[user][_null]": true,
    }),
  );
  const anonymousPolicyIds = new Set(
    accessRows
      .map((access) =>
        typeof access.policy === "string" ? access.policy : access.policy?.id,
      )
      .filter(Boolean),
  );
  const candidates = policies.filter(
    (policy) =>
      anonymousPolicyIds.has(policy.id) &&
      !policy.admin_access &&
      !policy.app_access,
  );
  if (candidates.length === 1 && candidates[0].id) return candidates[0];

  const roles = await api(
    apiPath("/roles", {
      limit: -1,
      fields: "id,name,policies.policy.id,policies.policy.name",
    }),
  ).catch(() => []);
  const roleNamesByPolicy = new Map();
  for (const role of roles)
    for (const access of role.policies || []) {
      const policyId =
        typeof access.policy === "string" ? access.policy : access.policy?.id;
      if (policyId)
        roleNamesByPolicy.set(policyId, [
          ...(roleNamesByPolicy.get(policyId) || []),
          role.name || role.id,
        ]);
    }
  const diagnostics = policies
    .map(
      (policy) =>
        `${policy.name || "(unnamed)"} [${policy.id || "no-id"}] roles=${(roleNamesByPolicy.get(policy.id) || []).join(",") || "none"}`,
    )
    .join("; ");
  throw new Error(
    `Unable to resolve the Directus 11 anonymous policy from /access rows where role and user are null. Found ${candidates.length} suitable candidates. Policies: ${diagnostics || "none"}. No permissions were changed.`,
  );
}

async function findPermissions(policy, collection, action) {
  return api(
    apiPath("/permissions", {
      limit: -1,
      fields: "id,policy,collection,action",
      "filter[policy][_eq]": policy,
      "filter[collection][_eq]": collection,
      "filter[action][_eq]": action,
    }),
  );
}

async function upsertPermission(policy, collection, action, permissions, fields = ["*"]) {
  const existing = await findPermissions(policy, collection, action);
  const payload = {
    collection,
    action,
    policy,
    permissions,
    validation: {},
    presets: {},
    fields,
  };
  if (existing.length) {
    await api(`/permissions/${existing[0].id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    for (const duplicate of existing.slice(1))
      await api(`/permissions/${duplicate.id}`, { method: "DELETE" });
    return;
  }
  await api("/permissions", { method: "POST", body: JSON.stringify(payload) });
}

const publicPolicy = await resolvePublicPolicy();
for (const [collection, action, rule, fields] of publicRules)
  await upsertPermission(publicPolicy.id, collection, action, rule, fields);
for (const collection of ["ideas", "contact_messages", "community_checkins", "event_interest_responses"]) {
  for (const action of ["read", "create", "update", "delete", "share"]) {
    const existing = await findPermissions(publicPolicy.id, collection, action);
    for (const permission of existing)
      await api(`/permissions/${permission.id}`, { method: "DELETE" });
  }
}
for (const collection of ["member_highlights", "community_actions"]) {
  for (const action of ["create", "update", "delete", "share"]) {
    const existing = await findPermissions(publicPolicy.id, collection, action);
    for (const permission of existing)
      await api(`/permissions/${permission.id}`, { method: "DELETE" });
  }
}

async function resolveNamedPolicy(environmentKey, expectedNames, { required = true } = {}) {
  const policies = await api(apiPath("/policies", { limit: -1, fields: "id,name,admin_access,app_access" }));
  const configuredId = process.env[environmentKey];
  const matches = configuredId
    ? policies.filter((policy) => policy.id === configuredId)
    : policies.filter((policy) => expectedNames.includes(policy.name));

  if (!configuredId && !required && matches.length === 0) return null;

  if (matches.length !== 1)
    throw new Error(`${environmentKey} must identify exactly one existing least-privilege policy (accepted names: ${expectedNames.join(", ")}). Found ${matches.length}.`);
  if (matches[0].admin_access)
    throw new Error(`${environmentKey} points to an administrator policy; refusing to modify it.`);
  return matches[0];
}

// Policy assignment remains environment-specific. When enabled, the runtime
// service and editor policies must resolve unambiguously. The separate private
// Check-In reviewer policy is optional here because cms:setup also provisions
// unrelated features such as event planning; check-in moderation has its own
// stricter setup command when that reviewer workflow is enabled.
if (process.env.DIRECTUS_CONFIGURE_COMMUNITY_POLICIES === "true") {
  const servicePolicy = await resolveNamedPolicy("DIRECTUS_SERVICE_POLICY_ID", ["BrightFutures Website Service", "BrightFutures Server", "BrightFutures Community Service"]);
  const editorPolicy = await resolveNamedPolicy("DIRECTUS_EDITOR_POLICY_ID", ["BrightFutures Editors", "Committee Editor", "BrightFutures Community Editor"]);
  const privateCheckinPolicy = await resolveNamedPolicy(
    "DIRECTUS_PRIVATE_CHECKIN_POLICY_ID",
    ["BrightFutures Private Check-In Reviewers"],
    { required: false },
  );
  await upsertPermission(servicePolicy.id, "community_checkins", "create", {}, [
    "term", "highlight", "proud_of", "goal_or_challenge", "brightfutures_idea", "issue_to_raise",
    "name", "email", "share_publicly", "public_name_preference", "public_excerpt",
    "website_consent", "social_media_consent", "consent_recorded_at",
  ]);
  const interestResponseFields = [
    "event_slug", "attendance", "availability", "suggested_slots", "comment", "email", "ip_hash", "user_agent",
  ];
  await upsertPermission(
    servicePolicy.id,
    "events",
    "read",
    { status: { _in: ["interest-check", "confirmed", "completed"] } },
  );
  await upsertPermission(servicePolicy.id, "event_interest_responses", "create", {}, interestResponseFields);
  await upsertPermission(servicePolicy.id, "event_interest_responses", "read", {}, ["id", ...interestResponseFields, "date_created", "date_updated"]);
  await upsertPermission(servicePolicy.id, "event_interest_responses", "update", {}, interestResponseFields);
  await upsertPermission(
    servicePolicy.id,
    "events",
    "update",
    { status: { _eq: "interest-check" } },
    ["start_date", "end_date", "time_display", "status", "interest_options"],
  );
  // Runtime CMS reads use this server-only token. Mirror only the already-safe
  // public projection for editorial collections added after the original
  // service policy was created; never grant check-in reads.
  for (const [collection, action, rule, fields] of publicRules.filter(
    ([collection]) => ["member_highlights", "community_actions"].includes(collection),
  ))
    await upsertPermission(servicePolicy.id, collection, action, rule, fields);
  // Raw private Check-Ins are restricted to a separately assigned reviewer
  // policy. General content editors must not inherit access to submissions.
  for (const action of ["read", "create", "update", "delete", "share"]) {
    const existing = await findPermissions(editorPolicy.id, "community_checkins", action);
    for (const permission of existing)
      await api(`/permissions/${permission.id}`, { method: "DELETE" });
  }
  if (privateCheckinPolicy) {
    await upsertPermission(privateCheckinPolicy.id, "community_checkins", "read", {});
    await upsertPermission(privateCheckinPolicy.id, "community_checkins", "update", {});
    await upsertPermission(privateCheckinPolicy.id, "member_highlights", "create", {});
    await upsertPermission(privateCheckinPolicy.id, "member_highlights", "read", {});
  } else {
    console.warn(
      "BrightFutures Private Check-In Reviewers policy not found; skipping reviewer-only Check-In permissions during cms:setup.",
    );
  }
  for (const collection of ["member_highlights", "community_actions"])
    for (const action of ["create", "read", "update", "delete"])
      await upsertPermission(editorPolicy.id, collection, action, {});
  await upsertPermission(editorPolicy.id, "event_interest_responses", "read", {});
  await upsertPermission(editorPolicy.id, "event_interest_responses", "delete", {});
}
console.log(
  "Directus schema and least-privilege public read permissions are configured.",
);
