import type { MetadataRoute } from "next";
import { publicConfig } from "@/lib/config";

const paths = [
  "",
  "/app",
  "/pay",
  "/receive",
  "/wallet",
  "/activity",
  "/rewards",
  "/token",
  "/explore",
  "/swap",
  "/merchant",
  "/qr",
  "/developers",
  "/docs",
  "/security",
  "/terms",
  "/privacy",
  "/risk",
  "/token-info",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path || "/", publicConfig.appUrl).toString(),
    lastModified: new Date("2026-09-29"),
  }));
}
