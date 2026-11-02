import { ArrowRight } from 'lucide-react-redesign';
import type { Blog } from '@/lib/redesign/types/blog';
import { formatDate } from '@/lib/redesign/utils/date';
import { ImageWithFallback } from '@/components/redesign/common/ImageWithFallback';
import { cn } from '@/lib/redesign/utils/cn';
import { HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';
import { SmartLink } from '@/components/redesign/common/SmartLink';
import { BlogCover } from './BlogCover';

interface BlogCardProps {
  blog: Blog;
  /** feature = homepage lead card; wide = blog listing lead card (image left from md) */
  variant?: 'default' | 'feature' | 'horizontal' | 'wide';
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function BlogCard({ blog, variant = 'default', headingLevel: H = 'h3', className }: BlogCardProps) {
  const horizontal = variant === 'horizontal';
  const wide = variant === 'wide';
  const feature = variant === 'feature' || wide;

  return (
    <article
      className={cn(
        'group relative flex overflow-hidden rounded-2xl border border-line-200 bg-white transition-[transform,box-shadow,border-color] duration-base ease-brand hover:-translate-y-1 hover:border-navy-200 hover:shadow-md',
        horizontal ? 'flex-col xl:flex-row' : wide ? 'flex-col md:flex-row' : feature ? 'flex-col md:flex-row xl:flex-col' : 'flex-col',
        className,
      )}
    >
      <div
        className={cn(
          'relative shrink-0 overflow-hidden bg-navy-50',
          horizontal
            ? 'aspect-[16/10] xl:aspect-auto xl:w-[42%]'
            : wide
              ? 'aspect-[16/10] md:aspect-auto md:min-h-[360px] md:w-[55%]'
              : feature
              ? 'aspect-[16/10] md:aspect-auto md:min-h-[320px] md:w-1/2 xl:aspect-[16/11] xl:min-h-0 xl:w-auto'
              : 'aspect-[16/10]',
        )}
      >
        <ImageWithFallback
          src={blog.featuredImage}
          alt=""
          width={800}
          height={500}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.03]"
          fallback={<BlogCover seed={blog.slug} label={blog.category.name} />}
        />
        {blog.isDemo && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-warning shadow-xs">
            Demo content
          </span>
        )}
      </div>

      <div className={cn('flex flex-1 flex-col', feature ? 'p-6 sm:p-7' : 'p-5')}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small [&>*]:whitespace-nowrap">
          <span className="font-semibold text-navy-700">{blog.category.name}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-line-300" />
          <time dateTime={blog.publishedAt} className="text-ink-500">
            {formatDate(blog.publishedAt)}
          </time>
          {blog.readingTimeMinutes && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-line-300" />
              <span className="text-ink-500">{blog.readingTimeMinutes} min read</span>
            </>
          )}
        </div>
        <H className={cn('mt-3 font-semibold text-ink-900', feature ? 'text-h2 !text-[clamp(1.5rem,1.2rem+1vw,2rem)]' : 'text-h3')}>
          <SmartLink to={`/blogs/${blog.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:text-navy-700" disabledClassName="!opacity-100 !cursor-default">
            {blog.title}
          </SmartLink>
        </H>
        <p className={cn('mt-3 text-ink-500', !feature && 'line-clamp-2')}>{blog.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-small font-semibold text-navy-700">
          {HOMEPAGE_PREVIEW_MODE ? (
            <span className="font-medium text-ink-400">Full article at launch</span>
          ) : (
            <>
              Read more
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
            </>
          )}
        </span>
      </div>
    </article>
  );
}
