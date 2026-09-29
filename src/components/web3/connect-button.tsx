"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useSession } from "@/components/session/session-provider";
import { shortAddress } from "@/lib/format";
import { useIsClient } from "@/lib/use-is-client";

export function ConnectButton() {
  const [open, setOpen] = useState(false);
  const mounted = useIsClient();
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { preview, setPreview } = useSession();

  const label =
    mounted && isConnected && address
      ? shortAddress(address)
      : mounted && preview
        ? "Preview"
        : "Connect wallet";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
      >
        {label}
      </button>
      <Modal open={open} title={isConnected ? "Wallet" : "Connect a wallet"} onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <p className="text-sm leading-6 text-muted">
            Vire never holds your funds. Connecting a wallet lets this site read public account
            data and ask you to sign. You can reject any signature in your wallet.
          </p>
          {mounted && isConnected && address ? (
            <div className="rounded-2xl bg-sunken p-4">
              <p className="font-mono text-sm">{address}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button href="/profile" size="sm" variant="secondary" onClick={() => setOpen(false)}>
                  Profile
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    disconnect();
                    setOpen(false);
                  }}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
            connectors.map((connector) => (
              <button
                key={connector.uid}
                type="button"
                disabled={isPending}
                onClick={() =>
                  connect(
                    { connector },
                    {
                      onSuccess: () => {
                        setPreview(false);
                        setOpen(false);
                      },
                    },
                  )
                }
                className="flex h-12 w-full items-center justify-between rounded-2xl border border-line px-4 text-left hover:bg-sunken"
              >
                <span>{connector.name}</span>
                <span className="text-sm text-faint">Browser wallet</span>
              </button>
            ))
          )}
          {error ? (
            <p className="text-sm text-danger" role="alert">
              The wallet did not connect. {error.message}
            </p>
          ) : null}
          <div className="rounded-2xl border border-line p-4">
            <p className="text-sm font-medium">Interface preview</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Shows sample balances and sample activity on this device. It does not create a
              wallet and cannot move funds.
            </p>
            <Button
              className="mt-3"
              variant="secondary"
              size="sm"
              onClick={() => {
                setPreview(!preview);
                setOpen(false);
              }}
            >
              {preview ? "Leave preview" : "Continue with preview"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
