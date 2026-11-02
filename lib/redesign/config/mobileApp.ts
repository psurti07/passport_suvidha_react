/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MOBILE APP ANNOUNCEMENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  visible   → show / hide the homepage announcement section.
 *  status    → 'coming-soon': store indicators are informational only (not links).
 *              'live': a store button becomes an active link — but only if its
 *              URL below is filled in. A store without a URL stays "coming soon".
 *  *Url      → the official store listing URLs once the app is published.
 *              Never put placeholder or guessed URLs here.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type MobileAppStatus = 'coming-soon' | 'live';

export const MOBILE_APP: {
  visible: boolean;
  status: MobileAppStatus;
  googlePlayUrl: string;
  appStoreUrl: string;
} = {
  visible: true,
  status: 'coming-soon',
  googlePlayUrl: '',
  appStoreUrl: '',
};

/** True when a store button should be an active download link. */
export function isStoreLive(url: string): boolean {
  return MOBILE_APP.status === 'live' && /^https:\/\//.test(url);
}
