import { BLOG_ENABLED } from '@/lib/redesign/config/content';
import { Hero } from '@/components/redesign/home/Hero';
import { DisclosureStrip } from '@/components/redesign/home/DisclosureStrip';
import { TrustBar } from '@/components/redesign/home/TrustBar';
import { ServicesPreview } from '@/components/redesign/home/ServicesPreview';
import { HowItWorks } from '@/components/redesign/home/HowItWorks';
import { WhyChooseUs } from '@/components/redesign/home/WhyChooseUs';
import { TestimonialsSection } from '@/components/redesign/home/TestimonialsSection';
import { VideoReviews } from '@/components/redesign/home/VideoReviews';
import { StatsBand } from '@/components/redesign/home/StatsBand';
import { AppAnnouncement } from '@/components/redesign/home/AppAnnouncement';
import { LatestBlogs } from '@/components/redesign/home/LatestBlogs';
import { FaqPreview } from '@/components/redesign/home/FaqPreview';
import { FinalCta } from '@/components/redesign/home/FinalCta';
import { RequirementsPreview } from '@/components/redesign/home/RequirementsPreview';
import { ContactLocations } from '@/components/redesign/home/ContactLocations';


export function HomePage() {

  return (
    <>
      <Hero />
      <DisclosureStrip />
      <TrustBar />
      <ServicesPreview />
      <HowItWorks />
      <RequirementsPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <VideoReviews />
      <StatsBand />
      <AppAnnouncement />
      {BLOG_ENABLED && <LatestBlogs />}
      <FaqPreview />
      <FinalCta />
      <ContactLocations />
    </>
  );
}
