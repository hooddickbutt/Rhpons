"use client";

import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { supportedChains } from "@/lib/chain";
import { publicConfig } from "@/lib/config";
import { useIsClient } from "@/lib/use-is-client";

export function NetworkMenu() {
  const { chainId, isConnected } = useAccount();
  const { switchChain, isPending, error } = useSwitchChain();
  const [open, setOpen] = useState(false);
  const mounted = useIsClient();
  const active = mounted && chainId ? chainId : publicConfig.chainId;
  const current = supportedChains.find((chain) => chain.id === active) ?? supportedChains[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="h-10 rounded-full border border-line px-3 text-sm hover:bg-sunken"
        aria-expanded={open}
      >
        {current.id === 46630 ? "Testnet" : "Mainnet"}
      </button>
      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-64 rounded-2xl border border-line bg-elev p-2 shadow-xl">
          {supportedChains.map((chain) => (
            <button
              key={chain.id}
              type="button"
              className="flex w-full flex-col rounded-xl px-3 py-2 text-left hover:bg-sunken"
              onClick={() => {
                if (isConnected) {
                  switchChain({ chainId: chain.id });
                }
                setOpen(false);
              }}
            >
              <span className="text-sm">{chain.name}</span>
              <span className="text-xs text-faint">Chain ID {chain.id}</span>
            </button>
          ))}
          {!isConnected ? (
            <p className="px-3 py-2 text-xs leading-5 text-muted">
              Connect a wallet to ask it to switch networks. Gas on both networks is ETH.
            </p>
          ) : null}
          {isPending ? <p className="px-3 py-2 text-xs">Waiting for the wallet…</p> : null}
          {error ? (
            <p className="px-3 py-2 text-xs text-danger" role="alert">
              The wallet did not switch networks.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
