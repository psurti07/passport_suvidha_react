import type { FaqItem } from './faq';

export type ServiceSlug = 'normal-passport' | 'tatkal-passport' | 'reissue-passport';
export type RequirementSetId = 'fresh' | 'reissue' | 'minor';

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** Short label shown under the name, e.g. "Standard application" */
  tagline: string;
  /** One or two sentences used on cards */
  summary: string;
  /** Key facts shown as data rows on cards */
  facts: Array<{ label: string; value: string }>;
  /** Marks the urgent service visually */
  isUrgent?: boolean;
  icon: 'file-text' | 'zap' | 'refresh';
  /** Detail page content */
  detail: {
    metaDescription: string;
    overview: string[];
    bestFor: string[];
    benefits: Array<{ title: string; text: string }>;
    /** Which document checklists apply (from src/data/requirements.ts) */
    requirementSets: RequirementSetId[];
    faqs: FaqItem[];
  };
}
