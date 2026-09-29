"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { robinhoodMainnet, robinhoodTestnet } from "@/lib/chain";
import { publicConfig } from "@/lib/config";

const connectors = [
  injected(),
  ...(publicConfig.walletConnectProjectId
    ? [walletConnect({ projectId: publicConfig.walletConnectProjectId, showQrModal: true })]
    : []),
];

export const wagmiConfig = createConfig({
  chains: [robinhoodMainnet, robinhoodTestnet],
  connectors,
  transports: {
    [robinhoodMainnet.id]: http(publicConfig.rpcUrl),
    [robinhoodTestnet.id]: http(publicConfig.testnetRpcUrl),
  },
  ssr: true,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
