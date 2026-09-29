import Link from "next/link";
import { StatusPill } from "@/components/ui/status-pill";
import { getAssets } from "@/lib/assets";
import { publicConfig } from "@/lib/config";
import { previewProfiles } from "@/lib/preview";

export function ExploreView() {
  const assets = getAssets();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="serif text-4xl md:text-5xl">Explore</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          A map of what this interface can show today: the network, configured assets, and example
          payment names. Example names are not people you can pay onchain.
        </p>
      </div>
      <section className="grid gap-3 md:grid-cols-3">
        <article className="surface-flat p-5">
          <StatusPill>Live</StatusPill>
          <h2 className="mt-3 text-lg">Robinhood Chain</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Chain ID {publicConfig.chainId}. Gas is ETH.</p>
        </article>
        <article className="surface-flat p-5">
          <StatusPill>Unavailable</StatusPill>
          <h2 className="mt-3 text-lg">Indexed activity</h2>
          <p className="mt-2 text-sm leading-6 text-muted">A transaction indexer is not connected.</p>
        </article>
        <article className="surface-flat p-5">
          <StatusPill>{publicConfig.tokenAddress ? "Live" : "Unavailable"}</StatusPill>
          <h2 className="mt-3 text-lg">$VIRE</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {publicConfig.tokenAddress ? "Token address configured." : "Token address not configured."}
          </p>
        </article>
      </section>
      <section>
        <h2 className="serif text-3xl">Assets</h2>
        <div className="mt-4 grid gap-3">
          {assets.map((asset) => (
            <article key={asset.id} className="surface-flat flex items-center justify-between px-4 py-4">
              <div>
                <p>{asset.name}</p>
                <p className="text-sm text-faint">{asset.symbol}</p>
              </div>
              <StatusPill>{asset.configured ? "Live" : "Unavailable"}</StatusPill>
            </article>
          ))}
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2">
          <h2 className="serif text-3xl">Example names</h2>
          <StatusPill>Demo</StatusPill>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {previewProfiles.map((profile) => (
            <Link key={profile.handle} href={`/u/${profile.handle}`} className="surface-flat p-5 hover:-translate-y-0.5">
              <p className="text-lg">@{profile.handle}</p>
              <p className="text-sm text-muted">{profile.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{profile.bio}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
