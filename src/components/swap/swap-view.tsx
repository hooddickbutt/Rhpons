"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { getAssets, type AssetId } from "@/lib/assets";
import { publicConfig } from "@/lib/config";

export function SwapView() {
  const [pay, setPay] = useState<AssetId>("eth");
  const [receive, setReceive] = useState<AssetId>("vire");
  const [amount, setAmount] = useState("");
  const routerReady = Boolean(publicConfig.swapRouterAddress);

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div>
        <h1 className="serif text-4xl md:text-5xl">Swap</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Quotes below are not prices. A swap can be confirmed only after a router contract is
          configured and your wallet signs it.
        </p>
      </div>
      <section className="surface p-5">
        <SwapCard title="You pay" asset={pay} onAsset={setPay} amount={amount} onAmount={setAmount} />
        <div className="my-3 text-center text-sm text-faint">↓</div>
        <SwapCard title="You receive" asset={receive} onAsset={setReceive} amount="" readOnly />
        <dl className="mt-5 space-y-3 text-sm">
          <Line label="Estimated output" value="—" />
          <Line label="Price impact" value="Unavailable" />
          <Line label="Network fee" value="Shown by the wallet if a route exists" />
          <Line label="Minimum received" value="—" />
          <Line label="Route" value={routerReady ? "Router configured" : "No router configured"} />
        </dl>
        <p className="mt-4 text-sm leading-6 text-muted">
          <StatusPill>Estimated</StatusPill> These fields are estimates only. A confirmed swap is
          the transaction receipt, not the numbers on this form.
        </p>
        <Button className="mt-5 w-full" disabled>
          {routerReady ? "Confirm swap" : "Confirm swap unavailable"}
        </Button>
      </section>
    </div>
  );
}

function SwapCard({
  title,
  asset,
  onAsset,
  amount,
  onAmount,
  readOnly,
}: {
  title: string;
  asset: AssetId;
  onAsset: (id: AssetId) => void;
  amount: string;
  onAmount?: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="rounded-3xl bg-sunken p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{title}</p>
        <select
          value={asset}
          onChange={(event) => onAsset(event.target.value as AssetId)}
          className="rounded-full bg-elev px-3 py-1 text-sm"
          aria-label={title}
        >
          {getAssets().map((item) => (
            <option key={item.id} value={item.id}>
              {item.symbol}
            </option>
          ))}
        </select>
      </div>
      <input
        value={readOnly ? "—" : amount}
        readOnly={readOnly}
        onChange={(event) => onAmount?.(event.target.value)}
        placeholder="0"
        className="serif mt-3 w-full bg-transparent text-4xl outline-none"
        aria-label={`${title} amount`}
      />
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
