import { NextResponse } from "next/server";
import { getX10Collaboration } from "@/lib/calc-engine";

export async function GET(req: Request) {
  const quarter = new URL(req.url).searchParams.get("quarter") ?? "2025Q3";
  return NextResponse.json(await getX10Collaboration(quarter));
}
