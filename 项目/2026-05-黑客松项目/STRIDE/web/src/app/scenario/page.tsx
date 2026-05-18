"use client";

import { useState } from "react";
import { useQuarter } from "@/components/AppShell";
import { fmtMoney } from "@/lib/format";
import type { CalcSnapshot } from "@/lib/types";

export default function ScenarioPage() {
  const { quarterId } = useQuarter();
  const [fte, setFte] = useState(5);
  const [rev, setRev] = useState(3);
  const [result, setResult] = useState<{
    baseline: CalcSnapshot | null;
    scenario: CalcSnapshot | null;
    note: string;
  } | null>(null);

  async function run() {
    const res = await fetch("/api/forecast/scenario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quarterId, deltaFtePct: fte, deltaRevenuePct: rev }),
    });
    setResult(await res.json());
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <p className="breadcrumb">
        <a href="/">STRIDE</a> / <strong>{"\u60c5\u666f\u8bd5\u7b97"}</strong>
      </p>
      <section className="chart-panel">
        <h3>Forecast {"\u60c5\u666f"}</h3>
        <p className="tab-intro">{"\u7f16\u5236\u4f1a\u524d\u6c99\u76d8\uff1a\u8c03\u6574 FTE \u4e0e\u6536\u5165 proxy\u767e\u5206\u6bd4"}</p>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          FTE %{" "}
          <input type="number" value={fte} onChange={(e) => setFte(Number(e.target.value))} />
        </label>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          {"\u6536\u5165 % "}
          <input type="number" value={rev} onChange={(e) => setRev(Number(e.target.value))} />
        </label>
        <button type="button" className="btn-primary" onClick={run}>
          {"\u8fd0\u884c\u573a\u666f"}
        </button>
        {result?.scenario && (
          <div className="kpi-grid" style={{ marginTop: "1rem" }}>
            <article className="kpi-card">
              <p className="label">{"\u57fa\u7ebf TCOW"}</p>
              <p className="value">{fmtMoney(result.baseline?.kpis.tcow ?? 0)}</p>
            </article>
            <article className="kpi-card">
              <p className="label">{"\u573a\u666f TCOW"}</p>
              <p className="value">{fmtMoney(result.scenario.kpis.tcow)}</p>
            </article>
            <article className="kpi-card">
              <p className="label">{"\u4eba\u529b\u6210\u672c\u7387"}</p>
              <p className="value">{(result.scenario.kpis.laborCostPct * 100).toFixed(1)}%</p>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}
