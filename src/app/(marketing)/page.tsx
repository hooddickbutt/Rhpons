import Link from "next/link";
import { NetworkPulse } from "@/components/home/network-pulse";
import { Disclaimer } from "@/components/layout/disclaimer";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { brand, brandStory } from "@/lib/brand";
import { sampleActivity } from "@/lib/preview";

const steps = [
  ["01", "Connect", "Connect a compatible wallet. Vire does not create an account and does not hold the keys."],
  ["02", "Pay", "Send or receive supported assets through a short payment flow, with an optional note."],
  ["03", "Track", "Follow a transaction from wallet confirmation to the explorer receipt."],
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-end gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.15fr_0.85fr] md:pt-24">
        <div className="rise">
          <p className="text-sm tracking-[0.16em] text-brass uppercase">Independent payment interface</p>
          <h1 className="serif mt-5 max-w-xl text-5xl leading-[0.95] md:text-7xl">{brand.heroTitle}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{brand.heroBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/app" size="lg">
              Launch app
            </Button>
            <Button href="/token" size="lg" variant="secondary">
              Explore token
            </Button>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-faint">{brand.tagline}</p>
        </div>
        <aside className="surface rise rise-delay p-5 md:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm">Interface preview</p>
            <StatusPill>Demo</StatusPill>
          </div>
          <p className="serif mt-6 text-5xl">—</p>
          <p className="mt-2 text-sm text-muted">Sample quantities are not shown as a dollar balance.</p>
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl bg-sunken p-4">
              <p className="text-xs text-faint">Quick send</p>
              <p className="mt-2 text-lg">@alex · 25 USDC</p>
              <p className="text-sm text-muted">Example only. This card does not send a payment.</p>
            </div>
            <div className="flex gap-2">
              <Button href="/pay" size="sm">
                Send
              </Button>
              <Button href="/receive" size="sm" variant="secondary">
                Request
              </Button>
            </div>
          </div>
        </aside>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex items-center gap-3 overflow-x-auto text-sm text-muted">
            <StatusPill>Demo</StatusPill>
            {sampleActivity.slice(0, 4).map((item) => (
              <span key={item.id} className="whitespace-nowrap">
                {item.name} · {item.action.toLowerCase()} · {item.amount} {item.asset}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-5 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="serif text-3xl">Network, not a ticker</h2>
        </div>
        <NetworkPulse />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:grid-cols-3">
        {steps.map(([index, title, body]) => (
          <article key={index}>
            <p className="serif text-4xl text-brass">{index}</p>
            <h2 className="mt-3 text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="serif text-4xl md:text-5xl">A name, when you want one.</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Long addresses still work. An optional name such as @creator can sit on a payment
            link. Example names on this site are samples. A name is not a verification of identity.
          </p>
          <Button href="/u/creator" className="mt-6" variant="secondary">
            See an example profile
          </Button>
        </div>
        <div className="surface p-6">
          <p className="text-sm text-muted">pay/vire/creator</p>
          <p className="serif mt-4 text-4xl">80 USDC</p>
          <p className="mt-2 text-muted">For the April edit</p>
          <div className="mt-6 h-28 rounded-2xl bg-sunken" />
          <p className="mt-3 text-xs text-faint">QR and wallet confirmation live in the app.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="surface-flat p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="serif text-4xl">$VIRE</h2>
            <StatusPill>Unavailable</StatusPill>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            The token is part of the product plan, intended to be created through Pons. Price,
            market cap, and holders stay blank until a contract and a data source exist. Utility
            such as fee discounts is marked as roadmap, not as something you can use today.
          </p>
          <Button href="/token" className="mt-6" variant="secondary">
            Token details
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="serif text-4xl">Why Vire exists</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {brandStory.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10">
          <Disclaimer />
        </div>
        <p className="mt-6 text-sm">
          <Link href="/security" className="underline">
            Read how signing works
          </Link>
        </p>
      </section>
    </main>
  );
}
