"use client";

import { useSearchParams } from "next/navigation";
import { SendFlow } from "@/components/payments/send-flow";

export function PayEntry() {
  const params = useSearchParams();
  return (
    <SendFlow
      initialTo={params.get("to") ?? ""}
      initialAmount={params.get("amount") ?? ""}
      initialAsset={params.get("asset") ?? "eth"}
      initialNote={params.get("note") ?? ""}
    />
  );
}
