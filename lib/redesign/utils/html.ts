import DOMPurify from 'dompurify';
import type { TocItem } from '@/components/redesign/blogs/TableOfContents';
import { slugify } from './text';

/**
 * Sanitises CMS/backend HTML and makes sure every h2/h3 has a unique id so
 * the table of contents can link to it. Returns the safe HTML and the headings.
 */
export function prepareArticleHtml(raw: string): { html: string; toc: TocItem[] } {
  const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
  const doc = new DOMParser().parseFromString(`<div>${clean}</div>`, 'text/html');
  const root = doc.body.firstElementChild as HTMLElement;
  const used = new Set<string>();
  const toc: TocItem[] = [];

  root.querySelectorAll('h1').forEach((h) => {
    // The page already has an H1 (the title) — demote any H1 in the body.
    const h2 = doc.createElement('h2');
    h2.innerHTML = h.innerHTML;
    h.replaceWith(h2);
  });

  root.querySelectorAll('h2, h3').forEach((h) => {
    const text = h.textContent?.trim() ?? '';
    let id = h.id || slugify(text) || 'section';
    let n = 2;
    while (used.has(id)) id = `${slugify(text)}-${n++}`;
    used.add(id);
    h.id = id;
    toc.push({ id, text, level: h.tagName === 'H3' ? 3 : 2 });
  });

  root.querySelectorAll('a[href^="http"]').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  return { html: root.innerHTML, toc };
}
