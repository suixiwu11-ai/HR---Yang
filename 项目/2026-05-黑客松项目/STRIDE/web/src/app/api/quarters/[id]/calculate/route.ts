import { NextResponse } from "next/server";
import { calculateQuarter } from "@/lib/calc-engine";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const snapshot = calculateQuarter(params.id);
    return NextResponse.json({ snapshot });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
