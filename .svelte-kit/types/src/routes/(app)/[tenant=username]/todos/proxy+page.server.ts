// @ts-nocheck
import type { Actions, PageServerLoad } from './$types';
import { todos } from '$lib/db/app-schema';
import { desc, eq } from 'drizzle-orm';
import { redirect, error } from '@sveltejs/kit';
import { deleteSession } from '$lib/auth/session';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const allTodos = await locals.userDb!.query.todos.findMany({
    orderBy: desc(todos.createdAt),
  });
  return { todos: allTodos, user: locals.user! };
};

export const actions = {
  toggle: async ({ request, locals }: import('./$types').RequestEvent) => {
    const data = Object.fromEntries(await request.formData());
    const id   = Number(data.id);
    const todo = await locals.userDb!.query.todos.findFirst({
      where: eq(todos.id, id),
    });

    if (!todo) error(404, 'Todo not found');

    await locals.userDb!
      .update(todos)
      .set({ completed: !todo.completed, updatedAt: new Date() })
      .where(eq(todos.id, id));

    redirect(303, `/${locals.user!.username}/todos`);
  },

  logout: async ({ cookies }: import('./$types').RequestEvent) => {
    const token = cookies.get('session');
    if (token) await deleteSession(token);
    cookies.delete('session', { path: '/' });
    redirect(302, '/');
  },
};

;null as any as Actions;