import type { Metadata } from "next";
import { QrTools } from "@/components/payments/qr-tools";

export const metadata: Metadata = { title: "QR" };

export default function QrPage() {
  return <QrTools />;
}
