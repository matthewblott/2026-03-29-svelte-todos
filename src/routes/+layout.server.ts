import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user:     locals.user ?? null,
    isNative: locals.isNative,
    platform: locals.nativePlatform,
  };
};
