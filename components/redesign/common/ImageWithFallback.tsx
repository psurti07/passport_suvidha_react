'use client';

import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/redesign/utils/cn';

interface ImageWithFallbackProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  /** Rendered when src is empty or the file fails to load */
  fallback: ReactNode;
}

/**
 * Lazy image that swaps to `fallback` if the file is missing or broken.
 * This is what lets the client drop photos into /public/assets/... later
 * without touching any component code.
 *
 * While loading, the <img> keeps its normal size (so native lazy-loading
 * works) but stays transparent; it fades in once decoded.
 *
 * Server-rendered images can finish loading before React attaches onLoad, so the
 * effect also reads the element's state after hydration.
 */
export function ImageWithFallback({ src, fallback, className, alt = '', onLoad, onError, ...rest }: ImageWithFallbackProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(src ? 'loading' : 'error');
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!src) setStatus('error');
    else if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
    else setStatus('loading');
  }, [src]);

  if (status === 'error' || !src) return <>{fallback}</>;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={(e) => {
        setStatus('loaded');
        onLoad?.(e);
      }}
      onError={(e) => {
        setStatus('error');
        onError?.(e);
      }}
      className={cn(className, 'transition-opacity duration-base', status === 'loading' && 'opacity-0')}
      {...rest}
    />
  );
}
