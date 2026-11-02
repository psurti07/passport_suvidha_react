import type { RequirementSetId } from '@/lib/redesign/types/service';

/**
 * Document checklists exactly as published on passportsuvidha.com/requirements.
 * Final requirements are set by the passport authorities and can change —
 * the page links to the official portal for confirmation.
 */
export interface RequirementSet {
  id: RequirementSetId;
  title: string;
  description: string;
  items: Array<{ label: string; note?: string }>;
}

export const requirementSets: RequirementSet[] = [
  {
    id: 'fresh',
    title: 'Fresh passport',
    description: 'For first-time adult applicants.',
    items: [
      { label: 'Completed online application form' },
      { label: 'Proof of identity', note: 'Aadhaar Card / Voter ID / PAN Card' },
      { label: 'Proof of address', note: 'Aadhaar / utility bills / bank statement' },
      { label: 'Proof of date of birth', note: 'Birth certificate / Aadhaar' },
      { label: 'Recent passport-size photographs', note: '5.0 cm × 5.0 cm' },
      { label: 'Payment of applicable fees' },
    ],
  },
  {
    id: 'reissue',
    title: 'Reissue / renewal',
    description: 'For renewing or updating an existing passport.',
    items: [
      { label: 'Completed online application form' },
      { label: 'Original old passport' },
      { label: 'Self-attested copies of the first and last pages' },
      { label: 'Recent passport-size photographs' },
      { label: 'Payment of applicable fees' },
    ],
  },
  {
    id: 'minor',
    title: 'Minor (under 18)',
    description: 'For applicants below 18 years of age.',
    items: [
      { label: 'Completed online application form' },
      { label: 'Birth certificate of the minor' },
      { label: 'Aadhaar Card of the minor', note: 'if available' },
      { label: "Parents' passports / valid ID proofs" },
      { label: "Parents' presence required at the PSK" },
      { label: 'Recent passport-size photographs' },
      { label: 'Payment of applicable fees' },
    ],
  },
];

export const getRequirementSet = (id: RequirementSetId) => requirementSets.find((r) => r.id === id)!;

/** From the current Services page ("Fill Application Form"). */
export const formInformation = [
  'Personal details (name, date of birth, etc.)',
  'Contact information',
  'Family details',
  'Educational and employment information',
];

export const formTips = ['Keep all documents ready before starting', 'Fill in CAPITAL letters', 'Double-check all information'];

export const OFFICIAL_PORTAL_URL = 'https://www.passportindia.gov.in/';
