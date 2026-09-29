import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const stages = [
  ["preparing", "Preparing"],
  ["awaiting_wallet", "Awaiting wallet confirmation"],
  ["submitting", "Submitting"],
  ["pending", "Pending"],
  ["confirmed", "Confirmed"],
] as const;

export type TxState = (typeof stages)[number][0] | "failed";

export function TxStages({ state }: { state: TxState }) {
  const activeIndex = state === "failed" ? 3 : stages.findIndex((item) => item[0] === state);
  return (
    <ol className="space-y-3" aria-live="polite">
      {stages.map(([id, label], index) => {
        const done = state !== "failed" && index < activeIndex;
        const current = id === state;
        const failedHere = state === "failed" && index === activeIndex;
        return (
          <li key={id} className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full border text-xs",
                done || state === "confirmed" && id === "confirmed"
                  ? "border-positive bg-positive text-bg"
                  : current
                    ? "border-brass text-brass"
                    : "border-line text-faint",
                failedHere && "border-danger text-danger",
              )}
            >
              {done || (state === "confirmed" && id === "confirmed") ? <Check size={14} /> : index + 1}
            </span>
            <span className={cn("text-sm", current || done ? "text-fg" : "text-faint")}>
              {failedHere ? "Failed" : label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function SuccessMark() {
  return (
    <svg viewBox="0 0 72 72" className="size-16" aria-hidden>
      <circle cx="36" cy="36" r="30" fill="none" stroke="var(--positive)" strokeWidth="2" />
      <path
        className="draw-check"
        d="M24 37.5 32.5 46 49 28"
        fill="none"
        stroke="var(--positive)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
