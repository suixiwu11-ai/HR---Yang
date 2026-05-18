import { getDb } from "./db";
import type { QuarterExportBundle } from "./types";
import { calculateQuarter } from "./calc-engine";

export function exportQuarterBundle(quarterId: string): QuarterExportBundle {
  const db = getDb();
  const q = db.prepare(`SELECT * FROM quarters WHERE id = ?`).get(quarterId) as
    | { label: string; weeks: number; revenue_proxy: number; config_json: string }
    | undefined;

  const observations = db
    .prepare(`SELECT metric_code, value, source_type, pl_id FROM metric_observations WHERE quarter_id = ?`)
    .all(quarterId) as QuarterExportBundle["observations"];
  const roleFte = db
    .prepare(`SELECT rf_id, fte FROM role_fte WHERE quarter_id = ?`)
    .all(quarterId) as QuarterExportBundle["roleFte"];
  const allocations = db
    .prepare(`SELECT rf_id, pl_id, percent FROM allocations WHERE quarter_id = ?`)
    .all(quarterId) as QuarterExportBundle["allocations"];
  const handoffs = db
    .prepare(`SELECT id, pod_id, title, status, bound_pl, notes FROM x10_handoffs WHERE quarter_id = ?`)
    .all(quarterId) as QuarterExportBundle["handoffs"];
  const adoptions = db
    .prepare(`SELECT id, handoff_id, pl_id, rf_id, title FROM x10_adoptions WHERE quarter_id = ?`)
    .all(quarterId) as QuarterExportBundle["adoptions"];
  const supportTasks = db
    .prepare(`SELECT id, rf_id, pl_id, title, completed FROM x10_support_tasks WHERE quarter_id = ?`)
    .all(quarterId) as QuarterExportBundle["supportTasks"];

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

export function importQuarterBundle(bundle: QuarterExportBundle) {
  const db = getDb();
  const { quarterId } = bundle;
  const existing = db.prepare(`SELECT * FROM quarters WHERE id = ?`).get(quarterId) as
    | { label: string; weeks: number; revenue_proxy: number; config_json: string }
    | undefined;

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

  const run = db.transaction(() => {
    db.prepare(
      `INSERT OR REPLACE INTO quarters (id, label, weeks, revenue_proxy, config_json)
       VALUES (?, ?, ?, ?, ?)`
    ).run(
      quarterId,
      bundle.label ?? existing?.label ?? quarterId,
      bundle.weeks ?? existing?.weeks ?? 13,
      bundle.revenue_proxy ?? existing?.revenue_proxy ?? 1280000000,
      bundle.config_json ?? existing?.config_json ?? JSON.stringify({ attributableRevenue: 740000000 })
    );

    db.prepare(`DELETE FROM metric_observations WHERE quarter_id = ?`).run(quarterId);
    const insObs = db.prepare(
      `INSERT INTO metric_observations (quarter_id, metric_code, value, source_type, pl_id) VALUES (?, ?, ?, ?, ?)`
    );
    for (const o of bundle.observations) {
      insObs.run(quarterId, o.metric_code, o.value, o.source_type, o.pl_id ?? null);
    }

    db.prepare(`DELETE FROM role_fte WHERE quarter_id = ?`).run(quarterId);
    const insFte = db.prepare(`INSERT INTO role_fte (quarter_id, rf_id, fte) VALUES (?, ?, ?)`);
    for (const r of bundle.roleFte) insFte.run(quarterId, r.rf_id, r.fte);

    db.prepare(`DELETE FROM allocations WHERE quarter_id = ?`).run(quarterId);
    const insA = db.prepare(
      `INSERT INTO allocations (quarter_id, rf_id, pl_id, percent) VALUES (?, ?, ?, ?)`
    );
    for (const a of bundle.allocations) insA.run(quarterId, a.rf_id, a.pl_id, a.percent);

    db.prepare(`DELETE FROM x10_handoffs WHERE quarter_id = ?`).run(quarterId);
    const insH = db.prepare(
      `INSERT OR REPLACE INTO x10_handoffs (id, quarter_id, pod_id, title, status, bound_pl, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    for (const h of bundle.handoffs) {
      const hid = handoffIdMap.get(h.id) ?? remapId(h.id);
      insH.run(hid, quarterId, h.pod_id, h.title, h.status, h.bound_pl, h.notes ?? null);
    }

    db.prepare(`DELETE FROM x10_adoptions WHERE quarter_id = ?`).run(quarterId);
    const insAd = db.prepare(
      `INSERT OR REPLACE INTO x10_adoptions (id, quarter_id, handoff_id, pl_id, rf_id, title) VALUES (?, ?, ?, ?, ?, ?)`
    );
    for (const a of bundle.adoptions) {
      insAd.run(
        remapId(a.id),
        quarterId,
        handoffIdMap.get(a.handoff_id) ?? remapId(a.handoff_id),
        a.pl_id,
        a.rf_id,
        a.title
      );
    }

    db.prepare(`DELETE FROM x10_support_tasks WHERE quarter_id = ?`).run(quarterId);
    const insS = db.prepare(
      `INSERT OR REPLACE INTO x10_support_tasks (id, quarter_id, rf_id, pl_id, title, completed) VALUES (?, ?, ?, ?, ?, ?)`
    );
    for (const s of bundle.supportTasks) {
      insS.run(remapId(s.id), quarterId, s.rf_id, s.pl_id, s.title, s.completed);
    }
  });

  run();
  return calculateQuarter(quarterId);
}
