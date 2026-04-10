import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(302, '/');

  if (locals.tenant && locals.user.id !== locals.tenant.id) {
    redirect(302, `/${locals.user.username}/todos`);
  }

  return {
    user:     locals.user,
    tenant:   locals.tenant,
    isNative: locals.isNative,
    platform: locals.nativePlatform,
  };
};
