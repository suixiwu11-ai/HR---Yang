/**
 * STRIDE API smoke tests — run: node scripts/test-api.mjs
 * Requires dev server on BASE_URL (default http://localhost:3000)
 */
const BASE = process.env.BASE_URL || "http://localhost:3000";
const Q = "2025Q3";

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log("PASS", name);
    passed++;
  } catch (e) {
    console.error("FAIL", name, e.message);
    failed++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function json(path, opts) {
  const res = await fetch(BASE + path, opts);
  const body = await res.json().catch(() => ({}));
  return { res, body };
}

await test("seed demo", async () => {
  const { res, body } = await json("/api/demo/seed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quarterId: Q }),
  });
  assert(res.ok, "seed status " + res.status);
  assert(body.snapshot?.kpis?.tcow > 0, "tcow missing");
  const tcowYi = body.snapshot.kpis.tcow / 1e8;
  assert(tcowYi > 2.5 && tcowYi < 3.5, "tcow should be ~2.84亿 got " + tcowYi);
  const lcp = body.snapshot.kpis.laborCostPct;
  assert(lcp > 0.35 && lcp < 0.42, "labor cost pct ~38% got " + lcp);
});

await test("snapshot", async () => {
  const { res, body } = await json(`/api/quarters/${Q}/snapshot`);
  assert(res.ok, "snapshot");
  assert(body.snapshot?.plCosts?.length >= 6, "pl costs");
});

await test("export import roundtrip", async () => {
  const exp = await fetch(BASE + `/api/data/export?quarter=${Q}`);
  assert(exp.ok, "export");
  const bundle = await exp.json();
  bundle.quarterId = "2025Q3-IMPORT-RT";
  const { res, body } = await json("/api/data/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bundle),
  });
  assert(res.ok, "import " + JSON.stringify(body));
});

await test("csv template import roundtrip", async () => {
  const tpl = await fetch(BASE + `/api/data/template?quarter=${Q}&format=csv`);
  assert(tpl.ok, "template csv " + tpl.status);
  assert((tpl.headers.get("content-type") || "").includes("text/csv"), "csv content-type");
  const csv = await tpl.text();
  assert(csv.includes("fte,"), "template missing fte rows");
  const { res, body } = await json("/api/data/import", {
    method: "POST",
    headers: { "Content-Type": "text/csv; charset=utf-8" },
    body: csv.replaceAll(Q, "2025Q3-CSV-RT"),
  });
  assert(res.ok, "csv import " + JSON.stringify(body));
  const expCsv = await fetch(BASE + `/api/data/export?quarter=2025Q3-CSV-RT&format=csv`);
  assert(expCsv.ok, "export csv");
  assert((await expCsv.text()).includes("fte,"), "exported csv missing fte");
});

await test("copilot", async () => {
  const { res, body } = await json("/api/copilot/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "TCOW", quarterId: Q }),
  });
  assert(res.ok && body.answer, "copilot answer");
});

await test("report md html", async () => {
  const md = await fetch(BASE + `/api/report?quarter=${Q}&type=hrbp&format=md`);
  const html = await fetch(BASE + `/api/report?quarter=${Q}&type=executive&format=html`);
  assert(md.ok && (await md.text()).includes("STRIDE"), "md report");
  assert(html.ok && (await html.text()).includes("<!DOCTYPE html>"), "html report");
});

await test("x10 collaboration", async () => {
  const { res, body } = await json(`/api/x10/collaboration?quarter=${Q}`);
  assert(res.ok && Array.isArray(body.handoffs), "x10");
});

console.log("\n---", passed, "passed,", failed, "failed ---");
process.exit(failed > 0 ? 1 : 0);
