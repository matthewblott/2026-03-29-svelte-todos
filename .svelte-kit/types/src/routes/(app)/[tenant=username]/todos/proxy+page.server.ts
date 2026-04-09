// @ts-nocheck
import type { PageServerLoad } from './$types';
import { todos } from '$lib/db/app-schema';
import { desc } from 'drizzle-orm';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const allTodos = await locals.userDb!.query.todos.findMany({
    orderBy: desc(todos.createdAt),
  });
  return { todos: allTodos };
};
