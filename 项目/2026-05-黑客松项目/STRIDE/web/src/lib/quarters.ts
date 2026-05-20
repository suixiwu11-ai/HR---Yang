import { getDb } from "./db";
import type { QuarterRow } from "./types";

export async function listQuarters(): Promise<QuarterRow[]> {
  const db = await getDb();
  return db.all<QuarterRow>(`SELECT * FROM quarters ORDER BY id DESC`);
}

export async function getQuarter(id: string): Promise<QuarterRow | undefined> {
  const db = await getDb();
  return db.get<QuarterRow>(`SELECT * FROM quarters WHERE id = ?`, [id]);
}

export async function upsertQuarter(input: {
  id: string;
  label?: string;
  weeks?: number;
  revenue_proxy?: number;
}) {
  const db = await getDb();
  const existing = await getQuarter(input.id);
  await db.run(
    `INSERT OR REPLACE INTO quarters (id, label, weeks, revenue_proxy, config_json)
     VALUES (?, ?, ?, ?, ?)`,
    [
      input.id,
      input.label ?? existing?.label ?? input.id,
      input.weeks ?? existing?.weeks ?? 13,
      input.revenue_proxy ?? existing?.revenue_proxy ?? 0,
      existing?.config_json ?? "{}",
    ]
  );
  return (await getQuarter(input.id))!;
}

export async function setRoleFte(quarterId: string, rfId: string, fte: number) {
  const db = await getDb();
  await db.run(`INSERT OR REPLACE INTO role_fte (quarter_id, rf_id, fte) VALUES (?, ?, ?)`, [
    quarterId,
    rfId,
    fte,
  ]);
}

export async function setObservation(
  quarterId: string,
  metricCode: string,
  value: number,
  sourceType: string,
  plId?: string | null
) {
  const db = await getDb();
  await db.run(
    `INSERT INTO metric_observations (quarter_id, metric_code, value, source_type, pl_id)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(quarter_id, metric_code, pl_id) DO UPDATE SET
       value = excluded.value, source_type = excluded.source_type`,
    [quarterId, metricCode, value, sourceType, plId ?? null]
  );
}
