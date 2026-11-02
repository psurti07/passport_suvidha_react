import type { ServiceCode, ServicePricing } from '@/lib/redesign/types/application';

/**
 * Preview fees for the Apply Now payment screen.
 *
 * NOT VERIFIED. These figures are placeholders for the design preview and must be
 * confirmed by Passport Suvidha before launch. When a backend is connected, the
 * HTTP adapter loads live pricing from the API instead and this file is unused.
 *
 *   serviceCharge — consultancy fee before GST, in rupees
 *   GST_RATE      — applied on top of the service charge (18% on the current site)
 *
 * The test-environment indicator says these are placeholders; production never uses them.
 * Government passport fees are separate and paid on the official portal; they are
 * never part of this breakdown.
 */
export const GST_RATE = 0.18;

export const PREVIEW_FEES: Record<ServiceCode, { name: string; serviceCharge: number }> = {
  NP36: { name: 'Normal passport', serviceCharge: 999 },
  NP60: { name: 'Normal passport', serviceCharge: 999 },
  TP36: { name: 'Tatkal passport', serviceCharge: 999 },
  TP60: { name: 'Tatkal passport', serviceCharge: 999 },
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export function previewPricing(code: ServiceCode): ServicePricing {
  const { name, serviceCharge } = PREVIEW_FEES[code];
  const gst = round2(serviceCharge * GST_RATE);
  return { serviceName: name, serviceCharge, gst, total: round2(serviceCharge + gst), currency: 'INR' };
}
