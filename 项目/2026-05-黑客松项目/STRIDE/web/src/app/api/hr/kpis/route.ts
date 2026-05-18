import { NextResponse } from "next/server";
import { getLatestSnapshot } from "@/lib/calc-engine";

export async function GET(req: Request) {
  const quarter = new URL(req.url).searchParams.get("quarter") ?? "2025Q3";
  const snapshot = getLatestSnapshot(quarter);
  if (!snapshot) return NextResponse.json({ error: "no data" }, { status: 404 });
  return NextResponse.json({ kpis: snapshot.kpis, plCosts: snapshot.plCosts });
}
