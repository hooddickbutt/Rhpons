import type { Metadata } from "next";
import { StatusPill } from "@/components/ui/status-pill";
import { publicConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Developers",
  description: "How Vire talks to Robinhood Chain with wagmi and viem.",
};

export default function DevelopersPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="serif text-5xl">Developers</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Vire uses Next.js, React, TypeScript, Tailwind CSS, wagmi, and viem. Robinhood Chain is
          EVM compatible, so those libraries talk to it with a chain definition rather than a custom
          client. Reference contracts live in <code>contracts/reference</code> and are not deployed
          by this app.
        </p>
      </div>
      <section className="space-y-3">
        <h2 className="text-2xl">Why this stack</h2>
        <p className="text-sm leading-7 text-muted">
          wagmi handles wallet connection and React state. viem handles RPC calls, ABI encoding,
          and typed chain definitions on the server and in the browser. Solidity contracts are
          written for Foundry. A database is specified for payment requests and names, but the
          current payment link is encoded in the URL so the interface works without one.
        </p>
      </section>
      <section className="surface-flat p-5 text-sm">
        <h2 className="text-lg">Network</h2>
        <ul className="mt-3 space-y-2 font-mono text-xs leading-6">
          <li>Chain ID {publicConfig.chainId}</li>
          <li>RPC host configured via environment</li>
          <li>Explorer {publicConfig.explorerUrl}</li>
          <li>Gas token ETH</li>
        </ul>
        <p className="mt-3 text-muted">
          Official parameters are published by Robinhood Chain. This project reads chain ID 4663
          for mainnet and 46630 for testnet.
        </p>
      </section>
      <section>
        <h2 className="text-2xl">Account abstraction</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          <StatusPill>Roadmap</StatusPill> Sponsored gas, batched calls, session keys, and spending
          limits are implementation options for a later smart-wallet release. They are not available
          in this version. Every transfer today is a normal wallet signature.
        </p>
      </section>
      <section>
        <h2 className="text-2xl">Read a balance</h2>
        <pre className="mt-3 overflow-x-auto rounded-2xl bg-sunken p-4 text-xs leading-6">{`import { createPublicClient, http } from "viem";

const client = createPublicClient({
  transport: http(process.env.RPC_URL),
});

const block = await client.getBlockNumber();`}</pre>
      </section>
    </article>
  );
}
