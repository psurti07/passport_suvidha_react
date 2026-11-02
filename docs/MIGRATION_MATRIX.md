# Migration matrix

## The two projects

| | Original application (baseline `b7fe4a2`) | Approved redesign (React/Vite) |
|---|---|---|
| Framework | Next.js 15.1.0 App Router, `server.js` custom server | Vite 5.4 SPA, React Router 6.28 |
| React / TypeScript | 18.3.1 / TS 5 (`ignoreBuildErrors: true`) | 18.3.1 / TS 5.6 strict |
| Styling | Tailwind 3.4 + shadcn/ui (Radix), global `globals.css` (744 lines), `tailwindcss-animate` | Tailwind 3.4 with CSS-variable tokens, `globals.css` |
| Font | Inter (`next/font/google`) | Plus Jakarta Sans |
| Icons | lucide-react 0.454 | lucide-react 0.468 |
| Animation | framer-motion 12, embla-carousel | CSS only (no animation library) |
| Data | axios to Laravel (`NEXT_PUBLIC_API_BASE_URL`), 23 Next route handlers | adapters with demo mode |
| Auth | `authToken` cookie (middleware guards `/portal`), token in localStorage | — |
| Payments | Razorpay in Apply; Cashfree script site-wide | Preview only |
| Tracking | GA4, Google Ads, GTM, Meta Pixel (id from backend), Express-chat | none |
| SEO | `buildSeo()` from backend `/seo/{slug}`, Organization JSON-LD | client-side meta hook |
| Deploy | GitHub Actions on push to `main` → SCP to VPS, pm2; Passenger `.htaccess` | static build |

## Route and feature mapping

| Area | Original | Redesign | Approach | Result |
|---|---|---|---|---|
| Homepage | 2,759-line `page.tsx` | 15 sections + disclosure strip | Replace presentation | Redesign, static |
| Header / top bar | `navbar.tsx` | Top bar, glass header, dropdown, search, mobile menu | Replace on redesigned routes | Redesign; original navbar stays on original routes |
| Footer | `footer.tsx` (+ chat widget) | Redesigned footer | Same | Same |
| About, Services, Requirements, Locations, Contact, FAQ, Site map, Disclaimer | Existing pages | Redesigned | Replace, same URLs | Redesign |
| Service pages, Customer stories, Blog | — | New | Add | Redesign (blog `noindex` until articles exist) |
| Apply Now | 5 steps, real OTP + Razorpay, localStorage resume | 5 steps, demo mode | Frontend with adapter matching the original contract | Redesign in demo mode — **connect before live** |
| OTP | `/api/otp/send`, `/api/otp/verify` | Demo UI | Adapter | Demo; HTTP adapter wired to the same endpoints |
| Payment | Razorpay (`/create-order`, `/verify-payment`) | Preview with fee breakdown | Adapter | Not connected (no gateway loads) |
| Application status | Backend `/check-status-by-mobile` | Not connected | Keep original | Original page |
| Fee calculator | Government-fee table | Consultancy-fee form (not connected) | Keep original | Original page |
| Legal pages | Full text | Placeholders for most sections | Keep original | Original pages (Disclaimer uses the redesign, same text) |
| Sign-in, portal, payment response, offers, appointment | Existing | — | Keep | Original pages, unchanged |
| Tracking | Root layout | — | Mount once, gated | Off unless `NEXT_PUBLIC_ENABLE_TRACKING=true` |
| SEO | Backend-driven `buildSeo` | Per-page metadata | Metadata API | Redesign pages: server metadata + JSON-LD; original pages: `buildSeo` |
| Sitemap / robots | none | none | Add | `app/sitemap.ts`, `app/robots.ts` |

## Component inventory

**Reused without modification** (copied, only import paths changed): all redesign data, config, types
and utilities; 26 presentational components; homepage sections; testimonials and reels; forms;
validation; Apply Now steps, progress, OTP input and wizard state.

**Migrated** (small, behaviour-preserving changes):

| File | Change |
|---|---|
| every redesign component | `react-router-dom` → `lib/redesign/router` (adapter); `'use client'` where interactive |
| `pages/*` | client-side meta hook removed → `app/(site)/**/page.tsx` metadata |
| `layout/Layout.tsx` | `<Outlet>` → `children`; `#ps-app` + `#ps-portal` wrappers |
| `layout/BrandIntro.tsx`, `hooks/usePrefersReducedMotion.ts` | browser checks moved after mount (no hydration mismatch) |
| `common/Modal`, `layout/MobileNav`, `SearchPalette`, `DisclaimerNotice` | portal target `#ps-portal` |
| `common/AutoplayToggle.tsx` | inline keyframe name `ps-carouselProgress` |
| `services/applicationService.ts`, `formsService.ts`, `data/applyOptions.ts` | aligned with the original endpoints and stored values |

**Replaced:** `useDocumentMeta` (→ Metadata API), React Router route table (→ App Router files),
`index.html` head (→ layouts), Vite env (`VITE_*` → `NEXT_PUBLIC_*`).

**Removed from the redesign build:** its Check status, Fee calculator and Sign-in placeholder pages
(the original pages are kept instead).

**Original files changed** (all small, documented in place):

| File | Change | Why |
|---|---|---|
| `app/layout.tsx` | Now the shared root (html/body + gated tracking) | Two route groups |
| `app/(legacy)/layout.tsx` | Former root layout content; Cashfree gated | Same |
| `app/(legacy)/*` | Moved from `app/` (unchanged code) | Same |
| `lib/seo.ts`, `lib/fetchFacebookSettings.ts` | Skip the API call when no API URL is set | Preview builds |
| `lib/buildSeo.ts` | `index` only when `NEXT_PUBLIC_SITE_ENV=production` | Preview not indexable |
| `components/footer.tsx` | Chat widget only with `NEXT_PUBLIC_ENABLE_CHAT=true` | No live chat on previews |
| `next.config.mjs` | Headers: asset caching, `noindex` on non-production | |
| `package.json` | Scripts; `dompurify`; `lucide-react-redesign` alias; `@types/react` 18 (matches React 18 runtime) | |
| `.github/workflows/deploy.yml`, `.htaccess` | Moved to `docs/client-reference/` (disabled) | Must not deploy to the client VPS from this project |

## Conflicts found and how they are handled

| Conflict | Handling |
|---|---|
| Tailwind `navy`/`gold` defined differently | Separate Tailwind builds; redesign scoped to `.ps-site` |
| Global CSS (`html, body` scrollbars hidden, `* { border-color }`, `.animate-pulse`, `@keyframes pulse/float`) | Not loaded on redesigned pages; scoped defence layer; `ps-` keyframes |
| Inter vs Plus Jakarta Sans | Redesign font under its own family name |
| lucide versions | Alias package for the redesign |
| Root `template.tsx` wraps every page in the original navbar/footer | Moved into `(legacy)` |
| Root `loading.tsx` is the Suspense boundary for 7 original pages | Moved into `(legacy)` |
| `@types/react` 19 with React 18 runtime | Types pinned to 18 |

## Missing information

- GTM container export (conversion triggers) — docs/TRACKING_INTEGRATION.md
- Laravel response shapes for `/contact/enquiry`, `/locations?search=`, `/services/passport`
- Real police-station lookup (the original route returns a fixed Surat list)
- Approved fees and GST treatment; final legal text for the redesign's own legal layout
- Whether offer pages and `encryptId` should feed the new Apply flow
- Production hosting details (VPS path, pm2 name are in the disabled workflow; env values are not)
