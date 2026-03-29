import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { createHash } from 'node:crypto';
import * as schema from '../src/lib/db/schema.js';
import { eq, and } from 'drizzle-orm';

const { tenants, users, todos, otpRequests, sessions, jobs } = schema;

const sqlite = new Database('storage/todos.db');
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

const db = drizzle(sqlite, { schema });

// ── Helpers ──────────────────────────────────────────────────────────────────

function upsertTenant(slug: string, name: string) {
  // const existing = db.query.tenants.findFirst({ where: eq(tenants.slug, slug) });
  const existing = db.select().from(tenants).where(eq(tenants.slug, slug)).get();
  if (existing) {
    console.log(`  tenant already exists: ${slug}`);
    return existing;
  }
  const [tenant] = db.insert(tenants).values({ slug, name }).returning().all();
  console.log(`  created tenant: ${slug} (id ${tenant.id})`);
  return tenant;
}

function upsertUser(email: string, tenantId: number) {
  // const existing = db.query.users.findFirst({
  //   where: and(eq(users.email, email), eq(users.tenantId, tenantId)),
  // });
  const existing = db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.tenantId, tenantId)))
    .get();
  if (existing) {
    console.log(`  user already exists: ${email}`);
    return existing;
  }
  const [user] = db.insert(users).values({ email, tenantId }).returning().all();
  console.log(`  created user: ${email} (id ${user.id})`);
  return user;
}

function seedTodos(userId: number, tenantId: number, items: string[]) {
  // const existing = db.query.todos.findMany({
  //   where: and(eq(todos.userId, userId), eq(todos.tenantId, tenantId)),
  // });
  const existing = db
    .select()
    .from(todos)
    .where(and(eq(todos.userId, userId), eq(todos.tenantId, tenantId)))
    .all();

  if (existing.length > 0) {
    console.log(`  todos already seeded for user ${userId}, skipping`);
    return;
  }

  for (const title of items) {
    db.insert(todos).values({ userId, tenantId, title }).run();
    console.log(`  created todo: "${title}"`);
  }
}

// ── Seed data ─────────────────────────────────────────────────────────────────

const SEED_TENANTS = [
  {
    slug:  'acme',
    name:  'Acme Corp',
    users: [
      {
        email: 'alice@acme.example.com',
        todos: [
          'Set up CI pipeline',
          'Review Q4 roadmap',
          'Write onboarding docs',
          'Fix login bug on mobile',
        ],
      },
      {
        email: 'bob@acme.example.com',
        todos: [
          'Update dependencies',
          'Add error monitoring',
        ],
      },
    ],
  },
  {
    slug:  'globex',
    name:  'Globex Inc',
    users: [
      {
        email: 'carol@globex.example.com',
        todos: [
          'Prepare investor deck',
          'Schedule team retrospective',
          'Review hiring pipeline',
        ],
      },
    ],
  },
];

// ── Run ───────────────────────────────────────────────────────────────────────

console.log('\n🌱 Seeding database...\n');

for (const tenantData of SEED_TENANTS) {
  console.log(`\n── Tenant: ${tenantData.name} (${tenantData.slug})`);
  const tenant = upsertTenant(tenantData.slug, tenantData.name);

  for (const userData of tenantData.users) {
    console.log(`\n  ── User: ${userData.email}`);
    const user = upsertUser(userData.email, tenant.id);
    seedTodos(user.id, tenant.id, userData.todos);
  }
}

console.log('\n✅ Seed complete.\n');
console.log('You can log in at:');

for (const t of SEED_TENANTS) {
  const firstUser = t.users[0];
  console.log(`  http://localhost:5173/${t.slug}/todos  →  ${firstUser.email}`);
}

console.log('');
sqlite.close();
