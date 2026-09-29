"use client";

import Link from "next/link";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { TokenMark } from "@/components/brand/logo";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/session/session-provider";
import { getAssets } from "@/lib/assets";
import { publicConfig } from "@/lib/config";
import { formatUnits, shortAddress } from "@/lib/format";
import { sampleActivity } from "@/lib/preview";

const actions = [
  ["Send", "/pay"],
  ["Request", "/receive"],
  ["Receive", "/qr"],
  ["Swap", "/swap"],
  ["Rewards", "/rewards"],
];

export function DashboardView() {
  const { address, isConnected, chain } = useAccount();
  const { preview, records } = useSession();
  const { data: eth, isLoading } = useBalance({
    address,
    query: { enabled: Boolean(address) },
  });
  const assets = getAssets();
  const vire = assets.find((asset) => asset.id === "vire");
  const { data: tokenBalance } = useReadContract({
    address: vire?.address ?? undefined,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address && vire?.address) },
  });

  const activity = records.length
    ? records.slice(0, 4)
    : preview
      ? sampleActivity.slice(0, 4).map((item) => ({
          id: item.id,
          title: item.action,
          amount: item.amount,
          asset: item.asset,
          counterparty: item.name,
          status: item.status,
          simulated: true,
        }))
      : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Home</p>
          <h1 className="serif text-5xl leading-none md:text-6xl">Your payments</h1>
        </div>
        <StatusPill>{isConnected ? "Live" : preview ? "Preview" : "Unavailable"}</StatusPill>
      </div>

      {!isConnected && !preview ? (
        <section className="ink-surface rounded-[1.8rem] p-8 md:p-10">
          <h2 className="serif text-4xl md:text-5xl">Connect a wallet to see balances</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            You can also open the interface preview. Sample figures stay labeled and are not your
            funds.
          </p>
          <div className="mt-5 flex gap-2">
            <Button href="/wallet" variant="brass">
              Open wallet
            </Button>
            <Button href="/docs" variant="inverse">
              Read the guide
            </Button>
          </div>
        </section>
      ) : (
        <>
          <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="surface p-6 md:p-8">
              <p className="text-sm text-muted">Total balance</p>
              <p className="serif mt-3 text-5xl md:text-6xl">—</p>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                USD value is hidden because a price source is not configured. Vire will not invent
                a portfolio total.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric
                  label="Available ETH"
                  value={
                    isConnected
                      ? isLoading
                        ? "Reading…"
                        : eth
                          ? `${formatUnits(eth.value, eth.decimals)} ETH`
                          : "Unavailable"
                      : "1.20 ETH"
                  }
                  badge={isConnected ? "Live" : "Preview"}
                />
                <Metric
                  label="VIRE balance"
                  value={
                    isConnected && vire?.address && tokenBalance !== undefined
                      ? `${formatUnits(tokenBalance, vire.decimals)} VIRE`
                      : isConnected
                        ? "Not configured"
                        : "1,200 VIRE"
                  }
                  badge={isConnected && vire?.address ? "Live" : preview ? "Preview" : "Unavailable"}
                />
                <Metric
                  label="Network"
                  value={chain?.name ?? "Robinhood Chain"}
                  badge="Live"
                />
              </div>
            </div>
            <div className="surface-flat p-6">
              <div className="flex items-center gap-3">
                <TokenMark />
                <div>
                  <p className="text-sm text-muted">Token</p>
                  <p className="text-lg">$VIRE</p>
                </div>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Price" value="Unavailable" />
                <Row label="Market cap" value="Unavailable" />
                <Row
                  label="Contract"
                  value={publicConfig.tokenAddress ? shortAddress(publicConfig.tokenAddress) : "Not set"}
                />
              </dl>
              <Button href="/token" variant="secondary" className="mt-5 w-full">
                Open token
              </Button>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-5">
            {actions.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="surface-flat px-4 py-4 text-sm transition hover:-translate-y-0.5"
              >
                {label}
              </Link>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="surface-flat p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg">Recent activity</h2>
                <Link href="/activity" className="text-sm text-muted">
                  View all
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {activity.length === 0 ? (
                  <p className="text-sm leading-6 text-muted">
                    No payments yet. A sent or simulated payment will appear here.
                  </p>
                ) : (
                  activity.map((item) => (
                    <article key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-sunken px-4 py-3">
                      <div>
                        <p className="text-sm">{item.title}</p>
                        <p className="text-xs text-faint">{item.counterparty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          {item.amount} {item.asset}
                        </p>
                        <StatusPill>{item.simulated ? "Demo" : item.status === "confirmed" ? "Confirmed" : "Pending"}</StatusPill>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
            <div className="surface-flat p-6">
              <h2 className="text-lg">Portfolio</h2>
              <p className="mt-2 text-sm text-muted">Quantities only. Prices are not shown.</p>
              <ul className="mt-4 space-y-3">
                {assets.map((asset) => (
                  <li key={asset.id} className="flex items-center justify-between rounded-2xl border border-line px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{asset.name}</p>
                      <p className="text-xs text-faint">{asset.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {asset.id === "eth" && isConnected && eth
                          ? formatUnits(eth.value, eth.decimals)
                          : asset.id === "vire" && tokenBalance !== undefined && vire
                            ? formatUnits(tokenBalance, vire.decimals)
                            : preview
                              ? "Sample"
                              : "—"}
                      </p>
                      <p className="text-xs text-faint">USD —</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge: "Live" | "Preview" | "Unavailable";
}) {
  return (
    <div className="rounded-2xl bg-sunken p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted">{label}</p>
        <StatusPill>{badge}</StatusPill>
      </div>
      <p className="mt-3 text-lg">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
