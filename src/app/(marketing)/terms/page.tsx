import type { Metadata } from "next";
import { Legal } from "@/components/layout/legal";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Legal title="Terms">
      <p>
        Vire is an independent interface for preparing and reviewing wallet transactions on
        Robinhood Chain. By using it you understand that blockchain transfers are public and, once
        confirmed, are not reversed by this website.
      </p>
      <p>
        The interface may show sample data labeled Demo or Preview. Sample data is not a balance,
        a quote, or an offer. Features marked Roadmap are not available.
      </p>
      <p>
        You are responsible for the wallet you connect, the addresses you pay, and the network you
        select. Vire does not custody assets and does not provide investment, tax, or legal advice.
      </p>
    </Legal>
  );
}
