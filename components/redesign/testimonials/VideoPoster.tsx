import { Guilloche } from '@/components/redesign/common/Guilloche';

/** Branded 9:16 poster shown when a video thumbnail hasn't been added yet. */
export function VideoPoster({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy-900">
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgb(255_255_255/0.14),transparent_70%)]" />
      <Guilloche
        size={400}
        curves={16}
        lobes={7}
        strokeWidth={0.8}
        className="absolute left-1/2 top-[38%] h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 text-gold-400/20"
      />
      <p className="absolute left-5 top-5 font-mono text-[0.6875rem] tracking-[0.2em] text-white/60">
        STORY {String(index + 1).padStart(2, '0')}
      </p>
    </div>
  );
}
