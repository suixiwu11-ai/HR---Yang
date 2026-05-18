import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { calculateQuarter } from "@/lib/calc-engine";

export async function GET(req: Request) {
  const quarter = new URL(req.url).searchParams.get("quarter") ?? "2025Q3";
  const db = getDb();
  const handoffs = db.prepare(`SELECT * FROM x10_handoffs WHERE quarter_id = ?`).all(quarter);
  return NextResponse.json({ handoffs });
}

export async function POST(req: Request) {
  const body = await req.json();
  const db = getDb();
  const id = body.id ?? `hf-${Date.now()}`;
  db.prepare(
    `INSERT OR REPLACE INTO x10_handoffs (id, quarter_id, pod_id, title, status, bound_pl, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    body.quarterId,
    body.pod_id,
    body.title,
    body.status ?? "draft",
    body.bound_pl,
    body.notes ?? null
  );
  calculateQuarter(body.quarterId);
  return NextResponse.json({ ok: true, id });
}
