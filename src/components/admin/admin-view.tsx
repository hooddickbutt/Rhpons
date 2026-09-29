import { StatusPill } from "@/components/ui/status-pill";
import { publicConfig } from "@/lib/config";

const rows = [
  ["Users", "Not collected"],
  ["Transactions", "Indexer not connected"],
  ["Payments", "Browser-local only"],
  ["Token statistics", "Market data unavailable"],
  ["Merchant accounts", "Registry not deployed"],
  ["Reported issues", "No intake endpoint"],
];

const contracts = [
  ["VIRE token", publicConfig.tokenAddress],
  ["USDC", publicConfig.usdcAddress],
  ["Payment router", publicConfig.paymentRouterAddress],
  ["Username registry", publicConfig.usernameRegistryAddress],
  ["Swap router", publicConfig.swapRouterAddress],
];

export function AdminView() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-line bg-sunken p-5">
        <StatusPill>Unavailable</StatusPill>
        <h1 className="serif mt-3 text-4xl">Admin</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Administrative controls are not enabled. This screen is read-only and has no authority
          to move funds, change contracts, or view private user data. A production admin surface
          needs a separate authorization system before it is exposed.
        </p>
      </div>
      <section className="grid gap-3 md:grid-cols-3">
        {rows.map(([label, detail]) => (
          <article key={label} className="surface-flat p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm">{label}</h2>
              <StatusPill>Unavailable</StatusPill>
            </div>
            <p className="mt-3 text-sm text-muted">{detail}</p>
          </article>
        ))}
      </section>
      <section className="surface-flat p-6">
        <h2 className="text-lg">Configured addresses</h2>
        <ul className="mt-4 space-y-3">
          {contracts.map(([label, value]) => (
            <li key={label} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>{label}</span>
              <span className="font-mono text-muted">{value ?? "Not set"}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Supported assets are ETH, plus USDC and VIRE when their addresses are set. System health
          for the public RPC is on the network endpoint at /api/network.
        </p>
      </section>
    </div>
  );
}
