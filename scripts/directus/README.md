# Directus roles

The setup command configures anonymous, filtered read access only. Contact and idea collections have no anonymous permissions; the website writes to them with `DIRECTUS_SERVER_TOKEN` on the server.

In Directus, keep Administrator on the built-in administrator policy. Create a Committee Editor policy with CRUD access to events, committee, homepage social cards, resources, site settings, contact messages and ideas, but exclude `ideas.internal_notes` unless trusted. Keep social cards in draft until the image is approved for public promotional use and meaningful alt text is supplied. Create an Author policy with CRUD access to posts only, and restrict publishing fields (`status`, `published_at`) if articles require committee approval.

Review these policy assignments in each environment because user and policy IDs are deployment-specific and should not be guessed by a migration.

## Resource review workflow

`resources.status` remains the publication workflow (`draft`, `published`, or
`archived`). Editorial freshness is tracked separately with `resource_status`,
`last_reviewed`, `review_due`, `source_url`, and optional `audience` tags. An
overdue `review_due` date is visible to editors in Directus and does not remove a
published resource automatically. Editors should verify the source, update
`last_reviewed`, choose a new `review_due`, and set `resource_status` to
`needs-review` whenever the information cannot be confirmed.

Use `first_stop_guidance` selectively for the most useful starting points. It
appears beneath “Good first stop if…” and should be one short, direct sentence
about the student situation the service is best placed to help with. Leave it
blank when it would only repeat the description.

After `cms:setup` has added the field, the optional idempotent migration adds
the agreed starter guidance to empty Greenwich Cares, GSU Advice and Money
Advice records without changing any links or other content:

```bash
npm run cms:migrate:resource-guidance
```

After running `cms:setup`, migrate existing records without changing their
content, categories, links, featured flags, or ordering:

```bash
RESOURCE_REVIEWED_ON=2026-08-17 RESOURCE_REVIEW_DUE=2027-02-17 npm run cms:migrate:resources
```

Then apply the explicitly reviewed audience assignments. Records not named in
the migration are left unclassified for CMS review:

```bash
npm run cms:migrate:resource-audiences
```

The migration is idempotent: it only fills empty review metadata and copies the
current resource URL into `source_url`. It deliberately does not infer an
audience from titles, categories or context labels. Audience values must be
checked against the official source; leave the field blank when that is unclear.

After reviewing the official University of Greenwich, Greenwich Students' Union,
GOV.UK and provider pages, apply the deliberately curated Money and Housing set:

```bash
npm run cms:curate:money-housing
```

This idempotent migration updates the four core money routes, adds one Greenwich
funding gateway and maintains four distinct housing routes: University
accommodation, care-experienced/estranged and vacation arrangements, independent
GSU private-renting advice, and urgent council homelessness help. It archives the
Unite Foundation listing because Greenwich is not currently a partner university.
Override `RESOURCE_REVIEWED_ON`, `RESOURCE_REVIEW_DUE` or `FUNDING_REVIEW_DUE`
when a later source review is completed.

After reviewing the official University of Greenwich and Report + Support pages,
apply the curated wellbeing hierarchy:

```bash
npm run cms:curate:wellbeing
```

This idempotent migration updates the four existing wellbeing records. It orders
and labels Spectrum Life for 24/7 in-the-moment support, the Student Wellbeing
Hub for ongoing University support, the counselling and mental-health
self-referral pathway, and Report + Support for reportable incidents. It does not
add services. Override `RESOURCE_REVIEWED_ON` or `RESOURCE_REVIEW_DUE` after a
later source review.

After reviewing the official University of Greenwich and GOV.UK guidance, apply
the curated transition set:

```bash
npm run cms:curate:life-after-university
```

This idempotent migration maintains five distinct routes for finalists and recent
graduates: the Greenwich leaving-university checklist, graduate careers access,
postgraduate study and funding, award ceremonies, and statutory care-leaver
transition support. It avoids duplicating the broader careers and housing entries.
The older job-application record is archived because the graduate careers route
uses the same official page and covers that purpose more clearly.
Override `RESOURCE_REVIEWED_ON` or `RESOURCE_REVIEW_DUE` after a later review.

## Event publication, interest checks and freshness

Event publication is controlled by `status`. **Interest Check**, **Confirmed**
and **Completed** events are public. Draft, Provisional and Cancelled events are
private. `published_at` is a legacy field and is not part of the event visibility
rule.

Interest Check events may have a null `start_date`. The
`interest_options` field uses Directus' repeater interface as a poll builder.
Editors use **Add Item** for each proposed slot, choose the start date/time,
optionally choose an end time, and may add custom display wording. When display
wording is blank, the website generates a friendly label automatically. The
website also generates stable option IDs from the slot date/time so editors do
not have to manage technical identifiers. Reordering poll choices does not change
their IDs.

Member responses are stored privately in `event_interest_responses`; the public
Directus policy receives no access to that collection. The website service policy
needs create/read/update access to that private collection so repeat responses can
replace an earlier response from the same one-way connection hash. It also receives
a narrowly filtered event update permission for Interest Check records so the
private organiser dashboard can confirm a selected slot.

The organiser dashboard is available at `/admin/event-interest`. Set
`EVENT_INTEREST_ADMIN_TOKEN` for its passcode, or it will fall back to
`ART_WALL_ADMIN_TOKEN` when that existing moderation passcode is configured.
Confirming a slot copies its start/end into the event, generates the time display
and changes the event status to Confirmed.

The events listing, homepage and event detail routes all use the same runtime
Directus loaders. Listings have a 15-second in-process cache; details are uncached.
No build or process restart is needed after ordinary event edits.

## Community Check-In policies

`cms:setup` creates the private `community_checkins` collection and the public-safe
`member_highlights` and `community_actions` collections. Anonymous access is removed
from check-ins and is filtered to published, already-dated public records. Highlight
public fields deliberately exclude `source_checkin` and all consent audit fields.

Policy assignment is opt-in because policy IDs differ by environment. Create or
identify three non-administrator policies, including a dedicated policy named
`BrightFutures Private Check-In Reviewers`, then run:

```bash
DIRECTUS_CONFIGURE_COMMUNITY_POLICIES=true \
DIRECTUS_SERVICE_POLICY_ID='<service-policy-id>' \
DIRECTUS_EDITOR_POLICY_ID='<editor-policy-id>' \
DIRECTUS_PRIVATE_CHECKIN_POLICY_ID='<private-checkin-reviewer-policy-id>' \
npm run cms:setup
```

For private check-ins, the service policy receives create-only access to the
member-submitted fields and no read, update, or delete access. It also receives
the same filtered public-field reads used by the website for highlights and
community actions. Only the private Check-In reviewer policy receives read/update
access to raw Check-Ins. The general editor policy receives CRUD access to public
highlights and actions without access to the underlying private submissions. The
script refuses administrator policies and ambiguous policy matches.
Assign the service policy only to the dedicated server user whose static token is
stored as `DIRECTUS_SERVER_TOKEN`. Never expose that token to browser code.

Publishing remains manual: consent flags do not create, copy, or publish a Member
Highlight. `source_checkin` is optional internal provenance only.

## Implemented Community Check-In data flow

The live implementation follows these boundaries:

1. `/check-in` sends a validated submission to a BrightFutures server function.
2. The server uses a server-only Directus service token to create a private
   `community_checkins` record. The browser never writes to Directus directly.
3. An authorised editor manually reviews the check-in in Directus.
4. If the member supplied an exact public excerpt and website consent, an editor
   may manually run the confirmation-gated flow to create a separate
   `member_highlights` draft. The flow copies only the approved excerpt,
   attribution preference and consent audit fields; it never publishes the draft.
5. An editor separately reviews and publishes that highlight. `/highlights` and
   the homepage read only published, already-dated `member_highlights` through
   the anonymous public-safe field permission.

Community action records have a separate manual path. Editors interpret themes
from private check-ins outside the public application, manually create a
theme-level `community_actions` record, and separately publish it. `/voice` and
the homepage read only published, already-dated actions. There is no automated
theme extraction, risk scoring, response counting or link from a public action
back to an individual check-in.

No retention period or safeguarding review/escalation process is encoded here.
Those are organisational decisions that need named owners and documented
procedures; they must not be inferred from the CMS workflow.
