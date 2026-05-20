import { getDb } from "./db";
import { DEFAULT_ALLOCATION, DEFAULT_FTE, PRODUCT_LINES } from "./catalog";
import { calculateQuarter } from "./calc-engine";

export async function seedDemoData(quarterId = "2025Q3") {
  const db = await getDb();
  const revenue = 1280000000;
  const configJson = JSON.stringify({ attributableRevenue: 740000000 });
  const p = (id: string) => `${quarterId}-${id}`;

  await db.run(
    `INSERT OR REPLACE INTO quarters (id, label, weeks, revenue_proxy, config_json)
     VALUES (?, ?, 13, ?, ?)`,
    [quarterId, `${quarterId} 演示季`, revenue, configJson]
  );

  for (const [rf, fte] of Object.entries(DEFAULT_FTE)) {
    await db.run(`INSERT OR REPLACE INTO role_fte (quarter_id, rf_id, fte) VALUES (?, ?, ?)`, [
      quarterId,
      rf,
      fte,
    ]);
    const row = DEFAULT_ALLOCATION[rf];
    if (row) {
      for (const [pl, pct] of Object.entries(row)) {
        await db.run(
          `INSERT OR REPLACE INTO allocations (quarter_id, rf_id, pl_id, percent) VALUES (?, ?, ?, ?)`,
          [quarterId, rf, pl, pct]
        );
      }
    }
  }

  await db.run(`DELETE FROM metric_observations WHERE quarter_id = ?`, [quarterId]);
  const obsRows: [string, string, number, string, string | null][] = [
    [quarterId, "HR-TCOW", 284000000, "proxy", null],
    [quarterId, "HR-LABOR-COST-PCT", 0.384, "proxy", null],
    [quarterId, "HR-REV-FTE", 1860000, "proxy", null],
    [quarterId, "HR-HEADCOUNT-ATTAIN", 0.94, "proxy", null],
  ];
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
    obsRows.push([quarterId, "PL-TCOW", 0, "proxy", pl.id]);
    obsRows.push([quarterId, "PL-REVENUE", revenue * share, "proxy", pl.id]);
  }
  for (const row of obsRows) {
    await db.run(
      `INSERT INTO metric_observations (quarter_id, metric_code, value, source_type, pl_id)
       VALUES (?, ?, ?, ?, ?)`,
      row
    );
  }

  await db.run(`DELETE FROM x10_handoffs WHERE quarter_id = ?`, [quarterId]);
  await db.run(`DELETE FROM x10_adoptions WHERE quarter_id = ?`, [quarterId]);
  await db.run(`DELETE FROM x10_support_tasks WHERE quarter_id = ?`, [quarterId]);

  const hfFin = p("hf-fin-001");
  const hfInd = p("hf-ind-001");
  const hfChip = p("hf-chip-001");

  await db.run(
    `INSERT INTO x10_handoffs (id, quarter_id, pod_id, title, status, bound_pl, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [hfFin, quarterId, "POD-FIN", "金融 Agent 合规评测 Handoff", "done", "P5", "含 API 计费场景用例"]
  );
  await db.run(
    `INSERT INTO x10_handoffs (id, quarter_id, pod_id, title, status, bound_pl, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [hfInd, quarterId, "POD-IND", "工业软件工作流插件 v0.9", "review", "P2", null]
  );
  await db.run(
    `INSERT INTO x10_handoffs (id, quarter_id, pod_id, title, status, bound_pl, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [hfChip, quarterId, "POD-CHIP", "芯片设计领域 benchmark 包", "done", "P6", "W8 demo"]
  );

  await db.run(
    `INSERT INTO x10_adoptions (id, quarter_id, handoff_id, pl_id, rf_id, title)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [p("ad-001"), quarterId, hfFin, "P5", "RF03", "路线图：金融 Agent Q4"]
  );
  await db.run(
    `INSERT INTO x10_adoptions (id, quarter_id, handoff_id, pl_id, rf_id, title)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [p("ad-002"), quarterId, hfFin, "P5", "RF02", "API 案例库 v2"]
  );

  for (const [rf, pl] of [
    ["RF02", "P5"],
    ["RF03", "P5"],
    ["RF01", "P6"],
    ["RF03", "P2"],
  ] as const) {
    await db.run(
      `INSERT INTO x10_support_tasks (id, quarter_id, rf_id, pl_id, title, completed)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [p(`sup-${rf}-${pl}`), quarterId, rf, pl, `${rf} 支撑 10x`, 1]
    );
  }
  await db.run(
    `INSERT INTO x10_support_tasks (id, quarter_id, rf_id, pl_id, title, completed)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [p("sup-rf02-p2-pending"), quarterId, "RF02", "P2", "工业软件场景评审", 0]
  );

  await db.run(
    `INSERT OR IGNORE INTO quarters (id, label, weeks, revenue_proxy, config_json)
     VALUES ('2025Q4', '2025Q4', 13, 1350000000, ?)`,
    [configJson]
  );

  return calculateQuarter(quarterId);
}
