# Vire

Vire is an independent, non-custodial payment interface for Robinhood Chain. Sending value is meant to feel as direct as sending a message: choose a person, enter an amount, and confirm in a wallet you control.

Vire is not affiliated with, endorsed by, sponsored by, or officially connected with X, X Money, or Robinhood Markets, Inc. Robinhood Chain is a third-party network. Vire is not operated by Robinhood Markets, Inc.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app serves at [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm test
npm run lint
npm run build
```

## What works in this version

- Marketing site, payment app, wallet, activity, rewards, token, merchant, QR, swap, docs, security, and a read-only admin screen.
- Wallet connection with wagmi on Robinhood Chain mainnet (chain ID 4663) and testnet (chain ID 46630). Gas is ETH.
- A real ETH or configured ERC-20 transfer only when you explicitly choose to broadcast it. Otherwise the payment flow is a labeled simulation.
- Live block number from the configured RPC, and live token metadata when `NEXT_PUBLIC_VIRE_TOKEN_ADDRESS` is set.
- Prices, market cap, holders, and reward balances stay empty until a real data source exists. Sample screens are marked Demo or Preview.

## Configuration

Contract addresses, RPC URLs, and the explorer come from environment variables. See `.env.example`. Do not commit `.env.local`. Never put a private key in a `NEXT_PUBLIC_` variable.

The native token is intended to be created through Pons. Until its address is set, the site shows “not configured” instead of a stand-in address.

## Stack

Next.js, React, TypeScript, and Tailwind CSS for the interface. wagmi and viem for wallet connection and chain reads. Reference Solidity contracts are in `contracts/reference` and are not deployed. A PostgreSQL schema for a later backend is in `db/schema.sql`.

The longer product and engineering notes are in [ARCHITECTURE.md](ARCHITECTURE.md).
