import { NextResponse } from "next/server";
import { getDbBackend } from "@/lib/db";
import { importQuarterBundle } from "@/lib/import-export";
import type { QuarterExportBundle } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as QuarterExportBundle;
    if (!body?.quarterId || body.version !== 1) {
      return NextResponse.json({ error: "invalid import bundle" }, { status: 400 });
    }
    const snapshot = await importQuarterBundle(body);
    return NextResponse.json({
      ok: true,
      quarterId: body.quarterId,
      snapshot,
      backend: getDbBackend(),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
