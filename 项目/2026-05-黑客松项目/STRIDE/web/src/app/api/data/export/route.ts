import { NextResponse } from "next/server";
import { getDbBackend } from "@/lib/db";
import { exportQuarterBundle } from "@/lib/import-export";
import { bundleToCsv } from "@/lib/template-bundle";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const quarter = searchParams.get("quarter");
  const format = searchParams.get("format") ?? "json";
  if (!quarter) {
    return NextResponse.json({ error: "missing quarter query param" }, { status: 400 });
  }
  try {
    const bundle = await exportQuarterBundle(quarter);
    if (format === "csv") {
      const csv = bundleToCsv(bundle);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="stride-${quarter}-export.csv"`,
          "X-Db-Backend": getDbBackend(),
        },
      });
    }
    return NextResponse.json(bundle, {
      headers: { "X-Db-Backend": getDbBackend() },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
