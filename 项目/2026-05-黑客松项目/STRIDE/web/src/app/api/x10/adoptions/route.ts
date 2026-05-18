import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { calculateQuarter } from "@/lib/calc-engine";

export async function POST(req: Request) {
  const body = await req.json();
  const db = getDb();
  const id = body.id ?? `ad-${Date.now()}`;
  db.prepare(
    `INSERT OR REPLACE INTO x10_adoptions (id, quarter_id, handoff_id, pl_id, rf_id, title)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, body.quarterId, body.handoff_id, body.pl_id, body.rf_id, body.title);
  calculateQuarter(body.quarterId);
  return NextResponse.json({ ok: true, id });
}
