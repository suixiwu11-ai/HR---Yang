"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuarter } from "@/components/AppShell";
import { fmtMoney } from "@/lib/format";
import type { CalcSnapshot } from "@/lib/types";

function fmtYi(n: number) {
  return "\u00a5 " + (n / 1e8).toFixed(2) + "\u4ebf";
}

export default function ExecutivePage() {
  const { quarterId } = useQuarter();
  const [snapshot, setSnapshot] = useState<CalcSnapshot | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/quarters/${quarterId}/snapshot`);
    if (res.ok) setSnapshot((await res.json()).snapshot);
  }, [quarterId]);

  useEffect(() => {
    load();
  }, [load]);

  const k = snapshot?.kpis;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <p className="breadcrumb">
        <a href="/">STRIDE</a> / <strong>{"\u7ecf\u8425\u6458\u8981"}</strong>
      </p>
      <section className="chart-panel">
        <h3>{"\u7ecf\u8425\u6458\u8981"}</h3>
        <p className="tab-intro">{"\u5355\u5c4f\u3001\u540c\u6e90\u5feb\u7167\u5bfc\u51fa\uff1b\u4e0d\u542b\u4e2a\u4eba\u660e\u7ec6"}</p>
        {!k ? (
          <p>{"\u6682\u65e0\u6570\u636e"}</p>
        ) : (
          <div className="kpi-grid">
            <article className="kpi-card">
              <p className="label">TCOW</p>
              <p className="value">{fmtYi(k.tcow)}</p>
            </article>
            <article className="kpi-card">
              <p className="label">{"\u4eba\u529b\u6210\u672c\u7387"}</p>
              <p className="value">{(k.laborCostPct * 100).toFixed(1)}%</p>
            </article>
            <article className="kpi-card">
              <p className="label">Rev/FTE</p>
              <p className="value">{fmtMoney(k.revPerFte)}</p>
            </article>
            <article className="kpi-card">
              <p className="label">{"\u9884\u8b66"}</p>
              <p className="value">{snapshot?.warnings.length ?? 0}</p>
            </article>
          </div>
        )}
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <a
            href={`/api/report?quarter=${quarterId}&type=executive&format=md`}
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            {"\u4e0b\u8f7d MD"}
          </a>
          <a
            href={`/api/report?quarter=${quarterId}&type=executive&format=html`}
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            {"\u4e0b\u8f7d HTML"}
          </a>
        </div>
      </section>
    </div>
  );
}
