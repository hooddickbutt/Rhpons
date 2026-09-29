"use client";

import { useState } from "react";
import { ReceiveFlow } from "@/components/payments/receive-flow";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { useSession } from "@/components/session/session-provider";

const samples = [
  ["Revenue", "—"],
  ["Payments", "—"],
  ["Pending", "—"],
  ["Completed", "—"],
  ["Volume", "—"],
];

export function MerchantView() {
  const { records } = useSession();
  const [exportNote, setExportNote] = useState("");
  const requests = records.filter((item) => item.kind === "request");

  function exportCsv() {
    const header = "created,title,amount,asset,counterparty,status,simulated";
    const lines = requests.map((item) =>
      [item.createdAt, item.title, item.amount, item.asset, item.counterparty, item.status, String(item.simulated)]
        .map((value) => `"${value.replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vire-requests.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setExportNote("Exported requests saved in this browser. This is not a full ledger.");
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="serif text-4xl md:text-5xl">Merchant</h1>
          <StatusPill>Demo</StatusPill>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Create a payment request, invoice link, or QR code. Revenue totals are not shown because
          no merchant ledger is connected. Refunds are unavailable until a contract supports them.
        </p>
      </div>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {samples.map(([label, value]) => (
          <article key={label} className="surface-flat p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{label}</p>
              <StatusPill>Unavailable</StatusPill>
            </div>
            <p className="serif mt-3 text-3xl">{value}</p>
          </article>
        ))}
      </section>
      <ReceiveFlow merchant />
      <section className="surface-flat p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg">Requests on this device</h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={exportCsv} disabled={requests.length === 0}>
              Export
            </Button>
            <Button variant="ghost" disabled>
              Refund unavailable
            </Button>
          </div>
        </div>
        {requests.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No requests saved in this browser yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {requests.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-2xl bg-sunken px-4 py-3 text-sm">
                <span>
                  {item.counterparty} · {item.amount} {item.asset}
                </span>
                <StatusPill>Demo</StatusPill>
              </li>
            ))}
          </ul>
        )}
        {exportNote ? <p className="mt-3 text-sm text-muted">{exportNote}</p> : null}
        <p className="mt-4 text-sm leading-6 text-muted">
          Customer pages use the same payment link as a personal request, for example pay/vire/merchant.
          Recent customers are not listed because Vire does not store customer identities.
        </p>
      </section>
    </div>
  );
}
