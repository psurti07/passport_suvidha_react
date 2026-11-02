'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from '@/lib/redesign/router';
import { ArrowRight, ChevronDown } from 'lucide-react-redesign';
import type { NavLink as NavLinkType } from '@/lib/redesign/types/site';
import { services } from '@/lib/redesign/data/services';
import { ServiceIcon } from '@/components/redesign/common/icons';
import { cn } from '@/lib/redesign/utils/cn';

/**
 * Desktop "Services" menu. Opens on hover (with a small close delay so the
 * pointer can travel) and on click/Enter. Escape closes and returns focus.
 */
export function ServicesDropdown({ item }: { item: NavLinkType }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>();
  const menuId = useId();
  const { pathname } = useLocation();
  const isActive = pathname.startsWith('/services');

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Set when hover opened the menu, so the click that follows doesn't immediately close it.
  const openedByHover = useRef(false);

  const enter = () => {
    window.clearTimeout(timer.current);
    if (!open) openedByHover.current = true;
    setOpen(true);
  };
  const leave = () => {
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === 'mouse' && enter()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && leave()}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          // read the flag now — the state updater runs later, after it has been reset
          const keepOpen = openedByHover.current;
          openedByHover.current = false;
          setOpen((o) => (keepOpen ? true : !o));
        }}
        className={cn(
          'relative flex h-10 items-center gap-1 px-3 text-[0.9375rem] font-medium transition-colors duration-fast xl:px-3.5',
          isActive || open ? 'text-gold-400' : 'text-white/85 hover:text-white',
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-base ease-brand', open && 'rotate-180')} aria-hidden />
        {isActive && <span aria-hidden className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-gold-400 xl:inset-x-3.5" />}
      </button>

      {open && (
        <div id={menuId} className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3">
          <div className="animate-[dropIn_200ms_cubic-bezier(0.22,1,0.36,1)] overflow-hidden rounded-xl border border-line-200 bg-white shadow-lg">
            <ul className="grid gap-1 p-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <NavLink
                    to={`/services/${s.slug}`}
                    className={({ isActive: a }) =>
                      cn(
                        'group flex items-start gap-4 rounded-lg p-3 transition-colors duration-fast hover:bg-navy-50',
                        a && 'bg-navy-50',
                      )
                    }
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy-700 text-gold-400">
                      <ServiceIcon name={s.icon} className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2 font-semibold text-ink-900">
                        {s.name}
                        {s.isUrgent && (
                          <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[0.6875rem] font-semibold text-gold-700">Urgent</span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-small text-ink-500">{s.tagline}</span>
                    </span>
                    <ArrowRight className="mt-3 h-4 w-4 -translate-x-1 text-navy-700 opacity-0 transition-all duration-fast group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-line-200 bg-paper-alt px-6 py-3.5 text-small">
              <Link to="/services" className="font-semibold text-navy-700 hover:underline">
                View all services
              </Link>
              <Link to="/requirements" className="text-ink-500 hover:text-navy-700">
                Document requirements →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
