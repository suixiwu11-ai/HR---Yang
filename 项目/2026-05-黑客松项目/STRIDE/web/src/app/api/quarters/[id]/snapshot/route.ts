import { NextResponse } from "next/server";
import { getLatestSnapshot } from "@/lib/calc-engine";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const snapshot = await getLatestSnapshot(params.id);
  if (!snapshot) return NextResponse.json({ error: "no snapshot" }, { status: 404 });
  return NextResponse.json({ snapshot });
}
