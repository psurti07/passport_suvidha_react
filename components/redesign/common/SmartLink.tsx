'use client';

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link, NavLink, type NavLinkProps } from '@/lib/redesign/router';
import { PREVIEW_DISABLED_TITLE, resolveLink, scrollToSection } from '@/lib/redesign/config/preview';
import { cn } from '@/lib/redesign/utils/cn';

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
  /** Classes added when the link is disabled in preview mode */
  disabledClassName?: string;
}

/**
 * Internal link that respects HOMEPAGE_PREVIEW_MODE (src/config/preview.ts):
 * - full site → normal router <Link>
 * - preview   → homepage section anchor with smooth scroll (updates the URL hash,
 *               so the back button works), or a clearly disabled label
 */
export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(function SmartLink(
  { to, children, className, disabledClassName, onClick, ...rest },
  ref,
) {
  const r = resolveLink(to);

  if (r.kind === 'disabled') {
    return (
      <span
        aria-disabled="true"
        title={PREVIEW_DISABLED_TITLE}
        className={cn(className, 'cursor-not-allowed opacity-50', disabledClassName)}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      ref={ref}
      to={r.to}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (r.kind === 'anchor') scrollToSection(r.sectionId);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
});

/** NavLink equivalent for nav menus; `active` overrides route matching in preview mode (scroll-spy). */
export function SmartNavLink({
  to,
  active,
  className,
  children,
  onNavigate,
  end,
}: {
  to: string;
  active?: boolean;
  className: (state: { isActive: boolean }) => string;
  children: (state: { isActive: boolean }) => ReactNode;
  onNavigate?: () => void;
  end?: NavLinkProps['end'];
}) {
  const r = resolveLink(to);
  if (r.kind === 'route') {
    return (
      <NavLink to={r.to} end={end} className={className} onClick={onNavigate}>
        {children}
      </NavLink>
    );
  }
  const isActive = !!active;
  if (r.kind === 'disabled') {
    return (
      <span aria-disabled="true" title={PREVIEW_DISABLED_TITLE} className={cn(className({ isActive: false }), 'cursor-not-allowed opacity-50')}>
        {children({ isActive: false })}
      </span>
    );
  }
  return (
    <Link
      to={r.to}
      aria-current={isActive ? 'location' : undefined}
      className={className({ isActive })}
      onClick={() => {
        scrollToSection(r.sectionId);
        onNavigate?.();
      }}
    >
      {children({ isActive })}
    </Link>
  );
}
