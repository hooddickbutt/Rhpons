import type { Metadata } from "next";
import { MerchantView } from "@/components/merchant/merchant-view";

export const metadata: Metadata = { title: "Merchant" };

export default function MerchantPage() {
  return <MerchantView />;
}
