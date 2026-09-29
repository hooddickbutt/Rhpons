"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ConnectButton } from "@/components/web3/connect-button";
import { NetworkMenu } from "@/components/web3/network-menu";

const links = [
  ["Product", "/app"],
  ["Token", "/token"],
  ["Developers", "/developers"],
  ["Docs", "/docs"],
  ["Security", "/security"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-5">
        <Link href="/" aria-label="Vire home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-fg">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <NetworkMenu />
          </div>
          <ThemeToggle />
          <div className="hidden sm:block">
            <ConnectButton />
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line px-4 py-4 md:hidden">
          <nav className="grid gap-3 text-sm" aria-label="Mobile">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/app" onClick={() => setOpen(false)}>
              Launch app
            </Link>
          </nav>
          <div className="mt-4 flex items-center gap-2">
            <NetworkMenu />
            <ConnectButton />
          </div>
        </div>
      ) : null}
    </header>
  );
}
