import { ImageResponse } from "next/og";

export const alt = "Vire, an independent payment interface for Robinhood Chain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0e12",
          color: "#f3efe6",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#d4b483" }}>
          VIRE
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -1 }}>
            Money, built for the onchain world.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#b1aaa0", lineHeight: 1.4 }}>
            An independent payment interface for Robinhood Chain.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
