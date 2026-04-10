// @ts-nocheck
import type { Actions, PageServerLoad } from './$types';
import { todos } from '$lib/db/app-schema';
import { desc, eq } from 'drizzle-orm';
import { turboStream } from '$lib/turbo/stream';
import { error } from '@sveltejs/kit';

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

    const completed = !todo.completed;

    await locals.userDb!
      .update(todos)
      .set({ completed, updatedAt: new Date() })
      .where(eq(todos.id, id));

    const accept = request.headers.get('accept') ?? '';

    // Turbo Stream response for native / Turbo Drive requests
    if (accept.includes('text/vnd.turbo-stream.html')) {
      return turboStream(
        'replace',
        `todo-${id}`,
        `<li id="todo-${id}">
          <form method="POST" action="?/toggle">
            <input type="hidden" name="id" value="${id}" />
            <button type="submit" aria-label="${completed ? 'Mark incomplete' : 'Mark complete'}">
              ${completed ? '✓' : '○'}
            </button>
          </form>
          <a href="/${locals.user!.username}/todos/${id}">
            <span style="${completed ? 'text-decoration: line-through' : ''}">${todo.title}</span>
          </a>
        </li>`,
      );
    }

    // Standard redirect for non-Turbo requests
    return new Response(null, {
      status:  303,
      headers: { location: `/${locals.user!.username}/todos` },
    });
  },

  logout: async ({ cookies, locals }: import('./$types').RequestEvent) => {
    const token = cookies.get('session');
    if (token) {
      const { deleteSession } = await import('$lib/auth/session');
      await deleteSession(token);
    }
    cookies.delete('session', { path: '/' });
    return redirect(302, '/');
  },
};
;null as any as Actions;