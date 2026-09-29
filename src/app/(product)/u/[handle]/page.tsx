import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAddress } from "viem";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { StatusPill } from "@/components/ui/status-pill";
import { findPreviewProfile } from "@/lib/preview";
import { buildPaymentPath } from "@/lib/payments";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  return { title: `@${handle}` };
}

export default async function PublicProfilePage({ params }: Props) {
  const { handle } = await params;
  const decoded = decodeURIComponent(handle);
  const preview = findPreviewProfile(decoded);
  const addressProfile = isAddress(decoded);
  if (!preview && !addressProfile) notFound();

  const name = preview?.name ?? "Wallet";
  const bio = preview
    ? preview.bio
    : "This page shows a wallet address. It does not verify who controls it beyond the address itself.";
  const payHref = buildPaymentPath({
    handle: preview?.handle ?? decoded,
    asset: "eth",
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <StatusPill>{preview ? "Demo" : "Live"}</StatusPill>
      <div className="flex items-center gap-4">
        <span className="grid size-16 place-items-center rounded-full bg-brass-soft text-xl">
          {name.slice(0, 1)}
        </span>
        <div>
          <h1 className="serif text-4xl">{preview ? `@${preview.handle}` : "Address"}</h1>
          <p className="text-muted">{name}</p>
        </div>
      </div>
      <p className="text-sm leading-7 text-muted">{bio}</p>
      {preview ? (
        <p className="text-sm leading-6 text-muted">
          Example profile. The address below is not a payable destination for a real transfer.
        </p>
      ) : null}
      <div className="surface-flat p-5">
        <p className="text-xs uppercase tracking-wide text-faint">Address</p>
        <p className="mt-2 break-all font-mono text-sm">{preview?.address ?? decoded}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <CopyButton value={preview?.address ?? decoded} label="Copy address" />
          <Button href={payHref}>Send payment</Button>
        </div>
      </div>
      <section className="surface-flat p-5">
        <h2 className="text-lg">Payment history</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Public chain history is not indexed here. A profile owner can hide local activity in
          their own browser, which does not remove public transactions.
        </p>
      </section>
    </div>
  );
}
