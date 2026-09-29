import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vire",
    short_name: "Vire",
    description: "Independent payment interface for Robinhood Chain.",
    start_url: "/app",
    display: "standalone",
    background_color: "#0c0e12",
    theme_color: "#0c0e12",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
