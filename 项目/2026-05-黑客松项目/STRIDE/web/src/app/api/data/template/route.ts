import { NextResponse } from "next/server";
import { buildImportTemplate, bundleToCsv } from "@/lib/template-bundle";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const quarter = searchParams.get("quarter") ?? "2025Q3";
  const format = searchParams.get("format") ?? "json";
  const bundle = buildImportTemplate(quarter);

  if (format === "csv") {
    const csv = bundleToCsv(bundle);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="stride-${quarter}-template.csv"`,
      },
    });
  }

  return NextResponse.json(bundle, {
    headers: {
      "Content-Disposition": `attachment; filename="stride-${quarter}-template.json"`,
    },
  });
}
