import type { Metadata } from "next";
import { TokenView } from "@/components/token/token-view";
import { readTokenSnapshot } from "@/lib/server/chain-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Token",
  description: "VIRE token details, contract address, and what is live versus roadmap.",
};

export default async function TokenPage() {
  const snapshot = await readTokenSnapshot();
  return <TokenView snapshot={snapshot} />;
}
