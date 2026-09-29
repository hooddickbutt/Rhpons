import Link from "next/link";
import { Mark } from "@/components/brand/logo";
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
      <section className="relative overflow-hidden bg-[#101217] text-[#f7f1e6]">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.15fr_0.85fr] md:pt-24">
          <div className="rise">
            <p className="text-xs font-medium tracking-[0.28em] text-[#e7c98a] uppercase">
              Independent payment interface
            </p>
            <h1 className="serif mt-6 max-w-xl text-6xl leading-[0.9] md:text-8xl">{brand.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">{brand.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/app" size="lg" variant="brass">
                Launch app
              </Button>
              <Button href="/token" size="lg" variant="inverse">
                Explore token
              </Button>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-6 text-white/55">{brand.tagline}</p>
          </div>
          <aside className="rise rise-delay relative rounded-[1.8rem] border border-[#e7c98a]/35 bg-[#171a21] p-6 shadow-[0_40px_90px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#e7c98a] to-transparent" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm">
                <Mark className="size-8" />
                Payment
              </span>
              <StatusPill>Demo</StatusPill>
            </div>
            <p className="mt-8 text-xs tracking-[0.22em] text-white/45 uppercase">Amount</p>
            <p className="serif mt-2 text-6xl leading-none">
              25 <span className="text-2xl text-[#e7c98a]">USDC</span>
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/5 px-4 py-3">
                <p className="text-xs text-white/45">To</p>
                <p className="mt-1 text-lg">@alex</p>
              </div>
              <div className="rounded-2xl bg-white/5 px-4 py-3">
                <p className="text-xs text-white/45">Network</p>
                <p className="mt-1">Chain 4663</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/45">
              Example only. This card does not send a payment.
            </p>
            <div className="mt-5 flex gap-2">
              <Button href="/pay" size="sm" variant="brass">
                Send
              </Button>
              <Button href="/receive" size="sm" variant="inverse">
                Request
              </Button>
            </div>
          </aside>
        </div>
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-5 py-4 text-sm text-white/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        <NetworkPulse />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-16 md:grid-cols-3">
        {steps.map(([index, title, body]) => (
          <article key={index} className="surface p-6">
            <p className="serif text-5xl text-brass">{index}</p>
            <h2 className="mt-4 text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-brass uppercase">Identity</p>
          <h2 className="serif mt-3 text-5xl leading-[0.95] md:text-6xl">A name, when you want one.</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Long addresses still work. An optional name such as @creator can sit on a payment
            link. Example names on this site are samples. A name is not a verification of identity.
          </p>
          <Button href="/u/creator" className="mt-6" variant="secondary">
            See an example profile
          </Button>
        </div>
        <div className="ink-surface rounded-[1.8rem] p-8">
          <p className="text-xs tracking-[0.2em] text-[#e7c98a] uppercase">pay/vire/creator</p>
          <p className="serif mt-6 text-6xl">80 USDC</p>
          <p className="mt-3 text-white/70">For the April edit</p>
          <div className="mt-8 h-px bg-gradient-to-r from-[#e7c98a] to-transparent" />
          <p className="mt-4 text-sm text-white/55">QR and wallet confirmation live in the app.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="ink-surface rounded-[1.8rem] p-8 md:p-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.22em] text-[#e7c98a] uppercase">Native token</p>
              <h2 className="serif mt-3 text-6xl md:text-7xl">$VIRE</h2>
            </div>
            <StatusPill>Unavailable</StatusPill>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            The token is part of the product plan, intended to be created through Pons. Price,
            market cap, and holders stay blank until a contract and a data source exist. Utility
            such as fee discounts is marked as roadmap, not as something you can use today.
          </p>
          <Button href="/token" className="mt-6" variant="brass">
            Token details
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="serif text-4xl md:text-5xl">Why Vire exists</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {brandStory.map((paragraph) => (
            <p key={paragraph} className="surface-flat p-5 text-sm leading-7 text-muted">
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
