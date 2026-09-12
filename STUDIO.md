# Voices of Change Studio

The private podcast production workspace is available at `/studio`.

## Netlify environment variables

Set these on the production site before publishing:

- `STUDIO_PASSWORD` — shared team access code for the MVP.
- `STUDIO_SESSION_SECRET` — a long random secret used to sign HttpOnly session cookies.

## Data

Studio records are stored in Netlify Blobs. Production uses a global strongly consistent store named `voices-studio`; non-production deploys use deploy-scoped storage so preview/test data does not leak into production.

## MVP areas

- Dashboard and activity
- Episode lifecycle Kanban
- Episode development briefs
- Versioned script workspace
- Task board
- Contributor and consent tracking
- Marketing planner
- Team directory

The Studio is deliberately not linked from the public navigation and its route is marked `noindex, nofollow, noarchive`.
