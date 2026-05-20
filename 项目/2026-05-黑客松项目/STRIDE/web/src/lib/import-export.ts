import { getDb } from "./db";
import type { QuarterExportBundle } from "./types";
import { calculateQuarter } from "./calc-engine";

export async function exportQuarterBundle(quarterId: string): Promise<QuarterExportBundle> {
  const db = await getDb();
  const q = await db.get<{
    label: string;
    weeks: number;
    revenue_proxy: number;
    config_json: string;
  }>(`SELECT * FROM quarters WHERE id = ?`, [quarterId]);

  const observations = await db.all<QuarterExportBundle["observations"][number]>(
    `SELECT metric_code, value, source_type, pl_id FROM metric_observations WHERE quarter_id = ?`,
    [quarterId]
  );
  const roleFte = await db.all<QuarterExportBundle["roleFte"][number]>(
    `SELECT rf_id, fte FROM role_fte WHERE quarter_id = ?`,
    [quarterId]
  );
  const allocations = await db.all<QuarterExportBundle["allocations"][number]>(
    `SELECT rf_id, pl_id, percent FROM allocations WHERE quarter_id = ?`,
    [quarterId]
  );
  const handoffs = await db.all<QuarterExportBundle["handoffs"][number]>(
    `SELECT id, pod_id, title, status, bound_pl, notes FROM x10_handoffs WHERE quarter_id = ?`,
    [quarterId]
  );
  const adoptions = await db.all<QuarterExportBundle["adoptions"][number]>(
    `SELECT id, handoff_id, pl_id, rf_id, title FROM x10_adoptions WHERE quarter_id = ?`,
    [quarterId]
  );
  const supportTasks = await db.all<QuarterExportBundle["supportTasks"][number]>(
    `SELECT id, rf_id, pl_id, title, completed FROM x10_support_tasks WHERE quarter_id = ?`,
    [quarterId]
  );

  return {
    version: 1,
    quarterId,
    exportedAt: new Date().toISOString(),
    label: q?.label,
    weeks: q?.weeks,
    revenue_proxy: q?.revenue_proxy,
    config_json: q?.config_json,
    observations,
    roleFte,
    allocations,
    handoffs,
    adoptions,
    supportTasks,
  };
}

export async function importQuarterBundle(bundle: QuarterExportBundle) {
  const db = await getDb();
  const { quarterId } = bundle;
  const existing = await db.get<{
    label: string;
    weeks: number;
    revenue_proxy: number;
    config_json: string;
  }>(`SELECT * FROM quarters WHERE id = ?`, [quarterId]);

  const remapId = (id: string) => {
    if (id.startsWith(`${quarterId}-`)) return id;
    const parts = id.split("-");
    if (parts.length >= 2 && parts[0] === quarterId) return id;
    const tail = id.includes("-") ? id.substring(id.indexOf("-") + 1) : id;
    const fromQ = id.substring(0, id.indexOf("-"));
    if (fromQ && id.includes("-")) return `${quarterId}-${id.slice(fromQ.length + 1)}`;
    return `${quarterId}-${tail}`;
  };

  const handoffIdMap = new Map<string, string>();
  for (const h of bundle.handoffs) {
    handoffIdMap.set(h.id, remapId(h.id));
  }

  await db.transaction(async (tx) => {
    await tx.run(
      `INSERT OR REPLACE INTO quarters (id, label, weeks, revenue_proxy, config_json)
       VALUES (?, ?, ?, ?, ?)`,
      [
        quarterId,
        bundle.label ?? existing?.label ?? quarterId,
        bundle.weeks ?? existing?.weeks ?? 13,
        bundle.revenue_proxy ?? existing?.revenue_proxy ?? 1280000000,
        bundle.config_json ??
          existing?.config_json ??
          JSON.stringify({ attributableRevenue: 740000000 }),
      ]
    );

    await tx.run(`DELETE FROM metric_observations WHERE quarter_id = ?`, [quarterId]);
    for (const o of bundle.observations) {
      await tx.run(
        `INSERT INTO metric_observations (quarter_id, metric_code, value, source_type, pl_id) VALUES (?, ?, ?, ?, ?)`,
        [quarterId, o.metric_code, o.value, o.source_type, o.pl_id ?? null]
      );
    }

    await tx.run(`DELETE FROM role_fte WHERE quarter_id = ?`, [quarterId]);
    for (const r of bundle.roleFte) {
      await tx.run(`INSERT INTO role_fte (quarter_id, rf_id, fte) VALUES (?, ?, ?)`, [
        quarterId,
        r.rf_id,
        r.fte,
      ]);
    }

    await tx.run(`DELETE FROM allocations WHERE quarter_id = ?`, [quarterId]);
    for (const a of bundle.allocations) {
      await tx.run(
        `INSERT INTO allocations (quarter_id, rf_id, pl_id, percent) VALUES (?, ?, ?, ?)`,
        [quarterId, a.rf_id, a.pl_id, a.percent]
      );
    }

    await tx.run(`DELETE FROM x10_handoffs WHERE quarter_id = ?`, [quarterId]);
    for (const h of bundle.handoffs) {
      const hid = handoffIdMap.get(h.id) ?? remapId(h.id);
      await tx.run(
        `INSERT OR REPLACE INTO x10_handoffs (id, quarter_id, pod_id, title, status, bound_pl, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [hid, quarterId, h.pod_id, h.title, h.status, h.bound_pl, h.notes ?? null]
      );
    }

    await tx.run(`DELETE FROM x10_adoptions WHERE quarter_id = ?`, [quarterId]);
    for (const a of bundle.adoptions) {
      await tx.run(
        `INSERT OR REPLACE INTO x10_adoptions (id, quarter_id, handoff_id, pl_id, rf_id, title) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          remapId(a.id),
          quarterId,
          handoffIdMap.get(a.handoff_id) ?? remapId(a.handoff_id),
          a.pl_id,
          a.rf_id,
          a.title,
        ]
      );
    }

    await tx.run(`DELETE FROM x10_support_tasks WHERE quarter_id = ?`, [quarterId]);
    for (const s of bundle.supportTasks) {
      await tx.run(
        `INSERT OR REPLACE INTO x10_support_tasks (id, quarter_id, rf_id, pl_id, title, completed) VALUES (?, ?, ?, ?, ?, ?)`,
        [remapId(s.id), quarterId, s.rf_id, s.pl_id, s.title, s.completed]
      );
    }
  });

  return calculateQuarter(quarterId);
}
