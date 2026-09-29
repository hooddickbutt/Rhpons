import { isAddress } from "viem";

const ZERO = "0x0000000000000000000000000000000000000000";

export function configuredAddress(value: string | undefined | null): `0x${string}` | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!isAddress(trimmed)) return null;
  if (trimmed.toLowerCase() === ZERO) return null;
  return trimmed;
}

function num(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const publicConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:43123",
  chainId: num(process.env.NEXT_PUBLIC_CHAIN_ID, 4663),
  rpcUrl:
    process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.mainnet.chain.robinhood.com",
  testnetRpcUrl:
    process.env.NEXT_PUBLIC_TESTNET_RPC_URL ||
    "https://rpc.testnet.chain.robinhood.com",
  explorerUrl:
    process.env.NEXT_PUBLIC_EXPLORER_URL || "https://robinhoodchain.blockscout.com",
  testnetExplorerUrl:
    process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL ||
    "https://explorer.testnet.chain.robinhood.com",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  tokenAddress: configuredAddress(process.env.NEXT_PUBLIC_VIRE_TOKEN_ADDRESS),
  usdcAddress: configuredAddress(process.env.NEXT_PUBLIC_USDC_ADDRESS),
  paymentRouterAddress: configuredAddress(
    process.env.NEXT_PUBLIC_PAYMENT_ROUTER_ADDRESS,
  ),
  usernameRegistryAddress: configuredAddress(
    process.env.NEXT_PUBLIC_USERNAME_REGISTRY_ADDRESS,
  ),
  swapRouterAddress: configuredAddress(process.env.NEXT_PUBLIC_SWAP_ROUTER_ADDRESS),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};

export function serverRpcUrl() {
  return process.env.RPC_URL || publicConfig.rpcUrl;
}

export function explorerFor(chainId: number) {
  return chainId === 46630 ? publicConfig.testnetExplorerUrl : publicConfig.explorerUrl;
}

export function rpcHost(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return "configured RPC";
  }
}
