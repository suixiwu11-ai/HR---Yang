import { getDb } from "./db";
import { PL_REVENUE_SHARE, PRODUCT_LINES, ROLE_FAMILIES, X10_PODS } from "./catalog";
import type { CalcSnapshot, PlCostRow, WarningRow } from "./types";

/** 校准至演示季 TCOW ≈ 2.84 亿（与 HTML 原型一致） */
const BASE_UNIT = 30700;

function attributableRevenue(revenueProxy: number, configJson: string): number {
  try {
    const c = JSON.parse(configJson || "{}") as { attributableRevenue?: number };
    if (c.attributableRevenue && c.attributableRevenue > 0) return c.attributableRevenue;
  } catch {
    /* ignore */
  }
  return revenueProxy * (740 / 1280);
}

function roleCoef(rfId: string) {
  return ROLE_FAMILIES.find((r) => r.id === rfId)?.coef ?? 1;
}

export async function calculateQuarter(quarterId: string): Promise<CalcSnapshot> {
  const db = await getDb();
  const q = await db.get<{
    id: string;
    weeks: number;
    revenue_proxy: number;
    config_json: string;
  }>(`SELECT * FROM quarters WHERE id = ?`, [quarterId]);
  if (!q) throw new Error(`Quarter ${quarterId} not found`);

  const ftes = await db.all<{ rf_id: string; fte: number }>(
    `SELECT rf_id, fte FROM role_fte WHERE quarter_id = ?`,
    [quarterId]
  );
  const allocs = await db.all<{ rf_id: string; pl_id: string; percent: number }>(
    `SELECT rf_id, pl_id, percent FROM allocations WHERE quarter_id = ?`,
    [quarterId]
  );

  const plTcow: Record<string, number> = {};
  for (const pl of PRODUCT_LINES) plTcow[pl.id] = 0;

  let totalFte = 0;
  let totalTcow = 0;

  for (const { rf_id, fte } of ftes) {
    totalFte += fte;
    const rfCost = fte * q.weeks * roleCoef(rf_id) * BASE_UNIT;
    const rfAllocs = allocs.filter((a) => a.rf_id === rf_id);
    const sumPct = rfAllocs.reduce((s, a) => s + a.percent, 0) || 100;
    for (const a of rfAllocs) {
      const share = (a.percent / sumPct) * rfCost;
      plTcow[a.pl_id] = (plTcow[a.pl_id] || 0) + share;
      totalTcow += share;
    }
  }

  const plCosts: PlCostRow[] = PRODUCT_LINES.map((pl) => {
    const tcow = Math.round(plTcow[pl.id] || 0);
    const revenue = Math.round(q.revenue_proxy * (PL_REVENUE_SHARE[pl.id] ?? 0.06));
    const laborCostPct = revenue > 0 ? tcow / revenue : 0;
    let budgetTag: string | undefined;
    if (laborCostPct > 0.75) budgetTag = "超预算";
    else if (laborCostPct > 0.65) budgetTag = "接近上限";
    return {
      plId: pl.id,
      plName: pl.name,
      tcow,
      revenue,
      laborCostPct,
      budgetTag,
    };
  });

  const fixed = totalTcow * 0.52;
  const variable = totalTcow * 0.28;
  const statutory = totalTcow * 0.12;
  const benefits = totalTcow - fixed - variable - statutory;

  const warnings: WarningRow[] = [];

  const doneHandoffs = await db.all<{ id: string; title: string }>(
    `SELECT id, title FROM x10_handoffs WHERE quarter_id = ? AND status = 'done'`,
    [quarterId]
  );
  for (const h of doneHandoffs) {
    const row = await db.get<{ c: number }>(
      `SELECT COUNT(*) as c FROM x10_adoptions WHERE handoff_id = ?`,
      [h.id]
    );
    const adCount = Number(row?.c ?? 0);
    if (adCount === 0) {
      warnings.push({
        code: "W8",
        title: "Handoff 完成但采纳为 0",
        message: `「${h.title}」已完成交接，但本季无采纳登记。`,
        severity: "high",
      });
    }
  }

  const p3 = plCosts.find((p) => p.plId === "P3");
  if (p3 && p3.laborCostPct > 0.85) {
    warnings.push({
      code: "W1",
      title: "投入升、产出降（探索期降敏）",
      message: "Audio 探索期：人力成本率偏高，已降敏，非裁编依据。",
      severity: "low",
    });
  }

  const attrRev = attributableRevenue(q.revenue_proxy, q.config_json);
  const snapshotId = `${quarterId}-${Date.now()}`;
  const payload: CalcSnapshot = {
    snapshotId,
    quarterId,
    createdAt: new Date().toISOString(),
    kpis: {
      quarterId,
      tcow: Math.round(totalTcow),
      revPerFte: totalFte > 0 ? Math.round(q.revenue_proxy / totalFte) : 0,
      laborCostPct: attrRev > 0 ? totalTcow / attrRev : 0,
      headcountAttainment: 0.94,
      revenue: q.revenue_proxy,
      fte: Math.round(totalFte),
    },
    plCosts,
    tcowStructure: [
      { label: "固定成本", amount: Math.round(fixed), pct: 52 },
      { label: "浮动成本", amount: Math.round(variable), pct: 28 },
      { label: "法定成本", amount: Math.round(statutory), pct: 12 },
      { label: "福利与其他", amount: Math.round(benefits), pct: 8 },
    ],
    warnings,
  };

  await db.run(
    `INSERT INTO calc_snapshots (id, quarter_id, payload_json, created_at) VALUES (?, ?, ?, ?)`,
    [snapshotId, quarterId, JSON.stringify(payload), payload.createdAt]
  );

  await db.run(`DELETE FROM metric_observations WHERE quarter_id = ? AND pl_id IS NULL`, [
    quarterId,
  ]);
  const headlineMetrics: [string, number][] = [
    ["HR-TCOW", payload.kpis.tcow],
    ["HR-LABOR-COST-PCT", payload.kpis.laborCostPct],
    ["HR-REV-FTE", payload.kpis.revPerFte],
    ["HR-HEADCOUNT-ATTAIN", payload.kpis.headcountAttainment],
  ];
  for (const [code, value] of headlineMetrics) {
    await db.run(
      `INSERT INTO metric_observations (quarter_id, metric_code, value, source_type, pl_id) VALUES (?, ?, ?, 'proxy', NULL)`,
      [quarterId, code, value]
    );
  }

  return payload;
}

export async function getLatestSnapshot(quarterId: string): Promise<CalcSnapshot | null> {
  const db = await getDb();
  const row = await db.get<{ payload_json: string }>(
    `SELECT payload_json FROM calc_snapshots WHERE quarter_id = ? ORDER BY created_at DESC LIMIT 1`,
    [quarterId]
  );
  if (!row) return null;
  return JSON.parse(row.payload_json) as CalcSnapshot;
}

export async function getX10Collaboration(quarterId: string) {
  const db = await getDb();
  const handoffs = await db.all(`SELECT * FROM x10_handoffs WHERE quarter_id = ?`, [quarterId]);
  const adoptions = await db.all(`SELECT * FROM x10_adoptions WHERE quarter_id = ?`, [quarterId]);
  const supports = await db.all<{ rf_id: string; pl_id: string; completed: number }>(
    `SELECT * FROM x10_support_tasks WHERE quarter_id = ?`,
    [quarterId]
  );

  const byPl: Record<string, { adoptions: number; supportRate: number }> = {};
  for (const pl of PRODUCT_LINES) {
    const ads = (adoptions as { pl_id: string }[]).filter((a) => a.pl_id === pl.id).length;
    const tasks = supports.filter((s) => s.pl_id === pl.id);
    const rate = tasks.length ? tasks.filter((t) => t.completed).length / tasks.length : 1;
    byPl[pl.id] = { adoptions: ads, supportRate: rate };
  }

  return { handoffs, adoptions, supports, byPl, pods: X10_PODS };
}
