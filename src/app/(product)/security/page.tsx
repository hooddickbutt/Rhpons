import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/disclaimer";

export const metadata: Metadata = { title: "Security" };

const points = [
  ["Non-custodial", "Vire does not take deposits. Assets stay in the wallet that signs. This site cannot move funds without that signature."],
  ["Your confirmation", "A transfer reaches the network only after the wallet shows a prompt and you approve it. Rejecting the prompt cancels the action."],
  ["Network", "Mainnet is chain ID 4663. Testnet is chain ID 46630. Both use ETH for gas. Check the network in your wallet before you sign."],
  ["Contracts", "Token, router, and registry addresses are configuration values. Reference Solidity in this repository is unaudited and not deployed by the app. Verification status should be checked on the explorer after a real deployment."],
  ["Addresses", "Read the full address before you pay. A similar-looking name or a copied link can point somewhere else. Example profiles cannot be used for a real transfer."],
  ["Scams", "Vire will not ask for a seed phrase, a private key, or a remote-approval of unlimited spending. A message that does is not this product."],
];

export default function SecurityPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="serif text-5xl">Security</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          This page describes how the interface behaves. It is not a statement that the product is
          free of risk, and it is not a claim of being fully secure.
        </p>
      </div>
      {points.map(([title, body]) => (
        <section key={title}>
          <h2 className="text-2xl">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-muted">{body}</p>
        </section>
      ))}
      <section>
        <h2 className="text-2xl">Practices that help</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
          <li>Use a wallet you installed yourself, and keep its recovery phrase offline.</li>
          <li>Start with a small transfer when you pay a new address.</li>
          <li>Treat unsigned links and unexpected tokens as untrusted.</li>
          <li>Confirm chain ID 4663 before a mainnet payment.</li>
        </ul>
      </section>
      <Disclaimer />
    </article>
  );
}
