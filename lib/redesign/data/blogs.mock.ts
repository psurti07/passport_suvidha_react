import type { Blog, BlogCategory } from '@/lib/redesign/types/blog';

/**
 * ⚠ DEMO CONTENT — for UI development only.
 * These posts are placeholders and are NOT verified passport guidance.
 * In production, blog data comes from the backend via src/services/blogService.ts.
 */

export const blogCategories: BlogCategory[] = [
  { slug: 'guides', name: 'Guides' },
  { slug: 'documents', name: 'Documents' },
  { slug: 'tatkal', name: 'Tatkal' },
  { slug: 'company-news', name: 'Company News' },
];

const cat = (slug: string) => blogCategories.find((c) => c.slug === slug)!;

const demoBody = (topic: string) => `
<p><strong>Demo article.</strong> This is placeholder content used to design the reading experience. It is not verified passport guidance. The final article on “${topic}” will be published from the Passport Suvidha content team through the backend.</p>
<h2 id="overview">Overview</h2>
<p>This section introduces the topic and explains who the article is for. Real articles should link to the official Passport Seva portal for any rule, fee or timeline, because these are set and changed by the government.</p>
<h2 id="before-you-start">Before you start</h2>
<p>A short checklist-style section helps readers prepare. Lists keep scanning easy on mobile:</p>
<ul>
  <li>Placeholder list item one</li>
  <li>Placeholder list item two</li>
  <li>Placeholder list item three</li>
</ul>
<h3 id="a-closer-look">A closer look</h3>
<p>Sub-sections use an H3 so the table of contents can nest them. Paragraphs are kept to a comfortable 65–75 characters per line for reading.</p>
<blockquote>Pull quotes highlight one idea from the article.</blockquote>
<h2 id="how-we-help">How Passport Suvidha can help</h2>
<p>Closing sections can explain how our consultancy assists with this step, followed by a call to action.</p>
`;

export const mockBlogs: Blog[] = [
  {
    id: 'demo-1',
    slug: 'preparing-for-your-first-passport-application',
    title: 'Preparing for your first passport application',
    excerpt: 'A calm, step-by-step look at what to get ready before you begin a fresh passport application.',
    content: demoBody('Preparing for your first passport application'),
    featuredImage: '/assets/images/blog/preparing-first-application.webp',
    category: cat('guides'),
    publishedAt: '2026-10-08',
    readingTimeMinutes: 6,
    status: 'published',
    metaTitle: 'Preparing for your first passport application | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-2',
    slug: 'organising-your-documents',
    title: 'Organising your documents before you apply',
    excerpt: 'How to keep identity, address and date-of-birth proofs in order so your application goes smoothly.',
    content: demoBody('Organising your documents before you apply'),
    featuredImage: '/assets/images/blog/organising-documents.webp',
    category: cat('documents'),
    publishedAt: '2026-09-24',
    readingTimeMinutes: 5,
    status: 'published',
    metaTitle: 'Organising your documents before you apply | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-3',
    slug: 'normal-or-tatkal-choosing-the-right-scheme',
    title: 'Normal or Tatkal: choosing the right scheme for you',
    excerpt: 'Understand the difference between the two schemes and the questions to ask before choosing one.',
    content: demoBody('Normal or Tatkal: choosing the right scheme for you'),
    featuredImage: '/assets/images/blog/normal-or-tatkal.webp',
    category: cat('tatkal'),
    publishedAt: '2026-09-10',
    readingTimeMinutes: 7,
    status: 'published',
    metaTitle: 'Normal or Tatkal: choosing the right scheme | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-4',
    slug: 'renewing-a-passport-what-to-expect',
    title: 'Renewing a passport: what to expect',
    excerpt: 'An overview of the reissue journey, from checking your current passport to your appointment day.',
    content: demoBody('Renewing a passport: what to expect'),
    featuredImage: '/assets/images/blog/renewing-passport.jpg',
    category: cat('guides'),
    publishedAt: '2026-08-27',
    readingTimeMinutes: 5,
    status: 'published',
    metaTitle: 'Renewing a passport: what to expect | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-5',
    slug: 'passport-photographs-common-mistakes',
    title: 'Passport photographs: common mistakes to avoid',
    excerpt: 'Small details in a photograph can cause delays. Here is what to double-check before you upload.',
    content: demoBody('Passport photographs: common mistakes to avoid'),
    featuredImage: '/assets/images/blog/passport-photographs.jpg',
    category: cat('documents'),
    publishedAt: '2026-08-12',
    readingTimeMinutes: 4,
    status: 'published',
    metaTitle: 'Passport photographs: common mistakes | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-6',
    slug: 'passport-suvidha-in-the-news',
    title: 'Passport Suvidha in the news',
    excerpt: 'A round-up of recent media coverage of our passport assistance services.',
    content: demoBody('Passport Suvidha in the news'),
    featuredImage: '/assets/images/blog/in-the-news.jpg',
    category: cat('company-news'),
    publishedAt: '2026-07-30',
    readingTimeMinutes: 3,
    status: 'published',
    metaTitle: 'Passport Suvidha in the news | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-7',
    slug: 'applying-for-a-minor',
    title: 'Applying for a passport for your child',
    excerpt: 'What parents should prepare when applying on behalf of an applicant under 18.',
    content: demoBody('Applying for a passport for your child'),
    featuredImage: '/assets/images/blog/applying-for-a-minor.jpg',
    category: cat('guides'),
    publishedAt: '2026-07-14',
    readingTimeMinutes: 5,
    status: 'published',
    metaTitle: 'Applying for a passport for your child | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-8',
    slug: 'your-appointment-day',
    title: 'Your appointment day: a calm checklist',
    excerpt: 'A simple list to run through the evening before your Passport Seva Kendra visit.',
    content: demoBody('Your appointment day: a calm checklist'),
    featuredImage: '/assets/images/blog/appointment-day.jpg',
    category: cat('documents'),
    publishedAt: '2026-06-26',
    readingTimeMinutes: 4,
    status: 'published',
    metaTitle: 'Your appointment day checklist | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
  {
    id: 'demo-9',
    slug: 'planning-urgent-travel',
    title: 'Planning urgent travel without the stress',
    excerpt: 'How to organise your time and paperwork when a trip comes up at short notice.',
    content: demoBody('Planning urgent travel without the stress'),
    featuredImage: '/assets/images/blog/urgent-travel.jpg',
    category: cat('tatkal'),
    publishedAt: '2026-06-09',
    readingTimeMinutes: 6,
    status: 'published',
    metaTitle: 'Planning urgent travel without the stress | Passport Suvidha',
    metaDescription: 'Demo article for the Passport Suvidha blog layout.',
    isDemo: true,
  },
];
