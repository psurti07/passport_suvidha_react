import { USE_MOCKS } from '@/lib/redesign/services/apiClient';
import { publishedBlogs } from '@/lib/redesign/data/blogs';

/**
 * Content switches derived from the available data — nothing here needs editing
 * when content is added.
 *
 * BLOG_DEMO_MODE  — design-time only: `VITE_BLOG_DEMO=true` loads the placeholder
 *                   posts in src/data/blogs.mock.ts (clearly badged "Demo content").
 *                   Never enable this for a public deployment.
 * BLOG_ENABLED    — show the blog section and Blog navigation links. True when real
 *                   articles exist locally, when a blog API is connected
 *                   (VITE_USE_MOCKS=false + VITE_API_BASE_URL), or in demo mode.
 */
export const BLOG_DEMO_MODE = process.env.NEXT_PUBLIC_BLOG_DEMO === 'true';

export const BLOG_ENABLED = BLOG_DEMO_MODE || !USE_MOCKS || publishedBlogs.length > 0;
