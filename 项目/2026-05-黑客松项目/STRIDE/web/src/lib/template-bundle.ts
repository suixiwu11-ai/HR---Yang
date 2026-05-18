import type { QuarterExportBundle } from "./types";
import { DEFAULT_ALLOCATION, DEFAULT_FTE, PRODUCT_LINES, ROLE_FAMILIES } from "./catalog";

/** 可下载的导入模板（含示例行，可按行增删改） */
export function buildImportTemplate(quarterId = "2025Q3"): QuarterExportBundle {
  const revenue = 1280000000;
  return {
    version: 1,
    quarterId,
    exportedAt: new Date().toISOString(),
    label: `${quarterId} \u81ea\u5b9a\u4e49\u5b63`,
    weeks: 13,
    revenue_proxy: revenue,
    config_json: JSON.stringify({ attributableRevenue: 740000000 }),
    observations: [
      { metric_code: "HR-TCOW", value: 284000000, source_type: "proxy" },
      { metric_code: "HR-LABOR-COST-PCT", value: 0.384, source_type: "proxy" },
      { metric_code: "HR-REV-FTE", value: 1860000, source_type: "proxy" },
      { metric_code: "HR-HEADCOUNT-ATTAIN", value: 0.94, source_type: "proxy" },
    ],
    roleFte: ROLE_FAMILIES.map((r) => ({
      rf_id: r.id,
      fte: DEFAULT_FTE[r.id] ?? 10,
    })),
    allocations: Object.entries(DEFAULT_ALLOCATION).flatMap(([rf_id, pls]) =>
      Object.entries(pls).map(([pl_id, percent]) => ({ rf_id, pl_id, percent }))
    ),
    handoffs: [
      {
        id: `${quarterId}-hf-example`,
        pod_id: "POD-FIN",
        title: "\u793a\u4f8b Handoff\uff08\u53ef\u5220\u6539\uff09",
        status: "review",
        bound_pl: "P5",
        notes: "",
      },
    ],
    adoptions: [],
    supportTasks: [],
  };
}

export function bundleToCsv(bundle: QuarterExportBundle): string {
  const lines: string[] = [
    "\uFEFFtype,quarter_id,field1,field2,field3,field4,field5,field6,notes",
    `# STRIDE \u5bfc\u5165\u6a21\u677f\u7528 Excel/WPS \u7f16\u8f91\u540e\u4fdd\u5b58\u4e3a CSV UTF-8`,
    `quarter,${bundle.quarterId},${bundle.revenue_proxy ?? 0},${bundle.weeks ?? 13},${bundle.label ?? ""},,,`,
  ];
  for (const r of bundle.roleFte) {
    lines.push(`fte,${bundle.quarterId},${r.rf_id},${r.fte},,,,,`);
  }
  for (const a of bundle.allocations) {
    lines.push(`allocation,${bundle.quarterId},${a.rf_id},${a.pl_id},${a.percent},,,,`);
  }
  for (const o of bundle.observations) {
    lines.push(
      `metric,${bundle.quarterId},${o.metric_code},${o.value},${o.source_type},${o.pl_id ?? ""},,,`
    );
  }
  for (const h of bundle.handoffs) {
    lines.push(
      `handoff,${bundle.quarterId},${h.id},${h.pod_id},${h.title},${h.status},${h.bound_pl},${h.notes ?? ""},`
    );
  }
  for (const a of bundle.adoptions) {
    lines.push(
      `adoption,${bundle.quarterId},${a.id},${a.handoff_id},${a.pl_id},${a.rf_id},${a.title},,`
    );
  }
  for (const s of bundle.supportTasks) {
    lines.push(
      `support,${bundle.quarterId},${s.id},${s.rf_id},${s.pl_id},${s.title},${s.completed},,,`
    );
  }
  lines.push("", `# RF: ${ROLE_FAMILIES.map((r) => r.id).join(" ")}`);
  lines.push(`# PL: ${PRODUCT_LINES.map((p) => p.id).join(" ")}`);
  return lines.join("\r\n");
}
