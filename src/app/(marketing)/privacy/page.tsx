import type { Metadata } from "next";
import { Legal } from "@/components/layout/legal";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <Legal title="Privacy">
      <p>
        Wallet addresses and transactions on Robinhood Chain are public. Connecting a wallet shares
        the address with this site in the browser so it can read public balances.
      </p>
      <p>
        Payment notes, preview mode, and local activity are stored in your browser. They are not
        sent to a Vire account database in this version, because no account database is connected.
      </p>
      <p>
        RPC providers that serve blockchain data can see the requests this site makes, such as a
        balance or block-number lookup. Do not type a seed phrase or private key into Vire.
      </p>
    </Legal>
  );
}
