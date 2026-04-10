<script lang="ts">
  import { onMount } from 'svelte';

  let { children, data } = $props();

  onMount(async () => {
    await import('$lib/turbo/index.ts');
    await import('$lib/turbo/controllers/index.ts');
  });
</script>

<svelte:head>
  {#if data.isNative}
    <meta name="turbo-visit-control" content="reload" />
  {/if}
</svelte:head>

<div data-turbo-native={data.isNative ? '' : undefined}>
  {@render children()}
</div>
