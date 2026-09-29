import type { MetadataRoute } from "next";
import { publicConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: new URL("/sitemap.xml", publicConfig.appUrl).toString(),
  };
}
