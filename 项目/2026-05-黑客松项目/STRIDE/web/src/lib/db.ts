import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

/** Netlify/Lambda 仅 /tmp 可写；本地开发用项目 data/ */
function resolveDataDir() {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "stride-data");
  }
  return path.join(process.cwd(), "data");
}

function getPaths() {
  const DATA_DIR = resolveDataDir();
  return { DATA_DIR, DB_PATH: path.join(DATA_DIR, "stride.db") };
}

let db: Database.Database | null = null;

function ensureDataDir() {
  const { DATA_DIR } = getPaths();
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS quarters (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  weeks INTEGER NOT NULL DEFAULT 13,
  revenue_proxy REAL NOT NULL DEFAULT 0,
  config_json TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS calc_snapshots (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (quarter_id) REFERENCES quarters(id)
);

CREATE TABLE IF NOT EXISTS metric_observations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quarter_id TEXT NOT NULL,
  metric_code TEXT NOT NULL,
  value REAL NOT NULL,
  source_type TEXT NOT NULL,
  pl_id TEXT,
  UNIQUE(quarter_id, metric_code, pl_id)
);

CREATE TABLE IF NOT EXISTS role_fte (
  quarter_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  fte REAL NOT NULL,
  PRIMARY KEY (quarter_id, rf_id)
);

CREATE TABLE IF NOT EXISTS allocations (
  quarter_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  pl_id TEXT NOT NULL,
  percent REAL NOT NULL,
  PRIMARY KEY (quarter_id, rf_id, pl_id)
);

CREATE TABLE IF NOT EXISTS x10_handoffs (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  pod_id TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  bound_pl TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS x10_adoptions (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  handoff_id TEXT NOT NULL,
  pl_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS x10_support_tasks (
  id TEXT PRIMARY KEY,
  quarter_id TEXT NOT NULL,
  rf_id TEXT NOT NULL,
  pl_id TEXT NOT NULL,
  title TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0
);
`;

export function getDb(): Database.Database {
  if (!db) {
    const { DB_PATH } = getPaths();
    ensureDataDir();
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.exec(SCHEMA);
  }
  return db;
}

export function resetDb() {
  const { DB_PATH } = getPaths();
  if (db) {
    db.close();
    db = null;
  }
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  getDb();
}
