import { Suspense } from "react";
import type { Metadata } from "next";
import { PayEntry } from "@/components/payments/pay-entry";

export const metadata: Metadata = { title: "Pay" };

export default function PayPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto h-80 max-w-xl" />}>
      <PayEntry />
    </Suspense>
  );
}
