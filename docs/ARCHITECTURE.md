# Architecture

## Two route groups, one application

```
app/layout.tsx              <html>/<body> + tracking (once, off unless enabled). No styles.
├── app/(site)/layout.tsx   redesign: styles/redesign.css, <div class="ps-site">, redesign header/footer
│   └── 14 redesigned routes (thin page.tsx: metadata + JSON-LD + page component)
├── app/(legacy)/layout.tsx original: globals.css, Inter font, toaster, original metadata
│   ├── template.tsx        original navbar/footer logic, unchanged
│   ├── loading.tsx         original (also the Suspense boundary those pages rely on)
│   └── original routes     sign-in, portal, payment response, legal, offers, status, fee calculator
├── app/api/**              original route handlers (unchanged)
├── app/not-found.tsx       404 in the redesign layout
└── app/sitemap.ts, robots.ts
```

Route groups do not appear in URLs, so every path is the same as before.

## Styles never mix

- **Redesign** — `styles/redesign.css` is compiled by `tools/build-redesign-css.mjs` from the approved
  design tokens and base styles (`styles/redesign/`) with its own Tailwind config
  (`tools/tailwind.redesign.config.cjs`):
  - every selector is under `.ps-site` (utilities via Tailwind's `important: '.ps-site'`, base and
    component styles rewritten); the build **fails** if any rule could reach outside;
  - design tokens are custom properties on `.ps-site`, not `:root`;
  - Tailwind's reset is a scoped copy; a small defence layer restores browser defaults inside
    `.ps-site` in case the original stylesheet is still loaded after a client-side navigation;
  - every `@keyframes` is renamed `ps-*` (the original app defines `pulse`, `float`, `shimmer`…);
  - the font is registered as `PS Plus Jakarta Sans` from `public/assets/fonts` (same files as the
    approved site), so the original pages keep Inter;
  - only two rules sit outside `.ps-site`: `body { margin: 0 }` and text-size-adjust on `<html>`,
    rendered inside the redesign layout so they disappear on original pages.
- **Original** — `app/(legacy)/globals.css` and `tailwind.config.js` are unchanged and load only with
  the original pages. Their `navy`/`gold` colours (single values) and shadcn tokens do not reach the
  redesign, whose `navy-50…950` / `gold-*` scales come from its own config.
- Links from the redesign to original pages are plain `<a>` (full page load, `lib/redesign/routes.ts`).

## Router adapter

The redesign was written for React Router. `lib/redesign/router.tsx` implements the parts it uses
(`Link`, `NavLink`, `useLocation`, `useNavigate`, `useSearchParams`, `useParams`) on top of
`next/link` and `next/navigation`, so the component code is unchanged apart from import paths.
It also decides per link whether to navigate client-side (redesign route) or with a full load.

## Rendering

| Route | Mode | Why |
|---|---|---|
| `/`, `/about`, `/services`, `/locations`, `/contact`, `/disclaimer`, `/site-map` | Static | No request data |
| `/services/[slug]` | Static, 3 pages pre-rendered (`dynamicParams = false`) | |
| `/requirements`, `/faq`, `/testimonials`, `/blogs`, `/apply-passport` | Dynamic | Read query parameters on the server so the full page is in the HTML (a static page would render a placeholder for these parts) |
| `/blogs/[slug]` | Dynamic | Article loaded through the blog service |

Pages are server components that render the page's client components; `'use client'` is set per
component (62 interactive components), not at the root. Purely presentational components
(26, e.g. most homepage sections) carry no directive.

Browser-only APIs are used only in effects and event handlers. Two places needed changes to avoid
hydration mismatches: the brand intro decides whether to play after mounting (the inline script in
the redesign layout holds content back before first paint, as on the Vite site), and
`usePrefersReducedMotion` starts as `false` on the server and first client render.

## SEO

`lib/redesign/seo.tsx` builds Next.js `Metadata` (title, description, canonical, Open Graph, Twitter,
robots) and server-rendered JSON-LD (breadcrumbs, FAQPage, Service, ItemList, ProfessionalService).
The Vite site set these in the browser; they are now in the initial HTML.

Non-production deployments are never indexable: `NEXT_PUBLIC_SITE_ENV` ≠ `production` gives
`noindex` metadata on every page, an `X-Robots-Tag: noindex` header and a blocking `robots.txt`.

## Integration points

- `lib/redesign/services/applicationService.ts` — Apply Now (demo and HTTP adapters)
- `lib/redesign/services/formsService.ts` — contact enquiry, location search
- `lib/redesign/services/blogService.ts` — blog (none yet)
- `components/tracking/Tracking.tsx` — tracking mount point

## Overlays

Menus, dialogs, search and the video player render into `#ps-portal` (inside `.ps-site`) rather than
`<body>`, so the scoped styles apply to them. The Important Notice makes `#ps-app` inert while open.

## Icons

The redesign uses `lucide-react@0.468.0` (the approved design's version), installed under the alias
`lucide-react-redesign`; the original pages keep `lucide-react@0.454.0`.
