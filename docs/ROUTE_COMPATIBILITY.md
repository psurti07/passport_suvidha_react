# Route compatibility report

Every public URL of the original application (commit `b7fe4a2`) still exists, with the same path
and the same casing. No redirects were added. Query strings (including `utm_*`, `gclid`, `fbclid`)
reach every page untouched.

## Redesigned routes — `app/(site)`

| URL | Original app | Now | Rendering |
|---|---|---|---|
| `/` | Home | Redesigned homepage | Static |
| `/about` | About | Redesigned | Static |
| `/services` | Services | Redesigned | Static |
| `/services/normal-passport` · `/tatkal-passport` · `/reissue-passport` | — (new) | Redesigned service pages | Static (pre-rendered) |
| `/requirements` | Requirements | Redesigned | Dynamic (reads `?type=`) |
| `/locations` | Locations | Redesigned | Static |
| `/contact` | Contact | Redesigned | Static |
| `/faq` | FAQ | Redesigned | Dynamic (reads `?q=`, `?category=`) |
| `/testimonials` | — (new) | Customer stories | Dynamic (reads `?service=`) |
| `/blogs`, `/blogs/[slug]` | — (new) | Blog (empty state, `noindex`, until articles exist) | Dynamic |
| `/apply-passport` | 5-step application with real OTP + Razorpay | **5-step redesign in demo mode** (see below) | Dynamic (reads `?service=`) |
| `/disclaimer` | Disclaimer | Redesigned (same text as the live site) | Static |
| `/site-map` | Site map | Redesigned | Static |
| any unknown URL | 404 | Redesigned 404 | — |

`?service=tatkal-passport` on `/apply-passport` preselects Tatkal (used by the service pages). Campaign parameters (`utm_*`, `gclid`, `fbclid` and similar) from the landing URL are carried to Apply Now links.

## Original routes kept unchanged — `app/(legacy)`

These render the original pages with the original navbar, footer, stylesheet and font.

| URL | Why it was kept |
|---|---|
| `/check-application-status` | Works against the backend (`/check-status-by-mobile`); the redesign's version is not connected and asks for different fields |
| `/feeCalculator` | Working government-fee calculator (built-in fee table); the redesign's version calculates a different thing (consultancy fee, not connected) |
| `/signin`, `/portal/**` | Customer login and portal (auth cookie, middleware) |
| `/payment-response` | Razorpay return page (`?status=success|failed|cancelled`) — conversion tracking likely depends on it |
| `/privacy-policy`, `/terms`, `/terms-of-service`, `/refund-policy`, `/accessibility` | Full legal text lives in these pages; the redesign only had placeholders for most of it |
| `/process`, `/schedule-slot`, `/schedule-success` | Appointment flow |
| `/cardoffer`, `/staroffer`, `/bumperoffer` and their `-response` pages | Offer landing pages (possibly used by campaigns) |
| `/api/**` (23 route handlers) | Server-side proxies to the Laravel backend; the redesigned Apply flow uses six of them |

Links from a redesigned page to one of these pages do a full page load (`lib/redesign/routes.ts`),
so each side always loads only its own stylesheet.

## Advertising-sensitive URLs

| URL | Status | Note |
|---|---|---|
| `/apply-passport` | **Same URL, new UI in demo mode** | Do not deploy this project to the live domain until the Apply flow is connected (docs/BACKEND_INTEGRATION.md) — otherwise ad traffic would reach a form that cannot submit |
| `/payment-response?status=…` | Unchanged | Keep for Razorpay redirects and conversion tags |
| Offer pages | Unchanged | |
| UTM / click-id parameters | Preserved on landing | Internal links do not carry them forward (same as the original site) |

## New files

- `/sitemap.xml` (`app/sitemap.ts`) — public pages only. The original site had none.
- `/robots.txt` (`app/robots.ts`) — blocks all crawlers unless `NEXT_PUBLIC_SITE_ENV=production`.

## Verified (QA)

All 32 public URLs above return 200; unknown URLs return 404; `/portal` without a session redirects
to `/signin` through the original middleware. See docs/QA_REPORT.md.
