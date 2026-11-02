// Builds styles/redesign.css — the redesign's complete stylesheet, scoped to `.ps-site`.
//
// Sources (edit these, never the output):
//   styles/redesign/tokens.css   design tokens (copied from the approved React/Vite site)
//   styles/redesign/globals.css  base, components and animations (same origin)
//   tools/tailwind.redesign.config.cjs
//
// Steps: tokens → `.ps-site` custom properties · Tailwind preflight → scoped reset ·
// globals → scoped rules · Tailwind utilities with `important: '.ps-site'` ·
// every @keyframes renamed `ps-*` (the original app defines `pulse`, `float`, `shimmer`…) ·
// the build fails if any selector could reach outside `.ps-site`.
//
// Run: npm run build:css   (also runs automatically before `dev` and `build`)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const S = '.ps-site';
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

/** Scope one selector to the redesign; returns null to drop it. */
function scopeSelector(raw) {
  const sel = raw.trim();
  if (/^\.no-js\b/.test(sel) || /^\.intro-pending\b/.test(sel)) return null; // handled inline in app/(site)/layout.tsx
  if (/^(html|:root|:host|body)$/.test(sel)) return S;
  if (/^(html|body)\b/.test(sel)) return S + sel.replace(/^(html|body)/, '');
  // <html class="intro-active"> is set by the intro script before first paint
  if (/^\.intro-active\b/.test(sel)) return `.intro-active ${S}` + sel.slice('.intro-active'.length);
  if (sel === '*') return `${S}, ${S} *`;
  return `${S} ${sel}`;
}
function scopeRule(rule) {
  if (rule.parent?.type === 'atrule' && /keyframes/.test(rule.parent.name)) return;
  const out = rule.selectors.map(scopeSelector).filter(Boolean);
  if (!out.length) rule.remove();
  else rule.selectors = out.flatMap((s) => s.split(', '));
}

// tokens.css → custom properties on .ps-site (not :root, so nothing global is defined)
const tokens = postcss.parse(read('styles/redesign/tokens.css'));
tokens.walkRules((r) => {
  if (r.selector.trim() === ':root') r.selector = S;
});

// Tailwind preflight → scoped reset
const preflight = postcss.parse(fs.readFileSync(require.resolve('tailwindcss/src/css/preflight.css'), 'utf8'));
preflight.walkRules(scopeRule);

// globals.css → scoped base / components / animations
const globals = postcss.parse(read('styles/redesign/globals.css'));
globals.walkAtRules('import', (a) => a.remove());
globals.walkAtRules('tailwind', (a) => a.remove());
globals.walkRules((r) => {
  if (r.parent?.type === 'atrule' && /keyframes/.test(r.parent.name)) return;
  if (r.selector.trim() === 'html') {
    // scroll-padding on <html> → scroll-margin on anchored sections
    r.replaceWith(postcss.rule({ selector: `${S} [id]`, nodes: [postcss.decl({ prop: 'scroll-margin-top', value: 'calc(var(--header-h) + 16px)' })] }));
    return;
  }
  scopeRule(r);
});

/*
 * Defence against the original application's global CSS. Its stylesheet can remain loaded
 * after a client-side navigation from an original page; these rules restore browser
 * defaults the redesign relies on (specificity 0-1-1, before the redesign's own rules).
 */
const DEFENCE = `
${S} { letter-spacing: normal; word-spacing: normal; text-transform: none; text-indent: 0; text-align: start; text-shadow: none; font-style: normal; font-variant: normal; white-space: normal; visibility: visible; }
${S} :is(div, span, p, a, ul, ol, li, dl, dt, dd, section, header, footer, nav, main, article, aside, figure, figcaption, blockquote, label, time, address, table, tr, td, picture, h1, h2, h3, h4, h5, h6) { font-family: inherit; font-size: inherit; line-height: inherit; letter-spacing: inherit; color: inherit; text-transform: inherit; text-align: inherit; font-style: inherit; }
${S} :is(div, span, p, a, ul, ol, li, dl, dt, dd, section, header, footer, nav, main, article, aside, figure, figcaption, label, time, address, picture) { font-weight: inherit; }
${S} :is(button, input, select, textarea) { min-width: auto; min-height: auto; letter-spacing: inherit; }
`;

const FONTS = `
/* Plus Jakarta Sans — same files as the approved website (SIL OFL 1.1, public/assets/fonts/OFL.txt).
   A redesign-specific family name avoids clashing with the original application's Inter. */
@font-face { font-family: 'PS Plus Jakarta Sans'; font-style: normal; font-weight: 200 800; font-display: swap;
  src: url('/assets/fonts/plus-jakarta-sans-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'PS Plus Jakarta Sans'; font-style: normal; font-weight: 200 800; font-display: swap;
  src: url('/assets/fonts/plus-jakarta-sans-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
`;

const source = [
  FONTS,
  tokens.toString(),
  '@tailwind base;\n@tailwind components;\n@tailwind utilities;',
  `@layer base {\n${DEFENCE}\n${preflight.toString()}\n}`,
  globals.toString(),
].join('\n');

/** Rename every keyframe to ps-* and verify scoping. */
const finalise = () => ({
  postcssPlugin: 'ps-site-finalise',
  OnceExit(css) {
    const names = new Set();
    css.walkAtRules(/keyframes$/, (a) => names.add(a.params.trim()));
    const re = new RegExp(`(^|[\\s,])(${[...names].map((n) => n.replace(/[-]/g, '\\-')).join('|')})(?=$|[\\s,;])`, 'g');
    css.walkAtRules(/keyframes$/, (a) => {
      a.params = `ps-${a.params.trim()}`;
    });
    css.walkDecls(/^(-webkit-)?animation(-name)?$/, (d) => {
      d.value = d.value.replace(re, (m, pre, name) => `${pre}ps-${name}`);
    });

    const offenders = [];
    css.walkRules((rule) => {
      if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
      rule.selectors = rule.selectors
        .map((s) => {
          const t = s.trim();
          if (t === '*') return `${S}, ${S} *`;
          if (t === '::before' || t === '::after' || t === '::backdrop') return `${S} ${t}`;
          return t;
        })
        .flatMap((s) => s.split(', '));
      for (const s of rule.selectors) {
        const n = s.replace(/^:is\(\s*/, '');
        if (!(n.startsWith(S) || n.startsWith(`.intro-active ${S}`))) offenders.push(s);
      }
    });
    if (offenders.length) throw new Error('Unscoped selectors:\n' + [...new Set(offenders)].join('\n'));
  },
});
finalise.postcss = true;

const from = path.join(root, 'styles/redesign/globals.css');
const to = path.join(root, 'styles/redesign.css');
const result = await postcss([tailwindcss(require('./tailwind.redesign.config.cjs')), autoprefixer(), finalise()]).process(source, { from, to });
const banner = '/* Passport Suvidha redesign — compiled, scoped to .ps-site. Do not edit: see tools/build-redesign-css.mjs. */\n';
fs.writeFileSync(to, banner + result.css);
let rules = 0;
postcss.parse(result.css).walkRules(() => rules++);
console.log(`styles/redesign.css: ${(result.css.length / 1024).toFixed(1)} KB, ${rules} rules, all scoped to ${S}`);
