"use client";

import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import { StatusPill } from "@/components/ui/status-pill";
import { useSession } from "@/components/session/session-provider";
import { assetById, getAssets, type AssetId } from "@/lib/assets";
import { publicConfig } from "@/lib/config";
import { isPositiveDecimal } from "@/lib/format";
import { buildPaymentPath, displayPaymentPath } from "@/lib/payments";

export function ReceiveFlow({
  merchant = false,
}: {
  merchant?: boolean;
}) {
  const [handle, setHandle] = useState(merchant ? "merchant" : "alex");
  const [amount, setAmount] = useState(merchant ? "" : "25");
  const [assetId, setAssetId] = useState<AssetId>("usdc");
  const [note, setNote] = useState(merchant ? "Order" : "");
  const [dynamicAmount, setDynamicAmount] = useState(merchant);
  const { addRecord } = useSession();
  const asset = assetById(assetId);
  const origin = typeof window === "undefined" ? publicConfig.appUrl : window.location.origin;
  const path = useMemo(
    () =>
      buildPaymentPath({
        handle,
        amount: dynamicAmount ? undefined : amount,
        asset: asset.id,
        note,
      }),
    [amount, asset.id, dynamicAmount, handle, note],
  );
  const url = `${origin}${path}`;
  const amountOk = dynamicAmount || isPositiveDecimal(amount);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="surface p-6 md:p-8">
        <div className="flex items-center gap-2">
          <StatusPill>Demo</StatusPill>
          <p className="text-sm text-muted">
            {merchant ? "Merchant request" : "Personal request"}
          </p>
        </div>
        <h1 className="serif mt-3 text-4xl md:text-5xl">
          {merchant ? "Request a payment" : "Receive"}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          This creates a shareable request. It is saved in this browser and does not register a
          name onchain.
        </p>
        <div className="mt-6 space-y-4">
          <Field label="Payment name" hint="Shown in the link">
            <TextInput value={handle} onChange={(event) => setHandle(event.target.value)} />
          </Field>
          {merchant ? (
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={dynamicAmount}
                onChange={(event) => setDynamicAmount(event.target.checked)}
              />
              Customer enters the amount
            </label>
          ) : null}
          {dynamicAmount ? null : (
            <Field label="Amount">
              <TextInput
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </Field>
          )}
          <div className="flex flex-wrap gap-2">
            {getAssets().map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAssetId(item.id)}
                className={`rounded-full px-4 py-2 text-sm ${
                  item.id === assetId ? "bg-primary text-primary-fg" : "border border-line"
                }`}
              >
                {item.symbol}
              </button>
            ))}
          </div>
          <Field label="Message" hint="Optional">
            <TextArea value={note} maxLength={140} onChange={(event) => setNote(event.target.value)} />
          </Field>
          <Button
            disabled={!handle.trim() || !amountOk}
            onClick={() =>
              addRecord({
                id: crypto.randomUUID(),
                kind: "request",
                title: "Payment request created",
                amount: dynamicAmount ? "Open" : amount,
                asset: asset.symbol,
                counterparty: `@${handle.replace(/^@/, "")}`,
                status: "pending",
                simulated: true,
                createdAt: new Date().toISOString(),
                filter: "payments",
              })
            }
          >
            Save request
          </Button>
        </div>
      </div>
      <aside className="surface-flat p-6">
        <p className="text-sm text-muted">Share</p>
        <p className="mt-2 break-all font-mono text-sm">{displayPaymentPath(path)}</p>
        <div className="mt-5 grid place-items-center rounded-3xl bg-white p-4">
          <QRCodeSVG value={url} size={196} bgColor="#ffffff" fgColor="#16181d" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <CopyButton value={url} label="Copy link" />
          <Button
            variant="secondary"
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({ title: "Vire payment request", url });
              } else {
                await navigator.clipboard.writeText(url);
              }
            }}
          >
            Share
          </Button>
        </div>
      </aside>
    </section>
  );
}
