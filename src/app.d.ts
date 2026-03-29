import type { InferSelectModel } from 'drizzle-orm';
import type { tenants, users, sessions } from '$lib/db/schema';

declare global {
	namespace App {
    interface Locals {
      tenant?:  InferSelectModel<typeof tenants>;
      user?:    InferSelectModel<typeof users>;
      session?: InferSelectModel<typeof sessions>;
    }
	}
}

export {};
