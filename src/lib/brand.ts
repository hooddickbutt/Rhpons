export const brand = {
  name: "Vire",
  tokenName: "Vire",
  tokenSymbol: "VIRE",
  tokenTicker: "$VIRE",
  tagline: "Payments should feel as simple as sending a message.",
  heroTitle: "Money, built for the onchain world.",
  heroBody:
    "Send, receive, manage and move digital assets through a simple payment experience built for Robinhood Chain.",
  description:
    "Vire is an independent, non-custodial payment interface for Robinhood Chain. It is not affiliated with X, X Money, or Robinhood.",
  disclaimer:
    "This is an independent project and is not affiliated with, endorsed by, sponsored by, or officially connected with X, X Money, or Robinhood Markets, Inc.",
  networkNote:
    "Robinhood Chain is a third-party network. Vire is not operated by Robinhood Markets, Inc.",
  paymentPath: "pay/vire",
} as const;

export const brandStory = [
  "Vire is a short, original name for this payment interface. It is not taken from X, Robinhood, or another financial brand.",
  "The product is built around one idea: sending value should feel as direct as sending a message. Choose a person, enter an amount, and confirm in a wallet you control.",
  "Vire does not custody funds. A connected wallet signs every blockchain transaction. Until a contract address is configured, the native token is a documented part of the product, not a live asset on the site.",
] as const;
