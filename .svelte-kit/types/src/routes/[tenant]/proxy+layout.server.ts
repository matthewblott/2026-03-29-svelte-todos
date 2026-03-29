// @ts-nocheck
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }: Parameters<LayoutServerLoad>[0]) => {
  if (url.pathname.includes('/auth/')) {
    return { tenant: locals.tenant };
  }

  if (!locals.user) {
    redirect(302, `/${locals.tenant?.slug}/auth/login`);
  }

  return { tenant: locals.tenant, user: locals.user };
};
