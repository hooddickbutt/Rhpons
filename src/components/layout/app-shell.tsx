"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  BookOpen,
  Coins,
  Compass,
  Home,
  QrCode,
  Repeat,
  Shield,
  Store,
  UserRound,
  Wallet,
} from "lucide-react";
import { TokenMark, Wordmark } from "@/components/brand/logo";
import { Disclaimer } from "@/components/layout/disclaimer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ConnectButton } from "@/components/web3/connect-button";
import { NetworkMenu } from "@/components/web3/network-menu";
import { cn } from "@/lib/cn";
import { publicConfig } from "@/lib/config";

const primary = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/pay", label: "Pay", icon: ArrowUpRight },
  { href: "/receive", label: "Receive", icon: ArrowDownLeft },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/rewards", label: "Rewards", icon: Coins },
];

const secondary = [
  { href: "/token", label: "Token", icon: Coins },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/swap", label: "Swap", icon: Repeat },
  { href: "/merchant", label: "Merchant", icon: Store },
  { href: "/qr", label: "QR", icon: QrCode },
  { href: "/developers", label: "Developers", icon: BookOpen },
  { href: "/docs", label: "Docs", icon: BookOpen },
  { href: "/security", label: "Security", icon: Shield },
];

const mobile = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/pay", label: "Pay", icon: ArrowUpRight },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/profile", label: "Profile", icon: UserRound },
];

function NavLink({
  href,
  label,
  icon: Icon,
  compact = false,
  ink = false,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  compact?: boolean;
  ink?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/app" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        compact
          ? "flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[11px]"
          : "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm",
        ink && active && "bg-white/10 text-[#f7f1e6] shadow-[inset_2px_0_0_#e7c98a]",
        ink && !active && "text-white/60 hover:bg-white/10 hover:text-[#f7f1e6]",
        !ink && active && "bg-[#12141a] text-[#f7f1e6]",
        !ink && !active && "text-muted hover:bg-sunken hover:text-fg",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-white/10 bg-[#101217] px-3 py-5 text-[#f7f1e6] md:flex">
        <Link href="/" className="px-2" aria-label="Vire home">
          <Wordmark />
        </Link>
        <nav className="mt-6 grid gap-1" aria-label="Product">
          {primary.map((item) => (
            <NavLink key={item.href} {...item} ink />
          ))}
        </nav>
        <nav className="mt-4 grid gap-1 border-t border-white/10 pt-4" aria-label="More">
          {secondary.map((item) => (
            <NavLink key={item.href} {...item} ink />
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-[#e7c98a]/30 bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <TokenMark className="size-7" />
            <div>
              <p className="text-sm font-medium">$VIRE</p>
              <p className="text-xs text-white/50">
                {publicConfig.tokenAddress ? "Contract configured" : "Contract not set"}
              </p>
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-[4.5rem] items-center justify-between gap-3 border-b border-line glass px-4 shadow-[inset_0_-1px_0_rgba(212,180,131,0.45)]">
          <Link href="/" className="md:hidden" aria-label="Vire home">
            <Wordmark />
          </Link>
          <p className="hidden text-sm text-muted md:block">Payments, as direct as a message.</p>
          <div className="ml-auto flex items-center gap-2">
            <NetworkMenu />
            <ThemeToggle />
            <Link
              href="/notifications"
              className="grid size-10 place-items-center rounded-full border border-line hover:bg-sunken"
              aria-label="Notifications"
            >
              <Bell size={16} />
            </Link>
            <ConnectButton />
          </div>
        </header>
        <main className="px-4 py-6 pb-28 md:px-8 md:py-8 md:pb-10">{children}</main>
        <div className="hidden border-t border-line px-8 py-5 md:block">
          <Disclaimer compact />
        </div>
      </div>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-elev/95 px-2 py-2 backdrop-blur md:hidden"
        aria-label="Mobile"
      >
        {mobile.map((item) => (
          <NavLink key={item.href} {...item} compact />
        ))}
      </nav>
    </div>
  );
}
