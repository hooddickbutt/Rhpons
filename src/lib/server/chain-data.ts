import { createPublicClient, erc20Abi, formatUnits, http } from "viem";
import { chainById } from "@/lib/chain";
import { explorerFor, publicConfig, rpcHost, serverRpcUrl } from "@/lib/config";

export type NetworkSnapshot = {
  status: "live" | "unavailable";
  chainId: number;
  chainName: string;
  blockNumber: string | null;
  rpcHost: string;
  explorerUrl: string;
  nativeSymbol: "ETH";
  error?: string;
};

export type TokenSnapshot = {
  configured: boolean;
  address: `0x${string}` | null;
  network: string;
  chainId: number;
  explorerUrl: string | null;
  name: string | null;
  symbol: string | null;
  decimals: number | null;
  totalSupply: string | null;
  priceUsd: null;
  marketCapUsd: null;
  liquidityUsd: null;
  volume24hUsd: null;
  holders: null;
  circulatingSupply: null;
  onchain: "live" | "unavailable" | "not-configured";
  market: "unavailable";
};

function clientFor(chainId = publicConfig.chainId) {
  const chain = chainById(chainId);
  const rpc = chainId === 46630 ? publicConfig.testnetRpcUrl : serverRpcUrl();
  return createPublicClient({
    chain,
    transport: http(rpc, { timeout: 5000 }),
  });
}

export async function readNetworkSnapshot(): Promise<NetworkSnapshot> {
  const chain = chainById(publicConfig.chainId);
  const rpc = serverRpcUrl();
  try {
    const client = clientFor(chain.id);
    const blockNumber = await client.getBlockNumber();
    const chainId = await client.getChainId();
    return {
      status: "live",
      chainId,
      chainName: chain.name,
      blockNumber: blockNumber.toString(),
      rpcHost: rpcHost(rpc),
      explorerUrl: explorerFor(chainId),
      nativeSymbol: "ETH",
    };
  } catch (error) {
    return {
      status: "unavailable",
      chainId: chain.id,
      chainName: chain.name,
      blockNumber: null,
      rpcHost: rpcHost(rpc),
      explorerUrl: explorerFor(chain.id),
      nativeSymbol: "ETH",
      error: error instanceof Error ? error.message : "RPC request failed",
    };
  }
}

export async function readTokenSnapshot(): Promise<TokenSnapshot> {
  const chain = chainById(publicConfig.chainId);
  const base: TokenSnapshot = {
    configured: Boolean(publicConfig.tokenAddress),
    address: publicConfig.tokenAddress,
    network: chain.name,
    chainId: chain.id,
    explorerUrl: publicConfig.tokenAddress
      ? `${explorerFor(chain.id)}/token/${publicConfig.tokenAddress}`
      : null,
    name: null,
    symbol: null,
    decimals: null,
    totalSupply: null,
    priceUsd: null,
    marketCapUsd: null,
    liquidityUsd: null,
    volume24hUsd: null,
    holders: null,
    circulatingSupply: null,
    onchain: publicConfig.tokenAddress ? "unavailable" : "not-configured",
    market: "unavailable",
  };

  if (!publicConfig.tokenAddress) return base;

  try {
    const client = clientFor(chain.id);
    const address = publicConfig.tokenAddress;
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      client.readContract({ address, abi: erc20Abi, functionName: "name" }),
      client.readContract({ address, abi: erc20Abi, functionName: "symbol" }),
      client.readContract({ address, abi: erc20Abi, functionName: "decimals" }),
      client.readContract({ address, abi: erc20Abi, functionName: "totalSupply" }),
    ]);
    return {
      ...base,
      name,
      symbol,
      decimals,
      totalSupply: formatUnits(totalSupply, decimals),
      onchain: "live",
    };
  } catch {
    return base;
  }
}
