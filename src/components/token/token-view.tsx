"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { StatusPill } from "@/components/ui/status-pill";
import { TokenMark } from "@/components/brand/logo";
import type { TokenSnapshot } from "@/lib/server/chain-data";
import { publicConfig } from "@/lib/config";

const utilities = [
  ["Payment fee discounts", "Roadmap", "A future fee manager could charge less when a wallet holds VIRE. No fee discount is active."],
  ["Loyalty and platform rewards", "Roadmap", "Reward distribution is not implemented. There is no yield and no promised return."],
  ["Creator and merchant incentives", "Roadmap", "These programs need their own contracts and published rules before they exist."],
  ["Premium product access", "Roadmap", "No feature is locked behind a token balance today."],
  ["Governance", "Roadmap", "There is no voting contract and no proposal process."],
  ["Balance display", "Live", "When the token address is set, the wallet view can read an ERC-20 balance."],
];

export function TokenView({ snapshot }: { snapshot: TokenSnapshot }) {
  const { isConnected } = useAccount();
  const [watchMessage, setWatchMessage] = useState("");

  async function addToWallet() {
    setWatchMessage("");
    if (!snapshot.address || !window.ethereum) {
      setWatchMessage("Connect a browser wallet after the token address is configured.");
      return;
    }
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: snapshot.address,
            symbol: snapshot.symbol || "VIRE",
            decimals: snapshot.decimals ?? 18,
          },
        },
      });
      setWatchMessage("The wallet accepted the token request.");
    } catch {
      setWatchMessage("The wallet did not add the token.");
    }
  }

  return (
    <div className="space-y-8">
      <section className="surface overflow-hidden p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm tracking-[0.18em] text-brass uppercase">The payment network token</p>
            <div className="mt-4 flex items-center gap-3">
              <TokenMark className="size-12" />
              <h1 className="serif text-5xl md:text-7xl">$VIRE</h1>
            </div>
            <p className="mt-4 text-base leading-7 text-muted">
              VIRE is the native token of the Vire payment interface. It is meant to be issued
              through Pons and used inside the product. It is not sold on this website, and holding
              it is not a claim on revenue.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button href="/swap">Get VIRE</Button>
              <Button href="/swap" variant="secondary">
                Swap
              </Button>
              {snapshot.explorerUrl ? (
                <Button href={snapshot.explorerUrl} variant="secondary">
                  View contract
                </Button>
              ) : (
                <Button variant="secondary" disabled>
                  View contract
                </Button>
              )}
            </div>
          </div>
          <StatusPill>{snapshot.configured ? "Live" : "Unavailable"}</StatusPill>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Price" value="—" note="Unavailable" />
        <Stat label="Market cap" value="—" note="Unavailable" />
        <Stat label="Liquidity" value="—" note="Unavailable" />
        <Stat label="24h volume" value="—" note="Unavailable" />
        <Stat label="Holders" value="—" note="Unavailable" />
      </section>

      <section className="surface-flat grid min-h-64 place-items-center p-8 text-center">
        <div>
          <p className="text-sm text-muted">Token chart</p>
          <h2 className="serif mt-2 text-3xl">No market data</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            A chart will load from a market-data provider. Until then, Vire does not draw a price
            history.
          </p>
        </div>
      </section>

      <section>
        <h2 className="serif text-3xl">Utility</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {utilities.map(([title, state, body]) => (
            <article key={title} className="surface-flat p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg">{title}</h3>
                <StatusPill>{state}</StatusPill>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="surface-flat p-6">
          <h2 className="serif text-3xl">Allocation</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Token allocation has not been published. Percentages will be shown only when they come
            from the deployed contract and a public distribution record.
          </p>
        </article>
        <article className="surface-flat p-6">
          <h2 className="serif text-3xl">Contract</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Name" value={snapshot.name ?? "Vire"} />
            <Row label="Symbol" value={snapshot.symbol ?? "VIRE"} />
            <Row label="Network" value={snapshot.network} />
            <Row label="Chain ID" value={String(snapshot.chainId)} />
            <Row label="Supply" value={snapshot.totalSupply ?? "Not read"} badge={snapshot.onchain === "live" ? "Live" : "Unavailable"} />
            <Row label="Circulating supply" value="Not published" badge="Unavailable" />
          </dl>
          <div className="mt-4 rounded-2xl bg-sunken p-4">
            <p className="text-xs uppercase tracking-wide text-faint">Contract</p>
            <p className="mt-2 break-all font-mono text-sm">
              {snapshot.address ?? "Set NEXT_PUBLIC_VIRE_TOKEN_ADDRESS"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {snapshot.address ? <CopyButton value={snapshot.address} label="Copy address" /> : null}
              {snapshot.explorerUrl ? (
                <a className="inline-flex h-10 items-center rounded-full border border-line px-3 text-sm" href={snapshot.explorerUrl} target="_blank" rel="noreferrer">
                  Explorer
                </a>
              ) : null}
              <button
                type="button"
                onClick={addToWallet}
                disabled={!isConnected || !snapshot.address}
                className="inline-flex h-10 items-center rounded-full border border-line px-3 text-sm disabled:opacity-45"
              >
                Add to wallet
              </button>
            </div>
            {watchMessage ? <p className="mt-3 text-sm text-muted">{watchMessage}</p> : null}
          </div>
        </article>
      </section>

      <section className="surface p-6 md:p-8">
        <h2 className="serif text-3xl">How the token sits in the product</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-5">
          {["Users", "Payments", "Platform", "Rewards / utility", "VIRE"].map((item, index) => (
            <li key={item} className="rounded-2xl bg-sunken p-4">
              <p className="text-xs text-faint">0{index + 1}</p>
              <p className="mt-2">{item}</p>
              {index >= 3 ? <span className="mt-2 inline-block"><StatusPill>Roadmap</StatusPill></span> : <span className="mt-2 inline-block"><StatusPill>Live</StatusPill></span>}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-6 text-muted">
          Payments work as wallet transfers. Token utility beyond displaying a configured balance
          is not live. {publicConfig.tokenAddress ? "The configured contract can be read above." : "No contract address is configured."}
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="surface-flat p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        <StatusPill>{note}</StatusPill>
      </div>
      <p className="serif mt-3 text-3xl">{value}</p>
    </article>
  );
}

function Row({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge?: "Live" | "Unavailable";
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="flex items-center gap-2 text-right">
        {badge ? <StatusPill>{badge}</StatusPill> : null}
        {value}
      </dd>
    </div>
  );
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown }) => Promise<unknown>;
    };
  }
}
