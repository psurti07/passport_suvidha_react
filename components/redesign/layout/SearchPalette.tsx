'use client';

import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getPortalRoot } from '@/lib/redesign/utils/portal';
import { ArrowRight, CornerDownLeft, Search, X } from 'lucide-react-redesign';
import { useNavigate } from '@/lib/redesign/router';
import { faqs } from '@/lib/redesign/data/faqs';
import { services } from '@/lib/redesign/data/services';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE, scrollToSection } from '@/lib/redesign/config/preview';
import { BLOG_ENABLED } from '@/lib/redesign/config/content';
import { useDialog } from '@/lib/redesign/hooks/useDialog';

interface Entry {
  id: string;
  title: string;
  hint: string;
  section: string;
  /** Page to open when the full website is live (preview mode uses `section`). */
  to?: string;
}

/** Pages, services and FAQs, searchable in one place (no backend needed). */
const ENTRIES: Entry[] = [
  { id: 's-services', title: 'Passport services', hint: 'Normal · Tatkal · Reissue', section: HOME_SECTIONS.services, to: '/services' },
  ...services.map((s) => ({ id: `svc-${s.slug}`, title: s.name, hint: s.tagline, section: HOME_SECTIONS.services, to: `/services/${s.slug}` })),
  { id: 's-how', title: 'How it works', hint: 'Four steps to your appointment', section: HOME_SECTIONS.howItWorks },
  { id: 's-req', title: 'Documents & requirements', hint: 'Fresh, reissue and minor checklists', section: HOME_SECTIONS.requirements, to: '/requirements' },
  { id: 's-about', title: 'Why Passport Suvidha', hint: 'About our consultancy', section: HOME_SECTIONS.about, to: '/about' },
  { id: 's-customers', title: 'Customer stories', hint: 'Applicants across India', section: HOME_SECTIONS.customers, to: '/testimonials' },
  ...(BLOG_ENABLED ? [{ id: 's-blog', title: 'Insights & guides', hint: 'Latest articles', section: HOME_SECTIONS.blog, to: '/blogs' }] : []),
  { id: 's-contact', title: 'Contact & office location', hint: 'Phone, email, Surat office', section: HOME_SECTIONS.contact, to: '/contact' },
  ...faqs.map((f) => ({ id: `faq-${f.id}`, title: f.question, hint: 'FAQ', section: HOME_SECTIONS.faq, to: `/faq?q=${encodeURIComponent(f.question)}` })),
];

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useDialog(open, panelRef, onClose);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = term ? ENTRIES.filter((e) => `${e.title} ${e.hint}`.toLowerCase().includes(term)) : ENTRIES.slice(0, 8);
    return list.slice(0, 8);
  }, [q]);

  if (!open) return null;

  const go = (e: Entry) => {
    onClose();
    setQ('');
    if (!HOMEPAGE_PREVIEW_MODE && e.to) {
      navigate(e.to);
      return;
    }
    navigate(`/#${e.section}`);
    window.setTimeout(() => scrollToSection(e.section), 60);
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 animate-[fadeIn_150ms_ease-out] bg-navy-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="relative w-full max-w-xl animate-[modalIn_220ms_cubic-bezier(0.22,1,0.36,1)] overflow-hidden rounded-2xl bg-white shadow-lg"
      >
        <div className="flex items-center gap-3 border-b border-line-200 px-4">
          <Search className="h-5 w-5 shrink-0 text-ink-400" aria-hidden />
          <label htmlFor="site-search" className="sr-only">
            Search services, documents and FAQs
          </label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setCursor(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setCursor((c) => Math.min(c + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              } else if (e.key === 'Enter' && results[cursor]) {
                e.preventDefault();
                go(results[cursor]);
              }
            }}
            placeholder="Search services, documents, FAQs…"
            className="h-14 flex-1 bg-transparent text-[1rem] text-ink-900 placeholder:text-ink-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            role="combobox"
            aria-expanded="true"
            aria-controls="site-search-results"
            aria-activedescendant={results[cursor] ? `sr-${results[cursor].id}` : undefined}
          />
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-ink-500 hover:bg-navy-50" aria-label="Close search">
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul id="site-search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-small text-ink-500">No matches. Try “Tatkal”, “documents” or “fee”.</li>}
          {results.map((r, i) => (
            <li key={r.id} id={`sr-${r.id}`} role="option" aria-selected={i === cursor}>
              <button
                type="button"
                onMouseEnter={() => setCursor(i)}
                onClick={() => go(r)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${i === cursor ? 'bg-navy-50' : ''}`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-medium text-ink-900">{r.title}</span>
                  <span className="block truncate text-[0.8125rem] text-ink-500">{r.hint}</span>
                </span>
                {i === cursor ? <CornerDownLeft className="h-4 w-4 text-navy-500" aria-hidden /> : <ArrowRight className="h-4 w-4 text-ink-400" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    getPortalRoot(),
  );
}
