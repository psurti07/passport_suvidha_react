import { Guilloche } from '@/components/redesign/common/Guilloche';
import { cn } from '@/lib/redesign/utils/cn';

const palettes = [
  'bg-navy-700 text-gold-400/30',
  'bg-paper-warm text-navy-700/15',
  'bg-navy-900 text-white/10',
  'bg-navy-50 text-navy-700/15',
];

/** Branded cover used when a post has no featured image (or it fails to load). */
export function BlogCover({ seed, label, className }: { seed: string; label?: string; className?: string }) {
  const hash = [...seed].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  const palette = palettes[hash % palettes.length];
  const dark = palette.includes('navy-700') || palette.includes('navy-900');
  return (
    <div className={cn('absolute inset-0 overflow-hidden', palette, className)}>
      <Guilloche size={500} curves={14 + (hash % 8)} lobes={5 + (hash % 6)} className="absolute -right-24 top-1/2 h-[160%] w-auto -translate-y-1/2" strokeWidth={0.8} />
      {label && (
        <span className={cn('absolute bottom-4 left-5 text-eyebrow uppercase', dark ? 'text-white/70' : 'text-navy-700/70')}>{label}</span>
      )}
    </div>
  );
}
