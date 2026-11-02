import type { Blog, BlogCategory, BlogListParams, Paginated } from '@/lib/redesign/types/blog';
import { apiRequest, USE_MOCKS } from './apiClient';
import { blogCategories as demoCategories, mockBlogs } from '@/lib/redesign/data/blogs.mock';
import { blogCategories as publishedCategories, publishedBlogs } from '@/lib/redesign/data/blogs';
import { BLOG_DEMO_MODE } from '@/lib/redesign/config/content';

/** Local (non-API) source: verified articles, or placeholder posts in design demo mode only. */
const localBlogs = () => (BLOG_DEMO_MODE ? mockBlogs : publishedBlogs);
const localCategories = () => (BLOG_DEMO_MODE ? demoCategories : publishedCategories);

/**
 * Blog data access. UI components only call these functions.
 *
 * Without a connected API (VITE_USE_MOCKS=true) the functions read the verified
 * local articles in src/data/blogs.ts (placeholder posts only with VITE_BLOG_DEMO=true).
 * Otherwise they call the backend. The endpoint paths below are ASSUMPTIONS —
 * the integrating developer should change them to match the existing API
 * (see INTEGRATION_GUIDE.md → Blog API).
 */
const ENDPOINTS = {
  list: '/blogs',
  detail: (slug: string) => `/blogs/${encodeURIComponent(slug)}`,
  categories: '/blog-categories',
};

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export async function listBlogs(params: BlogListParams = {}): Promise<Paginated<Blog>> {
  const { page = 1, pageSize = 9, category, search } = params;

  if (!USE_MOCKS) {
    return apiRequest<Paginated<Blog>>(ENDPOINTS.list, {
      query: { page, per_page: pageSize, category, search },
    });
  }

  await delay();
  const q = search?.trim().toLowerCase();
  const filtered = localBlogs()
    .filter((b) => b.status === 'published')
    .filter((b) => !category || b.category.slug === category)
    .filter((b) => !q || `${b.title} ${b.excerpt}`.toLowerCase().includes(q))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  return {
    items: filtered.slice(start, start + pageSize),
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!USE_MOCKS) return apiRequest<Blog>(ENDPOINTS.detail(slug));
  await delay();
  return localBlogs().find((b) => b.slug === slug && b.status === 'published') ?? null;
}

export async function getRelatedBlogs(blog: Blog, limit = 3): Promise<Blog[]> {
  const { items } = await listBlogs({ pageSize: 50 });
  const others = items.filter((b) => b.id !== blog.id);
  const sameCategory = others.filter((b) => b.category.slug === blog.category.slug);
  return [...sameCategory, ...others.filter((b) => !sameCategory.includes(b))].slice(0, limit);
}

export async function listBlogCategories(): Promise<BlogCategory[]> {
  if (!USE_MOCKS) return apiRequest<BlogCategory[]>(ENDPOINTS.categories);
  return localCategories();
}
