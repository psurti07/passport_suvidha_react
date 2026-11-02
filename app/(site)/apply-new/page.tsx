import { notFound } from 'next/navigation';
import ApplyPage from '@/components/redesign/pages/ApplyPage';

export const metadata = {
  title: 'Apply for Passport Assistance | Passport Suvidha',
  robots: { index: false, follow: false },
};

// Reads query parameters during server rendering, so the full page is in the HTML
// instead of a client-side placeholder.
export const dynamic = 'force-dynamic';

/**
 * The approved Apply Now design, not connected to the backend yet. Live visitors use the
 * original flow at /apply-passport. This route is a 404 unless the build sets
 * NEXT_PUBLIC_ENABLE_REDESIGN_APPLY=true (staging only). See docs/PRODUCTION_ROLLOUT.md.
 */
export default function Page() {
  if (process.env.NEXT_PUBLIC_ENABLE_REDESIGN_APPLY !== 'true') notFound();
  return <ApplyPage />;
}
