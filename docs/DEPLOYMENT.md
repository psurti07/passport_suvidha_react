# Deployment guide

This project has **no remote and no deployment pipeline**. The original repository's GitHub Actions
workflow (push to `main` → SCP to the client VPS → `pm2 restart`) is kept for reference only in
`docs/client-reference/deploy.yml.disabled`; it must not be re-enabled in any repository other than
the client's own.

## Environments

| Setting | Preview / staging | Production (client) |
|---|---|---|
| `NEXT_PUBLIC_SITE_ENV` | unset | `production` |
| `NEXT_PUBLIC_SITE_URL` | preview URL or unset | `https://passportsuvidha.com` |
| `NEXT_PUBLIC_API_BASE_URL` | unset (demo mode) — or a **staging** API | production API |
| `NEXT_PUBLIC_USE_MOCKS` | `true` | `false` |
| `NEXT_PUBLIC_ENABLE_TRACKING` | `false` | `true` (after the GTM review) |
| `NEXT_PUBLIC_ENABLE_CHAT` | `false` | `true` |
| `NEXT_PUBLIC_ENABLE_PAYMENT_SCRIPTS` | `false` | `true` |
| `NEXT_PUBLIC_RAZORPAY_KEY` | unset (or test key on staging) | live key id |

With `NEXT_PUBLIC_SITE_ENV` unset every page is `noindex`, responses carry `X-Robots-Tag: noindex`
and `robots.txt` blocks all crawlers.

## Hosting

The app needs a Node.js server (dynamic routes, route handlers, middleware) — it is not a static
export.

```bash
npm ci
npm run build
npm start            # or: node server.js   (PORT env var, default 3000)
```

The original production setup (from the disabled workflow and `.htaccess`): Node 18–20,
`.next`, `public`, `package.json`, `next.config.mjs` copied to the server, `npm ci --omit=dev`,
`pm2`/Passenger running `server.js`. The redesign adds `styles/redesign.css` (compiled into `.next`
at build time) and `public/assets/**` (≈23 MB, of which 21 MB are the four reels).

## Suggested rollout

1. **Preview** (independent domain, demo mode, no tracking) — design and content review.
2. **Staging** with the staging API and Razorpay test keys — connect the Apply flow
   (docs/BACKEND_INTEGRATION.md), test OTP and payments end to end.
3. **Tracking review** on staging with test properties (docs/TRACKING_INTEGRATION.md).
4. **Production** through the client's own repository and pipeline, with a rollback to the current
   release kept ready. `/apply-passport` receives ad traffic: release it only after step 2 passes.
