import { db } from '$lib/db';
import { jobs } from '$lib/db/schema';

export function enqueue(type: string, payload: Record<string, unknown>, runAt?: Date): void {
  db.insert(jobs).values({ type, payload, runAt: runAt ?? new Date() }).run();
}
