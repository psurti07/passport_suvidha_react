/**
 * Legal pages — text copied verbatim from the live passportsuvidha.com (Oct 2026).
 *
 * IMPORTANT: on the live site the collapsible section bodies of the Privacy
 * Policy, Terms and Refund Policy do not open, so only their introductions
 * and section headings could be recovered. Sections with no paragraphs render
 * a clearly marked placeholder. Paste the client's approved legal text into
 * `paragraphs` (or load it from the CMS) before launch. Do not rewrite it.
 *
 * Also flagged for the client:
 * - The Refund Policy notice (refund requests within 30 days) conflicts with
 *   the Disclaimer (fees non-refundable once services start).
 * - Disclaimer typo "batter understand" is reproduced as published.
 */
export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: 'privacy-policy' | 'terms' | 'disclaimer' | 'refund-policy';
  title: string;
  description: string;
  intro: string[];
  notice: string | null;
  sections: LegalSection[];
  /** ISO date — set when the client supplies the approved version */
  lastUpdated?: string;
}

export const legalDocs: LegalDoc[] = [
  {
    "slug": "privacy-policy",
    "title": "Privacy Policy",
    "description": "How Passport Suvidha collects, uses, shares and protects personal information.",
    "intro": [
      "This Privacy Policy explains how PassportSuvidha (\"we,\" \"us,\" or \"our\") collects, uses, shares, and protects personal information obtained from users (\"you\" or \"your\") of our website, mobile applications, and services. By using our services, you consent to the data practices described in this policy.",
      "We take your privacy seriously and are committed to maintaining the confidentiality and security of your personal information. This policy is designed to help you understand what information we collect, why we collect it, and how you can update, manage, and delete your information."
    ],
    "notice": "PassportSuvidha processes sensitive personal information as required for passport applications. This information is handled with the utmost care and in compliance with all applicable privacy laws and regulations.",
    "sections": [
      {
        "id": "information-we-collect",
        "title": "Information We Collect",
        "paragraphs": []
      },
      {
        "id": "how-we-use-your-information",
        "title": "How We Use Your Information",
        "paragraphs": []
      },
      {
        "id": "information-sharing-and-disclosure",
        "title": "Information Sharing and Disclosure",
        "paragraphs": []
      },
      {
        "id": "data-security",
        "title": "Data Security",
        "paragraphs": []
      },
      {
        "id": "data-retention",
        "title": "Data Retention",
        "paragraphs": []
      },
      {
        "id": "your-privacy-rights",
        "title": "Your Privacy Rights",
        "paragraphs": []
      },
      {
        "id": "changes-to-this-privacy-policy",
        "title": "Changes to This Privacy Policy",
        "paragraphs": [
          "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the \"Last Updated\" date. We encourage you to review this policy periodically to stay informed about how we protect your personal information."
        ]
      }
    ]
  },
  {
    "slug": "terms",
    "title": "Terms & Conditions",
    "description": "The terms governing use of the Passport Suvidha website and services.",
    "intro": [
      "These Terms and Conditions (“Terms”) constitute a legally binding agreement governing the use of services and the website provided by Passport Suvidha (“Company”, “we”, or “our”) by any individual or entity (“User” or “you”). By accessing, using, or availing our services in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must immediately discontinue use of the services."
    ],
    "notice": null,
    "sections": [
      {
        "id": "definitions-and-interpretation",
        "title": "Definitions and Interpretation",
        "paragraphs": []
      },
      {
        "id": "nature-of-services",
        "title": "Nature of Services",
        "paragraphs": []
      },
      {
        "id": "no-guarantee-of-passport-issuance",
        "title": "No Guarantee of Passport Issuance",
        "paragraphs": []
      },
      {
        "id": "user-responsibility",
        "title": "User Responsibility",
        "paragraphs": []
      },
      {
        "id": "nature-of-relationship",
        "title": "Nature of Relationship",
        "paragraphs": []
      },
      {
        "id": "scope-and-limitation-of-services",
        "title": "Scope and Limitation of Services",
        "paragraphs": []
      },
      {
        "id": "absolute-user-representations-and-warranties",
        "title": "Absolute User Representations and Warranties",
        "paragraphs": []
      },
      {
        "id": "user-covenants-and-obligations",
        "title": "User Covenants and Obligations",
        "paragraphs": []
      },
      {
        "id": "fees-charges-and-payment-terms",
        "title": "Fees, Charges, and Payment Terms",
        "paragraphs": []
      },
      {
        "id": "no-right-of-cancellation",
        "title": "No Right of Cancellation",
        "paragraphs": []
      },
      {
        "id": "service-timelines",
        "title": "Service Timelines",
        "paragraphs": []
      },
      {
        "id": "suspension-and-termination",
        "title": "Suspension and Termination",
        "paragraphs": []
      },
      {
        "id": "limitation-and-exclusion-of-liability",
        "title": "Limitation and Exclusion of Liability",
        "paragraphs": []
      },
      {
        "id": "indemnity",
        "title": "Indemnity",
        "paragraphs": []
      },
      {
        "id": "confidentiality-and-data-handling",
        "title": "Confidentiality and Data Handling",
        "paragraphs": []
      },
      {
        "id": "intellectual-property-rights",
        "title": "Intellectual Property Rights",
        "paragraphs": []
      },
      {
        "id": "force-majeure",
        "title": "Force Majeure",
        "paragraphs": []
      },
      {
        "id": "waiver",
        "title": "Waiver",
        "paragraphs": []
      },
      {
        "id": "severability",
        "title": "Severability",
        "paragraphs": []
      },
      {
        "id": "governing-law-and-dispute-resolution",
        "title": "Governing Law and Dispute Resolution",
        "paragraphs": []
      },
      {
        "id": "amendments-and-modifications",
        "title": "Amendments And Modifications",
        "paragraphs": []
      },
      {
        "id": "entire-agreement",
        "title": "Entire Agreement",
        "paragraphs": []
      }
    ]
  },
  {
    "slug": "disclaimer",
    "title": "Disclaimer",
    "description": "Passport Suvidha is a private consultancy and is not affiliated with the Government of India.",
    "intro": [
      "This Disclaimer governs the access to and use of the website operated under the name Passport Suvidha (“Website”). By accessing, browsing, or using this Website or any services made available herein, you expressly acknowledge that you have read, understood, and agreed to be legally bound by the terms of this Disclaimer.",
      "Passport Suvidha is a private, independent, non-governmental consultancy and facilitation service provider. This Website is not a government website and is not affiliated with, authorized by, endorsed by, sponsored by, accredited by, or connected in any manner whatsoever with the Government of India, the Ministry of External Affairs (MEA), the Passport Seva Kendra (PSK), the official Passport Seva Portal, or any other governmental authority, department, statutory body, or instrumentality. Nothing contained on this Website shall be construed as constituting or implying any governmental authority, representation, or official status.",
      "The services offered by Passport Suvidha are purely informational, advisory, clerical, and facilitative in nature. Such services may include general procedural guidance relating to passport applications, assistance in completing application forms strictly on the basis of information provided by users, document checklist guidance, and informational assistance relating to appointment scheduling or publicly available application status. Passport Suvidha does not issue passports, submit applications to any government authority, conduct or influence police verification, access confidential government databases, exercise any statutory, quasi-judicial, or decision-making authority, or provide any assurance, warranty, or guarantee regarding passport approval, issuance, Tatkal acceptance, processing timelines, or outcomes.",
      "All matters relating to passport application submission, scrutiny, verification, police verification, approval, rejection, issuance, renewal, cancellation, and delivery are carried out exclusively by the Government of India through its authorized agencies and the official Passport Seva system. Users bear sole and absolute responsibility for final submission of applications through official government portals and for compliance with all applicable laws, rules, procedures, conditions, and governmental requirements.",
      "Any fees charged by Passport Suvidha constitute consideration solely for professional consultancy and facilitation services rendered. Statutory passport fees and other government charges prescribed by the Government of India are separate, mandatory, and payable directly to the Government through official channels. Payment of Passport Suvidha’s service fees does not confer any entitlement to approval, issuance, priority, or expedited processing. Upon initiation of services, all fees shall be non-refundable, irrespective of application outcome, delay, rejection, withdrawal, or any change in governmental policy or procedure.",
      "While reasonable efforts are undertaken to ensure that information made available on this Website is accurate and current, passport laws, regulations, procedures, documentation requirements, eligibility criteria, and fee structures are subject to change at any time by competent authorities without prior notice. Passport Suvidha expressly disclaims any liability for inaccuracies, errors, omissions, outdated information, or consequences arising from such regulatory or procedural changes.",
      "To the fullest extent permitted under applicable law, Passport Suvidha shall not be liable for any direct, indirect, incidental, consequential, special, or punitive losses or damages arising out of or in connection with the use of this Website or services, including but not limited to application rejection, delay, suspension, or non-processing; changes in governmental rules, policies, procedures, or fees; technical failures, downtime, or system issues affecting government or third-party portals; incorrect, incomplete, false, or misleading information provided by users; or acts or omissions of governmental authorities or third parties. Use of this Website and its services is undertaken entirely at the user’s own risk and discretion.",
      "This Website may contain links or references to third-party or government websites for informational convenience only. Passport Suvidha does not exercise control over, endorse, or assume responsibility for the content, accuracy, availability, privacy practices, or policies of such external websites. Nothing contained herein shall be deemed to create any agency, partnership, joint venture, employment, fiduciary, or representative relationship between Passport Suvidha and any user.",
      "Passport Suvidha shall not be held liable for any failure or delay in the performance of its obligations arising from events beyond its reasonable control, including but not limited to acts of God, natural disasters, governmental actions, changes in law, technical failures, system outages, or other force majeure events.",
      "If any provision of this Disclaimer is determined by a court of competent jurisdiction to be invalid, unlawful, or unenforceable, such provision shall be severed, and the remaining provisions shall remain valid, binding, and enforceable to the fullest extent permitted by law.",
      "Passport Suvidha reserves the right to modify, amend, or update this Disclaimer at any time without prior notice. Continued access to or use of the Website following any such modification shall constitute deemed acceptance of the revised Disclaimer.",
      "By accessing, browsing, or using this Website, you expressly confirm your informed consent to this Disclaimer and irrevocably agree to be legally bound by its terms. This Disclaimer shall be governed by and construed in accordance with the laws of India, and all disputes arising out of or relating to this Disclaimer or the use of the Website shall be subject to the exclusive jurisdiction of the courts of Surat.",
      "This Website is privately operated and not affiliated with any government entity. We do not represent or are affiliated with, endorsed by, or in any way connected to any government body or department. The form provided is not for official registration purpose; rather, it’s designed to gather information from our clients to help us batter understand their business needs. By continuing to use this website, you acknowledge that we are a private company. We offer assistance based on customer requests, and the fees collected on this website are charged as a platform fee. We reserve the right to outsource matters as deemed necessary. We are in the process of giving our brand a new name. stay tuned for updates. This platform does not offer legal services, nor does it provide legal advice or representation. Do you require legal assistance? We strongly recommend consulting with a qualified lawyer or firm."
    ],
    "notice": null,
    "sections": []
  },
  {
    "slug": "refund-policy",
    "title": "Refund Policy",
    "description": "Terms under which Passport Suvidha processes refunds for its services.",
    "intro": [
      "This Refund Policy outlines the terms and conditions under which PassportSuvidha (\"we,\" \"us,\" or \"our\") will process refunds for passport application services and related fees. We understand that circumstances may arise where you need to cancel your application or service request, and we aim to make this process as smooth as possible."
    ],
    "notice": "Refund requests must be submitted within 30 days of the initial payment. Government fees may not be refundable as they are subject to official policies.",
    "sections": [
      {
        "id": "refund-eligibility",
        "title": "Refund Eligibility",
        "paragraphs": []
      },
      {
        "id": "refund-process",
        "title": "Refund Process",
        "paragraphs": []
      },
      {
        "id": "charge-back-disclaimer",
        "title": "Charge Back Disclaimer",
        "paragraphs": []
      },
      {
        "id": "payment-methods-and-processing",
        "title": "Payment Methods and Processing",
        "paragraphs": []
      },
      {
        "id": "special-circumstances",
        "title": "Special Circumstances",
        "paragraphs": []
      }
    ]
  }
];

export const getLegalDoc = (slug: LegalDoc['slug']) => legalDocs.find((d) => d.slug === slug)!;
