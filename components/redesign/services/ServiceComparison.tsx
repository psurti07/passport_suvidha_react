'use client';

import { Link } from '@/lib/redesign/router';
import { ArrowRight } from 'lucide-react-redesign';
import type { ReactNode } from 'react';
import { services } from '@/lib/redesign/data/services';
import { PlaceholderMarker } from '@/components/redesign/common/Badge';

type Row = { label: string; values: ReactNode[] };

const rows: Row[] = [
  { label: 'Best for', values: ['Planned travel', 'Urgent travel', 'Renewing or updating a passport'] },
  { label: 'Scheme', values: ['Normal', 'Tatkal', 'Normal or Tatkal'] },
  { label: 'Booklet', values: ['36 or 60 pages', '36 or 60 pages', '36 or 60 pages'] },
  { label: 'Validity (adults)', values: ['10 years', '10 years', '10 years'] },
  { label: 'Our consultancy fee', values: services.map((s) => <PlaceholderMarker key={s.slug} />) },
  {
    label: 'Government fee',
    values: services.map((s) => <span key={s.slug}>Paid separately on the official portal</span>),
  },
];

/** Side-by-side comparison: a table on tablet/desktop, stacked cards on mobile. */
export function ServiceComparison() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-line-200 bg-white md:block">
        <table className="w-full text-left text-[0.9375rem]">
          <caption className="sr-only">Comparison of Passport Suvidha services</caption>
          <thead>
            <tr className="bg-paper-alt">
              <th scope="col" className="w-[22%] px-6 py-5 text-small font-semibold text-ink-500">
                Service
              </th>
              {services.map((s) => (
                <th key={s.slug} scope="col" className="px-6 py-5">
                  <span className="text-[1.0625rem] font-semibold text-ink-900">{s.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line-200">
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="px-6 py-4 text-small font-medium text-ink-500">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className="px-6 py-4 font-medium text-ink-900">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-6 py-5" />
              {services.map((s) => (
                <td key={s.slug} className="px-6 py-5">
                  <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:underline">
                    View details <ArrowRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">for {s.name}</span>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="grid gap-4 md:hidden">
        {services.map((s, si) => (
          <li key={s.slug} className="rounded-2xl border border-line-200 bg-white p-6">
            <h3 className="text-h3">{s.name}</h3>
            <dl className="mt-4 divide-y divide-dashed divide-line-300 text-small">
              {rows.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-4 py-3">
                  <dt className="text-ink-500">{r.label}</dt>
                  <dd className="text-right font-medium text-ink-900">{r.values[si]}</dd>
                </div>
              ))}
            </dl>
            <Link to={`/services/${s.slug}`} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-navy-700">
              View details <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
