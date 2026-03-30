// @ts-nocheck
// src/routes/(public)/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
  return { user: locals.user ?? null };
};
