"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuarter } from "@/components/AppShell";
import { CopilotPanel } from "@/components/CopilotPanel";
import { PageHero } from "@/components/PageHero";
import { fmtMoney } from "@/lib/format";
import { useViewMode } from "@/contexts/ViewModeContext";
import type { CalcSnapshot } from "@/lib/types";

type WorkTab = "overview" | "cost" | "org" | "pay";

function fmtYi(n: number) {
  return "\u00a5 " + (n / 1e8).toFixed(2) + "\u4ebf";
}

function fmtWanFte(n: number) {
  return "\u00a5 " + (n / 1e4).toFixed(0) + "\u4e07";
}
const BAR_COLORS = ["#0f3d32", "#c85532", "#3d6b58", "#8aab7a"] as const;

export function WorkbenchView() {
  const { quarterId } = useQuarter();
  const { viewMode } = useViewMode();
  const [tab, setTab] = useState<WorkTab>("overview");
  const [snapshot, setSnapshot] = useState<CalcSnapshot | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/quarters/${quarterId}/snapshot`);
    if (res.ok) {
      const d = await res.json();
      setSnapshot(d.snapshot as CalcSnapshot);
    } else setSnapshot(null);
  }, [quarterId]);

  useEffect(() => {
    load();
  }, [load]);

  async function calculate() {
    await fetch(`/api/quarters/${quarterId}/calculate`, { method: "POST" });
    load();
  }

  const k = snapshot?.kpis;
  const plSorted = snapshot ? [...snapshot.plCosts].sort((a, b) => b.laborCostPct - a.laborCostPct) : [];

  const tabs: { id: WorkTab; label: string }[] = [
    { id: "overview", label: "\u603b\u89c8" },
    { id: "cost", label: "\u6210\u672c" },
    { id: "org", label: "\u7ec4\u7ec7" },
    { id: "pay", label: "\u85aa\u916c\u00d7\u7ee9\u6548" },
  ];

  const viewLabel =
    viewMode === "cpo" ? "CPO \u89c6\u56fe \u00b7 \u5f53\u524d\u4e0e HRBP \u76f8\u540c" : "HRBP \u89c6\u56fe";

  function plRevPerFte(kp: NonNullable<typeof k>, p: (typeof plSorted)[0]) {
    if (kp.fte <= 0 || kp.tcow <= 0) return null;
    const ftePl = kp.fte * (p.tcow / kp.tcow);
    return ftePl > 0 ? Math.round(p.revenue / ftePl) : null;
  }

  const floatVarPct = snapshot?.tcowStructure.find((x) => x.label.includes("\u6d6e\u52a8"))?.pct;

  const overviewRows =
    k &&
    ([
      { label: "\u4eba\u529b\u603b\u6210\u672c TCOW", value: fmtYi(k.tcow), tag: "proxy" },
      { label: "\u4eba\u529b\u6210\u672c\u5360\u8425\u6536\u6bd4", value: (k.laborCostPct * 100).toFixed(1) + "%", tag: "proxy" },
      { label: "\u4eba\u5747\u8425\u6536 Rev/FTE", value: fmtWanFte(k.revPerFte), tag: "proxy" },
      { label: "\u7f16\u5236\u8fbe\u6210\u7387", value: (k.headcountAttainment * 100).toFixed(0) + "%", tag: "assumption" },
    ] as const);

  return (
    <>
      <PageHero
        title={"\u6218\u7565\u4eba\u6548\u5de5\u4f5c\u53f0"}
        meta={`${quarterId} \u00b7 ${viewLabel} \u00b7 \u56db Tab \u603b\u89c8 / \u6210\u672c / \u7ec4\u7ec7 / \u85aa\u916c\u00d7\u7ee9\u6548`}
        breadcrumb={
          <>
            <a href="/">STRIDE</a>
            {" / "}
            <strong>{"\u5de5\u4f5c\u53f0"}</strong>
          </>
        }
        actions={
          <button type="button" className="btn-secondary" onClick={calculate} style={{ marginTop: "0.75rem" }}>
            {"\u91cd\u65b0\u6838\u7b97"}
          </button>
        }
      />

      <div className="app-main with-copilot">
        <div>
          <nav className="app-tabs" style={{ marginBottom: "1rem" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={tab === t.id ? "active" : ""}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {!snapshot || !k || !overviewRows ? (
            <p className="tab-intro">
              {"\u6682\u65e0\u6570\u636e\u3002\u8bf7\u5728\u300c\u6570\u636e\u4e0e\u62a5\u544a\u300d\u52a0\u8f7d\u6f14\u793a\u6570\u636e\u3002"}
            </p>
          ) : (
            <>
              {tab === "overview" && (
                <section className="panel">
                  <p className="tab-intro">
                    <strong>{"Tab1 \u603b\u89c8"}</strong>
                    {" \u2014 \u56db KPI\u3001\u8d70\u52bf\u3001\u4ea7\u54c1\u7ebf Rev/FTE \u5bf9\u6807\uff08\u6570\u636e\u6765\u81ea\u6838\u7b97\u5feb\u7167\uff09"}
                  </p>
                  <div className="kpi-grid">
                    {overviewRows.map((row) => (
                      <article key={row.label} className="kpi-card">
                        <div className="label">{row.label}</div>
                        <div className="value">{row.value}</div>
                        <span className="tag-src">{row.tag}</span>
                      </article>
                    ))}
                  </div>
                  <div className="chart-panel" style={{ marginTop: "1rem" }}>
                    <h3>{"\u8425\u6536 vs \u4eba\u529b\u603b\u6210\u672c\uff08\u5b63\u5ea6\u5bf9\u6bd4\u6f14\u793a\uff09"}</h3>
                    <div className="chart-bars-mock">
                      <span style={{ height: "55%" }} />
                      <span style={{ height: "62%" }} />
                      <span style={{ height: "58%" }} />
                      <span className="hi" style={{ height: "72%" }} />
                    </div>
                  </div>
                  <div className="chart-panel" style={{ marginTop: "1rem" }}>
                    <h3>{"\u4ea7\u54c1\u7ebf\u4eba\u5747\u8425\u6536\u5bf9\u6807"}</h3>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>{"\u4ea7\u54c1\u7ebf"}</th>
                            <th>{"Rev/FTE"}</th>
                            <th>{"\u4eba\u529b\u6210\u672c\u7387"}</th>
                            <th>{"\u901a\u9053"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plSorted.slice(0, 4).map((p) => {
                            const rpf = plRevPerFte(k, p);
                            return (
                              <tr key={p.plId}>
                                <td>{p.plName}</td>
                                <td>{rpf != null ? fmtWanFte(rpf) : "\u2014"}</td>
                                <td>{(p.laborCostPct * 100).toFixed(0) + "%"}</td>
                                <td>{"proxy"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              )}

              {tab === "cost" && (
                <section className="panel">
                  <p className="tab-intro">
                    <strong>{"Tab2 \u6210\u672c"}</strong>
                    {" \u2014 TCOW \u7ed3\u6784\u4e0e\u4ea7\u54c1\u7ebf\u6210\u672c\u8868"}
                  </p>
                  <div className="kpi-grid">
                    <article className="kpi-card">
                      <div className="label">{"\u672c\u5b63\u4eba\u529b\u603b\u6210\u672c"}</div>
                      <div className="value">{fmtYi(k.tcow)}</div>
                    </article>
                    {snapshot.tcowStructure.map((s) => (
                      <article key={s.label} className="kpi-card">
                        <div className="label">{s.label}</div>
                        <div className="value">{s.pct + "%"}</div>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{fmtMoney(s.amount)}</p>
                      </article>
                    ))}
                  </div>
                  <div className="chart-panel" style={{ marginTop: "1rem" }}>
                    <h3>{"TCOW \u7ed3\u6784\u62c6\u89e3"}</h3>
                    <div className="structure-bar" aria-hidden="true">
                      {snapshot.tcowStructure.map((s, i) => (
                        <span
                          key={s.label}
                          style={{ width: s.pct + "%", background: BAR_COLORS[i % BAR_COLORS.length] }}
                          title={s.label + " " + s.pct + "%"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="chart-panel" style={{ marginTop: "1rem" }}>
                    <h3>{"\u4ea7\u54c1\u7ebf\u6210\u672c"}</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>{"PL"}</th>
                          <th>{"TCOW"}</th>
                          <th>{"\u4eba\u529b\u6210\u672c\u7387"}</th>
                          <th>{"\u6807\u7b7e"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {snapshot.plCosts.map((p) => (
                          <tr key={p.plId}>
                            <td>{p.plName}</td>
                            <td>{fmtMoney(p.tcow)}</td>
                            <td>{(p.laborCostPct * 100).toFixed(1) + "%"}</td>
                            <td>{p.budgetTag ?? "\u2014"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {tab === "org" && (
                <section className="panel">
                  <p className="tab-intro">
                    <strong>{"Tab3 \u7ec4\u7ec7"}</strong>
                    {" \u2014 \u7f16\u5236\u8fbe\u6210\u3001FTE \u6982\u89c8\u3001\u9884\u8b66"}
                  </p>
                  <div className="kpi-grid">
                    <article className="kpi-card">
                      <div className="label">{"FTE \u5408\u8ba1"}</div>
                      <div className="value">{String(k.fte)}</div>
                    </article>
                    <article className="kpi-card">
                      <div className="label">{"\u7f16\u5236\u8fbe\u6210"}</div>
                      <div className="value">{(k.headcountAttainment * 100).toFixed(0) + "%"}</div>
                    </article>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    {snapshot.warnings.length === 0 ? (
                      <p className="tab-intro">{"\u6682\u65e0\u9884\u8b66\u3002"}</p>
                    ) : (
                      snapshot.warnings.map((w) => (
                        <div key={w.code} className="alert-card">
                          <span className="code">{w.code}</span>
                          <div>
                            <p>
                              <strong>{w.title}</strong>
                            </p>
                            <p style={{ fontSize: "0.8rem", margin: 0, color: "var(--text-secondary)" }}>
                              {w.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              )}

              {tab === "pay" && (
                <section className="panel">
                  <p className="tab-intro">
                    <strong>{"Tab4 \u85aa\u916c\u00d7\u7ee9\u6548"}</strong>
                    {" \u2014 \u805a\u5408\u5c55\u793a\uff08\u65e0\u4e2a\u4eba\u660e\u7ec6\uff09"}
                  </p>
                  <div className="kpi-grid">
                    <article className="kpi-card">
                      <div className="label">{"\u6d6e\u52a8\u6210\u672c\u5360\u6bd4"}</div>
                      <div className="value">{floatVarPct != null ? floatVarPct + "%" : "\u2014"}</div>
                      <span className="tag-src">{"\u5956\u91d1\u8ba1\u63d0\u5b63"}</span>
                    </article>
                    <article className="kpi-card">
                      <p className="label">{"\u805a\u5408\u7ee9\u6548\u6863\u4f4d"}</p>
                      <div className="value">{"A/B/C"}</div>
                      <span className="tag-src">{"proxy \u00b7 \u8131\u654f"}</span>
                    </article>
                  </div>
                  <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {"\u672c\u671f\u4e0d\u5c55\u793a\u4e2a\u4eba\u85aa\u916c\uff1b\u4ec5\u63d0\u4f9b\u805a\u5408\u7ed3\u6784\u4e0e\u6d6e\u52a8\u6210\u672c\u5360\u6bd4\u3002"}
                  </p>
                </section>
              )}
            </>
          )}
        </div>
        <CopilotPanel />
      </div>
    </>
  );
}
