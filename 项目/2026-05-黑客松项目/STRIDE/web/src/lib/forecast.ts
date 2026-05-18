import { getLatestSnapshot } from "./calc-engine";
import type { CalcSnapshot } from "./types";

export function runForecastScenario(
  quarterId: string,
  deltaFtePct: number,
  deltaRevenuePct: number
): { baseline: CalcSnapshot | null; scenario: CalcSnapshot | null; note: string } {
  const baseline = getLatestSnapshot(quarterId);
  if (!baseline) {
    return { baseline: null, scenario: null, note: "\u8bf7\u5148\u6267\u884c\u6838\u7b97" };
  }
  const fteFactor = 1 + deltaFtePct / 100;
  const revFactor = 1 + deltaRevenuePct / 100;
  const scenarioTcow = Math.round(baseline.kpis.tcow * fteFactor);
  const scenarioRev = Math.round(baseline.kpis.revenue * revFactor);
  const scenario: CalcSnapshot = {
    ...baseline,
    snapshotId: baseline.snapshotId + "-scenario",
    kpis: {
      ...baseline.kpis,
      tcow: scenarioTcow,
      revenue: scenarioRev,
      laborCostPct: scenarioRev > 0 ? scenarioTcow / scenarioRev : 0,
      revPerFte:
        baseline.kpis.fte > 0
          ? Math.round(scenarioRev / (baseline.kpis.fte * fteFactor))
          : 0,
      fte: Math.round(baseline.kpis.fte * fteFactor),
    },
    plCosts: baseline.plCosts.map((p) => ({
      ...p,
      tcow: Math.round(p.tcow * fteFactor),
      revenue: Math.round(p.revenue * revFactor),
      laborCostPct:
        p.revenue * revFactor > 0
          ? (p.tcow * fteFactor) / (p.revenue * revFactor)
          : 0,
    })),
    warnings: [],
  };
  return {
    baseline,
    scenario,
    note: `FTE ${deltaFtePct >= 0 ? "+" : ""}${deltaFtePct}%, \u6536\u5165 ${deltaRevenuePct >= 0 ? "+" : ""}${deltaRevenuePct}%`,
  };
}
