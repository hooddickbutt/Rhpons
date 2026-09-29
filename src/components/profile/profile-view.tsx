"use client";

import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { StatusPill } from "@/components/ui/status-pill";
import { useSession } from "@/components/session/session-provider";
import { explorerFor, publicConfig } from "@/lib/config";
import { shortAddress } from "@/lib/format";

export function ProfileView() {
  const { address, isConnected, chain } = useAccount();
  const { preview, showActivity, setShowActivity } = useSession();
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="serif text-4xl">Profile</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          A Vire name is optional. Registering one onchain requires the username registry, which is
          not configured. Nothing here is an identity check.
        </p>
      </div>
      <section className="surface p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-full bg-brass-soft text-xl text-brass">
            {address ? address.slice(2, 3).toUpperCase() : "V"}
          </span>
          <div>
            <p className="text-lg">{isConnected ? "Connected wallet" : preview ? "Preview session" : "No wallet"}</p>
            <p className="font-mono text-sm text-muted">{address ? shortAddress(address) : "—"}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <StatusPill>{isConnected ? "Live" : preview ? "Preview" : "Unavailable"}</StatusPill>
          <span className="text-sm text-muted">{chain?.name ?? "Robinhood Chain"}</span>
        </div>
        {address ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <CopyButton value={address} label="Copy address" />
            <a
              className="inline-flex h-10 items-center rounded-full border border-line px-3 text-sm"
              href={`${explorerFor(chain?.id ?? publicConfig.chainId)}/address/${address}`}
              target="_blank"
              rel="noreferrer"
            >
              Explorer
            </a>
            <Button href={`/pay?to=${address}`} size="sm" variant="secondary">
              Send
            </Button>
          </div>
        ) : (
          <Button href="/app" className="mt-5" variant="secondary">
            Back to home
          </Button>
        )}
      </section>
      <section className="surface-flat p-6">
        <h2 className="text-lg">Activity visibility</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          This preference stays in this browser. It does not hide transactions that are already
          public on the network.
        </p>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={showActivity}
            onChange={(event) => setShowActivity(event.target.checked)}
          />
          Show my local payment activity on this device
        </label>
      </section>
      <section className="surface-flat p-6">
        <h2 className="text-lg">Public name</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Onchain names are unavailable. Example profiles such as @alex exist only to demonstrate
          the payment page.
        </p>
        <Button href="/u/alex" className="mt-4" variant="secondary">
          View an example profile
        </Button>
      </section>
    </div>
  );
}
