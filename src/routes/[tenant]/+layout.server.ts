import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (url.pathname.includes('/auth/')) {
    return { tenant: locals.tenant };
  }

  if (!locals.user) {
    redirect(302, `/${locals.tenant?.slug}/auth/login`);
  }

  return { tenant: locals.tenant, user: locals.user };
};
