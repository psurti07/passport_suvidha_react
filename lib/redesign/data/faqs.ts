import type { FaqItem } from '@/lib/redesign/types/faq';
import { complianceNotice, site } from './site';

/**
 * FAQ content.
 *
 * Answers are limited to facts published on the current site (Services,
 * Requirements, Locations, Apply, Disclaimer and Contact pages). Procedural
 * guidance such as government timelines or fees is deliberately not stated.
 *
 * NOTE: answers on the live /faq page do not open (broken accordion), so
 * those answers could not be recovered. Questions without a verified answer
 * are listed in `pendingFaqQuestions` and are NOT rendered.
 */

export const faqCategories = [
  { id: 'about', label: 'About our service' },
  { id: 'application', label: 'Applications & documents' },
  { id: 'fees', label: 'Fees & payments' },
  { id: 'support', label: 'Support' },
] as const;

export type FaqCategoryId = (typeof faqCategories)[number]['id'];

export const faqs: Array<FaqItem & { category: FaqCategoryId }> = [
  { id: 'is-government', category: 'about', question: 'Is Passport Suvidha a government website?', answer: complianceNotice.full },
  {
    id: 'what-we-do',
    category: 'about',
    question: 'What does Passport Suvidha actually do?',
    answer:
      'We provide consultancy and facilitation: guidance on the documents you need, assistance completing your application form based on the information you provide, and guidance on scheduling your appointment.',
  },
  {
    id: 'submit',
    category: 'about',
    question: 'Do you submit my application to the government?',
    answer:
      'No. Submission, verification, police verification, approval and issuance are handled by the Government of India through the official Passport Seva system. We help you prepare; final submission is made through the official portal.',
  },
  {
    id: 'guarantee',
    category: 'about',
    question: 'Can you guarantee my passport or a faster timeline?',
    answer:
      'No. We cannot guarantee approval, issuance, Tatkal acceptance or processing timelines — these are decided by the passport authorities.',
  },
  {
    id: 'which-services',
    category: 'application',
    question: 'Which passport services do you assist with?',
    answer:
      'We assist with Normal, Tatkal and Reissue passport applications, with a choice of a 36-page or 60-page booklet.',
  },
  {
    id: 'normal-vs-tatkal',
    category: 'application',
    question: "What's the difference between a Normal and a Tatkal passport?",
    answer:
      'Normal applications follow standard processing with regular fees and suit planned travel. Tatkal is an expedited scheme with higher government fees, meant for urgent requirements.',
  },
  {
    id: 'validity',
    category: 'application',
    question: 'How long is a passport valid?',
    answer: 'For adults, a passport is valid for 10 years.',
  },
  {
    id: 'documents',
    category: 'application',
    question: 'What documents do I need for a first-time passport?',
    answer:
      'Typically a completed application form, proof of identity, proof of address, proof of date of birth and recent passport-size photographs. See the Requirements page for the full checklists, including reissue and minor applications. Final requirements are set by the passport authorities.',
  },
  {
    id: 'where-apply',
    category: 'application',
    question: 'Where do I go for my passport appointment?',
    answer:
      'Appointments take place at a Passport Seva Kendra (PSK) or Post Office Passport Seva Kendra (POPSK). Use our Locations page or the official Passport Seva portal to find your nearest office.',
  },
  {
    id: 'fee-includes-govt',
    category: 'fees',
    question: 'Does your fee include the government passport fee?',
    answer:
      'No. Our fee is a consultancy fee for our assistance only. Government passport fees are separate and are paid directly on the official government website.',
  },
  {
    id: 'refund',
    category: 'fees',
    // PLACEHOLDER: the live Disclaimer (non-refundable once services start) and the
    // live Refund Policy (requests within 30 days) conflict — confirm with the client.
    question: 'Is the service fee refundable?',
    answer:
      'Refund terms are set out in our Refund Policy and Disclaimer. Please read both before applying, and contact our team if anything is unclear.',
  },
  {
    id: 'data-secure',
    category: 'support',
    question: 'Is my information secure?',
    answer:
      'Your information is used only for your passport application assistance. Please read our Privacy Policy for details on how we collect, use and protect personal information.',
  },
  {
    id: 'track',
    category: 'support',
    question: 'Can I check the status of my application?',
    answer:
      'Yes — use the Check Status page with your registered mobile number, last name and date of birth, or contact our team.',
  },
  {
    id: 'contact',
    category: 'support',
    question: 'How can I reach your team?',
    answer: `Call us on ${site.phone.display} or email ${site.email.display}. Our team is available ${site.hoursShort}; closed on Sundays.`,
  },
];

/** Six-question selection shown on the homepage. */
export const homeFaqs: FaqItem[] = ['is-government', 'fee-includes-govt', 'which-services', 'documents', 'refund', 'contact'].map(
  (id) => faqs.find((f) => f.id === id)!,
);

/**
 * Questions on the live FAQ page whose answers could not be recovered.
 * Supply approved answers, then move them into `faqs` above.
 */
export const pendingFaqQuestions = [
  'Do I need a passport for domestic travel in India?',
  'What should I do if my passport is lost or stolen?',
  'Can I renew my passport online?',
  'How do I change my name on my passport?',
  'How long does it take to get a passport?',
  'What if I need a passport urgently?',
  'When should I renew my passport?',
  'Can I expedite my passport renewal?',
];
