/**
 * First-visit brand intro (components/redesign/layout/BrandIntro.tsx).
 * The script runs before first paint: on the first page of a session (and unless the
 * visitor prefers reduced motion) it marks <html> so content is held back and the
 * background stays navy instead of flashing white. A failsafe removes the marks after 4 s.
 */
export const INTRO_STYLE = 'html.intro-pending, html.intro-pending body { background: #062b4f; }';

/**
 * The only rules the redesign applies outside `.ps-site`: <html> and <body> sit above the
 * scoped stylesheet. Rendered by app/(site)/layout.tsx, so they apply only on redesigned
 * pages and are removed when the visitor moves to an original page.
 */
export const DOCUMENT_STYLE = 'html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; } body { margin: 0; }';

export const INTRO_SCRIPT = `(function () {
  var root = document.documentElement;
  try {
    if (!sessionStorage.getItem('ps:intro-seen') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('intro-active', 'intro-pending');
      setTimeout(function () { root.classList.remove('intro-active', 'intro-pending'); }, 4000);
    }
  } catch (e) {}
})();`;
