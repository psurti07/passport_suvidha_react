export type BlogStatus = 'draft' | 'published';

export interface BlogCategory {
  slug: string;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Sanitised HTML from the CMS/backend. */
  content: string;
  /** Absolute or root-relative URL. Missing/broken images fall back to a branded cover. */
  featuredImage: string;
  category: BlogCategory;
  /** ISO-8601 date string */
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  author?: string;
  status: BlogStatus;
  metaTitle: string;
  metaDescription: string;
  tags?: string[];
  /** Set only when the article's primary copy is published on another site. */
  canonicalUrl?: string;
  /** True for development mock content. Never set by the real API. */
  isDemo?: boolean;
}

export interface BlogListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
