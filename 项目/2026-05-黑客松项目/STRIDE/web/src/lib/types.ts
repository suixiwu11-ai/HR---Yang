export type SourceType = "disclosed" | "proxy" | "assumption";
export type ViewMode = "hrbp" | "cpo" | "executive";
export type HandoffStatus = "draft" | "review" | "done";

export interface QuarterRow {
  id: string;
  label: string;
  weeks: number;
  revenue_proxy: number;
  config_json: string;
}

export interface Kpis {
  quarterId: string;
  tcow: number;
  revPerFte: number;
  laborCostPct: number;
  headcountAttainment: number;
  revenue: number;
  fte: number;
}

export interface PlCostRow {
  plId: string;
  plName: string;
  tcow: number;
  revenue: number;
  laborCostPct: number;
  budgetTag?: string;
}

export interface WarningRow {
  code: string;
  title: string;
  message: string;
  severity: "high" | "medium" | "low";
}

export interface CalcSnapshot {
  snapshotId: string;
  quarterId: string;
  createdAt: string;
  kpis: Kpis;
  plCosts: PlCostRow[];
  tcowStructure: { label: string; amount: number; pct: number }[];
  warnings: WarningRow[];
}

export interface QuarterExportBundle {
  version: 1;
  quarterId: string;
  exportedAt: string;
  label?: string;
  weeks?: number;
  revenue_proxy?: number;
  config_json?: string;
  observations: { metric_code: string; value: number; source_type: SourceType; pl_id?: string }[];
  roleFte: { rf_id: string; fte: number }[];
  allocations: { rf_id: string; pl_id: string; percent: number }[];
  handoffs: {
    id: string;
    pod_id: string;
    title: string;
    status: HandoffStatus;
    bound_pl: string;
    notes?: string;
  }[];
  adoptions: {
    id: string;
    handoff_id: string;
    pl_id: string;
    rf_id: string;
    title: string;
  }[];
  supportTasks: {
    id: string;
    rf_id: string;
    pl_id: string;
    title: string;
    completed: number;
  }[];
}
