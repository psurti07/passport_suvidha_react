import type { ApplyStepId } from './applyFlow';

/**
 * Apply Now — text and section settings. Everything a developer or content editor is
 * likely to change on the Apply page lives here; no component needs editing for it.
 */
export const APPLY_CONTENT = {
  /** Page introduction (Basic details step) */
  page: {
    title: 'Apply for passport assistance',
    description: 'Five short steps. Keep your Aadhaar or other ID handy.',
    /** Facts shown under the introduction. Keep these verifiable. */
    showFacts: true,
  },

  /**
   * Homepage trust sections shown below the application.
   * `showOn` lists the steps that display them; they are never shown while editing from review.
   */
  trust: {
    showTestimonials: true,
    showReels: true,
    showOn: ['basic', 'review'] as ApplyStepId[],
  },

  review: {
    title: 'Review & pay',
    description: 'Please review your application details before proceeding.',
    detailsHeading: 'Your application details',
    sections: {
      basic: { title: 'Basic Details', edit: 'Edit Basic Details' },
      family: { title: 'Family Details', edit: 'Edit Family Details' },
      personal: { title: 'Personal Details', edit: 'Edit Personal Details' },
    },
    updated: (title: string) => `${title} updated.`,
  },

  payment: {
    heading: 'Payment summary',
    totalLabel: 'Total payable',
    payLabel: (amount: string) => `Pay ${amount}`,
    payLabelNoAmount: 'Continue to payment',
    busyLabel: 'Starting payment…',
    note: 'Consultancy fee only. Government passport fees are separate and paid on the official portal.',
    /** Shown after pressing Pay while no payment gateway is connected. Must stay truthful. */
    unavailable: 'Online payment is not available yet, so no payment has been taken. Please call us to complete your application.',
  },

  edit: {
    notice: (title: string) => `You are editing ${title}. Your other details are kept.`,
    saveLabel: 'Save & return to review',
    savingLabel: 'Saving…',
    cancelLabel: 'Cancel',
    /** Shown when a change made another section invalid (e.g. emergency contact now matches your email). */
    dependencyNotice: 'Your change affects these details. Please check them before returning to review.',
    verifyNewNumberLabel: 'Verify new number',
  },
} as const;
