/**
 * 初始化 Turso 表结构；演示数据请部署后调用 POST /api/demo/seed
 * 用法：在 web/ 目录配置 .env.local 后执行 npm run db:seed
 */
import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS quarters (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  weeks INTEGER NOT NULL DEFAULT 13,
  revenue_proxy REAL NOT NULL DEFAULT 0,
  config_json TEXT NOT NULL DEFAULT '{}'
)`,
  `CREATE TABLE IF NOT EXISTS calc_snapshots (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (quarter_id) REFERENCES quarters(id)
)`,
  `CREATE TABLE IF NOT EXISTS metric_observations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quarter_id TEXT NOT NULL,
  metric_code TEXT NOT NULL,
  value REAL NOT NULL,
  source_type TEXT NOT NULL,
  pl_id TEXT,
  UNIQUE(quarter_id, metric_code, pl_id)
)`,
  `CREATE TABLE IF NOT EXISTS role_fte (
  quarter_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  fte REAL NOT NULL,
  PRIMARY KEY (quarter_id, rf_id)
)`,
  `CREATE TABLE IF NOT EXISTS allocations (
  quarter_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  pl_id TEXT NOT NULL,
  percent REAL NOT NULL,
  PRIMARY KEY (quarter_id, rf_id, pl_id)
)`,
  `CREATE TABLE IF NOT EXISTS x10_handoffs (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  pod_id TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  bound_pl TEXT NOT NULL,
  notes TEXT
)`,
  `CREATE TABLE IF NOT EXISTS x10_adoptions (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  handoff_id TEXT NOT NULL,
  pl_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  title TEXT NOT NULL
)`,
  `CREATE TABLE IF NOT EXISTS x10_support_tasks (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  pl_id TEXT NOT NULL,
  title TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0
)`,
];

function loadEnvFile(name) {
  const p = path.join(process.cwd(), name);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const url = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

if (!url || !token) {
  console.error("缺少 TURSO_DATABASE_URL 或 TURSO_AUTH_TOKEN（写在 .env.local）");
  process.exit(1);
}

const client = createClient({ url, authToken: token });

for (const sql of SCHEMA) {
  await client.execute(sql);
  console.log("OK:", sql.split("\n")[0].slice(0, 60) + "...");
}

console.log("\n表结构已就绪。");
console.log("下一步：部署后在站点「数据」页点「加载演示数据」，或：");
console.log('  curl -X POST https://你的站点.netlify.app/api/demo/seed -H "Content-Type: application/json" -d "{}"');
