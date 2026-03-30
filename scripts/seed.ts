// scripts/seed.ts
import { mkdirSync } from 'node:fs';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as sharedSchema from '../src/lib/db/shared-schema.js';
import { eq } from 'drizzle-orm';

mkdirSync('storage/data', { recursive: true });

const sharedSqlite = new Database('storage/shared.db');
sharedSqlite.pragma('journal_mode = WAL');
sharedSqlite.pragma('foreign_keys = ON');
const sharedDb = drizzle(sharedSqlite, { schema: sharedSchema });

const { users } = sharedSchema;

function provisionUserDb(userId: number) {
  const sqlite = new Database(`storage/data/${userId}.db`);
  sqlite.pragma('journal_mode = WAL');
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT NOT NULL,
      completed  INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `);
  return drizzle(sqlite);
}

const SEED_USERS = [
  {
    email: 'alice@example.com',
    todos: ['Set up CI pipeline', 'Review Q4 roadmap', 'Write onboarding docs'],
  },
  {
    email: 'bob@example.com',
    todos: ['Update dependencies', 'Add error monitoring'],
  },
];

console.log('\n🌱 Seeding database...\n');

for (const userData of SEED_USERS) {
  const existing = await sharedDb.query.users.findFirst({
    where: eq(users.email, userData.email),
  });

  let user = existing;

  if (existing) {
    console.log(`  user already exists: ${userData.email}`);
  } else {
    [user] = await sharedDb.insert(users).values({ email: userData.email }).returning();
    console.log(`  created user: ${userData.email} (id ${user.id})`);
  }

  const userDb = provisionUserDb(user!.id);

  const { todos } = await import('../src/lib/db/app-schema.js');
  const existingTodos = await userDb.select().from(todos);

  if (existingTodos.length > 0) {
    console.log(`  todos already seeded for ${userData.email}, skipping`);
  } else {
    for (const title of userData.todos) {
      await userDb.insert(todos).values({ title });
      console.log(`  created todo: "${title}"`);
    }
  }
}

console.log('\n✅ Seed complete.\n');
console.log('You can log in at: http://localhost:5173');
console.log('');

sharedSqlite.close();
