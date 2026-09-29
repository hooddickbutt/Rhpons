export type PreviewProfile = {
  handle: string;
  name: string;
  role: string;
  address: `0x${string}`;
  bio: string;
};

export const previewProfiles: PreviewProfile[] = [
  {
    handle: "alex",
    name: "Alex Rivera",
    role: "Example person",
    address: "0x1111111111111111111111111111111111111111",
    bio: "Sample payment identity used to show how a name can stand in for an address.",
  },
  {
    handle: "creator",
    name: "North Studio",
    role: "Example creator",
    address: "0x2222222222222222222222222222222222222222",
    bio: "Sample creator profile for payment requests and shared links.",
  },
  {
    handle: "merchant",
    name: "Harbor Goods",
    role: "Example merchant",
    address: "0x3333333333333333333333333333333333333333",
    bio: "Sample merchant profile for invoices, QR requests, and a customer page.",
  },
  {
    handle: "studio",
    name: "Studio Mare",
    role: "Example team",
    address: "0x4444444444444444444444444444444444444444",
    bio: "Sample team profile with a public payment page.",
  },
];

export function findPreviewProfile(handle: string) {
  const normalized = handle.trim().replace(/^@/, "").toLowerCase();
  return previewProfiles.find((profile) => profile.handle === normalized) ?? null;
}

export type SampleActivity = {
  id: string;
  handle: string;
  name: string;
  action: string;
  amount: string;
  asset: string;
  time: string;
  status: "confirmed" | "pending" | "failed";
  filter: "payments" | "swaps" | "rewards" | "token" | "system";
};

export const sampleActivity: SampleActivity[] = [
  {
    id: "s1",
    handle: "alex",
    name: "Alex Rivera",
    action: "Payment received",
    amount: "25",
    asset: "USDC",
    time: "2m ago",
    status: "confirmed",
    filter: "payments",
  },
  {
    id: "s2",
    handle: "creator",
    name: "North Studio",
    action: "Payment request created",
    amount: "80",
    asset: "USDC",
    time: "18m ago",
    status: "pending",
    filter: "payments",
  },
  {
    id: "s3",
    handle: "merchant",
    name: "Harbor Goods",
    action: "Payment sent",
    amount: "0.04",
    asset: "ETH",
    time: "1h ago",
    status: "confirmed",
    filter: "payments",
  },
  {
    id: "s4",
    handle: "studio",
    name: "Studio Mare",
    action: "Token swapped",
    amount: "120",
    asset: "VIRE",
    time: "3h ago",
    status: "confirmed",
    filter: "swaps",
  },
  {
    id: "s5",
    handle: "alex",
    name: "Alex Rivera",
    action: "Reward received",
    amount: "6",
    asset: "VIRE",
    time: "Yesterday",
    status: "confirmed",
    filter: "rewards",
  },
  {
    id: "s6",
    handle: "creator",
    name: "North Studio",
    action: "Token added to wallet",
    amount: "—",
    asset: "VIRE",
    time: "Yesterday",
    status: "confirmed",
    filter: "token",
  },
  {
    id: "s7",
    handle: "vire",
    name: "Vire",
    action: "Network status checked",
    amount: "—",
    asset: "ETH",
    time: "Today",
    status: "confirmed",
    filter: "system",
  },
];

export const sampleRewards = [
  {
    id: "r1",
    title: "Payment activity",
    detail: "Sample record of a payment-linked reward.",
    amount: "4 VIRE",
    time: "Sample",
  },
  {
    id: "r2",
    title: "Merchant reward",
    detail: "Sample record for a completed merchant payment.",
    amount: "9 VIRE",
    time: "Sample",
  },
  {
    id: "r3",
    title: "Referral",
    detail: "Sample record. Referral rewards are not live.",
    amount: "2 VIRE",
    time: "Sample",
  },
];
