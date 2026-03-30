// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { sharedDb } from '$lib/db/shared';
import { sessions } from '$lib/db/shared-schema';
import { getUserDb } from '$lib/db/app';
import { eq, gt, and } from 'drizzle-orm';
import { startWorker } from '$lib/jobs/worker';

startWorker();

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session');

  if (token) {
    const session = await sharedDb.query.sessions.findFirst({
      where: and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())),
      with:  { user: true },
    });

    if (session) {
      event.locals.user    = session.user;
      event.locals.session = session;
      event.locals.userDb  = getUserDb(session.user.id);
    }
  }

  return resolve(event);
};
