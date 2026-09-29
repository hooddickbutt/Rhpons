"use client";

import { useEffect, useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import { formatBlock } from "@/lib/format";

type NetworkResponse = {
  status: "live" | "unavailable";
  chainId: number;
  chainName: string;
  blockNumber: string | null;
  rpcHost: string;
  nativeSymbol: string;
};

export function NetworkPulse() {
  const [data, setData] = useState<NetworkResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const pending = !data && !failed;

  useEffect(() => {
    let active = true;
    fetch("/api/network")
      .then((response) => response.json())
      .then((json: NetworkResponse) => {
        if (active) setData(json);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="grid gap-3 md:grid-cols-4">
      <Card
        label="Network"
        value={data?.chainName ?? (failed ? "Unreachable" : "Reading")}
        badge={pending ? "Reading" : data?.status === "live" ? "Live" : "Unavailable"}
        detail={data ? `Chain ID ${data.chainId}` : "Robinhood Chain"}
      />
      <Card
        label="Latest block"
        value={data?.blockNumber ? formatBlock(data.blockNumber) : "—"}
        badge={pending ? "Reading" : data?.status === "live" ? "Live" : "Unavailable"}
        detail={data?.rpcHost ? `Source ${data.rpcHost}` : "Public RPC"}
      />
      <Card label="Token price" value="—" badge="Unavailable" detail="$VIRE has no price feed" />
      <Card label="Gas token" value="ETH" badge="Live" detail="No separate gas token" />
    </section>
  );
}

function Card({
  label,
  value,
  badge,
  detail,
}: {
  label: string;
  value: string;
  badge: "Live" | "Unavailable" | "Reading";
  detail: string;
}) {
  return (
    <article className="surface-flat p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted">{label}</p>
        <StatusPill>{badge}</StatusPill>
      </div>
      <p className="serif mt-3 text-2xl">{value}</p>
      <p className="mt-1 text-xs text-faint">{detail}</p>
    </article>
  );
}
