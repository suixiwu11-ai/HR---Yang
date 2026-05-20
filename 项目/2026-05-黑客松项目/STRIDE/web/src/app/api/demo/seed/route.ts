import { NextResponse } from "next/server";
import { getDbBackend } from "@/lib/db";
import { seedDemoData } from "@/lib/seed";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const quarterId = (body as { quarterId?: string }).quarterId ?? "2025Q3";
  const snapshot = await seedDemoData(quarterId);
  return NextResponse.json({ ok: true, quarterId, snapshot, backend: getDbBackend() });
}
