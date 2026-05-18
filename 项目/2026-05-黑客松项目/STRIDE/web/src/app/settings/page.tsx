"use client";

import { useState } from "react";
import { useQuarter } from "@/components/AppShell";
import { parseImportCsv } from "@/lib/csv-import";
import { L } from "@/lib/labels";

export default function SettingsPage() {
  const { quarterId } = useQuarter();
  const [revenue, setRevenue] = useState("1280000000");
  const [status, setStatus] = useState("");

  async function seed() {
    setStatus("\u52a0\u8f7d\u4e2d\u2026");
    const res = await fetch("/api/demo/seed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quarterId }),
    });
    const d = await res.json();
    setStatus(res.ok ? "\u6f14\u793a\u6570\u636e\u5df2\u52a0\u8f7d\u5e76\u6838\u7b97" : d.error ?? "\u5931\u8d25");
  }

  async function saveQuarter() {
    const res = await fetch("/api/quarters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: quarterId,
        revenue_proxy: Number(revenue),
      }),
    });
    if (res.ok) {
      await fetch(`/api/quarters/${quarterId}/calculate`, { method: "POST" });
      setStatus("\u5df2\u4fdd\u5b58\u5e76\u91cd\u65b0\u6838\u7b97");
    } else setStatus("\u4fdd\u5b58\u5931\u8d25");
  }

  async function exportJson() {
    const res = await fetch(`/api/data/export?quarter=${quarterId}`);
    const bundle = await res.json();
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `stride-${quarterId}.json`;
    a.click();
    setStatus("\u5df2\u5bfc\u51fa\u5b63\u5ea6\u6570\u636e\u5305");
  }

  async function importFile(file: File) {
    const name = file.name.toLowerCase();
    try {
      const text = await file.text();
      let res: Response;
      if (name.endsWith(".csv")) {
        const bundle = parseImportCsv(text);
        res = await fetch("/api/data/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bundle),
        });
      } else {
        res = await fetch("/api/data/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: text,
        });
      }
      const d = await res.json();
      setStatus(res.ok ? `\u5df2\u5bfc\u5165\u5b63\u5ea6 ${d.quarterId}\uff0c\u8bf7\u56de\u5de5\u4f5c\u53f0\u70b9\u300c\u91cd\u65b0\u6838\u7b97\u300d` : d.error ?? "\u5bfc\u5165\u5931\u8d25");
    } catch (e) {
      setStatus(String(e));
    }
  }

  function downloadTemplate(format: "csv" | "json") {
    window.open(`/api/data/template?quarter=${quarterId}&format=${format}`, "_blank");
  }

  function downloadReport(type: "hrbp" | "executive", format: "md" | "html") {
    window.open(`/api/report?quarter=${quarterId}&type=${type}&format=${format}`, "_blank");
  }

  return (
    <div className="space-y-6" style={{ maxWidth: 720, margin: "0 auto", padding: "1rem" }}>
      <p className="breadcrumb">
        <a href="/">STRIDE</a> / <strong>{L.settingsTitle}</strong>
      </p>
      <h1 className="text-2xl font-semibold">{L.settingsTitle}</h1>
      {status && <p className="text-sm" style={{ color: "var(--accent)" }}>{status}</p>}

      <section className="chart-panel tab-intro" style={{ fontSize: "0.88rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>{"\u5bfc\u5165\u662f\u4ec0\u4e48\uff1f"}</h3>
        <p style={{ marginBottom: "0.5rem" }}>
          {
            "\u628a\u4e00\u4e2a\u5b63\u5ea6\u7684\u4eba\u529b\u6570\u636e\u4e00\u6b21\u6027\u5199\u8fdb\u7cfb\u7edf\uff0c\u5305\u62ec\uff1a"
          }
        </p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
          <li>{"\u5b63\u5ea6\u6536\u5165 proxy\u3001\u5468\u6570"}</li>
          <li>{"\u5404\u5c97\u4f4d\u65cf FTE\uff08\u5982 RF01 \u7b97\u6cd5\uff09"}</li>
          <li>{"FTE \u5206\u644a\u5230\u4ea7\u54c1\u7ebf\u7684\u767e\u5206\u6bd4\uff08P1\u2013P6\uff09"}</li>
          <li>{"\u5173\u952e\u6307\u6807\u89c2\u6d4b\u503c\uff08\u53ef\u9009\uff09"}</li>
          <li>{"10\u00d7 Handoff / \u91c7\u7eb3\uff08\u53ef\u9009\uff09"}</li>
        </ul>
        <p>
          <strong>{"\u63a8\u8350\u7528 CSV\u6a21\u677f"}</strong>
          {
            "\uff1a\u7528 Excel / WPS \u6253\u5f00\u3001\u6539\u6570\u5b57\u3001\u4fdd\u5b58\u4e3a CSV \u540e\u518d\u5bfc\u5165\u3002"
          }
        </p>
        <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
          {
            "JSON \u662f\u7a0b\u5e8f\u7528\u7684\u6570\u636e\u5305\u683c\u5f0f\uff08\u548c Excel \u91cc\u7684\u8868\u683c\u5185\u5bb9\u4e00\u81f4\uff0c\u53ea\u662f\u6362\u4e86\u79cd\u5199\u6cd5\uff09\u3002\u4e0d\u719f\u6089\u53ef\u5ffd\u7565 JSON\uff0c\u53ea\u7528 CSV \u5373\u53ef\u3002"
          }
        </p>
      </section>

      <section className="chart-panel space-y-3">
        <h2 className="font-medium">{"\u6a21\u677f\u4e0e\u5bfc\u5165"}</h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={() => downloadTemplate("csv")}>
            {"\u2b07 \u4e0b\u8f7d CSV \u6a21\u677f\uff08\u63a8\u8350\uff09"}
          </button>
          <button type="button" className="btn-secondary" onClick={() => downloadTemplate("json")}>
            {"\u2b07 \u4e0b\u8f7d JSON \u6a21\u677f"}
          </button>
          <label className="btn-secondary cursor-pointer">
            {"\u2b06 \u5bfc\u5165 CSV / JSON"}
            <input
              type="file"
              accept=".csv,.json,text/csv,application/json"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && importFile(e.target.files[0])}
            />
          </label>
          <button type="button" className="btn-secondary" onClick={exportJson}>
            {"\u5bfc\u51fa\u5f53\u524d\u5b63\u5ea6\uff08JSON\uff09"}
          </button>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {"\u5f53\u524d\u5b63\u5ea6\uff1a"}
          <strong>{quarterId}</strong>
          {" \u00b7 \u6a21\u677f\u91cc\u7684 quarter_id \u5217\u8981\u4e0e\u60a8\u8981\u5bfc\u5165\u7684\u5b63\u5ea6\u4e00\u81f4"}
        </p>
      </section>

      <section className="chart-panel space-y-3">
        <h2 className="font-medium">{"\u5feb\u901f\u5f00\u59cb"}</h2>
        <button type="button" onClick={seed} className="btn-primary">
          {L.seed}
        </button>
      </section>

      <section className="chart-panel space-y-3">
        <h2 className="font-medium">{"\u5b63\u5ea6\u53c2\u6570"}</h2>
        <label className="block text-sm">
          {L.revenue}
          <input
            className="mt-1 w-full rounded border border-[#e3e8ee] px-3 py-2"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
        </label>
        <button type="button" onClick={saveQuarter} className="btn-primary">
          {L.saveQuarter}
        </button>
      </section>

      <section className="chart-panel space-y-3">
        <h2 className="font-medium">{"\u62a5\u544a\u4e0b\u8f7d"}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" className="btn-secondary" onClick={() => downloadReport("hrbp", "md")}>
            {L.reportHrMd}
          </button>
          <button type="button" className="btn-secondary" onClick={() => downloadReport("hrbp", "html")}>
            {L.reportHrHtml}
          </button>
          <button type="button" className="btn-secondary" onClick={() => downloadReport("executive", "md")}>
            {L.reportExecMd}
          </button>
          <button type="button" className="btn-secondary" onClick={() => downloadReport("executive", "html")}>
            {L.reportExecHtml}
          </button>
        </div>
      </section>
    </div>
  );
}
