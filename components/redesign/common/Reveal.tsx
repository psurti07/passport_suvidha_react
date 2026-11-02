'use client';

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '@/lib/redesign/hooks/useInView';
import { cn } from '@/lib/redesign/utils/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms, used to stagger items in a grid (keep steps at 60–100ms) */
  delay?: number;
  /** up = fade + 16px rise (default) · fade · scale · image = soft clip reveal for media */
  variant?: 'up' | 'fade' | 'scale' | 'image' | 'slide';
  as?: ElementType;
  id?: string;
}

/**
 * Entrance animation when the element first enters the viewport.
 * CSS-only (opacity/transform), disabled under prefers-reduced-motion,
 * and visible without JavaScript (see globals.css).
 */
export function Reveal({ children, className, delay = 0, variant = 'up', as: Tag = 'div', id }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      data-variant={variant === 'up' ? undefined : variant}
      className={cn('reveal', inView && 'is-visible', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
