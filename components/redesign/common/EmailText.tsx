import { cn } from '@/lib/redesign/utils/cn';

/**
 * Displays an email address that can wrap cleanly in narrow cards: the preferred
 * break point is right after "@" (support@ / passportsuvidha.com). `<wbr>` adds no
 * characters, so the address stays complete when selected or copied, and
 * `overflow-wrap: anywhere` is a last-resort guard so it never spills out of its box.
 */
export function EmailText({ email, className }: { email: string; className?: string }) {
  const at = email.indexOf('@');
  if (at < 0) return <span className={cn('[overflow-wrap:anywhere]', className)}>{email}</span>;
  return (
    <span className={cn('[overflow-wrap:anywhere]', className)}>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </span>
  );
}
