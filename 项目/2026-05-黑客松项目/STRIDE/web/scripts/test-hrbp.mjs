/**
 * HRBP persona walkthrough (API-level) — simulates 15-min demo path
 */
const BASE = process.env.BASE_URL || "http://localhost:3000";
const Q = "2025Q3";

await fetch(BASE + "/api/demo/seed", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ quarterId: Q }),
});

const steps = [
  ["1. \u5b63\u4e2d\u6253\u5f00 KPI", async () => {
    const r = await fetch(BASE + `/api/hr/kpis?quarter=${Q}`);
    if (!r.ok) throw new Error("no kpis — load demo first");
    const { kpis } = await r.json();
    if (kpis.laborCostPct > 0.5)
      throw new Error("labor cost pct unrealistic: " + kpis.laborCostPct);
  }],
  ["2. \u67e5\u770b\u9884\u8b66", async () => {
    const r = await fetch(BASE + `/api/hr/warnings?quarter=${Q}`);
    const { warnings } = await r.json();
    if (!warnings.some((w) => w.code === "W8"))
      console.warn("  note: W8 not present (ok if no done handoff without adoption)");
  }],
  ["3. \u95ee\u6570 Copilot", async () => {
    const r = await fetch(BASE + "/api/copilot/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "\u672c\u5b63\u4eba\u529b\u6210\u672c\u7387", quarterId: Q }),
    });
    const d = await r.json();
    if (!d.answer || d.answer.length < 10) throw new Error("empty copilot");
  }],
  ["4. \u60c5\u666f\u8bd5\u7b97", async () => {
    const r = await fetch(BASE + "/api/forecast/scenario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quarterId: Q, deltaFtePct: 10, deltaRevenuePct: 0 }),
    });
    const d = await r.json();
    if (!d.scenario) throw new Error("no scenario");
    if (d.scenario.kpis.tcow <= d.baseline.kpis.tcow) throw new Error("fte+10% should raise tcow");
  }],
  ["5. \u5bfc\u51fa HR \u62a5\u544a", async () => {
    const r = await fetch(BASE + `/api/report?quarter=${Q}&type=hrbp&format=html`);
    const t = await r.text();
    if (!t.includes("TCOW")) throw new Error("report missing TCOW");
  }],
  ["6. 10\u00d7 \u53f0\u8d26", async () => {
    const r = await fetch(BASE + `/api/x10/collaboration?quarter=${Q}`);
    const d = await r.json();
    if (!d.handoffs?.length) throw new Error("no handoffs");
  }],
];

let ok = 0;
for (const [label, fn] of steps) {
  try {
    await fn();
    console.log("OK", label);
    ok++;
  } catch (e) {
    console.error("BLOCKED", label, "-", e.message);
  }
}
console.log(`HRBP path: ${ok}/${steps.length}`);
process.exit(ok === steps.length ? 0 : 1);
