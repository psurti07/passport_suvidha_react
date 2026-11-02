# Production rollout

## How this repository reaches the live site

- `.github/workflows/deploy.yml` runs on every push to `main` and targets a VPS at `/var/www/nextjs-site`.
  It has failed at the "Copy files to VPS via SCP" step on at least its last 100 runs, so it does not deploy.
- The live site answers from LiteSpeed, and `.htaccess` configures CloudLinux Passenger at
  `/home/passport/passport_app`. Production was therefore probably updated by hand on that server.
  The person who runs that deployment must confirm this.
- If the workflow's server credentials are ever repaired, a push to `main` will deploy. Its build step has
  no `NEXT_PUBLIC_API_BASE_URL`, and it does not copy `package-lock.json` or `.env.production`. Fix both first.

## Environment

`.env.production` supplies the public production flags. The live server must still provide
`NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_FRONTEND_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`,
`NEXT_PUBLIC_RAZORPAY_KEY` and `NEXT_PUBLIC_CASHFREE_MODE`. `NEXT_PUBLIC_*` values are fixed at build time, so
build on the server or with these values present. Staging must override the flags: see `.env.example`.

## Apply Now

| URL | What runs | Live site |
|---|---|---|
| `/apply-passport` | Original form, unchanged: real OTP, Razorpay, conversion events | Yes |
| `/apply-new` | Approved new design, not connected to the backend | 404 unless `NEXT_PUBLIC_ENABLE_REDESIGN_APPLY=true` |

Before the new flow replaces the original (see BACKEND_INTEGRATION.md): connect and test OTP, submission,
basic-details update, fees, payment success, failure and callback, and conversion events. Then move the route to
`/apply-passport`, and remove the original one.

## Staging checks before production

Run on a staging deployment, with the real backend and gateway test mode:

1. Sign-in and portal, application status, fee calculator, offer pages and their payment responses.
2. `/apply-passport`: OTP, all steps, payment success and failure, conversion event only after a verified payment.
3. Contact form delivery (`/contact/enquiry`) and location search (`/locations`).
4. GTM, GA4, Google Ads and Meta Pixel each fire once. Live chat loads.

## Rollback

The previous code is on branch `backup/pre-redesign-2026-11-02` (`09ffc780c41246fe44d5ec00fd47654150c8e47f`).
Revert the integration commit on `main` and redeploy. Keep a copy of the server's current build before deploying.
