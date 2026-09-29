# Vire architecture

Vire is a payment interface. The token is a component of that product, not the product itself. This document is the implementation map for the website in this repository.

## 1. Product requirements

A person can connect an EVM wallet, read a balance, send or request a supported asset, share a payment link or QR code, and inspect transaction status. Advanced details (hash, explorer, chain ID) stay available without leading the flow.

Live behavior is limited to what the connected wallet and configured contracts can actually do. Preview data is labeled. Roadmap utility is labeled. The product must not claim affiliation with X, X Money, or Robinhood, and must not promise profit or yield.

## 2. Sitemap

- `/` marketing home
- `/app` payment home
- `/pay`, `/pay/vire/[handle]`
- `/receive`, `/qr`, `/wallet`, `/swap`, `/activity`, `/rewards`
- `/token`, `/explore`, `/merchant`
- `/developers`, `/docs`, `/security`
- `/profile`, `/notifications`, `/u/[handle]`
- `/admin` (read-only, not indexed)
- `/terms`, `/privacy`, `/risk`, `/token-info`, `/contact`
- `/api/network`, `/api/token`, `/api/health`

## 3. User flows

Connect: open the wallet dialog, approve an injected wallet, or enter preview mode. Preview never signs.

Send: recipient, amount and asset, optional note, review, then either a simulation or a wallet signature. States are preparing, awaiting wallet confirmation, submitting, pending, confirmed, or failed.

Receive: name, asset, amount or open amount, note, QR, copy link.

Payment link: `pay/vire/<name>` opens the send flow with those fields filled.

## 4. Interface

The visual system is bone and ink, with a brass mark. Instrument Serif is used for headlines and Instrument Sans for the interface. Dark mode is a charcoal field, not a neon theme. Light mode is a warm paper field.

Desktop product pages use a left navigation. Phone screens use a bottom bar: Home, Pay, Wallet, Activity, Profile.

## 5. Design system

Tokens live in `src/app/globals.css`. Shared controls are `Button`, `Field`, `Modal`, `StatusPill`, and `CopyButton`. Status labels are Live, Demo, Preview, Estimated, Historical, Unavailable, Roadmap, Confirmed, Pending, and Failed.

## 6. Component architecture

Marketing pages use `SiteHeader` and `SiteFooter`. Product pages use `AppShell`. Wallet state is provided by wagmi. Preview mode and local payment records are provided by `SessionProvider` and stored in `localStorage`.

## 7. Folder structure

- `src/app` routes, metadata, and API handlers
- `src/components` interface
- `src/lib` brand, chain config, payments, previews
- `src/lib/server` RPC reads
- `contracts/reference` unaudited Solidity
- `db/schema.sql` future Postgres schema
- `public/brand` logo and token mark

## 8. Database

No database is required to run the site. `db/schema.sql` defines users, wallet links, sign-in nonces, usernames, payment requests, and merchants for a later API. Private keys are out of scope for that schema.

Authentication, when added, should be a signed message against a nonce. The current site does not create server sessions.

## 9. Smart contracts

`VireToken` is a fixed-supply ERC-20. `UsernameRegistry` maps one lowercase name to one address and does not verify identity. `PaymentRouter` can forward ETH or ERC-20 payments, cap a fee at 1%, and emit `PaymentSent`, `PaymentReceived`, `PaymentRequested`, and `MerchantRegistered`.

There is no rewards contract. The router is not upgradeable. Owner control is limited to the fee setting. These files are reference code and must be reviewed before any deployment.

The app can also send a plain wallet transfer without the router.

## 10. Web3 integration

wagmi connects injected wallets. WalletConnect is added only when `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set. viem defines Robinhood Chain (4663) and Robinhood Chain Testnet (46630), reads blocks and ERC-20 metadata, and encodes transfers.

Chain parameters follow the public Robinhood Chain docs: ETH is the gas token, the public mainnet RPC is `https://rpc.mainnet.chain.robinhood.com`, and the explorer is `https://robinhoodchain.blockscout.com`.

Account abstraction (sponsored gas, batches, session keys, spending limits) is not implemented.

## 11. API

- `GET /api/network` returns the latest block or an unavailable status. This is live RPC data.
- `GET /api/token` returns configured address and onchain metadata. Price fields are null.
- `GET /api/health` is a process check.

Payment links are stateless. They do not need the API.

## 12. Environment

See `.env.example`. Server-only values such as `DATABASE_URL` and a private RPC key must not use the `NEXT_PUBLIC_` prefix.

## 13. Security

The site is non-custodial. Real transfers require an explicit checkbox and a wallet signature. Example profiles cannot be broadcast targets. Security headers are set in `next.config.ts`. The admin screen has no privileged actions. Copy does not say the platform is fully secure.

## 14. Responsive behavior

Marketing and product layouts reflow to a single column. The payment composer uses a large amount field that remains usable on a phone. The bottom navigation keeps Pay one tap away.

## 15. Motion

Page content fades up. The confirmation check draws once. Skeletons shimmer while a section loads. All three are disabled under `prefers-reduced-motion`.

## 16. Loading

Product routes use `loading.tsx` skeletons. Network stats on the home page show “Reading” until `/api/network` returns.

## 17. Errors

Product routes have an error boundary that does not ask the wallet to sign. Wallet rejection, RPC failure, and an unknown payment name are explained in the screen where they happen.

## 18. Empty states

An unconnected home asks for a wallet or the preview. Activity, notifications, rewards, the token chart, and merchant totals explain why they are empty instead of filling in numbers.

## 19. Wallet connection

The connect dialog lists injected connectors, then offers a labeled preview. Disconnect is available from the same control. The network menu can request a switch to chain 4663 or 46630 after a wallet is connected.

## 20. Payment flow

`SendFlow` is the send path and the payment-link path. `ReceiveFlow` creates the link and QR code. A simulation is stored locally and marked Demo. A broadcast payment stores the hash and links to the explorer after the receipt.

## 21. Token flow

The token page reads `readTokenSnapshot`. Market statistics stay unavailable. “Get VIRE” opens the swap screen, which stays disabled until a router address exists. “Add to wallet” calls `wallet_watchAsset` only when an address is configured.

## 22. Merchant flow

Merchants can build a fixed or open-amount request, copy it, and export browser-local requests as CSV. Revenue, refunds, and customer lists are marked unavailable.

## 23. Admin flow

`/admin` lists configuration and explicitly says authorization is not enabled. It does not mutate contracts or users.

## 24. Deployment

The app is a Next.js server. `npm run build` then `npm start` serves it on port 43123. Set the environment variables in the host. Use a production RPC rather than the public endpoint when traffic grows. Do not deploy the reference contracts from the build.

## 25. Testing

`npm test` runs Vitest against payment-link construction and recipient rules. `npm run lint` and `npm run build` cover the TypeScript app. Wallet signatures and RPC failures should be checked against Robinhood Chain testnet before mainnet use. The reference contracts need a separate Foundry review before deployment.

## 26. SEO

The root layout sets the title template, description, and Open Graph image. `sitemap.ts` and `robots.ts` are included. `/admin` is disallowed.

## 27. Accessibility

Controls have names, the connect and payment dialogs use the native `dialog` element, form fields have labels, and a skip link points at the content. Status text is not conveyed by color alone.

## 28. Performance

Marketing pages are server-rendered. Wallet code is loaded with the root provider because every page can connect, and chain reads are limited to the screens that need them. Images are SVG. Motion is short and can be reduced.

## 29. Brand assets

The mark is an original rounded square: three message rules and a small send stroke, in ink and brass. It is not the X mark and not the Robinhood mark. Files:

- `public/brand/mark.svg`
- `public/brand/token.svg`
- `public/icon.svg`
- `src/app/icon.svg`
- `src/app/apple-icon.tsx`
- `src/app/opengraph-image.tsx`

Wordmark: lowercase “vire” in Instrument Serif, set in `Wordmark`.

## 30. Implementation checklist

- [x] Original brand, disclaimer, and no invented market data
- [x] Robinhood Chain network configuration
- [x] Connect, preview, send, receive, QR, payment link
- [x] Wallet balances when a wallet or token address is available
- [x] Token page with a visible contract field
- [x] Activity, rewards, swap, merchant, explore, admin
- [x] Docs, security, and draft legal pages
- [x] Reference contracts and database schema
- [x] Environment example, tests, lint, and production build
- [ ] Persistent accounts, indexer, price feed, and audited deployment
- [ ] Account abstraction and live token utility
