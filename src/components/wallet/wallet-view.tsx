"use client";

import { useAccount, useBalance, useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { StatusPill } from "@/components/ui/status-pill";
import { useSession } from "@/components/session/session-provider";
import { getAssets } from "@/lib/assets";
import { explorerFor, publicConfig } from "@/lib/config";
import { formatUnits, shortAddress } from "@/lib/format";

export function WalletView() {
  const { address, isConnected, chain } = useAccount();
  const { preview } = useSession();
  const { data: eth, isLoading, isError } = useBalance({
    address,
    query: { enabled: Boolean(address) },
  });
  const assets = getAssets();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Wallet</p>
          <h1 className="serif text-4xl md:text-5xl">Holdings</h1>
        </div>
        <StatusPill>{isConnected ? "Live" : preview ? "Preview" : "Unavailable"}</StatusPill>
      </div>
      <section className="surface p-6 md:p-8">
        <p className="text-sm text-muted">Total portfolio value</p>
        <p className="serif mt-2 text-5xl">—</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          A USD total appears only when a price source is connected. None is configured.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <span>{chain?.name ?? "Robinhood Chain"}</span>
          <span className="font-mono text-muted">
            {address ? shortAddress(address) : preview ? "Preview session" : "No wallet"}
          </span>
          {address ? <CopyButton value={address} label="Copy address" /> : null}
          {address ? (
            <a
              className="underline"
              href={`${explorerFor(chain?.id ?? publicConfig.chainId)}/address/${address}`}
              target="_blank"
              rel="noreferrer"
            >
              Explorer
            </a>
          ) : null}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button href="/pay">Send</Button>
          <Button href="/receive" variant="secondary">
            Receive
          </Button>
          <Button href="/swap" variant="secondary">
            Swap
          </Button>
          <Button href="/token" variant="ghost">
            Get VIRE
          </Button>
          <Button href="/activity" variant="ghost">
            History
          </Button>
        </div>
      </section>
      {isError ? (
        <p className="text-sm text-danger" role="alert">
          The ETH balance could not be read from the RPC. Check the network and try again.
        </p>
      ) : null}
      <section className="grid gap-3">
        {assets.map((asset) => (
          <AssetRow
            key={asset.id}
            assetId={asset.id}
            name={asset.name}
            symbol={asset.symbol}
            decimals={asset.decimals}
            tokenAddress={asset.address}
            owner={address}
            loading={asset.native && isLoading}
            liveValue={asset.native && eth ? formatUnits(eth.value, eth.decimals) : null}
            preview={preview && !isConnected}
            configured={asset.configured}
          />
        ))}
      </section>
    </div>
  );
}

function AssetRow({
  assetId,
  name,
  symbol,
  decimals,
  tokenAddress,
  owner,
  loading,
  liveValue,
  preview,
  configured,
}: {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  tokenAddress: `0x${string}` | null;
  owner?: `0x${string}`;
  loading: boolean;
  liveValue: string | null;
  preview: boolean;
  configured: boolean;
}) {
  const { data } = useReadContract({
    address: tokenAddress ?? undefined,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: owner ? [owner] : undefined,
    query: { enabled: Boolean(tokenAddress && owner) },
  });
  const quantity = liveValue
    ? liveValue
    : data !== undefined
      ? formatUnits(data, decimals)
      : preview
        ? "Sample"
        : loading
          ? "Reading…"
          : "—";
  return (
    <article className="surface-flat flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-sunken text-sm">{symbol.slice(0, 1)}</span>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-faint">
            {symbol}
            {assetId !== "eth" && !configured ? " · contract not configured" : ""}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p>{quantity}</p>
        <p className="text-sm text-faint">USD —</p>
        <p className="text-xs text-faint">24h change unavailable</p>
      </div>
    </article>
  );
}
