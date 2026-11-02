'use client';

/**
 * React Router–compatible API on top of Next.js App Router, so the redesign's
 * components keep their original code: Link, NavLink, useLocation, useNavigate,
 * useSearchParams and useParams.
 *
 * Links to routes that are not part of the redesign (client portal, sign-in,
 * payment response, offers…) render a plain <a> so the browser does a full page
 * load: those pages use the original site's layout and stylesheet.
 */
import NextLink from 'next/link';
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';
import { forwardRef, useCallback, useEffect, useMemo, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { isRedesignPath } from '@/lib/redesign/routes';

type To = string;

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: To;
  replace?: boolean;
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, replace, ...rest }, ref) {
  // External, mail/tel, new-tab and non-redesign routes: plain anchor
  if (/^(https?:|mailto:|tel:)/.test(to) || rest.target === '_blank' || !isRedesignPath(to)) {
    return <a ref={ref} href={to} {...rest} />;
  }
  return <NextLink ref={ref} href={to} replace={replace} {...rest} />;
});

type NavClassName = string | ((state: { isActive: boolean; isPending: boolean }) => string | undefined);

type NavState = { isActive: boolean; isPending: boolean };

export interface NavLinkProps extends Omit<LinkProps, 'className' | 'children'> {
  end?: boolean;
  className?: NavClassName;
  children?: ReactNode | ((state: NavState) => ReactNode);
}

export function isActivePath(pathname: string, to: string, end?: boolean) {
  const target = to.split(/[?#]/)[0] || '/';
  if (end || target === '/') return pathname === target;
  return pathname === target || pathname.startsWith(target.endsWith('/') ? target : `${target}/`);
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink({ to, end, className, children, ...rest }, ref) {
  const pathname = usePathname() ?? '/';
  const state: NavState = { isActive: isActivePath(pathname, to, end), isPending: false };
  const cls = typeof className === 'function' ? className(state) : className;
  return (
    <Link ref={ref} to={to} className={cls} aria-current={state.isActive ? 'page' : undefined} {...rest}>
      {typeof children === 'function' ? children(state) : children}
    </Link>
  );
});

/** pathname is available during server rendering; search and hash after mount. */
export function useLocation() {
  const pathname = usePathname() ?? '/';
  const [extra, setExtra] = useState({ search: '', hash: '' });
  useEffect(() => {
    const read = () => setExtra({ search: window.location.search, hash: window.location.hash });
    read();
    window.addEventListener('hashchange', read);
    window.addEventListener('popstate', read);
    return () => {
      window.removeEventListener('hashchange', read);
      window.removeEventListener('popstate', read);
    };
  }, [pathname]);
  // `key` changes on every navigation, like React Router's location.key
  return { pathname, ...extra, key: `${pathname}${extra.search}${extra.hash}` };
}

export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to: To | number, opts?: { replace?: boolean }) => {
      if (typeof to === 'number') return router.back();
      if (!isRedesignPath(to)) {
        window.location.assign(to);
        return;
      }
      if (opts?.replace) router.replace(to);
      else router.push(to);
    },
    [router],
  );
}

type ParamsInit = URLSearchParams | Record<string, string> | string;

/** Must be used below a <Suspense> boundary (the route's page.tsx provides one). */
export function useSearchParams(): [URLSearchParams, (next: ParamsInit, opts?: { replace?: boolean }) => void] {
  const params = useNextSearchParams();
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const current = useMemo(() => new URLSearchParams(params?.toString() ?? ''), [params]);
  const set = useCallback(
    (next: ParamsInit, opts?: { replace?: boolean }) => {
      const qs = new URLSearchParams(next as Record<string, string>).toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (opts?.replace) router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    },
    [pathname, router],
  );
  return [current, set];
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): Partial<T> {
  return (useNextParams() ?? {}) as Partial<T>;
}
