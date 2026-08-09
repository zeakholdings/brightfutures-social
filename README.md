# BrightFutures Greenwich

Website for BrightFutures Greenwich Society — the student-led community for
care-experienced and estranged students at the University of Greenwich.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing via TanStack Router)
- Vite 7
- Tailwind CSS 4
- Deployed on Netlify, with Netlify Forms handling the contact form

## Running locally

```bash
npm install
npm run dev
```

The dev server runs on port 3000 by default (Netlify Dev proxies it on 8888 if
you use `netlify dev`).

```bash
npm run build
```

builds the production bundle to `dist/client`.

## Content structure

- `src/data/site.ts` — site-wide constants: nav links, footer links, contact email, social placeholders.
- `src/data/events.ts` — event listings and the "This year at BrightFutures" timeline. This is a plain
  typed array today; the shape is deliberately flat and JSON-serialisable so it can move to a CMS or a
  JSON/API source later without changing any component.
- `src/routes/` — one file per page (file-based routing).
- `src/components/` — shared UI (`Header`, `Footer`, `EventCard`, `PageHero`).

## Forms

The contact form uses Netlify Forms. Because it's rendered client-side by React, a static skeleton form
lives at `public/__forms.html` purely so Netlify's build-time scanner registers the form — it's never shown
to users. Form submissions only work once deployed (not in local dev).

## Notes

- No analytics or tracking scripts are included. The site is cookie-free by default.
- Placeholder content (committee names, social links, exact event times/locations) is clearly marked as
  "to be confirmed" / "details coming soon" rather than invented.
