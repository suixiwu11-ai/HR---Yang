import { NextResponse } from "next/server";
import { runForecastScenario } from "@/lib/forecast";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await runForecastScenario(
    String(body.quarterId ?? "2025Q3"),
    Number(body.deltaFtePct ?? 0),
    Number(body.deltaRevenuePct ?? 0)
  );
  return NextResponse.json(result);
}
