import { NextResponse } from "next/server";
import { readNetworkSnapshot } from "@/lib/server/chain-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await readNetworkSnapshot();
  return NextResponse.json(snapshot, {
    status: snapshot.status === "live" ? 200 : 503,
  });
}
