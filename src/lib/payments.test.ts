import { describe, expect, it } from "vitest";
import { buildPaymentPath, displayPaymentPath, resolveRecipient } from "@/lib/payments";

describe("payment links", () => {
  it("builds a readable payment path", () => {
    const path = buildPaymentPath({
      handle: "@Alex",
      amount: "25",
      asset: "usdc",
      note: "dinner",
    });
    expect(path).toBe("/pay/vire/alex?amount=25&asset=usdc&note=dinner");
    expect(displayPaymentPath(path)).toBe("pay/vire/alex?amount=25&asset=usdc&note=dinner");
  });

  it("treats example names and their sample addresses as non-payable", () => {
    expect(resolveRecipient("@alex").payable).toBe(false);
    expect(resolveRecipient("0x1111111111111111111111111111111111111111").payable).toBe(false);
  });

  it("accepts an unknown wallet address for a real transfer", () => {
    const resolved = resolveRecipient("0x0000000000000000000000000000000000000001");
    expect(resolved.kind).toBe("address");
    expect(resolved.payable).toBe(true);
  });

  it("rejects an unknown name", () => {
    expect(resolveRecipient("not-a-person").kind).toBe("unknown");
  });
});
