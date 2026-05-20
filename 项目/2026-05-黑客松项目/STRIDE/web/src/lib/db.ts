import fs from "fs";
import path from "path";
import type { Client, InValue, ResultSet, Transaction } from "@libsql/client";
import { createClient } from "@libsql/client";
import { SCHEMA_STATEMENTS } from "./db-schema";

export type DbRow = Record<string, unknown>;
export type DbParams = InValue[];

/** 统一异步 DB 接口（本地 better-sqlite3 / Turso libSQL） */
export interface StrideDb {
  all<T = DbRow>(sql: string, params?: DbParams): Promise<T[]>;
  get<T = DbRow>(sql: string, params?: DbParams): Promise<T | undefined>;
  run(sql: string, params?: DbParams): Promise<void>;
  transaction<T>(fn: (tx: StrideDb) => Promise<T>): Promise<T>;
}

export function isTursoEnabled(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

function mapLibsqlRows(result: ResultSet): DbRow[] {
  if (!result.rows.length) return [];
  return result.rows.map((row) => {
    const obj: DbRow = {};
    for (let i = 0; i < result.columns.length; i++) {
      obj[result.columns[i]] = row[i];
    }
    return obj;
  });
}

class TursoDb implements StrideDb {
  constructor(private client: Client) {}

  async all<T = DbRow>(sql: string, params: DbParams = []): Promise<T[]> {
    const result = await this.client.execute({ sql, args: params });
    return mapLibsqlRows(result) as T[];
  }

  async get<T = DbRow>(sql: string, params: DbParams = []): Promise<T | undefined> {
    const rows = await this.all<T>(sql, params);
    return rows[0];
  }

  async run(sql: string, params: DbParams = []): Promise<void> {
    await this.client.execute({ sql, args: params });
  }

  async transaction<T>(fn: (tx: StrideDb) => Promise<T>): Promise<T> {
    const txn = await this.client.transaction("write");
    try {
      const result = await fn(new TursoTxnDb(txn));
      await txn.commit();
      return result;
    } catch (e) {
      await txn.rollback();
      throw e;
    }
  }
}

class TursoTxnDb implements StrideDb {
  constructor(private txn: Transaction) {}

  async all<T = DbRow>(sql: string, params: DbParams = []): Promise<T[]> {
    const result = await this.txn.execute({ sql, args: params });
    return mapLibsqlRows(result) as T[];
  }

  async get<T = DbRow>(sql: string, params: DbParams = []): Promise<T | undefined> {
    const rows = await this.all<T>(sql, params);
    return rows[0];
  }

  async run(sql: string, params: DbParams = []): Promise<void> {
    await this.txn.execute({ sql, args: params });
  }

  async transaction<T>(fn: (tx: StrideDb) => Promise<T>): Promise<T> {
    return fn(this);
  }
}

class SqliteDb implements StrideDb {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private db: any) {}

  async all<T = DbRow>(sql: string, params: DbParams = []): Promise<T[]> {
    return this.db.prepare(sql).all(...params) as T[];
  }

  async get<T = DbRow>(sql: string, params: DbParams = []): Promise<T | undefined> {
    return this.db.prepare(sql).get(...params) as T | undefined;
  }

  async run(sql: string, params: DbParams = []): Promise<void> {
    this.db.prepare(sql).run(...params);
  }

  async transaction<T>(fn: (tx: StrideDb) => Promise<T>): Promise<T> {
    this.db.exec("BEGIN");
    try {
      const result = await fn(this);
      this.db.exec("COMMIT");
      return result;
    } catch (e) {
      try {
        this.db.exec("ROLLBACK");
      } catch {
        /* ignore */
      }
      throw e;
    }
  }
}

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

function ensureDataDir() {
  const { DATA_DIR } = getPaths();
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

let dbPromise: Promise<StrideDb> | null = null;

async function initSchema(db: StrideDb) {
  for (const sql of SCHEMA_STATEMENTS) {
    await db.run(sql);
  }
}

async function createTursoDb(): Promise<StrideDb> {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  const db = new TursoDb(client);
  await initSchema(db);
  try {
    await db.run("PRAGMA foreign_keys = ON");
  } catch {
    /* Turso 部分 pragma 可能不支持，忽略 */
  }
  return db;
}

async function createSqliteDb(): Promise<StrideDb> {
  const { DB_PATH } = getPaths();
  ensureDataDir();
  const mod = await import("better-sqlite3");
  const Database = mod.default;
  const sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  const db = new SqliteDb(sqlite);
  await initSchema(db);
  return db;
}

/** 获取数据库（单例）；配置 Turso 时用云端，否则本地 data/stride.db */
export async function getDb(): Promise<StrideDb> {
  if (!dbPromise) {
    dbPromise = isTursoEnabled() ? createTursoDb() : createSqliteDb();
  }
  return dbPromise;
}

export function getDbBackend(): "turso" | "sqlite" {
  return isTursoEnabled() ? "turso" : "sqlite";
}

/** 仅本地 SQLite：删除库文件并重建（Turso 上不可用） */
export async function resetDb() {
  if (isTursoEnabled()) {
    throw new Error("resetDb 仅支持本地 SQLite；Turso 请在控制台管理数据");
  }
  const { DB_PATH } = getPaths();
  dbPromise = null;
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  await getDb();
}
