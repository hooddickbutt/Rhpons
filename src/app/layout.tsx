import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SessionProvider } from "@/components/session/session-provider";
import { Web3Provider } from "@/components/web3/providers";
import { brand } from "@/lib/brand";
import { publicConfig } from "@/lib/config";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicConfig.appUrl),
  title: {
    default: "Vire",
    template: "%s · Vire",
  },
  description: brand.description,
  applicationName: "Vire",
  openGraph: {
    title: "Vire",
    description: brand.heroBody,
    type: "website",
    siteName: "Vire",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vire",
    description: brand.heroBody,
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('vire-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Web3Provider>
            <SessionProvider>
              <div id="content">{children}</div>
            </SessionProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
