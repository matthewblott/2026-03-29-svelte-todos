<!-- src/routes/todos/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { safeParse } from 'valibot';
  import { TodoSchema } from '$lib/schemas/todo';
  import { flattenErrors } from '$lib/utils/validation';

  let { data, form } = $props();

  let title  = $state(String(form?.values?.title ?? ''));
  let errors = $state<Record<string, string>>(form?.errors ?? {});

  function validate() {
    const result = safeParse(TodoSchema, { title });
    errors = result.success ? {} : flattenErrors(result.issues);
    return result.success;
  }
</script>

<header>
  <h1>Todos</h1>
  {#if data.user?.isGuest}
    <p>Guest account — <a href="/auth/register">create an account</a> to keep your data.</p>
  {/if}
  <form method="POST" action="?/logout" use:enhance>
    <button type="submit">Sign out</button>
  </form>
</header>

<main>
  <section>
    <h2>Add a todo</h2>
    <form
      method="POST"
      action="?/create"
      use:enhance
      novalidate
      onsubmit={(e) => { if (!validate()) e.preventDefault(); }}
    >
      <label for="title">Title</label>
      <input id="title" type="text" name="title" bind:value={title} oninput={validate} />
      {#if errors.title}
        <p role="alert">{errors.title}</p>
      {/if}
      <button type="submit">Add</button>
    </form>
  </section>

  <section>
    <h2>Your todos</h2>
    {#if data.todos.length === 0}
      <p>No todos yet.</p>
    {:else}
      <ul>
        {#each data.todos as todo (todo.id)}
          <li>
            <form method="POST" action="?/toggle" use:enhance>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}>
                {todo.completed ? '✓' : '○'}
              </button>
            </form>

            <span style={todo.completed ? 'text-decoration: line-through' : ''}>
              {todo.title}
            </span>

            <form method="POST" action="?/delete" use:enhance>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" aria-label="Delete">×</button>
            </form>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</main>
