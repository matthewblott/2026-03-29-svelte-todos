<script lang="ts">
  let { data } = $props();
</script>

<header>
  <h1>Todos</h1>
  {#if !data.isNative}
    <nav>
      <a href="/{data.user.username}/todos/new">New todo</a>
    </nav>
  {/if}
</header>

<main>
  {#if data.todos.length === 0}
    <p>No todos yet. <a href="/{data.user.username}/todos/new">Create one</a>.</p>
  {:else}
    <ul id="todos">
      {#each data.todos as todo (todo.id)}
        <li id="todo-{todo.id}">
          <form method="POST" action="?/toggle">
            <input type="hidden" name="id" value={todo.id} />
            <button
              type="submit"
              aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {todo.completed ? '✓' : '○'}
            </button>
          </form>
          <a href="/{data.user.username}/todos/{todo.id}">
            <span style={todo.completed ? 'text-decoration: line-through' : ''}>
              {todo.title}
            </span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</main>
