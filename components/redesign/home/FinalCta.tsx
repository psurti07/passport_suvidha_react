import { ArrowRight, Mail, Phone } from 'lucide-react-redesign';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';
import { site } from '@/lib/redesign/data/site';
import { Button } from '@/components/redesign/common/Button';
import { Guilloche } from '@/components/redesign/common/Guilloche';
import { Reveal } from '@/components/redesign/common/Reveal';

export function FinalCta() {
  return (
    <section id={HOME_SECTIONS.apply} aria-labelledby="cta-title" className="bg-white pb-14 lg:pb-20">
      <div className="container-wide">
        <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-navy-700 px-6 py-12 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
          <Guilloche size={760} className="absolute -right-48 top-1/2 -z-10 -translate-y-1/2 text-gold-400/[0.18]" strokeWidth={0.7} />
          {/* passport silhouette, echoing the logo */}
          <div aria-hidden className="absolute -bottom-16 right-[8%] -z-10 hidden h-72 w-52 rotate-[8deg] lg:block">
            <div className="absolute inset-0 -translate-y-3 translate-x-3 rounded-[24px] bg-gold-400" />
            <div className="absolute inset-0 rounded-[24px] bg-navy-800 ring-1 ring-white/10" />
          </div>

          <div className="max-w-2xl">
            <span aria-hidden className="mb-5 block h-[3px] w-12 rounded-full bg-gold-400" />
            <h2 id="cta-title" className="text-h1 text-white">
              Ready to start your passport application?
            </h2>
            <p className="mt-4 text-body-lg text-navy-100">
              Tell us a few details and our team will guide you through the rest — documents, form and appointment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {HOMEPAGE_PREVIEW_MODE ? (
                // Preview: the online application flow isn't live, so offer the real channels
                <>
                  <Button href={site.phone.href} size="lg" iconLeft={<Phone className="h-5 w-5" />}>
                    Call {site.phone.display}
                  </Button>
                  <Button href={site.email.href} size="lg" variant="outline-light" iconLeft={<Mail className="h-5 w-5" />}>
                    Email our team
                  </Button>
                </>
              ) : (
                <>
                  <Button to="/apply-passport" size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>
                    Apply Now
                  </Button>
                  <Button href={site.phone.href} size="lg" variant="outline-light" iconLeft={<Phone className="h-5 w-5" />}>
                    {site.phone.display}
                  </Button>
                </>
              )}
            </div>
            <p className="mt-6 text-small text-navy-200">
              Consultancy fee only. Government passport fees are paid separately on the official portal.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
