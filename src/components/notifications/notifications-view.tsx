"use client";

import { StatusPill } from "@/components/ui/status-pill";
import { useSession } from "@/components/session/session-provider";

export function NotificationsView() {
  const { records, preview } = useSession();
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="serif text-4xl">Notifications</h1>
      <p className="text-sm leading-6 text-muted">
        Vire does not send push notifications. This list is local to the browser.
      </p>
      {records.length === 0 ? (
        <div className="surface p-8">
          <p className="serif text-2xl">You are caught up</p>
          <p className="mt-2 text-sm text-muted">Payment updates from this device will land here.</p>
        </div>
      ) : (
        records.slice(0, 8).map((item) => (
          <article key={item.id} className="surface-flat px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm">{item.title}</p>
              <StatusPill>{item.simulated ? "Demo" : "Live"}</StatusPill>
            </div>
            <p className="mt-1 text-sm text-muted">
              {item.amount} {item.asset} · {item.counterparty}
            </p>
          </article>
        ))
      )}
      {preview && records.length === 0 ? (
        <article className="surface-flat px-4 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">Sample: payment received</p>
            <StatusPill>Demo</StatusPill>
          </div>
          <p className="mt-1 text-sm text-muted">Alex sent 25 USDC in the sample feed.</p>
        </article>
      ) : null}
    </div>
  );
}
