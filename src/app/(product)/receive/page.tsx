import type { Metadata } from "next";
import { ReceiveFlow } from "@/components/payments/receive-flow";

export const metadata: Metadata = { title: "Receive" };

export default function ReceivePage() {
  return <ReceiveFlow />;
}
