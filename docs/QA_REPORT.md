# QA report

Production build (`npm run build && npm start`), preview configuration (no `.env.local`: demo mode,
tracking/chat/payment scripts off), Chrome (headless, puppeteer) and the in-app browser, 28–29 Oct 2026.
Reference: the approved React/Vite site (branch `main`, commit `fda2e3d`) running locally.

## Summary

| Area | Result |
|---|---|
| Type-check (`npx tsc --noEmit`) | 0 errors in redesign code; 29 in original files (pre-existing, ignored by the original build config) |
| Production build | Passes — 67 routes (14 redesigned, original pages, 23 API handlers, sitemap, robots) |
| Visual parity with the Vite site | 98 comparisons (14 routes × 7 widths): same element structure and page height in all 98; pixel-identical except the items listed below |
| Functional suite | 32/32 checks |
| Apply Now flow | 38/38 checks at 1366 px and 38/38 at 390 px |
| Console | No errors, no hydration warnings, no failed requests on redesigned pages |
| CSS isolation | Verified both ways (below) |

## Visual parity (element-by-element computed styles + full-page pixel diff)

Widths: 360, 390, 768, 1024, 1280, 1440, 1920. Routes: `/`, `/about`, `/services`,
`/services/tatkal-passport`, `/requirements`, `/locations`, `/contact`, `/faq`, `/testimonials`,
`/blogs`, `/apply-passport`, `/disclaimer`, `/site-map`, 404.

| Result | Detail |
|---|---|
| Identical | about, requirements, contact, faq, blogs, apply-passport, disclaimer, site-map at all widths; services, testimonials after the fixes below |
| 2–21 pixels | Homepage (4 widths) and one service page width: anti-aliasing on a dashed border / icon edge — not visible |
| Locations | All differences inside the embedded Google Map (third-party tiles render differently on each load) |
| 404 | Pixel-identical; the only "error" is the browser logging the 404 status — the Next.js app correctly returns HTTP 404 (the Vite SPA returned 200) |

Found and fixed during QA:

- Default 8 px `<body>` margin and mobile text autosizing (outside the scoped CSS) → two document rules in
  the redesign layout.
- Customer photos stayed transparent when they loaded before hydration → `ImageWithFallback` reads the
  image's state after mount.
- Table caption alignment changed by the defence layer → `caption` excluded.
- Icons differed slightly (lucide 0.454 vs 0.468) → redesign uses its own 0.468 copy.

## Functional suite (32/32)

Routes: 32 public URLs return 200 (redesigned and original, with UTM query); unknown URLs 404;
`/portal` without a session → 307 to `/signin` (original middleware); `robots.txt` blocks crawlers and
`X-Robots-Tag: noindex` is sent on the preview; server HTML contains title, description, canonical,
JSON-LD and the page content; sitemap lists public pages only.

Navigation: header links navigate client-side; services dropdown (3 links); service page → Apply with
Tatkal preselected; search palette opens and navigates; footer links; footer link to an original page
does a full load and renders the original page in its own font with no redesign CSS; mobile menu opens
(scoped portal), navigates and closes; mobile Apply buttons visible.

Homepage: disclosure strip directly below the hero; no disclaimer text in the top bar; testimonials
autoplay; all 4 reels play (sound, in the scoped portal); brand intro on first visit; Important Notice
after the intro (₹999, page inert) and closes.

Apply Now (1366 px and 390 px): validation on every step, focus on the first invalid field, digits-only
mobile/PIN, OTP demo (partial, wrong `1111`, expired `0000`, resend countdown and demo resend, paste
`1234`, "not a real verification" wording), spouse / permanent address / organisation conditional fields,
emergency contact must differ from the applicant, DOB formatting and validation, Back/Next keep values,
re-verification skipped for the same number, review summary and Edit, fee breakdown with 18 % GST
marked "to be confirmed", Pay = preview only, no gateway script, no personal data in browser storage,
no external requests, no horizontal overflow.

## CSS isolation

- Every rule in `styles/redesign.css` is under `.ps-site`; the build fails otherwise. All keyframes `ps-*`.
- Redesigned pages load none of the original global CSS (fresh load).
- Original pages load none of the redesign CSS and keep Inter.
- Redesigned page reached by client-side navigation from an original page (original CSS still loaded):
  `/about` 0 differing pixels at 1440 px; homepage 0 at 1440 px and a 10-pixel-high band under the hero's
  frosted-glass panel at 390 px (backdrop-blur rendering variance; visually identical).

## Final verification pass (production build, 28 Oct 2026)

- Clean production build (`.next` removed first): passes, 67 routes. Preview served from it on
  `localhost:3100`; React reference on `localhost:5173`.
- Image audit under visitor conditions (normal motion, natural scrolling, nothing forced visible):
  64 cold-load checks, 0 issues — home, about, services, the 3 service pages, requirements,
  locations and contact at all 7 widths, plus FAQ at 360 px: every image loaded, decoded, visible and
  in the same position and crop as the React site. A trial run also covered home and customer stories
  at 390/1440 px after warm reloads (images finished before hydration), client-side navigation and
  back/forward: 0 issues. The run was stopped early on request, so FAQ (other widths), customer
  stories (other widths), blog, apply, disclaimer, site map and 404 were not re-audited this way;
  they passed the earlier comparison (reduced motion, entrance animations completed) and the
  functional suite. Log: `../qa-artifacts/image-audit.log`.
- Hero: mobile image served below 768 px, same size and crop as React; hero text visible after
  ≈1.4–1.6 s (React dev reference 1.8–3.1 s).
- Source check: every redesign component and data file matches the React source apart from the
  documented migration changes; all 34 asset files byte-identical.
- Smoke test: 34 routes 200, unknown routes 404, `/portal` → `/signin`; 31 image/video/font files
  served with the correct MIME type.
- Type-check: 0 errors in redesign code (29 in original files, unchanged).

## Apply Now conversion changes (2 Nov 2026, production build)

Real clicks through the journey, tests A–H: all five steps; collapsed accordions with Edit reachable only
when expanded; direct edit-and-return for Basic, Family and Personal; Cancel and browser Back restore saved
values; a changed number must pass OTP before review or payment; dependent validation (spouse, organisation,
emergency contact vs own email); testimonials and reels below the form and below the payment area, homepage
sections unchanged; no overflow and working edits at 360, 390, 768, 1024, 1440 and 1920 px; Pay loads no
gateway and makes no external request; no console errors; no personal data in browser storage.

Found and fixed: collapsed content was not `inert` since the migration (FAQ, phone menu), because Next's
bundled React treats `inert` as a boolean.

## Not covered

- Safari, Firefox and real phones (Chrome only).
- Live backend: OTP, payment, contact enquiry and location search were tested in demo / not-connected
  mode only — no production endpoint was called.
- Original pages were checked for loading, layout and font; their own functionality (portal, sign-in,
  status check against the backend) was not exercised without a backend.
- Tracking (off in this build).
