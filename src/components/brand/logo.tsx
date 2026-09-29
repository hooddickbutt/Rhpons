import { cn } from "@/lib/cn";

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect x="1" y="1" width="30" height="30" rx="9" fill="currentColor" />
      <path
        d="M9 12.5h9.2M9 16.5h6.2M9 20.5h4"
        stroke="var(--brass)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M18.2 14.2 22.6 16.5 18.2 18.8"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="size-8 text-primary" title="Vire" />
      <span className="serif text-[1.65rem] leading-none tracking-tight">vire</span>
    </span>
  );
}

export function TokenMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <circle cx="16" cy="16" r="14" fill="var(--brass-soft)" stroke="var(--brass)" />
      <path
        d="M11 12.5 16 21l5-8.5"
        fill="none"
        stroke="var(--brass)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
