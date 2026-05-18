import type { HandoffStatus, QuarterExportBundle, SourceType } from "./types";

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQ = !inQ;
      continue;
    }
    if (c === "," && !inQ) {
      out.push(cur.trim());
      cur = "";
      continue;
    }
    cur += c;
  }
  out.push(cur.trim());
  return out;
}

export function parseImportCsv(text: string): QuarterExportBundle {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  let quarterId = "2025Q3";
  const bundle: QuarterExportBundle = {
    version: 1,
    quarterId,
    exportedAt: new Date().toISOString(),
    observations: [],
    roleFte: [],
    allocations: [],
    handoffs: [],
    adoptions: [],
    supportTasks: [],
  };

  for (const line of lines) {
    const cols = parseCsvLine(line);
    const type = (cols[0] || "").toLowerCase();
    if (type === "type") continue;
    const qid = cols[1] || quarterId;
    quarterId = qid;
    bundle.quarterId = qid;

    if (type === "quarter") {
      bundle.revenue_proxy = Number(cols[2]) || 0;
      bundle.weeks = Number(cols[3]) || 13;
      bundle.label = cols[4] || qid;
      bundle.config_json = JSON.stringify({ attributableRevenue: (Number(cols[2]) || 0) * (740 / 1280) });
    } else if (type === "fte") {
      bundle.roleFte.push({ rf_id: cols[2], fte: Number(cols[3]) || 0 });
    } else if (type === "allocation") {
      bundle.allocations.push({
        rf_id: cols[2],
        pl_id: cols[3],
        percent: Number(cols[4]) || 0,
      });
    } else if (type === "metric") {
      bundle.observations.push({
        metric_code: cols[2],
        value: Number(cols[3]) || 0,
        source_type: (cols[4] || "proxy") as SourceType,
        pl_id: cols[5] || undefined,
      });
    } else if (type === "handoff") {
      bundle.handoffs.push({
        id: cols[2],
        pod_id: cols[3],
        title: cols[4],
        status: (cols[5] || "draft") as HandoffStatus,
        bound_pl: cols[6],
        notes: cols[7] || undefined,
      });
    } else if (type === "adoption") {
      bundle.adoptions.push({
        id: cols[2],
        handoff_id: cols[3],
        pl_id: cols[4],
        rf_id: cols[5],
        title: cols[6],
      });
    } else if (type === "support") {
      bundle.supportTasks.push({
        id: cols[2],
        rf_id: cols[3],
        pl_id: cols[4],
        title: cols[5],
        completed: Number(cols[6]) ? 1 : 0,
      });
    }
  }

  if (!bundle.roleFte.length) {
    throw new Error("CSV \u81f3\u5c11\u9700\u8981\u4e00\u884c fte \u6570\u636e");
  }
  return bundle;
}
