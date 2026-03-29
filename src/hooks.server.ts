import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/db';
import { tenants, sessions } from '$lib/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { startWorker } from '$lib/jobs/worker';

startWorker();

export const handle: Handle = async ({ event, resolve }) => {
  const slug = event.params.tenant;

  if (slug) {
    const tenant = await db.query.tenants.findFirst({ where: eq(tenants.slug, slug) });
    if (!tenant) return new Response('Tenant not found', { status: 404 });
    event.locals.tenant = tenant;
  }

  const token = event.cookies.get('session');

  if (token && event.locals.tenant) {
    const session = await db.query.sessions.findFirst({
      where: and(
        eq(sessions.token, token),
        eq(sessions.tenantId, event.locals.tenant.id),
        gt(sessions.expiresAt, new Date()),
      ),
      with: { user: true },
    });

    if (session) {
      event.locals.user    = session.user;
      event.locals.session = session;
    }
  }

  return resolve(event);
};
