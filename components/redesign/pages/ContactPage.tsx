'use client';

import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, ReceiptText, Send } from 'lucide-react-redesign';
import { site } from '@/lib/redesign/data/site';
import { useForm } from '@/lib/redesign/hooks/useForm';
import { email, indianMobile, maxLength, minLength, personName, required } from '@/lib/redesign/utils/validation';
import { submitContact, type SubmitResult } from '@/lib/redesign/services/formsService';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Reveal } from '@/components/redesign/common/Reveal';
import { EmailText } from '@/components/redesign/common/EmailText';
import { Button } from '@/components/redesign/common/Button';
import { SelectField, TextAreaField, TextField } from '@/components/redesign/forms/Field';
import { FormStatus } from '@/components/redesign/forms/FormStatus';

const crumbs = [{ label: 'Contact us' }];
const subjects = [
  'Normal passport query',
  'Tatkal passport query',
  'Reissue / renewal query',
  'Documents & requirements',
  'Existing application',
  'Other',
].map((s) => ({ value: s, label: s }));

function ContactForm() {
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [sending, setSending] = useState(false);
  const form = useForm(
    { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' },
    {
      firstName: [required('Please enter your first name.'), personName(), maxLength(60)],
      lastName: [personName(), maxLength(60)],
      email: [required('Please enter your email address.'), email()],
      phone: [indianMobile()],
      subject: [required('Please choose a subject.')],
      message: [required('Please enter your message.'), minLength(10, 'Please add a little more detail (at least 10 characters).'), maxLength(2000)],
    },
  );

  const onSubmit = form.handleSubmit(async (v) => {
    setSending(true);
    setResult(null);
    const res = await submitContact({ ...v, phone: v.phone.replace(/\D/g, '') });
    setResult(res);
    setSending(false);
    if (res.kind === 'success') form.reset();
  });

  return (
    <form ref={form.formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-labelledby="form-title">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" autoComplete="given-name" required {...form.field('firstName')} />
        <TextField label="Last name" autoComplete="family-name" {...form.field('lastName')} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" type="email" autoComplete="email" inputMode="email" required {...form.field('email')} />
        <TextField label="Mobile number" type="tel" autoComplete="tel-national" inputMode="numeric" maxLength={10} prefix="+91" placeholder="9876543210" {...form.field('phone')} />
      </div>
      <SelectField label="Subject" required placeholder="Choose a subject" options={subjects} {...form.field('subject')} />
      <TextAreaField
        label="Message"
        required
        placeholder="Describe your query. For example: I need help with passport renewal and would like guidance on the required documents."
        {...form.field('message')}
      />
      <p className="text-small text-ink-500">
        Please don’t include Aadhaar, PAN or passport numbers in this message.
      </p>
      <FormStatus result={result} successMessage="Thanks — our team will reply by email within 24–48 hours." />
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={sending} iconRight={<Send className="h-4 w-4" />}>
        {sending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}

export default function ContactPage() {

  const channels = [
    { icon: Phone, title: 'Phone support', value: site.phone.display, href: site.phone.href, note: `${site.hoursShort}` },
    { icon: Mail, title: 'Email support', value: site.email.display, href: site.email.href, note: 'Responses within 24–48 hours' },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Get in touch"
        title="We’re here to help."
        description="Questions about documents, services or an application in progress? Call, email or send us a message."
      />

      <section className="section-y !pt-10" aria-label="Contact options">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <Reveal className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 id="form-title" className="text-h3">
              Send us a message
            </h2>
            <p className="mt-2 text-ink-500">Fill in the form and we’ll get back to you as soon as possible.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="space-y-5">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <a href={c.href} className="group flex min-w-0 gap-4 rounded-2xl border border-line-200 bg-white p-6 transition-[border-color,box-shadow] hover:border-navy-200 hover:shadow-md">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-700 text-gold-400">
                    <c.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-small text-ink-500">{c.title}</span>
                    {c.href.startsWith('mailto:') ? (
                      <EmailText email={c.value} className="block text-[0.9375rem] font-semibold leading-snug text-ink-900 group-hover:text-navy-700 sm:text-base" />
                    ) : (
                      <span className="block text-[0.9375rem] font-semibold leading-snug text-ink-900 group-hover:text-navy-700 sm:text-base">{c.value}</span>
                    )}
                    <span className="mt-1 block text-small text-ink-500">{c.note}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={120} className="rounded-2xl border border-line-200 bg-white p-6">
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-small text-ink-500">Main office</p>
                  <address className="mt-1 not-italic text-ink-900">
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-small font-semibold text-navy-700 hover:underline">
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="mt-5 flex gap-4 border-t border-line-200 pt-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <ReceiptText className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-small text-ink-500">GST number</p>
                  <p className="mt-1 font-semibold text-ink-900">{site.gstNumber}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180} className="rounded-2xl bg-navy-700 p-6 text-navy-100">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Clock className="h-5 w-5 text-gold-400" aria-hidden /> Hours of operation
              </p>
              <dl className="mt-4 divide-y divide-white/10">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-3 text-small">
                    <dt>{h.days}</dt>
                    <dd className="font-semibold text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
