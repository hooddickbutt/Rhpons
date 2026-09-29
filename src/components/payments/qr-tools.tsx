"use client";

import { useState } from "react";
import { ReceiveFlow } from "@/components/payments/receive-flow";
import { StatusPill } from "@/components/ui/status-pill";

export function QrTools() {
  const [mode, setMode] = useState<"personal" | "merchant" | "scan">("personal");
  const [scanned, setScanned] = useState("");
  const [scanError, setScanError] = useState("");

  async function scanFile(file: File) {
    setScanError("");
    setScanned("");
    const Detector = "BarcodeDetector" in window ? window.BarcodeDetector : undefined;
    if (!Detector) {
      setScanError("This browser cannot scan QR images. Paste a payment link instead.");
      return;
    }
    const bitmap = await createImageBitmap(file);
    const detector = new Detector({ formats: ["qr_code"] });
    const codes = await detector.detect(bitmap);
    const value = codes[0]?.rawValue;
    if (!value) {
      setScanError("No QR code was found in that image.");
      return;
    }
    setScanned(value);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="serif text-4xl md:text-5xl">QR payments</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Personal codes request a fixed amount. Merchant codes can leave the amount open so a
          customer fills it in. Scanning reads a code you already have. It does not turn the
          camera on until you choose a file in browsers without a scanner.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["personal", "Personal QR"],
            ["merchant", "Merchant QR"],
            ["scan", "Scan"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`rounded-full px-4 py-2 text-sm ${
              mode === id ? "bg-primary text-primary-fg" : "border border-line"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "personal" ? <ReceiveFlow /> : null}
      {mode === "merchant" ? <ReceiveFlow merchant /> : null}
      {mode === "scan" ? (
        <section className="surface max-w-xl p-6">
          <div className="flex items-center gap-2">
            <StatusPill>Live</StatusPill>
            <p className="text-sm text-muted">Image scan, when the browser supports it</p>
          </div>
          <label className="mt-5 block text-sm">
            Upload a QR image
            <input
              className="mt-2 block w-full text-sm"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void scanFile(file);
              }}
            />
          </label>
          {scanError ? (
            <p className="mt-4 text-sm text-danger" role="alert">
              {scanError}
            </p>
          ) : null}
          {scanned ? (
            <div className="mt-4 rounded-2xl bg-sunken p-4">
              <p className="break-all font-mono text-sm">{scanned}</p>
              {scanned.startsWith("http") ? (
                <a className="mt-3 inline-flex text-sm underline" href={scanned}>
                  Open payment link
                </a>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  This code is not a Vire link. Check the address before you pay anyone.
                </p>
              )}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

declare global {
  interface Window {
    BarcodeDetector?: {
      new (options?: { formats?: string[] }): {
        detect: (source: ImageBitmap) => Promise<Array<{ rawValue?: string }>>;
      };
    };
  }
}
