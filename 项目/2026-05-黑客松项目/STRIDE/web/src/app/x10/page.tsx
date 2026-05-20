"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuarter } from "@/components/AppShell";
import { PageHero } from "@/components/PageHero";
import { L } from "@/lib/labels";
import { PRODUCT_LINES } from "@/lib/catalog";

type Handoff = {
  id: string;
  title: string;
  status: string;
  bound_pl: string;
  pod_id: string;
};

export default function X10Page() {
  const { quarterId } = useQuarter();
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [byPl, setByPl] = useState<Record<string, { adoptions: number; supportRate: number }>>({});
  const [handoffId, setHandoffId] = useState("");
  const [title, setTitle] = useState("");

  const load = useCallback(async () => {
    const [h, c] = await Promise.all([
      fetch(`/api/x10/handoffs?quarter=${quarterId}`).then((r) => r.json()),
      fetch(`/api/x10/collaboration?quarter=${quarterId}`).then((r) => r.json()),
    ]);
    setHandoffs(h.handoffs ?? []);
    setByPl(c.byPl ?? {});
  }, [quarterId]);

  useEffect(() => {
    load();
  }, [load]);

  async function addAdoption(e: React.FormEvent) {
    e.preventDefault();
    if (!handoffId || !title) return;
    await fetch("/api/x10/adoptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quarterId,
        handoff_id: handoffId,
        pl_id: "P5",
        rf_id: "RF03",
        title,
      }),
    });
    setTitle("");
    load();
  }

  return (
    <>
      <PageHero
        title={L.x10Title}
        meta={"Handoff \u00b7 PL \u00d7 \u91c7\u7eb3 \u00b7 10\u00d7 \u534f\u4f5c\u770b\u677f"}
        breadcrumb={
          <>
            <a href="/">STRIDE</a> / <strong>{L.x10Title}</strong>
          </>
        }
      />
      <div className="app-main">
        <section className="chart-panel">
          <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Handoff</h2>
          <ul className="vacancy-list">
            {handoffs.map((h) => (
              <li key={h.id}>
                <span>
                  <strong>{h.title}</strong>{" "}
                  <span style={{ color: "var(--text-muted)" }}>({h.bound_pl})</span>
                </span>
                <span className={h.status === "done" ? "tag-ok" : "tag-warn"}>{h.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="chart-panel">
          <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>{"\u534f\u4f5c\u770b\u677f\uff08PL \u00d7 \u91c7\u7eb3\uff09"}</h2>
          <div className="kpi-grid">
            {PRODUCT_LINES.map((pl) => (
              <article key={pl.id} className="kpi-card">
                <p className="label">{pl.name}</p>
                <p className="value" style={{ fontSize: "1rem" }}>
                  {"\u91c7\u7eb3 "}
                  {byPl[pl.id]?.adoptions ?? 0}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {"\u652f\u6491 "}
                  {((byPl[pl.id]?.supportRate ?? 0) * 100).toFixed(0)}%
                </p>
              </article>
            ))}
          </div>
        </section>

        <form onSubmit={addAdoption} className="chart-panel">
          <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>{L.addAdoption}</h2>
          <div className="form-field">
            <label>Handoff</label>
            <select value={handoffId} onChange={(e) => setHandoffId(e.target.value)}>
              <option value="">--</option>
              {handoffs.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>{"\u6807\u9898"}</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="btn-row">
            <button type="submit" className="btn btn-primary">
              {L.addAdoption}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
