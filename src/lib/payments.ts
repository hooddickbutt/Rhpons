import { isAddress } from "viem";
import { findPreviewProfile, previewProfiles } from "@/lib/preview";

export function normalizeHandle(value: string) {
  return value.trim().replace(/^@/, "").toLowerCase();
}

export function buildPaymentPath(input: {
  handle: string;
  amount?: string;
  asset?: string;
  note?: string;
}) {
  const params = new URLSearchParams();
  if (input.amount) params.set("amount", input.amount);
  if (input.asset) params.set("asset", input.asset);
  if (input.note) params.set("note", input.note);
  const query = params.toString();
  const handle = encodeURIComponent(normalizeHandle(input.handle));
  return `/pay/vire/${handle}${query ? `?${query}` : ""}`;
}

export function displayPaymentPath(path: string) {
  return path.replace(/^\//, "");
}

export type ResolvedRecipient =
  | {
      kind: "address";
      handle: string;
      name: string;
      address: `0x${string}`;
      payable: true;
      preview: false;
    }
  | {
      kind: "preview";
      handle: string;
      name: string;
      address: `0x${string}`;
      payable: false;
      preview: true;
    }
  | {
      kind: "unknown";
      handle: string;
      name: string;
      address: null;
      payable: false;
      preview: false;
    };

export function resolveRecipient(input: string): ResolvedRecipient {
  const trimmed = input.trim();
  const previewAddress = previewProfiles.find(
    (profile) => profile.address.toLowerCase() === trimmed.toLowerCase(),
  );
  const preview = previewAddress ?? findPreviewProfile(trimmed);
  if (isAddress(trimmed) && !preview) {
    return {
      kind: "address",
      handle: trimmed,
      name: "Wallet address",
      address: trimmed,
      payable: true,
      preview: false,
    };
  }
  if (preview) {
    return {
      kind: "preview",
      handle: preview.handle,
      name: preview.name,
      address: preview.address,
      payable: false,
      preview: true,
    };
  }
  const handle = normalizeHandle(trimmed);
  return {
    kind: "unknown",
    handle,
    name: handle ? `@${handle}` : "Unknown",
    address: null,
    payable: false,
    preview: false,
  };
}
