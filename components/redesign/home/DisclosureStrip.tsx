import { Info } from 'lucide-react-redesign';
import { complianceNotice } from '@/lib/redesign/data/site';

/**
 * Private-consultancy disclosure, directly below the homepage hero.
 * A transparency notice rather than a warning: light blue, navy text, no alert role.
 * The detailed disclaimer stays in the Important Notice popup, the footer and the FAQ.
 */
export function DisclosureStrip() {
  return (
    <aside aria-label="Disclosure" className="border-b border-navy-100 bg-navy-50/70">
      <div className="container-wide flex items-start gap-2.5 py-3 sm:items-center sm:justify-center sm:gap-3">
        <span aria-hidden className="mt-px grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-navy-700 ring-1 ring-inset ring-navy-100 sm:mt-0">
          <Info className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <p className="text-[0.8125rem] font-medium leading-snug text-navy-800 sm:text-[0.875rem]">{complianceNotice.homeStrip}</p>
      </div>
    </aside>
  );
}
