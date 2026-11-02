# Passport Suvidha — Next.js redesign

The redesigned Passport Suvidha website, built on the original Next.js application.

- **Redesigned pages** (`app/(site)`): homepage, About, Services + 3 service pages, Requirements,
  Locations, Contact, FAQ, Customer stories, Blog, Disclaimer, Site map, 404 and the 5-step
  **Apply Now** flow.
- **Original pages kept as they are** (`app/(legacy)`): sign-in and customer portal, payment response,
  application status, fee calculator, legal pages, appointment and offer pages, and all `app/api`
  route handlers.

Every existing URL is unchanged (docs/ROUTE_COMPATIBILITY.md).

> **Apply Now is a frontend-only demo** (test OTP `1234`, nothing is sent, no payment). A default build is also
> `noindex` with tracking off, so it must not replace the live site. See
> docs/APPLY_NOW_DEVELOPER_HANDOVER.md and docs/PRODUCTION_ROLLOUT.md.

## Requirements

- Node.js 18.18+ (tested with 24), npm
- Stack: Next.js 15.1.0 (App Router), React 18.3.1, TypeScript, Tailwind CSS 3.4.17

## Setup

```bash
npm ci
cp .env.example .env.local     # fill in only what you need (see comments in the file)
npm run dev                    # http://localhost:3000
```

## Build and run

```bash
npm run build                  # builds styles/redesign.css first, then `next build`
npm start                      # production server (PORT=3000 by default)
```

`server.js` (custom Node server used by the original hosting) still works: `node server.js`.

## Scripts

| Script | What it does |
|---|---|
| `dev` / `build` | Run `build:css` first, then Next.js |
| `build:css` | Compiles the redesign stylesheet (`tools/build-redesign-css.mjs`) |
| `typecheck` | `tsc --noEmit` (the redesign has 0 errors; 29 remain in original files) |
| `start`, `lint` | As in the original project |

## Where things are

```
app/
  layout.tsx            root: <html>/<body>, tracking (off unless enabled)
  (site)/               redesigned routes — thin page.tsx files with metadata
  (legacy)/             original routes, original layout + template (navbar/footer)
  api/                  original route handlers (proxy to Laravel)
  sitemap.ts robots.ts  generated /sitemap.xml and /robots.txt
  not-found.tsx         404 in the redesign layout
components/
  redesign/             redesign UI (layout, home, apply, common, forms, pages, …)
  tracking/             GA4 / Ads / GTM / Pixel mount point
  ui/ … navbar, footer  original components (used by app/(legacy))
lib/
  redesign/             redesign data, config, hooks, services (API adapters), router adapter, SEO
  …                     original libraries
styles/
  redesign/             design tokens + base styles (sources)
  redesign.css          compiled, scoped to .ps-site (generated — do not edit)
tools/                  stylesheet build
public/assets/          redesign images, reels, fonts (original public files unchanged)
docs/                   guides and reports (below)
```

## Documentation

| Document | For |
|---|---|
| [docs/CLIENT_INTEGRATION_GUIDE.md](docs/CLIENT_INTEGRATION_GUIDE.md) | **Start here** — compatibility with your repository, file mapping, what is ready vs needs integration, integration sequence |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the redesign sits inside the original app; CSS isolation; rendering |
| [docs/MIGRATION_MATRIX.md](docs/MIGRATION_MATRIX.md) | Audit of both projects; what was reused, migrated or replaced |
| [docs/ROUTE_COMPATIBILITY.md](docs/ROUTE_COMPATIBILITY.md) | Every URL, old and new |
| [docs/BACKEND_INTEGRATION.md](docs/BACKEND_INTEGRATION.md) | Connecting Apply Now, contact and locations to Laravel; payment |
| [docs/TRACKING_INTEGRATION.md](docs/TRACKING_INTEGRATION.md) | GA4, Ads, GTM, Pixel, chat — what to check before enabling |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Environments, hosting, rollout |
| [docs/QA_REPORT.md](docs/QA_REPORT.md) | Tests performed and results |
| [docs/APPLY_NOW_DEVELOPER_HANDOVER.md](docs/APPLY_NOW_DEVELOPER_HANDOVER.md) | Demo OTP, adapters, form data, validation; connecting OTP, backend and payment |
| [docs/PRODUCTION_ROLLOUT.md](docs/PRODUCTION_ROLLOUT.md) | **Read before deploying** — environment values, staging checks, rollback |

## Origin

The redesign was developed separately and integrated on top of this repository's history at
commit `09ffc780c41246fe44d5ec00fd47654150c8e47f`.
