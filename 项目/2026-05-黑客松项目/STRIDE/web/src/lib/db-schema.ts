/** 本地 SQLite 与 Turso libSQL 共用 DDL */
export const SCHEMA_STATEMENTS = [
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

export const SCHEMA_SQL = SCHEMA_STATEMENTS.join(";\n") + ";";
