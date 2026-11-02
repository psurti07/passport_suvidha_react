'use client';

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from '@/lib/redesign/router';
import { cn } from '@/lib/redesign/utils/cn';
import { PREVIEW_DISABLED_TITLE, resolveLink, scrollToSection } from '@/lib/redesign/config/preview';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'outline-light' | 'link';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-fast ease-brand active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  // Brand yellow with navy text (≈8:1 contrast)
  primary: 'rounded-full bg-gold-400 text-navy-900 shadow-xs hover:-translate-y-0.5 hover:bg-gold-500 hover:shadow-[0_10px_24px_-10px_rgb(240_200_0/0.75)]',
  secondary: 'rounded-full bg-navy-700 text-white shadow-xs hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-[0_10px_24px_-10px_rgb(0_69_126/0.6)]',
  outline: 'rounded-full border border-line-300 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50',
  ghost: 'rounded-full text-navy-700 hover:bg-navy-50',
  'outline-light': 'rounded-full border border-white/25 text-white hover:border-white/60 hover:bg-white/10',
  link: 'text-navy-700 underline-offset-4 hover:underline',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-small',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-[0.9375rem] sm:h-[3.25rem] sm:px-7 sm:text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never };
type ButtonAsLink = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; href?: never };
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md', className?: string) =>
  cn(base, variants[variant], variant !== 'link' && sizes[size], className);

/** One button component for <button>, router <Link> and external <a>. */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const { variant = 'primary', size = 'md', className, children, iconLeft, iconRight, ...rest } = props;
  const cls = buttonClasses(variant, size, className);
  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight && (
        <span className="transition-transform duration-fast ease-brand group-hover/btn:translate-x-0.5">{iconRight}</span>
      )}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    const { to, onClick, ...anchor } = rest as ButtonAsLink;
    // Internal links respect HOMEPAGE_PREVIEW_MODE (src/config/preview.ts)
    const r = resolveLink(to);
    if (r.kind === 'disabled') {
      return (
        <span aria-disabled="true" title={PREVIEW_DISABLED_TITLE} className={cn(cls, 'cursor-not-allowed opacity-50')}>
          {content}
        </span>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={r.to}
        className={cls}
        onClick={(e) => {
          onClick?.(e);
          if (r.kind === 'anchor') scrollToSection(r.sectionId);
        }}
        {...anchor}
      >
        {content}
      </Link>
    );
  }
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...(rest as ButtonAsAnchor)}>
        {content}
      </a>
    );
  }
  const { type = 'button', ...btn } = rest as ButtonAsButton;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={cls} {...btn}>
      {content}
    </button>
  );
});
