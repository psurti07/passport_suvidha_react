import { USE_MOCKS } from '@/lib/redesign/services/apiClient';

/**
 * Apply Now journey — step order and behaviour.
 *
 * The steps mirror the current Passport Suvidha application flow:
 * basic details → mobile verification → family details → personal details →
 * review & payment.
 *
 * APPLY_DEMO_MODE — true on non-production deployments while no backend is connected
 * (NEXT_PUBLIC_USE_MOCKS / no NEXT_PUBLIC_API_BASE_URL). The journey then runs on a local
 * simulation: no OTP is sent and nothing leaves the browser. It is never real identity
 * verification. The page carries no demo banners; a small test-environment indicator
 * (components/redesign/apply/TestModeIndicator.tsx) gives the test codes instead.
 *
 * With NEXT_PUBLIC_SITE_ENV=production the simulation can never run: without a backend
 * the flow reports that online applications are unavailable (see applicationService.ts).
 */
export const APPLY_PRODUCTION = process.env.NEXT_PUBLIC_SITE_ENV === 'production';
export const APPLY_DEMO_MODE = USE_MOCKS && !APPLY_PRODUCTION;

export const APPLY_STEPS = [
  { id: 'basic', label: 'Basic details', short: 'Basic' },
  { id: 'verify', label: 'Verify mobile', short: 'Verify' },
  { id: 'family', label: 'Family details', short: 'Family' },
  { id: 'personal', label: 'Personal details', short: 'Personal' },
  { id: 'review', label: 'Review & pay', short: 'Pay' },
] as const;

export type ApplyStepId = (typeof APPLY_STEPS)[number]['id'];

export const OTP_CONFIG = {
  length: 4,
  /** Seconds before "Resend code" becomes available (120 on the current site; shorter in demo mode). */
  resendAfterSeconds: APPLY_DEMO_MODE ? 30 : 120,
} as const;

/**
 * Demo-mode test codes. Documented in INTEGRATION_GUIDE.md; only used by the
 * demo adapter, never by the HTTP adapter.
 */
export const DEMO_OTP = {
  valid: '1234',
  expired: '0000',
} as const;
