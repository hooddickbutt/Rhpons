import { cn } from "@/lib/cn";

const tones = {
  Live: "text-positive bg-[color-mix(in_oklab,var(--positive)_14%,transparent)]",
  Demo: "text-warning bg-[color-mix(in_oklab,var(--warning)_16%,transparent)]",
  Preview: "text-warning bg-[color-mix(in_oklab,var(--warning)_16%,transparent)]",
  Estimated: "text-muted bg-sunken",
  Historical: "text-muted bg-sunken",
  Unavailable: "text-muted bg-sunken",
  Reading: "text-muted bg-sunken",
  Roadmap: "text-brass bg-brass-soft",
  Confirmed: "text-positive bg-[color-mix(in_oklab,var(--positive)_14%,transparent)]",
  Pending: "text-warning bg-[color-mix(in_oklab,var(--warning)_16%,transparent)]",
  Failed: "text-danger bg-[color-mix(in_oklab,var(--danger)_14%,transparent)]",
} as const;

export function StatusPill({
  children,
  className,
}: {
  children: keyof typeof tones | string;
  className?: string;
}) {
  const tone = tones[children as keyof typeof tones] ?? tones.Unavailable;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase",
        tone,
        className,
      )}
    >
      {children}
    </span>
  );
}
