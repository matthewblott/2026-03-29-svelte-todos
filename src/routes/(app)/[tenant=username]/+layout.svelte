<script lang="ts">
  import { enhance } from '$app/forms';

  let { children, data } = $props();
</script>

{#if !data.isNative}
  <header>
    <nav>
      <a href="/{data.user.username}/todos">Todos</a>
      <a href="/{data.user.username}/settings">Settings</a>
      <form method="POST" action="/{data.user.username}/todos?/logout" use:enhance>
        <button type="submit">Sign out</button>
      </form>
    </nav>
  </header>
{/if}

{@render children()}
