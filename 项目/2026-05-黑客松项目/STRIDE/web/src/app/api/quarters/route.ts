import { NextResponse } from "next/server";
import { listQuarters, upsertQuarter, setRoleFte, setObservation } from "@/lib/quarters";

export async function GET() {
  return NextResponse.json({ quarters: listQuarters() });
}

export async function POST(req: Request) {
  const body = await req.json();
  const q = upsertQuarter({
    id: body.id,
    label: body.label,
    weeks: body.weeks,
    revenue_proxy: body.revenue_proxy,
  });
  if (body.roleFte && Array.isArray(body.roleFte)) {
    for (const r of body.roleFte as { rf_id: string; fte: number }[]) {
      setRoleFte(q.id, r.rf_id, r.fte);
    }
  }
  if (body.observations && Array.isArray(body.observations)) {
    for (const o of body.observations as {
      metric_code: string;
      value: number;
      source_type: string;
      pl_id?: string;
    }[]) {
      setObservation(q.id, o.metric_code, o.value, o.source_type, o.pl_id ?? null);
    }
  }
  return NextResponse.json({ quarter: q });
}
