import { getDb } from "./db";
import type { QuarterRow } from "./types";

export function listQuarters(): QuarterRow[] {
  const db = getDb();
  return db.prepare(`SELECT * FROM quarters ORDER BY id DESC`).all() as QuarterRow[];
}

export function getQuarter(id: string): QuarterRow | undefined {
  const db = getDb();
  return db.prepare(`SELECT * FROM quarters WHERE id = ?`).get(id) as QuarterRow | undefined;
}

export function upsertQuarter(input: {
  id: string;
  label?: string;
  weeks?: number;
  revenue_proxy?: number;
}) {
  const db = getDb();
  const existing = getQuarter(input.id);
  db.prepare(
    `INSERT OR REPLACE INTO quarters (id, label, weeks, revenue_proxy, config_json)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    input.id,
    input.label ?? existing?.label ?? input.id,
    input.weeks ?? existing?.weeks ?? 13,
    input.revenue_proxy ?? existing?.revenue_proxy ?? 0,
    existing?.config_json ?? "{}"
  );
  return getQuarter(input.id)!;
}

export function setRoleFte(quarterId: string, rfId: string, fte: number) {
  const db = getDb();
  db.prepare(`INSERT OR REPLACE INTO role_fte (quarter_id, rf_id, fte) VALUES (?, ?, ?)`).run(
    quarterId,
    rfId,
    fte
  );
}

export function setObservation(
  quarterId: string,
  metricCode: string,
  value: number,
  sourceType: string,
  plId?: string | null
) {
  const db = getDb();
  db.prepare(
    `INSERT INTO metric_observations (quarter_id, metric_code, value, source_type, pl_id)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(quarter_id, metric_code, pl_id) DO UPDATE SET
       value = excluded.value, source_type = excluded.source_type`
  ).run(quarterId, metricCode, value, sourceType, plId ?? null);
}
