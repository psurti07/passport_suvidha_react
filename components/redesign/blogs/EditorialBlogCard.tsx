import { ArrowUpRight } from 'lucide-react-redesign';
import type { Blog } from '@/lib/redesign/types/blog';
import { formatDate } from '@/lib/redesign/utils/date';
import { cn } from '@/lib/redesign/utils/cn';
import { HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';
import { ImageWithFallback } from '@/components/redesign/common/ImageWithFallback';
import { SmartLink } from '@/components/redesign/common/SmartLink';
import { BlogCover } from './BlogCover';

/**
 * Editorial blog card for the homepage "Latest Insights & Guides" grid.
 * Consistent 3:2 image; subtle hover (image zoom, soft shadow, arrow nudge).
 * In homepage preview mode the card is non-navigational (article pages are off).
 */
export function EditorialBlogCard({ blog, featured, className }: { blog: Blog; featured?: boolean; className?: string }) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line-200 transition-[box-shadow,transform] duration-base ease-brand',
        'hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-26px_rgb(6_43_79/0.45)] hover:ring-navy-200 focus-within:ring-navy-300',
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-navy-50">
        <ImageWithFallback
          src={blog.featuredImage}
          alt=""
          width={1200}
          height={800}
          sizes={featured ? '(min-width: 1024px) 460px, 100vw' : '(min-width: 1024px) 340px, 100vw'}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.04]"
          fallback={<BlogCover seed={blog.slug} label={blog.category.name} />}
        />
        {blog.isDemo && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-warning shadow-xs">
            Demo content
          </span>
        )}
      </div>

      <div className={cn('flex flex-1 flex-col p-5', featured && 'sm:p-6')}>
        <p className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-500">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          {blog.category.name}
        </p>
        <h3 className={cn('mt-2.5 font-semibold leading-snug text-navy-900', featured ? 'text-[1.25rem] sm:text-[1.375rem]' : 'text-[1.0625rem]')}>
          <SmartLink
            to={`/blogs/${blog.slug}`}
            className="outline-none transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-navy-700"
            disabledClassName="!opacity-100 !cursor-default"
          >
            {blog.title}
          </SmartLink>
        </h3>
        <p className={cn('mt-2 text-[0.9063rem] leading-relaxed text-ink-500', featured ? 'line-clamp-3' : 'line-clamp-2')}>{blog.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.8125rem]">
          <time dateTime={blog.publishedAt} className="text-ink-400">
            {formatDate(blog.publishedAt)}
            {blog.readingTimeMinutes ? ` · ${blog.readingTimeMinutes} min read` : ''}
          </time>
          {HOMEPAGE_PREVIEW_MODE ? (
            <span className="whitespace-nowrap font-medium text-ink-400">Full article at launch</span>
          ) : (
            <span className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-navy-700">
              Read more
              <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
