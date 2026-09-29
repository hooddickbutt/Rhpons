import type { Metadata } from "next";

export const metadata: Metadata = { title: "Docs" };

const sections = [
  ["Connect", "Use Connect wallet and approve the connection in a browser wallet that supports custom networks. If the wallet does not know Robinhood Chain, the network menu can ask it to add chain ID 4663. Gas is ETH."],
  ["Send", "Choose a recipient, an amount, and an asset. Review the summary. Leave “Broadcast a real transfer” off to simulate. Turn it on only when you intend to sign a transfer from your wallet."],
  ["Receive", "Create a request, then copy the link or the QR code. The link does not move funds. The payer still confirms in their own wallet."],
  ["Names", "Example names such as @alex are samples. A real recipient is a wallet address. Onchain names need the username registry, which is not configured."],
  ["Token", "The VIRE contract address comes from configuration. If it is empty, the product does not invent one. Price and market cap stay unavailable without a data provider."],
  ["Safety", "Compare the address in Vire with the address in your wallet before you sign. Vire cannot reverse a confirmed transfer."],
];

export default function DocsPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="serif text-5xl">Docs</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        A short guide to the payment interface. It is written for someone who has used a wallet
        and for someone who has not.
      </p>
      <div className="mt-8 space-y-6">
        {sections.map(([title, body]) => (
          <section key={title}>
            <h2 className="text-2xl">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">{body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
