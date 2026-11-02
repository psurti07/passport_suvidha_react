import BlogDetailPage from '@/components/redesign/pages/BlogDetailPage';
import { pageMetadata } from '@/lib/redesign/seo';
import { getBlogBySlug } from '@/lib/redesign/services/blogService';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug).catch(() => null);
  if (!blog) return pageMetadata({ title: 'Article not found | Passport Suvidha', path: `/blogs/${slug}`, noindex: true });
  return pageMetadata({
    title: blog.metaTitle,
    description: blog.metaDescription,
    path: `/blogs/${slug}`,
    image: blog.featuredImage,
    type: 'article',
  });
}

// The article body is loaded on the client through lib/redesign/services/blogService.ts
export default function Page() {
  return <BlogDetailPage />;
}
