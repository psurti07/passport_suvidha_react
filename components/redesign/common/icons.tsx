import { Facebook, FileText, Instagram, Linkedin, Pin, RefreshCw, Twitter, Youtube, Zap, type LucideProps } from 'lucide-react-redesign';
import type { Service } from '@/lib/redesign/types/service';
import type { SocialIcon as SocialIconName } from '@/lib/redesign/data/site';

const serviceIcons = { 'file-text': FileText, zap: Zap, refresh: RefreshCw } as const;

export function ServiceIcon({ name, ...props }: { name: Service['icon'] } & LucideProps) {
  const Icon = serviceIcons[name];
  return <Icon strokeWidth={1.75} {...props} />;
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  x: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  pinterest: Pin,
} as const;

export function SocialIcon({ name, ...props }: { name: SocialIconName } & LucideProps) {
  const Icon = socialIcons[name];
  return <Icon strokeWidth={1.75} {...props} />;
}
