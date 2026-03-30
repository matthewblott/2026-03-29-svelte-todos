// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const PUBLIC_PATHS = ['/', '/auth/login', '/auth/verify', '/auth/register', '/auth/guest'];

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (!locals.user && !PUBLIC_PATHS.includes(url.pathname)) {
    redirect(302, '/');
  }
  return { user: locals.user ?? null };
};
