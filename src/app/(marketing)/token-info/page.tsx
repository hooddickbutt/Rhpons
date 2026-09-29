import type { Metadata } from "next";
import { Legal } from "@/components/layout/legal";
import { publicConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Token information" };

export default function TokenInfoPage() {
  return (
    <Legal title="Token information">
      <p>
        The project token is named Vire, symbol VIRE. The intended issuance path is Pons. This
        website reads the contract address from configuration and does not hardcode a stand-in
        address.
      </p>
      <p className="font-mono text-xs">
        {publicConfig.tokenAddress ?? "NEXT_PUBLIC_VIRE_TOKEN_ADDRESS is not set."}
      </p>
      <p>
        Onchain fields such as name, symbol, and total supply are shown only when a read against
        the configured address succeeds. Price, market cap, liquidity, volume, holders, and
        circulating supply are unavailable until a publisher provides them.
      </p>
      <p>
        Planned uses include fee discounts, rewards, and access to later product features. Those
        uses are not active. Holding VIRE does not grant a share of revenue.
      </p>
    </Legal>
  );
}
