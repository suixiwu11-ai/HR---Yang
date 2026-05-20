import { NextResponse } from "next/server";
import { exportQuarterBundle } from "@/lib/import-export";

export async function GET(req: Request) {
  const quarter = new URL(req.url).searchParams.get("quarter");
  if (!quarter) {
    return NextResponse.json({ error: "missing quarter query param" }, { status: 400 });
  }
  try {
    const bundle = await exportQuarterBundle(quarter);
    return NextResponse.json(bundle);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
