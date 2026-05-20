import type { CalcSnapshot } from "./types";
import { getX10Collaboration } from "./calc-engine";

function fmtMoney(n: number) {
  if (n >= 1e8) return "¥" + (n / 1e8).toFixed(2) + "亿";
  if (n >= 1e4) return "¥" + (n / 1e4).toFixed(0) + "万";
  return "¥" + n.toLocaleString("zh-CN");
}

export async function buildReportMarkdown(
  snapshot: CalcSnapshot,
  type: "hrbp" | "executive"
): Promise<string> {
  const x10 = await getX10Collaboration(snapshot.quarterId);
  const title = type === "executive" ? "经营摘要" : "HR 详版报告";
  const lines: string[] = [
    "# STRIDE " + title,
    "> 季度：" + snapshot.quarterId,
    "",
    "| TCOW | " + fmtMoney(snapshot.kpis.tcow) + " |",
    "| 人力成本率 | " + (snapshot.kpis.laborCostPct * 100).toFixed(1) + "% |",
    "| 10x Handoff | " + x10.handoffs.length + " |",
    "| 10x 采纳 | " + x10.adoptions.length + " |",
    "",
  ];
  for (const w of snapshot.warnings) {
    lines.push("- **" + w.code + "** " + w.title);
  }
  lines.push("", "---", "*推演数据*");
  return lines.join("\n");
}

export async function buildReportHtml(
  snapshot: CalcSnapshot,
  type: "hrbp" | "executive"
): Promise<string> {
  const md = await buildReportMarkdown(snapshot, type);
  const x10 = await getX10Collaboration(snapshot.quarterId);
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const title = type === "executive" ? "经营摘要" : "HR 详版报告";
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
    : "<p>无预警</p>";

  return [
    '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"/>',
    "<title>STRIDE</title>",
    "<style>body{font-family:system-ui;max-width:820px;margin:2rem auto;padding:1rem}",
    ".grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}",
    ".card{border:1px solid #c8d6cc;padding:1rem;border-radius:12px}",
    ".n{font-size:1.2rem;font-weight:700;color:#0f3d32}",
    "table{width:100%;border-collapse:collapse}td,th{border:1px solid #c8d6cc;padding:0.5rem}",
    "pre{background:#fffef9;padding:1rem}</style></head><body>",
    "<h1>STRIDE " + esc(title) + "</h1>",
    "<p>" + esc(snapshot.quarterId) + "</p>",
    '<span class="grid">',
    '<span class="card"><span>TCOW</span><span class="n">' + fmtMoney(snapshot.kpis.tcow) + "</span></span>",
    '<span class="card"><span>人力成本率</span><span class="n">' +
      (snapshot.kpis.laborCostPct * 100).toFixed(1) +
      "%</span></span>",
    "</span>",
    "<h2>PL</h2><table><tbody>" + plRows + "</tbody></table>",
    "<h2>10x</h2><p>Handoff " + x10.handoffs.length + "</p>",
    "<h2>预警</h2>" + warnHtml,
    "<h2>MD</h2><pre>" + esc(md) + "</pre>",
    "<footer>推演</footer></body></html>",
  ].join("");
}
