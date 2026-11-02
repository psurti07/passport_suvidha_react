/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IMPORTANT NOTICE (disclaimer popup) — wording and fees supplied by the client.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Shown once per browser session, `delayMs` after the page has loaded (and after
 *  the brand intro has finished on a first visit). Acknowledgement is stored in
 *  sessionStorage, so it shows again in a new session.
 *
 *  Do not edit the legal wording or amounts without the client's written approval.
 *
 *  GOVERNMENT FEE VERIFICATION
 *  The government fee figures match news reports of the revised passport fees
 *  effective 1 July 2026 (MEA notification). They have NOT yet been confirmed
 *  against the official Passport Seva fee schedule (https://www.passportindia.gov.in/).
 *  Set `governmentFeesVerified` to true only after that check.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const DISCLAIMER_NOTICE = {
  enabled: true,
  /** Delay after page load before the notice opens (ms). */
  delayMs: 2500,
  /** sessionStorage key for the acknowledgement. */
  storageKey: 'ps:notice-ack',
  governmentFeesVerified: false,
  consultancyFee: '₹999',
  governmentFees: [
    { service: 'Normal Passport – 36 Pages', amount: '₹2,500' },
    { service: 'Normal Passport – 60 Pages', amount: '₹3,500' },
    { service: 'Tatkal Passport – 36 Pages', amount: '₹5,000' },
    { service: 'Tatkal Passport – 60 Pages', amount: '₹6,000' },
  ],
} as const;
