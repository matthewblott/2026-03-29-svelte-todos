// @ts-nocheck
// src/routes/todos/+page.server.ts
// src/routes/(app)/[tenant]/todos/+page.server.ts
//
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { safeParse } from 'valibot';
import { TodoSchema } from '$lib/schemas/todo';
import { flattenErrors } from '$lib/utils/validation';
import { todos } from '$lib/db/app-schema';
import { eq, desc } from 'drizzle-orm';
import { deleteSession } from '$lib/auth/session';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const allTodos = await locals.userDb!.query.todos.findMany({
    orderBy: desc(todos.createdAt),
  });
  return { todos: allTodos };
};

export const actions = {
  create: async ({ request, locals }: import('./$types').RequestEvent) => {
    const data   = Object.fromEntries(await request.formData());
    const result = safeParse(TodoSchema, data);

    if (!result.success) {
      return fail(400, { errors: flattenErrors(result.issues), values: data });
    }

    await locals.userDb!.insert(todos).values({ title: result.output.title });
  },

  toggle: async ({ request, locals }: import('./$types').RequestEvent) => {
    const id   = Number(Object.fromEntries(await request.formData()).id);
    const todo = await locals.userDb!.query.todos.findFirst({ where: eq(todos.id, id) });
    if (!todo) return fail(404);
    await locals.userDb!.update(todos)
      .set({ completed: !todo.completed, updatedAt: new Date() })
      .where(eq(todos.id, id));
  },

  delete: async ({ request, locals }: import('./$types').RequestEvent) => {
    const id = Number(Object.fromEntries(await request.formData()).id);
    await locals.userDb!.delete(todos).where(eq(todos.id, id));
  },

  logout: async ({ cookies, locals }: import('./$types').RequestEvent) => {
    const token = cookies.get('session');
    if (token) await deleteSession(token);
    cookies.delete('session', { path: '/' });
    redirect(302, '/');
  },
};
;null as any as Actions;