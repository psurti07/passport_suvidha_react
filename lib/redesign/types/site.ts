export interface NavLink {
  label: string;
  to: string;
  children?: Array<{ label: string; to: string; description?: string }>;
  /** Only shown in the desktop bar from the xl breakpoint (always in the mobile menu) */
  wideOnly?: boolean;
}

export interface SiteStat {
  id: string;
  value: string;
  label: string;
  /** false = number not yet confirmed by the client; UI shows a "To be confirmed" marker */
  verified: boolean;
}
