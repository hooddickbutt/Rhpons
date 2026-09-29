import Link from "next/link";
import { Wordmark } from "@/components/brand/logo";
import { Disclaimer } from "@/components/layout/disclaimer";
import { publicConfig } from "@/lib/config";
import { shortAddress } from "@/lib/format";

const links = [
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Risk disclosure", "/risk"],
  ["Token information", "/token-info"],
  ["Security", "/security"],
  ["Contact", "/contact"],
  ["Docs", "/docs"],
  ["Admin", "/admin"],
] as const;

export function SiteFooter() {
  return (
    <footer className="ink-surface rounded-none border-x-0 border-b-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            An independent payment interface for people who want onchain transfers to feel
            plain and direct.
          </p>
          <p className="mt-4 font-mono text-xs text-faint">
            {publicConfig.tokenAddress
              ? `$VIRE ${shortAddress(publicConfig.tokenAddress, 6)}`
              : "$VIRE contract not configured"}
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Legal">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-white/65 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-6">
          <Disclaimer />
        </div>
      </div>
    </footer>
  );
}
