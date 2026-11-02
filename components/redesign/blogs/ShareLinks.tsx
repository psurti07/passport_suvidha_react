'use client';

import { useState } from 'react';
import { Check, Facebook, Link2, Linkedin, MessageCircle, Twitter } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

/** Share links — plain URLs, no third-party scripts or trackers. */
export function ShareLinks({ url, title, className }: { url: string; title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'X', icon: Twitter, href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  const btn = 'grid h-10 w-10 place-items-center rounded-full border border-line-300 text-ink-700 transition-colors hover:border-navy-700 hover:bg-navy-700 hover:text-white';
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="mr-1 text-small font-semibold text-ink-500">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Share on ${l.label} (opens in a new tab)`}>
          <l.icon className="h-4 w-4" aria-hidden />
        </a>
      ))}
      <button type="button" onClick={copy} className={btn} aria-label={copied ? 'Link copied' : 'Copy link'}>
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </div>
  );
}
