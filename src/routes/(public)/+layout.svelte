<script lang="ts">
  let { children, data } = $props();
</script>

{#if !data.isNative}
  <nav>
    <a href="/">Home</a>
  </nav>
{/if}

{@render children()}
