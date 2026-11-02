import type { Service } from '@/lib/redesign/types/service';
import type { FaqItem } from '@/lib/redesign/types/faq';

/**
 * Services offered on the current site. Copy is adapted from passportsuvidha.com
 * (Services, Locations and Apply pages) and the Disclaimer.
 *
 * Consultancy fees and processing timelines are intentionally NOT stated —
 * the live pricing renders "₹NaN" and timelines are set by the government.
 * Add them once the client confirms.
 */

/** What our assistance covers — wording follows the Disclaimer's description of services. */
const assistanceBenefits = [
  {
    title: 'Document checklist guidance',
    text: 'Know exactly which proofs and photographs to prepare for your application type before you begin.',
  },
  {
    title: 'Form-filling assistance',
    text: 'We help you complete the application form accurately, based on the information you provide.',
  },
  {
    title: 'Appointment guidance',
    text: 'Support with understanding and scheduling your Passport Seva Kendra appointment.',
  },
  {
    title: 'Expert support',
    text: 'Reach our team by phone or email for questions at any step of the process.',
  },
];

const sharedFaqs: FaqItem[] = [
  {
    id: 'govt-fee',
    question: 'Does your fee include the government passport fee?',
    answer:
      'No. Our fee is for consultancy only. Government passport fees are separate and are paid directly on the official government website.',
  },
  {
    id: 'guarantee',
    question: 'Can you guarantee that my passport will be issued?',
    answer:
      'No. Approval, verification, issuance and delivery are decided and carried out solely by the passport authorities. We provide guidance and assistance with your application.',
  },
];

export const services: Service[] = [
  {
    slug: 'normal-passport',
    name: 'Normal Passport',
    tagline: 'Standard application',
    summary:
      'For applicants with a planned schedule. We guide you through the form, documents and appointment so nothing is missed.',
    facts: [
      { label: 'Booklet', value: '36 or 60 pages' },
      { label: 'Validity', value: '10 years (adults)' },
    ],
    icon: 'file-text',
    detail: {
      metaDescription:
        'Assistance with Normal passport applications — documents, form filling and appointment guidance. 36 or 60-page booklet.',
      overview: [
        'With regular processing time, a Normal passport is the best choice for those with a planned schedule.',
        'Our team helps you prepare the right documents, complete the application form accurately and understand your appointment — so your application is ready when you are.',
      ],
      bestFor: ['First-time applicants with no urgent travel', 'Planned holidays, study or work travel', 'Applicants who want a 36 or 60-page booklet'],
      benefits: assistanceBenefits,
      requirementSets: ['fresh', 'minor'],
      faqs: [
        {
          id: 'normal-vs-tatkal',
          question: 'How is a Normal passport different from Tatkal?',
          answer:
            'Normal applications follow standard processing with regular fees and suit planned travel. Tatkal is an expedited scheme with higher government fees for urgent requirements.',
        },
        ...sharedFaqs,
      ],
    },
  },
  {
    slug: 'tatkal-passport',
    name: 'Tatkal Passport',
    tagline: 'Urgent application',
    summary:
      'Need to travel abroad urgently? Get focused assistance preparing your application under the Tatkal scheme.',
    facts: [
      { label: 'Booklet', value: '36 or 60 pages' },
      { label: 'Validity', value: '10 years (adults)' },
    ],
    isUrgent: true,
    icon: 'zap',
    detail: {
      metaDescription:
        'Assistance with Tatkal (urgent) passport applications — documents, form filling and appointment guidance.',
      overview: [
        'Need to travel abroad urgently? The Tatkal scheme offers expedited processing, with higher government fees, for urgent passport requirements.',
        'Because time matters, getting the documents and form right the first time is essential. Our team helps you prepare a complete application and guides you through your appointment.',
      ],
      bestFor: ['Urgent international travel', 'Applicants who need their application prepared quickly', 'Fresh applications and reissues under the Tatkal scheme'],
      benefits: assistanceBenefits,
      requirementSets: ['fresh', 'reissue'],
      faqs: [
        {
          id: 'tatkal-fees',
          question: 'Are Tatkal government fees higher?',
          answer:
            'Yes — the Tatkal scheme carries higher government fees than Normal processing. Government fees are paid separately on the official portal.',
        },
        ...sharedFaqs,
      ],
    },
  },
  {
    slug: 'reissue-passport',
    name: 'Reissue Passport',
    tagline: 'Renew or update',
    summary:
      'Renew an expiring passport or update your details, with assistance under either the Normal or Tatkal scheme.',
    facts: [
      { label: 'Booklet', value: '36 or 60 pages' },
      { label: 'Scheme', value: 'Normal or Tatkal' },
    ],
    icon: 'refresh',
    detail: {
      metaDescription:
        'Assistance with passport reissue and renewal — documents, form filling and appointment guidance under Normal or Tatkal.',
      overview: [
        'Renew your passport or update your details with ease. A reissue can be applied for under either the Normal or the Tatkal scheme.',
        'We help you gather the required documents — including your original passport — complete the form and prepare for your appointment.',
      ],
      bestFor: ['Passports that are expiring or have expired', 'Updating personal details', 'Applicants who need a new 36 or 60-page booklet'],
      benefits: assistanceBenefits,
      requirementSets: ['reissue'],
      faqs: [
        {
          id: 'reissue-scheme',
          question: 'Can I apply for a reissue under Tatkal?',
          answer: 'Yes. A reissue can be applied for under either the Normal or the Tatkal scheme.',
        },
        ...sharedFaqs,
      ],
    },
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
