# Client integration guide

For the developer of the existing Passport Suvidha Next.js application
(`psurti07/passport_suvidha_react`, baseline commit `b7fe4a2`). It explains what this project
contains, how it differs from your repository, and how to bring the redesign into it.

## 1. Compatibility with your repository

| | Your repository (`b7fe4a2`) | This project |
|---|---|---|
| Next.js / React | 15.1.0 / 18.3.1 in `package.json` (the App Router renders with Next's own bundled React) | same |
| Router | App Router | same — your routes moved into the `(legacy)` route group, URLs unchanged |
| TypeScript config, `tailwind.config.js`, `postcss.config.mjs`, `components.json` | — | unchanged |
| `middleware.ts`, `server.js` | — | unchanged |
| `app/api/**` (23 route handlers), `components/ui/**`, `hooks/`, `types/` | — | unchanged |
| Original pages kept | — | 42 files byte-identical, only moved to `app/(legacy)/` |
| Dependencies | — | added `dompurify@3.2.3`, `lucide-react-redesign` (= `lucide-react@0.468.0` alias); `@types/react` 18 to match React 18 |

Run `git diff 1bf6e00 HEAD` in this project to see every change against your code.

**Newer commits in your repository.** Since `b7fe4a2`, `main` has one more commit, `99f1cad`
("location section remove", 28 Oct 2026), which changes only `app/page.tsx` — your previous homepage,
which the redesign replaces. No preserved file is affected. Before integrating, diff your current
`main` against `b7fe4a2` again and carry any changes to preserved files into `app/(legacy)/`.

## 2. File and folder mapping

### New (the redesign)

| Path | What it is |
|---|---|
| `app/(site)/layout.tsx` | Redesign layout: scoped stylesheet, `.ps-site` wrapper, header/footer/notice |
| `app/(site)/**/page.tsx` | 14 routes; each file only sets metadata/JSON-LD and renders a page component |
| `app/layout.tsx` | New shared root (`<html>`/`<body>`, tracking mount) — replaces your root layout |
| `app/not-found.tsx` | 404 in the redesign layout (replaces yours) |
| `app/sitemap.ts`, `app/robots.ts` | `/sitemap.xml`, `/robots.txt` |
| `components/redesign/pages/` | Page components (Home, About, Services, ServiceDetail, Requirements, Locations, Contact, FAQ, Testimonials, Blogs, BlogDetail, Apply, Legal, SiteMap, NotFound) |
| `components/redesign/home/` | 15 homepage sections + disclosure strip |
| `components/redesign/layout/` | Top bar, header, services dropdown, mobile menu, search, footer, floating buttons, brand intro, Important Notice |
| `components/redesign/apply/` | Apply Now: progress, step frame, OTP input, 5 steps |
| `components/redesign/{common,forms,services,testimonials,blogs,about}/` | Shared building blocks, carousels, reels player |
| `components/tracking/Tracking.tsx` | Mounts your GA4/Ads/GTM/Pixel once (off unless enabled) |
| `lib/redesign/services/` | **Integration layer**: `applicationService.ts` (Apply), `formsService.ts` (contact, locations), `blogService.ts`, `apiClient.ts` |
| `lib/redesign/config/` | Switches: demo mode, OTP timing, preview fees, notice, mobile app, blog |
| `lib/redesign/data/` | Content (services, FAQs, testimonials, reels, requirements, site details, option lists) |
| `lib/redesign/{hooks,types,utils}/`, `router.tsx`, `routes.ts`, `seo.tsx`, `intro.ts` | Hooks, types, validation, router adapter, route list, metadata helpers |
| `styles/redesign/` + `tools/` | Stylesheet sources and build → `styles/redesign.css` (generated) |
| `public/assets/` | Redesign images, 4 reels, posters, fonts (your `public/` files unchanged) |

### Your files that were changed (small, commented in place)

| File | Change |
|---|---|
| `app/layout.tsx` → `app/(legacy)/layout.tsx` | Your root layout became the layout of your pages; `<html>/<body>` and tracking moved to the new root |
| `app/template.tsx`, `app/loading.tsx`, `app/globals.css` | Moved into `app/(legacy)/` unchanged |
| `components/footer.tsx` | Express-chat only with `NEXT_PUBLIC_ENABLE_CHAT=true` |
| `lib/seo.ts`, `lib/fetchFacebookSettings.ts` | Skip the API call when `NEXT_PUBLIC_API_BASE_URL` is empty |
| `lib/buildSeo.ts` | Indexable only when `NEXT_PUBLIC_SITE_ENV=production` |
| `next.config.mjs` | Asset cache header; `noindex` header outside production |
| `.github/workflows/deploy.yml`, `.htaccess` | Moved to `docs/client-reference/` (disabled here) |

### Your pages replaced by the redesign

`app/page.tsx`, `about`, `services`, `requirements`, `locations` (+ `loading`), `contact` (+ `head`),
`faq`, `apply-passport` (+ `loading`), `disclaimer`, `site-map` (+ `loading`), `not-found`.
They remain available in your repository and in `client-nextjs-reference/` for comparison.

## 3. How the App Router is structured

```
app/layout.tsx                 shared root: html/body, <Tracking/>
app/(site)/layout.tsx          redesign pages        → styles/redesign.css, .ps-site
app/(legacy)/layout.tsx        your pages            → your globals.css, Inter, Toaster
app/(legacy)/template.tsx      your navbar/footer logic (unchanged)
app/api/**                     your route handlers (unchanged)
```

Route groups do not change URLs. Links from redesigned pages to your pages do a full page load, so
each side loads only its own CSS (see `docs/ARCHITECTURE.md`).

## 4. Ready, integration required, existing issues

### A. Ready to integrate now (frontend complete, verified)
- Homepage (all sections, brand intro, Important Notice, 4 reels, carousels), About, Services and the
  3 service pages, Requirements, Locations (map embed), FAQ, Customer stories, Disclaimer, Site map, 404.
- Header, footer, mobile menu, search, floating buttons.
- Metadata, JSON-LD, sitemap, robots; scoped CSS (no effect on your pages).

### B. Integration required (needs your backend / keys / decisions)
| Feature | Where | Needs |
|---|---|---|
| Apply Now (5 steps) | `lib/redesign/services/applicationService.ts` | API URL + `NEXT_PUBLIC_USE_MOCKS=false`; staging test of OTP |
| OTP | same (`sendOtp`, `verifyOtp`) | Uses your `/api/otp/send`, `/api/otp/verify`, `/api/customers/create` |
| Payment | `httpAdapter.startPayment` | Implement Razorpay as in your `ApplicationForm.tsx` (steps in `BACKEND_INTEGRATION.md` §3) |
| Fees on step 5 | `/services/passport` | Live pricing; preview fees in `lib/redesign/config/applyFees.ts` are placeholders |
| Contact form, office search | `formsService.ts` | `/contact/enquiry`, `/locations?search=` response mapping |
| Tracking, chat, Cashfree | env switches | GTM container review first (`TRACKING_INTEGRATION.md`) |
| Blog | `blogService.ts` | A blog API (page stays an empty `noindex` state until then) |
| Resume application, token persistence, consent recording | Apply flow | Product decision (`BACKEND_INTEGRATION.md` §2) |

### C. Existing issues in your repository (not changed)
- `app/api/police-stations/route.ts` returns the same 8 Surat stations for every PIN code.
- 29 TypeScript errors in your files (`next.config.mjs` ignores them during builds); `lib/authUtils.ts`
  calls `cookies().delete` without `await` (Next.js 15).
- `package.json` uses `"latest"` for some Radix packages; any `npm install` (your deploy workflow runs
  one) re-resolves them, so installs are not reproducible from the lockfile.
- `/check-user` and `/services/passport` are called from the browser directly to the backend (CORS).
- The original Step 3 checks `"Married"` while storing `"married"`.
- Three images in `public/` (`logo/ps-logo.png`, `lending_page/bg_dd.png`, `lending_page/bg_mm.png`)
  carry image-generator metadata.

## 5. Apply Now page

### Structure

| Step | Page shows |
|---|---|
| Basic details | Introduction and facts → stepper → form + help sidebar → Customer Stories → Video Stories → footer |
| Verify, Family, Personal | Stepper → form + help sidebar (no trust sections, so nothing interrupts the form) |
| Review & pay | Stepper → payment summary + application accordions → Customer Stories → Video Stories → footer. Phones: payment summary comes first |
| Any step edited from review | Editing notice → form with **Save & return to review** / **Cancel** |

### Files and what to customise

| Change | File |
|---|---|
| **Headings, descriptions, button and accordion labels, payment text, which steps show trust sections, turning testimonials or reels off** | `lib/redesign/config/applyContent.ts` |
| Page layout and section order | `components/redesign/pages/ApplyPage.tsx` |
| Review & Pay layout | `components/redesign/apply/steps/ReviewStep.tsx` |
| Accordion card | `components/redesign/apply/ReviewAccordion.tsx` |
| Edit rules and step state | `lib/redesign/hooks/useApplyWizard.ts` (reducer) |
| OTP, saves, pricing, payment | `lib/redesign/services/applicationService.ts` |

Testimonials and reels are the homepage's own components (`components/redesign/home/TestimonialsSection.tsx`,
`VideoReviews.tsx`), imported directly: same data, CSS, images and videos. The only addition is
`TestimonialsSection showAllLink={false}` on this page, because that link would leave the form; the
homepage default is unchanged.

### Edit from Review & Pay

`useApplyWizard` holds `editing` (the section being changed), `snapshot` (restored on Cancel),
`editDependency` and `lastEdited`. The step forms write to the same shared state as the normal flow, so
there is no second copy of the form data. Actions: `startEdit(section)`, `completeEdit()`, `cancelEdit()`.

```
Review → Edit section → Save → validates → saves through the adapter → Review (section open, "updated")
Review → Edit section → Cancel, or browser Back → everything restored → Review
```

`completeEdit` is decided in the reducer, so no route can skip these rules:

| Situation | Result |
|---|---|
| Mobile number unchanged | Straight back to review. No OTP |
| Mobile number changed | Button becomes **Verify new number** → OTP step → after verification, straight back to review. Review and payment stay locked until then |
| An edit made another section invalid (e.g. your email now equals the emergency contact's) | That section opens with the problem shown, then review |
| An edit adds a required field (Married → spouse, Government → organisation, No → permanent address) | Normal validation blocks Save until it is filled |
| Nothing changed | Back to review with no save call |

Pay re-checks verification and all sections before calling `startPayment`.

**Browser navigation.** Back/Forward move between steps; only the step id is stored in `history.state`,
never form data. From an edit, Back cancels it. A refresh starts over, since the application is held in
memory only (the browser warns first). In-site links ask for confirmation while details are entered.

### Test environment and going live

While the simulation runs, the page shows no demo messaging; a small **Test environment** indicator
(`components/redesign/apply/TestModeIndicator.tsx`) gives testers the codes (`1234` continues, `0000`
expired). In this mode the wording stays truthful: the OTP step never says a code was sent, and Pay says no
payment was taken.

| Configuration | Behaviour |
|---|---|
| No API URL, `NEXT_PUBLIC_SITE_ENV` unset (preview) | Simulation + indicator. Nothing leaves the browser |
| `NEXT_PUBLIC_API_BASE_URL` + `NEXT_PUBLIC_USE_MOCKS=false` | Your real API (`httpAdapter`). No indicator |
| `NEXT_PUBLIC_SITE_ENV=production` without an API | **Never simulates**: customers are told online applications are unavailable |

### Still needed for production

- **OTP:** `sendOtp` and `verifyOtp` are wired to your endpoints. When a changed number is verified,
  `verifyOtp` calls `/api/customers/create` again. Confirm the backend updates the existing applicant
  rather than creating a second one.
- **Editing name, email or service after registration:** no confirmed endpoint exists (your
  `/api/customer/select-service` expects `NORMAL_36`-style codes and is unused). `httpAdapter.updateBasicDetails`
  therefore refuses with a message until you connect one; it does not lose the change silently.
- **Family and personal edits** re-post to your existing endpoints. Confirm these overwrite earlier values.
- **Payment:** implement `httpAdapter.startPayment` (`BACKEND_INTEGRATION.md` §3). No Review & Pay UI change needed.
- **Pricing:** `/services/passport` when live. The preview ₹999 + 18 % GST in `lib/redesign/config/applyFees.ts`
  is an unverified placeholder and needs confirmation.
- **Police stations:** samples in the simulation; your route returns a fixed Surat list (§4 C).

## 6. Environment variables

See `.env.example` (names and comments only). Minimum for each environment:

| Variable | Preview | Staging | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | – | staging URL | `https://passportsuvidha.com` |
| `NEXT_PUBLIC_SITE_ENV` | – | – | `production` |
| `NEXT_PUBLIC_API_BASE_URL` | – | staging API | production API |
| `NEXT_PUBLIC_USE_MOCKS` | `true` | `false` | `false` |
| `NEXT_PUBLIC_RAZORPAY_KEY` | – | test key id | live key id |
| `NEXT_PUBLIC_ENABLE_TRACKING` / `_CHAT` / `_PAYMENT_SCRIPTS` | `false` | `false` (or test properties) | `true` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_FRONTEND_URL`, `NEXT_PUBLIC_CASHFREE_MODE` | as your current setup | | |

## 7. Integration sequence

Two ways to adopt this work — both keep your URLs:

**Option 1 — use this project as the new codebase (fastest).** It already contains your full
application. Replace your repository's contents with it on a new branch, re-enable your
deploy workflow from `docs/client-reference/deploy.yml.disabled`, then follow steps A–F below.

**Option 2 — copy the redesign into your repository.**
1. Create a branch in your repository.
2. Copy `components/redesign/`, `components/tracking/`, `lib/redesign/`, `styles/redesign/`,
   `styles/redesign.css`, `tools/`, `public/assets/`, `app/(site)/`, `app/sitemap.ts`, `app/robots.ts`,
   `app/not-found.tsx`.
3. Move your `app/*` pages (except `api/`) into `app/(legacy)/`, delete the pages listed in §2 that the
   redesign replaces, and replace `app/layout.tsx` with this project's root; use this project's
   `app/(legacy)/layout.tsx` as your pages' layout.
4. Add the dependencies and scripts from this `package.json` (`dompurify`, `lucide-react-redesign`,
   `build:css`, `predev`, `prebuild`, `typecheck`).
5. `npm run build` — it builds the stylesheet first.

Then, after either option:

- **A.** Deploy to **staging** with demo mode (no env changes) and review.
- **B.** Set `NEXT_PUBLIC_API_BASE_URL` (staging) + `NEXT_PUBLIC_USE_MOCKS=false`; test OTP,
  family/personal saves, pricing, contact enquiry.
- **C.** Implement `startPayment` (Razorpay test keys); test success / failure / cancel → `/payment-response`.
- **D.** Export the GTM container; adjust selector-based triggers; add the `otp_verified_auto` push if
  used; enable tracking on staging with test properties.
- **E.** Fix the police-station lookup; confirm fees, legal text and FAQ wording.
- **F.** Production: set `NEXT_PUBLIC_SITE_ENV=production` and the live keys; release through your
  pipeline with the current release ready for rollback. `/apply-passport` carries ad traffic —
  release it only after B–D pass on staging.

## 8. What was verified and what was not

Verified on the production build (`docs/QA_REPORT.md`): build, type-check (0 errors in redesign code),
all routes, all assets, visual match with the approved React site, image loading after refresh /
client navigation / back-forward, all 4 reels, the 5-step Apply flow in demo mode, CSS isolation, no
console or hydration errors.

Not verified: Safari / Firefox / real devices; anything against a live backend (OTP, payments, contact,
location search, status, portal); tracking.
