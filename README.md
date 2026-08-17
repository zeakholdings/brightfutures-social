# BrightFutures Greenwich

TanStack Start website for the student-led BrightFutures Greenwich Society. Public content is managed in Directus 11 at `cms.brightfutures.social`, while the existing local event and settings data provide safe fallbacks during migration or a short CMS outage.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

`DIRECTUS_URL` is used for anonymous published-content reads. `DIRECTUS_SERVER_TOKEN` is a dedicated runtime server credential with create-only access to `contact_messages` and `ideas`. It is never sent to the browser. `DIRECTUS_ADMIN_TOKEN` is needed only by the setup and seed scripts and must not use a `VITE_` or `PUBLIC_` prefix.

## CMS setup

Run these commands once for a new Directus environment and safely repeat them after schema changes:

```bash
DIRECTUS_URL=https://cms.brightfutures.social DIRECTUS_ADMIN_TOKEN='...' npm run cms:setup
DIRECTUS_URL=https://cms.brightfutures.social DIRECTUS_ADMIN_TOKEN='...' npm run cms:seed
```

The setup script creates or updates the collections and anonymous filtered read permissions. It explicitly removes anonymous permissions from contact messages, ideas, and community check-ins. It does not create environment-specific users. Configure a dedicated runtime policy with create-only access to the required submission collections, issue its static token as `DIRECTUS_SERVER_TOKEN`, and follow [scripts/directus/README.md](scripts/directus/README.md) for community and editor policies.

The seed is idempotent. It imports the two confirmed dated events, the three real committee members and confirmed site settings. It does not create posts, resources, biographies, photos or provisional placeholder events.

## Publishing content

- Add an event in **Events**, give it a unique slug and date, then set status to `confirmed`. Draft and provisional records are not public. Cancelled records remain available at their detail URL with a clear notice.
- Add an article in **Posts**, provide a unique slug and publication date, then set status to `published`. Future-dated and non-published posts are excluded.
- Update current members in **Committee**. Inactive members are excluded. Photos and biographies are optional.
- Add up to three approved images in **Homepage Social Cards**. Keep a card in draft until public promotional consent is recorded; image alt text is required, while captions and Instagram post links are optional. With no published cards, no image grid is shown.
- Update membership, announcement, contact and social links in the **Site Settings** singleton.
- Publish only verified resources. Empty resources and stories sections show a quiet empty state.

Rich text is sanitised before rendering. CMS lists are fetched by route loaders on the server and cached briefly. Directus asset IDs are converted to public asset URLs in the server layer.

## Forms

The contact and homepage idea forms call TanStack server functions. Both use schema validation, strict maximum lengths, a honeypot and per-IP rate limiting. Contact messages are stored with a one-way IP hash and limited user-agent data. Ideas may be anonymous. Neither collection has anonymous read access. Email notification is intentionally not configured; Directus stores submissions first and notification can be added later with a Directus Flow.

The in-process limiter is suitable for the current single Hestia process. If the site is later scaled to multiple instances, replace it with a shared Redis-backed limiter.

## Checks and deployment

```bash
npm run typecheck
npm run build
npm run start
```

The production server listens on port 6090. No analytics or trackers are included.
