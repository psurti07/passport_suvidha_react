'use client';

import { useMemo } from 'react';

interface GuillocheProps {
  /** Rendered square size in px (SVG scales with CSS too) */
  size?: number;
  /** Number of interlaced curves */
  curves?: number;
  /** Lobes per curve */
  lobes?: number;
  className?: string;
  strokeWidth?: number;
}

/**
 * Guilloché rosette — the fine interlaced line pattern printed on passports
 * and banknotes. Used as the brand's security-print texture instead of
 * generic gradients or blobs. Pure SVG, colour comes from `currentColor`.
 */
export function Guilloche({ size = 400, curves = 18, lobes = 9, className, strokeWidth = 0.6 }: GuillocheProps) {
  const paths = useMemo(() => {
    const c = 200;
    const out: string[] = [];
    for (let k = 0; k < curves; k++) {
      const phase = (k / curves) * Math.PI * 2;
      const pts: string[] = [];
      for (let i = 0; i <= 360; i++) {
        const t = (i / 360) * Math.PI * 2;
        const r = 120 + 52 * Math.sin(lobes * t + phase) * Math.cos(t * 2 - phase / 3);
        pts.push(`${(c + r * Math.cos(t)).toFixed(1)},${(c + r * Math.sin(t)).toFixed(1)}`);
      }
      out.push(`M${pts.join('L')}Z`);
    }
    return out;
  }, [curves, lobes]);

  return (
    <svg viewBox="0 0 400 400" width={size} height={size} className={className} aria-hidden focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <circle cx="200" cy="200" r="186" />
        <circle cx="200" cy="200" r="192" strokeDasharray="1 4" />
      </g>
    </svg>
  );
}
