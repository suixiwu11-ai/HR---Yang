import { getDb } from "./db";
import { DEFAULT_ALLOCATION, DEFAULT_FTE, PRODUCT_LINES } from "./catalog";
import { calculateQuarter } from "./calc-engine";

export function seedDemoData(quarterId = "2025Q3") {
  const db = getDb();
  const revenue = 1280000000;
  const configJson = JSON.stringify({ attributableRevenue: 740000000 });
  const p = (id: string) => `${quarterId}-${id}`;

  db.prepare(
    `INSERT OR REPLACE INTO quarters (id, label, weeks, revenue_proxy, config_json)
     VALUES (?, ?, 13, ?, ?)`
  ).run(quarterId, `${quarterId} \u6f14\u793a\u5b63`, revenue, configJson);

  const insFte = db.prepare(
    `INSERT OR REPLACE INTO role_fte (quarter_id, rf_id, fte) VALUES (?, ?, ?)`
  );
  const insAlloc = db.prepare(
    `INSERT OR REPLACE INTO allocations (quarter_id, rf_id, pl_id, percent) VALUES (?, ?, ?, ?)`
  );

  for (const [rf, fte] of Object.entries(DEFAULT_FTE)) {
    insFte.run(quarterId, rf, fte);
    const row = DEFAULT_ALLOCATION[rf];
    if (row) {
      for (const [pl, pct] of Object.entries(row)) {
        insAlloc.run(quarterId, rf, pl, pct);
      }
    }
  }

  db.prepare(`DELETE FROM metric_observations WHERE quarter_id = ?`).run(quarterId);
  const insObs = db.prepare(
    `INSERT INTO metric_observations (quarter_id, metric_code, value, source_type, pl_id)
     VALUES (?, ?, ?, ?, ?)`
  );
  insObs.run(quarterId, "HR-TCOW", 284000000, "proxy", null);
  insObs.run(quarterId, "HR-LABOR-COST-PCT", 0.384, "proxy", null);
  insObs.run(quarterId, "HR-REV-FTE", 1860000, "proxy", null);
  insObs.run(quarterId, "HR-HEADCOUNT-ATTAIN", 0.94, "proxy", null);
  for (const pl of PRODUCT_LINES) {
    const share =
      pl.id === "P1"
        ? 0.28
        : pl.id === "P2"
          ? 0.22
          : pl.id === "P3"
            ? 0.06
            : pl.id === "P4"
              ? 0.18
              : pl.id === "P5"
                ? 0.2
                : 0.06;
    insObs.run(quarterId, "PL-TCOW", 0, "proxy", pl.id);
    insObs.run(quarterId, "PL-REVENUE", revenue * share, "proxy", pl.id);
  }

  db.prepare(`DELETE FROM x10_handoffs WHERE quarter_id = ?`).run(quarterId);
  db.prepare(`DELETE FROM x10_adoptions WHERE quarter_id = ?`).run(quarterId);
  db.prepare(`DELETE FROM x10_support_tasks WHERE quarter_id = ?`).run(quarterId);

  const hfFin = p("hf-fin-001");
  const hfInd = p("hf-ind-001");
  const hfChip = p("hf-chip-001");

  const insH = db.prepare(
    `INSERT INTO x10_handoffs (id, quarter_id, pod_id, title, status, bound_pl, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  insH.run(hfFin, quarterId, "POD-FIN", "\u91d1\u878d Agent \u5408\u89c4\u8bc4\u6d4b Handoff", "done", "P5", "含 API 计费场景用例");
  insH.run(hfInd, quarterId, "POD-IND", "\u5de5\u4e1a\u8f6f\u4ef6\u5de5\u4f5c\u6d41\u63d2\u4ef6 v0.9", "review", "P2", null);
  insH.run(hfChip, quarterId, "POD-CHIP", "\u82af\u7247\u8bbe\u8ba1\u9886\u57df benchmark \u5305", "done", "P6", "W8 demo");

  const insA = db.prepare(
    `INSERT INTO x10_adoptions (id, quarter_id, handoff_id, pl_id, rf_id, title)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  insA.run(p("ad-001"), quarterId, hfFin, "P5", "RF03", "\u8def\u7ebf\u56fe\uff1a\u91d1\u878d Agent Q4");
  insA.run(p("ad-002"), quarterId, hfFin, "P5", "RF02", "API \u6848\u4f8b\u5e93 v2");

  const insS = db.prepare(
    `INSERT INTO x10_support_tasks (id, quarter_id, rf_id, pl_id, title, completed)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  for (const [rf, pl] of [
    ["RF02", "P5"],
    ["RF03", "P5"],
    ["RF01", "P6"],
    ["RF03", "P2"],
  ] as const) {
    insS.run(p(`sup-${rf}-${pl}`), quarterId, rf, pl, `${rf} \u652f\u6491 10x`, 1);
  }
  insS.run(p("sup-rf02-p2-pending"), quarterId, "RF02", "P2", "\u5de5\u4e1a\u8f6f\u4ef6\u573a\u666f\u8bc4\u5ba1", 0);

  db.prepare(
    `INSERT OR IGNORE INTO quarters (id, label, weeks, revenue_proxy, config_json)
     VALUES ('2025Q4', '2025Q4', 13, 1350000000, ?)`
  ).run(configJson);

  return calculateQuarter(quarterId);
}
