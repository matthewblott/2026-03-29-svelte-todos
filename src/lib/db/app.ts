// src/lib/db/app.ts
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './app-schema';
import { mkdirSync } from 'node:fs';

mkdirSync('storage/data', { recursive: true });

const connections = new Map<number, ReturnType<typeof drizzle>>();

export function getUserDb(userId: number) {
  if (connections.has(userId)) return connections.get(userId)!;

  const sqlite = new Database(`storage/data/${userId}.db`);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');

  // Bootstrap the schema inline — no migration tool needed for a single-table db
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      title     TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `);

  const db = drizzle(sqlite, { schema });
  connections.set(userId, db);
  return db;
}
