import FacebookPixel from '@/components/FacebookPixel';
import GoogleTagManager from '@/components/GoogleTagManager';

/**
 * The original application's tracking (GA4, Google Ads, GTM, Meta Pixel), mounted once
 * in the root layout so no page loads it twice.
 *
 * OFF unless NEXT_PUBLIC_ENABLE_TRACKING=true. Preview and staging deployments must keep
 * it off: demo form data and test journeys must never reach analytics or ad accounts.
 * The Meta Pixel id is loaded from the backend (/fb-pixel), so it also needs
 * NEXT_PUBLIC_API_BASE_URL. See docs/TRACKING_INTEGRATION.md.
 */
export function Tracking() {
  if (process.env.NEXT_PUBLIC_ENABLE_TRACKING !== 'true') return null;
  return (
    <>
      {process.env.NEXT_PUBLIC_API_BASE_URL ? <FacebookPixel /> : null}
      <GoogleTagManager />
    </>
  );
}
