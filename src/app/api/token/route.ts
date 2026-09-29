import { NextResponse } from "next/server";
import { readTokenSnapshot } from "@/lib/server/chain-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await readTokenSnapshot();
  return NextResponse.json(snapshot);
}
