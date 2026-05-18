"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuarter } from "@/components/AppShell";
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
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{L.x10Title}</h1>

      <section className="rounded-xl border border-[#e3e8ee] bg-white p-4">
        <h2 className="mb-3 font-medium">Handoff</h2>
        <ul className="space-y-2 text-sm">
          {handoffs.map((h) => (
            <li key={h.id} className="flex flex-wrap justify-between gap-2 border-b border-[#e3e8ee] py-2">
              <span>
                <strong>{h.title}</strong> <span className="text-[#697386]">({h.bound_pl})</span>
              </span>
              <span
                className={
                  h.status === "done"
                    ? "rounded bg-[#d4f4e2] px-2 py-0.5 text-xs text-[#0d652d]"
                    : "rounded bg-[#f6f9fc] px-2 py-0.5 text-xs"
                }
              >
                {h.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#e3e8ee] bg-white p-4">
        <h2 className="mb-3 font-medium">{"\u534f\u4f5c\u770b\u677f\uff08PL \u00d7 \u91c7\u7eb3\uff09"}</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRODUCT_LINES.map((pl) => (
            <article key={pl.id} className="rounded-lg border border-[#e3e8ee] p-3 text-sm">
              <p className="font-medium">{pl.name}</p>
              <p className="text-[#697386]">
                {"\u91c7\u7eb3 "}
                {byPl[pl.id]?.adoptions ?? 0}
                {" \u00b7 \u652f\u6491 "}
                {((byPl[pl.id]?.supportRate ?? 0) * 100).toFixed(0)}%
              </p>
            </article>
          ))}
        </div>
      </section>

      <form onSubmit={addAdoption} className="rounded-xl border border-[#e3e8ee] bg-white p-4 space-y-3">
        <h2 className="font-medium">{L.addAdoption}</h2>
        <label className="block text-sm">
          Handoff
          <select
            className="mt-1 w-full rounded border border-[#e3e8ee] px-3 py-2"
            value={handoffId}
            onChange={(e) => setHandoffId(e.target.value)}
          >
            <option value="">--</option>
            {handoffs.map((h) => (
              <option key={h.id} value={h.id}>
                {h.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          {"\u6807\u9898"}
          <input
            className="mt-1 w-full rounded border border-[#e3e8ee] px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button type="submit" className="btn-primary">
          {L.addAdoption}
        </button>
      </form>
    </div>
  );
}
