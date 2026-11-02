/**
 * Media coverage — verified, externally published articles about Passport Suvidha.
 *
 * Source of truth: the "Media Coverage" section of the live website
 * (https://passportsuvidha.com, checked 23 Oct 2026). Every URL below is the exact
 * link used there.
 *   - `headline`    the article's own published headline (from the article page)
 *   - `summary`     the description shown for that article on the live website
 *   - `publishedAt` the article's published date (article metadata on the
 *                   publisher's page; Dailyhunt and Hindustan Metro carry each story
 *                   on the same day)
 *
 * Only add entries that link to a real, published article. Do not add outlet logos
 * or article photos unless the publisher permits their use.
 *
 * CMS / admin panel: replace this array with data from the API, keeping the same
 * field names (see INTEGRATION_GUIDE.md → Media coverage).
 */
export interface MediaArticle {
  id: string;
  outlet: 'Dailyhunt' | 'Hindustan Metro' | (string & {});
  headline: string;
  summary: string;
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  url: string;
}

export const mediaCoverage: MediaArticle[] = [
  {
    id: 'hm-simplifying-applications-digital-assistance',
    outlet: 'Hindustan Metro',
    headline: 'Passport Suvidha focuses on simplifying passport applications through digital assistance',
    summary: 'Get reliable passport assistance, expert guidance, and a smoother application experience with PassportSuvidha.',
    publishedAt: '2026-10-08',
    url: 'https://hindustanmetro.com/passport-suvidha-focuses-on-simplifying-passport-applications-through-digital-assistance',
  },
  {
    id: 'dh-simplifying-applications-digital-assistance',
    outlet: 'Dailyhunt',
    headline: 'Passport Suvidha focuses on simplifying passport applications through digital assistance',
    summary: 'Navigate your passport application with confidence through PassportSuvidha’s convenient support, clear guidance, and hassle-free assistance at every step.',
    publishedAt: '2026-10-08',
    url: 'https://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/passport+suvidha+focuses+on+simplifying+passport+applications+through+digital+assistance-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_3bb70af0c2ca11f1a97ee05f82c51e6a?sm=Y',
  },
  {
    id: 'dh-one-digital-platform',
    outlet: 'Dailyhunt',
    headline: 'Passport Suvidha brings passport assistance, guidance and support under one digital platform',
    summary: 'Discover how PassportSuvidha is making passport assistance simpler, more reliable, and convenient for applicants across India.',
    publishedAt: '2026-10-02',
    url: 'https://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/passport+suvidha+brings+passport+assistance+guidance+and+support+under+one+digital+platform-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_1ba61bf0be5311f1bff09c49ac89e8e4?sm=Y',
  },
  {
    id: 'hm-one-digital-platform',
    outlet: 'Hindustan Metro',
    headline: 'Passport Suvidha brings passport assistance, guidance and support under one digital platform',
    summary: 'Explore how PassportSuvidha is delivering convenient, professional, and dependable support to simplify the passport application process.',
    publishedAt: '2026-10-02',
    url: 'https://hindustanmetro.com/passport-suvidha-brings-passport-assistance-guidance-and-support-under-one-digital-platform',
  },
  {
    id: 'dh-redefining-assistance',
    outlet: 'Dailyhunt',
    headline: 'How Passport Suvidha is redefining the passport assistance experience in India',
    summary: 'Explore how PassportSuvidha is creating a more convenient and accessible passport assistance experience for applicants across India.',
    publishedAt: '2026-09-02',
    url: 'https://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/how+passport+suvidha+is+redefining+the+passport+assistance+experience+in+india-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_0de67550a68e11f1abbee57769f7cd2c?sm=Y',
  },
  {
    id: 'hm-redefining-assistance',
    outlet: 'Hindustan Metro',
    headline: 'How Passport Suvidha is redefining the passport assistance experience in India',
    summary: 'Read about PassportSuvidha’s approach to making passport assistance simpler, more professional, and easier for applicants to navigate.',
    publishedAt: '2026-09-02',
    url: 'https://hindustanmetro.com/how-passport-suvidha-is-redefining-the-passport-assistance-experience-in-india',
  },
  {
    id: 'dh-professional-assistance',
    outlet: 'Dailyhunt',
    headline: "Passport Suvidha brings professional assistance to India's growing passport application needs",
    summary: 'Learn how PassportSuvidha is helping applicants navigate the passport application process with professional assistance, guidance, and convenient support.',
    publishedAt: '2026-08-17',
    url: 'https://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/passport+suvidha+brings+professional+assistance+to+indias+growing+passport+application+needs-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_9bda962099ff11f1aef7f486b5beeea7?sm=Y',
  },
  {
    id: 'hm-professional-assistance',
    outlet: 'Hindustan Metro',
    headline: "Passport Suvidha brings professional assistance to India's growing passport application needs",
    summary: 'Discover how PassportSuvidha simplifies the passport application journey by providing reliable guidance and support throughout the process.',
    publishedAt: '2026-08-17',
    url: 'https://hindustanmetro.com/passport-suvidha-brings-professional-assistance-to-indias-growing-passport-application-needs',
  },
];
