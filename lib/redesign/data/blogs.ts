import type { Blog, BlogCategory } from '@/lib/redesign/types/blog';

/**
 * PUBLISHED BLOG ARTICLES — verified content only.
 *
 * Status (23 Oct 2026): the client's live website (https://passportsuvidha.com) has
 * no blog — no blog navigation, no /blog or /blogs page and no article content was
 * found. This list is therefore empty, and the website automatically hides the blog
 * section and its navigation links (see src/config/content.ts).
 *
 * To publish an article, add a record here (or connect the CMS — see
 * src/services/blogService.ts). Use only real, approved articles:
 *   - never invent authors, publication dates or article text
 *   - `content` is sanitised HTML; headings start at <h2> (the page title is the <h1>)
 *   - `canonicalUrl` only if the article's primary copy lives on another site
 *
 * Design/demo posts live in src/data/blogs.mock.ts and are only shown when the
 * developer sets VITE_BLOG_DEMO=true. They must never be deployed.
 */
export const blogCategories: BlogCategory[] = [];

export const publishedBlogs: Blog[] = [];
