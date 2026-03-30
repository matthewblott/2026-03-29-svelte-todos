// src/app.d.ts
import type { InferSelectModel } from 'drizzle-orm';
import type { users, sessions } from '$lib/db/shared-schema';
import type { getUserDb } from '$lib/db/app';

declare global {
  namespace App {
    interface Locals {
      user?:   InferSelectModel<typeof users>;
      session?: InferSelectModel<typeof sessions>;
      userDb?: ReturnType<typeof getUserDb>;
    }
  }
}

export {};
