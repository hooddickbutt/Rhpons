import { defineChain } from "viem";
import { publicConfig } from "@/lib/config";

export const robinhoodMainnet = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [publicConfig.rpcUrl] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: publicConfig.explorerUrl,
    },
  },
});

export const robinhoodTestnet = defineChain({
  id: 46630,
  name: "Robinhood Chain Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [publicConfig.testnetRpcUrl] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: publicConfig.testnetExplorerUrl,
    },
  },
  testnet: true,
});

export const supportedChains = [robinhoodMainnet, robinhoodTestnet] as const;

export function chainById(chainId: number) {
  return supportedChains.find((chain) => chain.id === chainId) ?? robinhoodMainnet;
}
