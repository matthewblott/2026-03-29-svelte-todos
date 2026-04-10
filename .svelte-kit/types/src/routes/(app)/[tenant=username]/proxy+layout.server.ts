// @ts-nocheck
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
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
