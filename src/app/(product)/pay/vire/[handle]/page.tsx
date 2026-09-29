import type { Metadata } from "next";
import { SendFlow } from "@/components/payments/send-flow";
import { StatusPill } from "@/components/ui/status-pill";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ amount?: string; asset?: string; note?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  return { title: `Pay @${handle}` };
}

export default async function PaymentLinkPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const query = await searchParams;
  return (
    <div className="space-y-4">
      <div className="mx-auto flex max-w-5xl items-center gap-2">
        <StatusPill>Demo</StatusPill>
        <p className="text-sm text-muted">pay/vire/{handle}</p>
      </div>
      <SendFlow
        initialTo={handle}
        initialAmount={query.amount ?? ""}
        initialAsset={query.asset ?? "eth"}
        initialNote={query.note ?? ""}
      />
    </div>
  );
}
