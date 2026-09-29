"use client";

import { useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import { useSession } from "@/components/session/session-provider";
import { explorerFor, publicConfig } from "@/lib/config";
import { sampleActivity } from "@/lib/preview";

const filters = ["All", "Payments", "Swaps", "Rewards", "Token", "System"] as const;

export function ActivityView() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const { records } = useSession();
  const samples = sampleActivity.filter(
    (item) => filter === "All" || item.filter === filter.toLowerCase(),
  );
  const mine = records.filter(
    (item) => filter === "All" || item.filter === filter.toLowerCase(),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="serif text-4xl md:text-5xl">Activity</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Your payments from this browser are listed first. Chain-wide history needs an indexer,
          which is not connected. The sample feed below is a layout example.
        </p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm ${
              filter === item ? "bg-primary text-primary-fg" : "border border-line"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="space-y-3">
        <h2 className="text-lg">Your activity</h2>
        {mine.length === 0 ? (
          <div className="surface-flat p-8">
            <p className="serif text-2xl">Nothing here yet</p>
            <p className="mt-2 text-sm text-muted">
              Send a payment or save a request and it will show up on this device.
            </p>
          </div>
        ) : (
          mine.map((item) => (
            <article key={item.id} className="surface-flat flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar name={item.counterparty} />
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-faint">
                    {item.counterparty} · {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  {item.amount} {item.asset}
                </p>
                <div className="mt-1 flex items-center justify-end gap-2">
                  <StatusPill>{item.simulated ? "Demo" : item.status === "confirmed" ? "Confirmed" : item.status === "failed" ? "Failed" : "Pending"}</StatusPill>
                  {item.hash ? (
                    <a
                      className="text-xs underline"
                      href={`${explorerFor(publicConfig.chainId)}/tx/${item.hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Explorer
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))
        )}
      </section>
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg">Sample feed</h2>
          <StatusPill>Demo</StatusPill>
        </div>
        {samples.map((item) => (
          <article key={item.id} className="surface-flat flex flex-wrap items-center justify-between gap-3 px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar name={item.name} />
              <div>
                <p className="text-sm">
                  {item.action}
                </p>
                <p className="text-xs text-faint">
                  @{item.handle} · {item.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm">
                {item.amount} {item.asset}
              </p>
              <StatusPill>{item.status === "confirmed" ? "Confirmed" : item.status === "failed" ? "Failed" : "Pending"}</StatusPill>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const letter = name.replace("@", "").slice(0, 1).toUpperCase();
  return (
    <span className="grid size-10 place-items-center rounded-full bg-brass-soft text-sm text-brass">
      {letter || "V"}
    </span>
  );
}
