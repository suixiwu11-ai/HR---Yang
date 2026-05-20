import { NextResponse } from "next/server";
import { parseImportCsv } from "@/lib/csv-import";
import { getDbBackend } from "@/lib/db";
import { importQuarterBundle } from "@/lib/import-export";
import type { QuarterExportBundle } from "@/lib/types";

async function parseImportBody(req: Request): Promise<QuarterExportBundle> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  const raw = await req.text();
  if (!raw.trim()) throw new Error("empty body");

  if (ct.includes("text/csv") || ct.includes("application/csv")) {
    return parseImportCsv(raw);
  }

  let body: QuarterExportBundle;
  try {
    body = JSON.parse(raw) as QuarterExportBundle;
  } catch {
    if (raw.includes(",") && /(^|\n)\s*(quarter|fte|allocation|metric)\s*,/i.test(raw)) {
      return parseImportCsv(raw);
    }
    throw new Error("invalid JSON body");
  }
  return body;
}

export async function POST(req: Request) {
  try {
    const body = await parseImportBody(req);
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
