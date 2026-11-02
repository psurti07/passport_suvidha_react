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

A default build is the frontend demo: Apply Now on the demo adapter, all pages `noindex`, tracking and chat off.
**It must not replace the live site.** Going live needs the "Going live" block in `.env.example`, plus the
original application's values. `NEXT_PUBLIC_*` values are fixed at build time, so they must be present when building.

## Apply Now

`/apply-passport` renders the approved 5-step flow. The original form is no longer routed.
A production build never simulates: it uses the backend, or refuses each step when none is set.
`docs/APPLY_NOW_DEVELOPER_HANDOVER.md` lists what the client's developer has to connect before release.

## Staging checks before production

Run on a staging deployment, with the real backend and gateway test mode:

1. Sign-in and portal, application status, fee calculator, offer pages and their payment responses.
2. `/apply-passport`: OTP, all steps, edits from Review & Pay, resume link, payment success and failure, conversion event only after a verified payment.
3. Contact form delivery (`/contact/enquiry`) and location search (`/locations`).
4. GTM, GA4, Google Ads and Meta Pixel each fire once. Live chat loads.

## Rollback

The previous code is on branch `backup/pre-redesign-2026-11-02` (`09ffc780c41246fe44d5ec00fd47654150c8e47f`).
Revert the integration commit on `main` and redeploy. Keep a copy of the server's current build before deploying.
