import { cn } from "@/lib/cn";

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <span
      className={cn(
        "inline-grid size-9 shrink-0 rounded-[30%] bg-[linear-gradient(145deg,#fff8ea,#e7c98a_46%,#8d6232)] p-[1.5px] shadow-[0_10px_24px_rgba(28,20,8,0.22)]",
        className,
      )}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <svg viewBox="0 0 32 32" className="size-full rounded-[28%]" aria-hidden>
        <rect width="32" height="32" rx="8" fill="#12141A" />
        <path
          d="M8.2 9.2 16 23.8 23.8 9.2"
          fill="none"
          stroke="#E7C98A"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23.8" cy="9.2" r="1.55" fill="#F7F1E6" />
      </svg>
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark title="Vire" />
      <span className="serif text-[1.7rem] leading-none tracking-[-0.04em]">Vire</span>
    </span>
  );
}

export function TokenMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-grid size-9 shrink-0 rounded-full bg-[linear-gradient(145deg,#fff8ea,#e7c98a_46%,#8d6232)] p-[1.5px]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="size-full">
        <circle cx="16" cy="16" r="15" fill="#12141A" />
        <circle cx="16" cy="16" r="11.5" fill="none" stroke="#E7C98A" strokeWidth="1.2" />
        <path
          d="M10.5 11.2 16 22.2 21.5 11.2"
          fill="none"
          stroke="#E7C98A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
