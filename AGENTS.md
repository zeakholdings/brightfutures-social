# AGENTS.md

## Project overview

Marketing/community website for BrightFutures Greenwich Society, a student-led society at the University
of Greenwich for care-experienced and estranged students. Built with TanStack Start (React 19 + TanStack
Router, file-based routing), Tailwind CSS 4, deployed on Netlify.

## Directory structure

```
public/
  __forms.html      # static skeleton form so Netlify's build bot detects the React-rendered contact form
  robots.txt
  sitemap.xml
src/
  components/
    Header.tsx      # sticky nav with mobile menu
    Footer.tsx
    PageHero.tsx     # shared dark hero used on every sub-page
    EventCard.tsx    # event card used on homepage + events page
  data/
    site.ts          # nav, footer links, contact email, social placeholders
    events.ts         # event listings + "this year" timeline + idea cards
  routes/
    __root.tsx        # document shell, global <head>, fonts, Header/Footer wrap
    index.tsx          # homepage — hero, features, events, who it's for, timeline, shape-it, about teaser, join CTA
    about.tsx
    events.tsx         # includes client-side category filter
    get-involved.tsx
    resources.tsx
    contact.tsx        # Netlify Forms contact form
    privacy.tsx
    accessibility.tsx
```

## Conventions

- Routes are one file per page under `src/routes/`, using `createFileRoute`. Per-route SEO metadata
  (title, description, OG tags) is set via the route's `head()` option — see any route file for the pattern.
- Design tokens (colours, fonts, shadow) live in `src/styles.css` under `@theme` (Tailwind 4's CSS-first
  config). Colours: `forest` (deep teal-green, primary), `cream`/`cream-dim`/`paper` (warm off-white
  backgrounds), `green` (fresh accent), `coral`/`coral-light` (warm secondary accent). Fonts: `Fraunces`
  (display/headings) and `Manrope` (body), loaded via Google Fonts `<link>` tags in `__root.tsx`.
- Event data is intentionally kept as a flat, typed array in `src/data/events.ts` rather than hardcoded in
  JSX, so it can be swapped for a CMS or JSON/API source later without touching component code.
- Where real-world details aren't confirmed yet (event times/locations, committee names, social URLs),
  the copy says so explicitly ("Details coming soon", "To be confirmed") instead of inventing content —
  keep this pattern when adding new placeholder content.
- No analytics/tracking scripts. Keep the site cookie-free unless analytics are explicitly requested.

## Forms

Netlify Forms is used for the contact form. Because forms are rendered client-side, `public/__forms.html`
holds a hidden duplicate of the form fields purely for Netlify's build-time static HTML scan — keep it in
sync with any field changes in `src/routes/contact.tsx`. Submissions only succeed on a deployed site, not
in local dev.

## Commands

```bash
npm run dev     # start dev server (port 3000)
npm run build   # production build to dist/client
```
