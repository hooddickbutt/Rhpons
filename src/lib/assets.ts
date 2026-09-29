import { publicConfig } from "@/lib/config";

export type AssetId = "eth" | "usdc" | "vire";

export type AssetDefinition = {
  id: AssetId;
  name: string;
  symbol: string;
  decimals: number;
  address: `0x${string}` | null;
  native: boolean;
  configured: boolean;
};

export function getAssets(): AssetDefinition[] {
  return [
    {
      id: "eth",
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      address: null,
      native: true,
      configured: true,
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: publicConfig.usdcAddress,
      native: false,
      configured: Boolean(publicConfig.usdcAddress),
    },
    {
      id: "vire",
      name: "Vire",
      symbol: "VIRE",
      decimals: 18,
      address: publicConfig.tokenAddress,
      native: false,
      configured: Boolean(publicConfig.tokenAddress),
    },
  ];
}

export function assetById(id: string | undefined) {
  return getAssets().find((asset) => asset.id === id) ?? getAssets()[0];
}
