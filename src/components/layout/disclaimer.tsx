import { brand } from "@/lib/brand";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p className={compact ? "text-xs leading-5 text-faint" : "text-sm leading-6 text-muted"}>
      {brand.disclaimer} {brand.networkNote}
    </p>
  );
}
