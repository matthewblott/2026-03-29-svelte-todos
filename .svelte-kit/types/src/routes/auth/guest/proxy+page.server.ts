// @ts-nocheck
// src/routes/auth/guest/+page.server.ts
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { randomBytes } from 'node:crypto';
import { createGuestAccount } from '$lib/auth/session';

export const actions = {
  default: async ({ cookies }: import('./$types').RequestEvent) => {
    let deviceToken = cookies.get('device_token');

    if (!deviceToken) {
      deviceToken = randomBytes(32).toString('hex');
      // Long-lived — survives session expiry so the same guest db is reused
      cookies.set('device_token', deviceToken, {
        httpOnly: true,
        sameSite: 'lax',
        path:     '/',
        maxAge:   60 * 60 * 24 * 365 * 5,
      });
    }

    const token = await createGuestAccount(deviceToken);

    cookies.set('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      path:     '/',
      maxAge:   60 * 60 * 24 * 30,
    });

    redirect(302, '/todos');
  },
};
;null as any as Actions;