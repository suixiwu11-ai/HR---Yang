import type { CalcSnapshot } from "./types";
import { getX10Collaboration } from "./calc-engine";

function fmtMoney(n: number) {
  if (n >= 1e8) return "\u00a5" + (n / 1e8).toFixed(2) + "\u4ebf";
  if (n >= 1e4) return "\u00a5" + (n / 1e4).toFixed(0) + "\u4e07";
  return "\u00a5" + n.toLocaleString("zh-CN");
}

export function buildReportMarkdown(
  snapshot: CalcSnapshot,
  type: "hrbp" | "executive"
): string {
  const x10 = getX10Collaboration(snapshot.quarterId);
  const title = type === "executive" ? "\u7ecf\u8425\u6458\u8981" : "HR \u8be6\u7248\u62a5\u544a";
  const lines: string[] = [
    "# STRIDE " + title,
    "> \u5b63\u5ea6\uff1a" + snapshot.quarterId,
    "",
    "| TCOW | " + fmtMoney(snapshot.kpis.tcow) + " |",
    "| \u4eba\u529b\u6210\u672c\u7387 | " + (snapshot.kpis.laborCostPct * 100).toFixed(1) + "% |",
    "| 10x Handoff | " + x10.handoffs.length + " |",
    "| 10x \u91c7\u7eb3 | " + x10.adoptions.length + " |",
    "",
  ];
  for (const w of snapshot.warnings) {
    lines.push("- **" + w.code + "** " + w.title);
  }
  lines.push("", "---", "*\u63a8\u6f14\u6570\u636e*");
  return lines.join("\n");
}

export function buildReportHtml(
  snapshot: CalcSnapshot,
  type: "hrbp" | "executive"
): string {
  const md = buildReportMarkdown(snapshot, type);
  const x10 = getX10Collaboration(snapshot.quarterId);
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const title = type === "executive" ? "\u7ecf\u8425\u6458\u8981" : "HR \u8be6\u7248\u62a5\u544a";
  const plRows = snapshot.plCosts
    .map(
      (p) =>
        "<tr><td>" +
        esc(p.plName) +
        "</td><td>" +
        fmtMoney(p.tcow) +
        "</td><td>" +
        (p.laborCostPct * 100).toFixed(1) +
        "%</td></tr>"
    )
    .join("");
  const warnHtml = snapshot.warnings.length
    ? snapshot.warnings
        .map((w) => "<p><strong>" + esc(w.code) + "</strong> " + esc(w.title) + "</p>")
        .join("")
    : "<p>\u65e0\u9884\u8b66</p>";

  return [
    "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"/>",
    "<title>STRIDE</title>",
    "<style>body{font-family:system-ui;max-width:820px;margin:2rem auto;padding:1rem}",
    ".grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}",
    ".card{border:1px solid #e3e8ee;padding:1rem;border-radius:12px}",
    ".n{font-size:1.2rem;font-weight:700;color:#635bff}",
    "table{width:100%;border-collapse:collapse}td,th{border:1px solid #e3e8ee;padding:0.5rem}",
    "pre{background:#f6f9fc;padding:1rem}</style></head><body>",
    "<h1>STRIDE " + esc(title) + "</h1>",
    "<p>" + esc(snapshot.quarterId) + "</p>",
    '<span class="grid">',
    '<span class="card"><span>TCOW</span><span class="n">' + fmtMoney(snapshot.kpis.tcow) + "</span></span>",
    '<span class="card"><span>\u4eba\u529b\u6210\u672c\u7387</span><span class="n">' +
      (snapshot.kpis.laborCostPct * 100).toFixed(1) +
      "%</span></span>",
    "</span>",
    "<h2>PL</h2><table><tbody>" + plRows + "</tbody></table>",
    "<h2>10x</h2><p>Handoff " + x10.handoffs.length + "</p>",
    "<h2>\u9884\u8b66</h2>" + warnHtml,
    "<h2>MD</h2><pre>" + esc(md) + "</pre>",
    "<footer>\u63a8\u6f14</footer></body></html>",
  ].join("");
}
