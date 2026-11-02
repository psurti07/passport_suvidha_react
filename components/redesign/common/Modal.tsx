'use client';

import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { getPortalRoot } from '@/lib/redesign/utils/portal';
import { X } from 'lucide-react-redesign';
import { useDialog } from '@/lib/redesign/hooks/useDialog';
import { cn } from '@/lib/redesign/utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible title (visually hidden unless `showTitle`) */
  title: string;
  showTitle?: boolean;
  children: ReactNode;
  className?: string;
  /** "dark" is used for media (video) viewing */
  tone?: 'light' | 'dark';
}

/** Accessible modal dialog: portal, focus trap, Escape to close, scroll lock, backdrop click. */
export function Modal({ open, onClose, title, showTitle, children, className, tone = 'light' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(open, panelRef, onClose);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <div
        className={cn(
          'absolute inset-0 animate-[fadeIn_200ms_ease-out] backdrop-blur-sm',
          tone === 'dark' ? 'bg-navy-900/90' : 'bg-navy-900/50',
        )}
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn('relative animate-[modalIn_250ms_cubic-bezier(0.22,1,0.36,1)] outline-none', className)}
      >
        {showTitle && <h2 className="mb-4 text-h3">{title}</h2>}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'absolute right-2 top-2 z-10 grid h-11 w-11 place-items-center rounded-full transition-colors sm:-right-14 sm:top-0',
            tone === 'dark'
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-white text-ink-900 shadow-sm hover:bg-navy-50',
          )}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    getPortalRoot(),
  );
}
