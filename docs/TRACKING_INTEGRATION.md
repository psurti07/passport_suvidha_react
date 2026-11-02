# Tracking integration guide

## What the original application loads (commit `b7fe4a2`)

| Service | ID | Where | How |
|---|---|---|---|
| Google Analytics 4 | `G-WRQ34WDL4K` | `components/GoogleTagManager.tsx` | gtag.js, `config` on load |
| Google Ads | `AW-18369922859` | same | gtag.js, `config` on load |
| Google Tag Manager | `GTM-K6W989PP` | same | container snippet + `noscript` iframe |
| Meta Pixel | id loaded from the backend (`GET /fb-pixel` → `fb_pixel_key`) | `components/FacebookPixel.tsx` | base code, `PageView` once per full page load |
| Facebook domain verification | from `/fb-pixel` (`domain_verification`) | `lib/buildSeo.ts` | `<meta>` |
| Cashfree SDK | — | original root layout | script on every page |
| Express-chat widget | bot ids in the snippet | `components/footer.tsx` (original footer, every page except `/apply-passport`) | `website-bot.js` |

Custom events in the code: one — `dataLayer.push({ event: 'otp_verified_auto', otp_method: 'auto_detect',
verification_status: 'success' })` after OTP verification. Conversions are most likely configured in
GTM (e.g. on `/payment-response?status=success`); the container itself is not in the repository.

## In this project

- All of the above is mounted **once**, in `app/layout.tsx` (`components/tracking/Tracking.tsx`),
  for both redesigned and original pages — no page loads a tag twice.
- **Off by default.** `NEXT_PUBLIC_ENABLE_TRACKING=true` turns it on. Previews and staging must keep
  it off so test journeys never reach analytics or ad accounts. The Meta Pixel additionally needs
  `NEXT_PUBLIC_API_BASE_URL` (its id comes from the backend).
- Cashfree loads only on original pages and only with `NEXT_PUBLIC_ENABLE_PAYMENT_SCRIPTS=true`.
- The Express-chat widget (original footer, so original pages only) loads only with
  `NEXT_PUBLIC_ENABLE_CHAT=true`.
- The redesign adds no tracking code of its own.

## Before switching tracking on for the live domain

1. **Export the GTM container** (`GTM-K6W989PP`) and review every trigger. Triggers that use CSS
   selectors, element IDs, button text or form IDs from the old pages will not match the redesigned
   markup. URL-based triggers (`/apply-passport`, `/payment-response?status=success`) keep working.
2. **Apply flow events.** If GTM or Ads use `otp_verified_auto`, add the same push in
   `components/redesign/apply/steps/VerifyStep.tsx` where verification succeeds — only when
   `applicationAdapter.demo` is false.
3. **Page views on client-side navigation.** The Pixel's `PageView` fires on full page loads only
   (same as the original site). GA4 enhanced measurement tracks history changes by itself. Decide
   whether the Pixel needs a route-change `PageView`; do not add one alongside a GTM tag that
   already sends it.
4. **Chat widget.** Express-chat is part of the original footer, so it appears on original pages only.
   If it is wanted site-wide, mount it once in `app/layout.tsx` and remove the redesign's desktop
   "Talk to an expert" button so only one floating element shows.
5. Verify in GTM Preview, GA4 DebugView and Meta Events Manager (Test events) on staging, with
   tracking enabled only there and pointed at test properties where possible.
