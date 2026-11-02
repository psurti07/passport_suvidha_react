'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, MessageSquareText, PencilLine, RotateCw } from 'lucide-react-redesign';
import { OtpInput } from '@/components/redesign/apply/OtpInput';
import { StepFrame } from '@/components/redesign/apply/StepFrame';
import { OTP_CONFIG } from '@/lib/redesign/config/applyFlow';
import { applicationAdapter } from '@/lib/redesign/services/applicationService';
import { useSubmitLock, type ApplyWizard } from '@/lib/redesign/hooks/useApplyWizard';
import { cn } from '@/lib/redesign/utils/cn';

type Status = 'idle' | 'verifying' | 'error' | 'expired' | 'success';

const mask = (m: string) => `+91 ${m.slice(0, 2)}••••${m.slice(-4)}`;
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function VerifyStep({ wizard }: { wizard: ApplyWizard }) {
  const demo = applicationAdapter.demo;
  const { mobile } = wizard.data.basic;
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(OTP_CONFIG.resendAfterSeconds);
  const [resending, setResending] = useState(false);
  const { run } = useSubmitLock();
  const doneTimer = useRef<number>();

  // Resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [secondsLeft]);

  useEffect(() => () => window.clearTimeout(doneTimer.current), []);

  const focusFirstBox = () => requestAnimationFrame(() => document.querySelector<HTMLInputElement>('input[name="otp"]')?.focus());

  const verify = (value = code) => {
    if (value.length < OTP_CONFIG.length) {
      setStatus('error');
      setMessage(`Please enter all ${OTP_CONFIG.length} digits.`);
      return;
    }
    void run(async () => {
      setStatus('verifying');
      setMessage(null);
      const res = await applicationAdapter.verifyOtp(wizard.data.basic, value);
      if (res.ok) {
        setStatus('success');
        wizard.markVerified(mobile);
        const next = res.data.nextStep;
        // Editing from review: the new number is verified, so go straight back
        doneTimer.current = window.setTimeout(
          () => (wizard.editing ? wizard.completeEdit() : wizard.goTo(next === 'basic' || next === 'verify' ? 'family' : next)),
          900,
        );
        return;
      }
      setCode('');
      setStatus(res.code === 'expired-otp' ? 'expired' : 'error');
      setMessage(res.message);
      if (res.code === 'expired-otp') setSecondsLeft(0);
      focusFirstBox();
    });
  };

  const resend = async () => {
    if (resending || secondsLeft > 0) return;
    setResending(true);
    const res = await applicationAdapter.sendOtp(wizard.data.basic);
    setResending(false);
    if (res.ok) {
      setCode('');
      setStatus('idle');
      // The test environment sends nothing, so it must not say a code was sent
      setMessage(demo ? 'You can enter a new code now.' : 'A new code has been sent.');
      setSecondsLeft(res.data.resendAfterSeconds);
      focusFirstBox();
    } else {
      setStatus('error');
      setMessage(res.message);
    }
  };

  const busy = status === 'verifying' || status === 'success';

  return (
    <StepFrame
      title="Verify your mobile number"
      description={
        demo ? (
          // Neutral on purpose: nothing is sent in the test environment
          <>
            Enter the {OTP_CONFIG.length}-digit verification code for <strong className="font-semibold text-ink-900">{mask(mobile)}</strong>.
          </>
        ) : (
          <>
            Enter the {OTP_CONFIG.length}-digit code sent by SMS to <strong className="font-semibold text-ink-900">{mask(mobile)}</strong>.
          </>
        )
      }
      onSubmit={() => verify()}
      onBack={() => wizard.goTo('basic')}
      submitLabel="Verify code"
      busy={busy}
      busyLabel={status === 'success' ? 'Continuing…' : 'Verifying…'}
      // Focus goes straight to the first code box (autoFocus) instead of the heading
      focusOnMount={false}
    >
      <div className="rounded-xl border border-line-200 bg-paper-alt/60 px-4 py-6 text-center sm:px-6">
        <span
          aria-hidden
          className={cn(
            'mx-auto grid h-12 w-12 place-items-center rounded-full transition-colors duration-base',
            status === 'success' ? 'bg-success/10 text-success' : 'bg-navy-50 text-navy-700',
          )}
        >
          {status === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
        </span>
        <p id="otp-label" className="mt-3 text-[0.9375rem] font-semibold text-ink-900">
          Enter the {OTP_CONFIG.length}-digit code
        </p>

        <div className="mt-4">
          <OtpInput
            length={OTP_CONFIG.length}
            value={code}
            onChange={(v) => {
              setCode(v);
              if (status === 'error' || status === 'expired') setStatus('idle');
            }}
            onComplete={(v) => verify(v)}
            disabled={busy}
            state={status === 'error' || status === 'expired' ? 'error' : status === 'success' ? 'success' : 'idle'}
            describedBy="otp-label otp-message"
            autoFocus
          />
        </div>

        <div id="otp-message" aria-live="polite" className="mt-3 min-h-[1.25rem] text-small">
          {status === 'verifying' && (
            <span className="inline-flex items-center gap-1.5 text-ink-500">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Checking code…
            </span>
          )}
          {status === 'success' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              {demo ? 'Code accepted.' : 'Mobile number verified.'}
            </span>
          )}
          {(status === 'error' || status === 'expired') && message && <span className="font-medium text-danger">{message}</span>}
          {status === 'idle' && message && <span className="text-ink-500">{message}</span>}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-small">
          {secondsLeft > 0 ? (
            <span className="tabular text-ink-500">Resend code in {clock(secondsLeft)}</span>
          ) : (
            <button
              type="button"
              onClick={resend}
              disabled={resending || busy}
              className="inline-flex items-center gap-1.5 rounded font-semibold text-navy-700 underline-offset-4 hover:underline disabled:opacity-50"
            >
              <RotateCw className={cn('h-3.5 w-3.5', resending && 'animate-spin')} aria-hidden />
              {resending ? 'Sending…' : 'Resend code'}
            </button>
          )}
          <button
            type="button"
            onClick={() => wizard.goTo('basic')}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded font-semibold text-navy-700 underline-offset-4 hover:underline disabled:opacity-50"
          >
            <PencilLine className="h-3.5 w-3.5" aria-hidden />
            Change number
          </button>
        </div>
      </div>
    </StepFrame>
  );
}
