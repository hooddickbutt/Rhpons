"use client";

import { StatusPill } from "@/components/ui/status-pill";
import { sampleRewards } from "@/lib/preview";

const lanes = [
  ["Token rewards", "No rewards contract is deployed."],
  ["Payment activity", "Payments do not earn tokens yet."],
  ["Referral rewards", "Referrals are not live."],
  ["Merchant rewards", "Merchant incentives are a roadmap item."],
  ["Platform incentives", "No incentive program is configured."],
];

export function RewardsView() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="serif text-4xl md:text-5xl">Rewards</h1>
          <StatusPill>Roadmap</StatusPill>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Reward balances are not live. Nothing on this page is a promise of profit, yield, or a
          return. When a rewards contract exists, this view will read it instead of showing samples.
        </p>
      </div>
      <section className="grid gap-3 md:grid-cols-2">
        {lanes.map(([title, detail]) => (
          <article key={title} className="surface-flat p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">{title}</h2>
              <StatusPill>Unavailable</StatusPill>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
            <p className="serif mt-4 text-3xl">—</p>
          </article>
        ))}
      </section>
      <section>
        <div className="flex items-center gap-2">
          <h2 className="text-lg">Sample reward history</h2>
          <StatusPill>Demo</StatusPill>
        </div>
        <div className="mt-3 space-y-3">
          {sampleRewards.map((item) => (
            <article key={item.id} className="surface-flat flex items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-xs text-faint">{item.detail}</p>
              </div>
              <p className="text-sm">{item.amount}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
