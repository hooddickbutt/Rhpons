# Reference contracts

These Solidity files describe a possible Vire deployment. They are not audited, they are not deployed, and the website does not send transactions to them unless an address is placed in the environment.

| Contract | Purpose |
| --- | --- |
| `VireToken.sol` | Fixed-supply ERC-20 named Vire (`VIRE`). No admin mint. |
| `UsernameRegistry.sol` | Lets an address claim one lowercase name. A name is not identity verification. |
| `PaymentRouter.sol` | Optional path for ETH and ERC-20 payments, a 1% fee cap, and request/merchant events. |

Direct wallet transfers in the app do not need the router. Rewards are intentionally not a contract in this repository, because no reward rules are live.

Access control on the router is a single owner for the fee setting. The contracts are not upgradeable. That keeps the reference small. A production system that needs upgrades should use a reviewed proxy pattern and a timelock, not a silent change.

Security notes:

- The router uses a reentrancy lock around value transfers.
- ERC-20 `transferFrom` must return true. Fee-on-transfer tokens are not supported.
- Anyone can emit `MerchantRegistered`. It does not grant privileges.
- Do not deploy these contracts with real funds before an independent review.
