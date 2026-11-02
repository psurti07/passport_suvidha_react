# Homepage photography

Stock photographs used on the homepage. **Client customer photos are used only in the
testimonials section** (`public/assets/testimonials/images/`), never here.

All files are referenced from `src/data/home.ts`. Replace a file with the same name
and dimensions to swap an image — no code changes needed.

| File | Size | Used in | Source | Licence |
|---|---|---|---|---|
| `hero-desktop.webp` / `hero-mobile.webp` | 1983×793 / 887×1774 | Hero background (desktop ≥768px / mobile ≤767px via `<picture>`) | Project hero artwork | Project asset |
| `passport-document-assistance.webp` | 1280×1600 | "Why Passport Suvidha" | Applicant writing in documents at a desk, India — https://www.pexels.com/photo/9663015/ | Pexels License |

Blog card images (`public/assets/images/blog/`, 1200×800, referenced from `src/data/blogs.mock.ts`):

| File | Source | Licence |
|---|---|---|
| `preparing-first-application.webp` | https://www.pexels.com/photo/7580649/ | Pexels License |
| `organising-documents.webp` | https://www.pexels.com/photo/8441787/ | Pexels License |
| `normal-or-tatkal.webp` | Mumbai CSMIA Terminal 2 — https://unsplash.com/photos/g37QvCex26Q | Unsplash License |

All images were checked at 100% zoom for sharpness before export. The **Pexels License**
(https://www.pexels.com/license/) likewise allows free commercial use without attribution;
it does not allow selling unaltered copies or implying endorsement by the people shown.

**Unsplash License** (https://unsplash.com/license): free for commercial and non-commercial
use, no permission or attribution required (credit appreciated). It does not allow
compiling the photos into a competing stock service or selling unaltered copies.

## Why not Shutterstock?
Shutterstock images require a paid licence per image from a Shutterstock account.
Unlicensed or watermarked Shutterstock previews must not be used. If the client buys
Shutterstock images, export them to WebP at the sizes above and replace these files.

## Rules for any replacement image
- **Indian** passports only — no foreign passports.
- No readable passport numbers, names, MRZ lines or other personal data.
- No identifiable people presented as Passport Suvidha staff unless they are.
- Sharp at 100% zoom; do not upscale smaller images. Export WebP at quality ~80.
