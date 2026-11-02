/*
 * Tailwind configuration for the redesign stylesheet only (styles/redesign.css).
 * Same theme as the approved React/Vite website. It is separate from the original
 * application's tailwind.config.js, whose `navy`, `gold` and shadcn colours differ.
 */
const path = require('node:path');

/** Colours are "R G B" CSS variables from styles/redesign/tokens.css. */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
const root = path.join(__dirname, '..');

module.exports = {
  content: [
    path.join(root, 'components/redesign/**/*.{ts,tsx}'),
    path.join(root, 'lib/redesign/**/*.{ts,tsx}'),
    path.join(root, 'app/(site)/**/*.{ts,tsx}'),
    path.join(root, 'app/not-found.tsx'),
  ],
  // Every utility is generated as `.ps-site <utility>`: it cannot reach the original application.
  important: '.ps-site',
  // Tailwind's global reset is replaced by a copy scoped to .ps-site (tools/build-redesign-css.mjs).
  corePlugins: { preflight: false, container: false },
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        navy: {
          50: v('navy-50'),
          100: v('navy-100'),
          200: v('navy-200'),
          300: v('navy-300'),
          500: v('navy-500'),
          700: v('navy-700'),
          800: v('navy-800'),
          900: v('navy-900'),
          950: v('navy-950'),
        },
        gold: { 100: v('gold-100'), 400: v('gold-400'), 500: v('gold-500'), 700: v('gold-700') },
        sky: { 500: v('sky-500') },
        paper: { DEFAULT: v('paper'), alt: v('paper-alt'), warm: v('parchment') },
        ink: { 900: v('ink-900'), 700: v('ink-700'), 500: v('ink-500'), 400: v('ink-400') },
        line: { 200: v('line-200'), 300: v('line-300') },
        success: v('success'),
        warning: v('warning'),
        danger: v('danger'),
      },
      fontFamily: {
        sans: ['"PS Plus Jakarta Sans"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.25rem, 1.55rem + 2.4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.028em', fontWeight: '700' }],
        h1: ['clamp(1.875rem, 1.45rem + 1.5vw, 2.625rem)', { lineHeight: '1.14', letterSpacing: '-0.022em', fontWeight: '700' }],
        h2: ['clamp(1.625rem, 1.35rem + 1vw, 2.25rem)', { lineHeight: '1.18', letterSpacing: '-0.02em', fontWeight: '700' }],
        h3: ['clamp(1.125rem, 1.07rem + 0.25vw, 1.25rem)', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
        body: ['1rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.45' }],
        eyebrow: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.12em', fontWeight: '600' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        focus: 'var(--shadow-focus)',
      },
      maxWidth: { content: 'var(--container-content)', wide: 'var(--container-wide)', article: 'var(--container-article)' },
      transitionTimingFunction: { brand: 'var(--ease-out)', cinematic: 'var(--ease-cinematic)' },
      transitionDuration: { fast: 'var(--dur-fast)', base: 'var(--dur-base)', slow: 'var(--dur-slow)' },
    },
  },
  plugins: [],
};
