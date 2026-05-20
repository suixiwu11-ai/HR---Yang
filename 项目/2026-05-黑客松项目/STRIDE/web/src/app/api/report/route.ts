import { NextResponse } from "next/server";
import { getLatestSnapshot } from "@/lib/calc-engine";
import { buildReportHtml, buildReportMarkdown } from "@/lib/reports";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const quarter = url.searchParams.get("quarter") ?? "2025Q3";
  const type = (url.searchParams.get("type") ?? "hrbp") as "hrbp" | "executive";
  const format = url.searchParams.get("format") ?? "md";
  const snapshot = await getLatestSnapshot(quarter);
  if (!snapshot) return NextResponse.json({ error: "no snapshot" }, { status: 404 });

  if (format === "html") {
    const html = await buildReportHtml(snapshot, type);
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="stride-${quarter}-${type}.html"`,
      },
    });
  }
  const md = await buildReportMarkdown(snapshot, type);
  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="stride-${quarter}-${type}.md"`,
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const quarter = String(body.quarter ?? "2025Q3");
  const type = (body.type ?? "hrbp") as "hrbp" | "executive";
  const format = String(body.format ?? "md");
  const snapshot = await getLatestSnapshot(quarter);
  if (!snapshot) return NextResponse.json({ error: "no snapshot" }, { status: 404 });
  if (format === "html") {
    return NextResponse.json({ content: await buildReportHtml(snapshot, type), format: "html" });
  }
  return NextResponse.json({ content: await buildReportMarkdown(snapshot, type), format: "md" });
}
