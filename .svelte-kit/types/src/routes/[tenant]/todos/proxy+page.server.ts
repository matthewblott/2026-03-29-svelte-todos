// @ts-nocheck
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { safeParse } from 'valibot';
import { TodoSchema } from '$lib/schemas/todo';
import { flattenErrors } from '$lib/utils/validation';
import { db } from '$lib/db';
import { todos } from '$lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { deleteSession } from '$lib/auth/session';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const allTodos = await db.query.todos.findMany({
    where:   and(eq(todos.tenantId, locals.tenant!.id), eq(todos.userId, locals.user!.id)),
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

    await db.insert(todos).values({
      tenantId: locals.tenant!.id,
      userId:   locals.user!.id,
      title:    result.output.title,
    });
  },

  toggle: async ({ request, locals }: import('./$types').RequestEvent) => {
    const id  = Number(Object.fromEntries(await request.formData()).id);
    const todo = await db.query.todos.findFirst({
      where: and(eq(todos.id, id), eq(todos.tenantId, locals.tenant!.id), eq(todos.userId, locals.user!.id)),
    });
    if (!todo) return fail(404);
    await db.update(todos).set({ completed: !todo.completed, updatedAt: new Date() }).where(eq(todos.id, id));
  },

  delete: async ({ request, locals }: import('./$types').RequestEvent) => {
    const id = Number(Object.fromEntries(await request.formData()).id);
    await db.delete(todos).where(
      and(eq(todos.id, id), eq(todos.tenantId, locals.tenant!.id), eq(todos.userId, locals.user!.id))
    );
  },

  logout: async ({ cookies }: import('./$types').RequestEvent) => {
    const token = cookies.get('session');
    if (token) await deleteSession(token);
    cookies.delete('session', { path: '/' });
  },
};
;null as any as Actions;