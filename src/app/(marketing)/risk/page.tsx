import type { Metadata } from "next";
import { Legal } from "@/components/layout/legal";

export const metadata: Metadata = { title: "Risk disclosure" };

export default function RiskPage() {
  return (
    <Legal title="Risk disclosure">
      <p>
        Digital assets can lose value. Network fees, failed transactions, and irreversible
        transfers are part of using a public chain. A confirmed transaction cannot be cancelled
        here.
      </p>
      <p>
        VIRE is a project token intended for product utility. It is not presented as an investment,
        and this site does not promise profit, yield, or liquidity. Market figures stay blank when
        a data source is absent.
      </p>
      <p>
        Smart contracts in the repository are reference code. They have not been audited here and
        should not be deployed with real funds until they are reviewed.
      </p>
      <p>
        Nothing on this site is an offer of securities or a solicitation to buy a token.
      </p>
    </Legal>
  );
}
