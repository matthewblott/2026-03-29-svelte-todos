<!-- src/routes/[tenant]/settings/+page.svelte -->
<script lang="ts">
  import { safeParse } from 'valibot';
  import { EmailSchema } from '$lib/schemas/auth';
  import { flattenErrors } from '$lib/utils/validation';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  let { data, form } = $props();

  let email  = $state(String(form?.values?.email ?? ''));
  let errors = $state<Record<string, string>>(form?.errors ?? {});

  // After step 1 succeeds the server returns { step: 'verify', email }
  let step = $derived(form?.step ?? 'request');

  function validateEmail() {
    const result = safeParse(EmailSchema, { email });
    errors = result.success ? {} : flattenErrors(result.issues);
    return result.success;
  }
</script>

<main>
  <h1>Settings</h1>

  <section>
    <h2>Account</h2>
    <p>Username: <strong>{data.user.username}</strong></p>

    {#if data.user.isGuest}
      <h3>Add an email address</h3>
      <p>
        Adding an email lets you sign in from other devices and keeps your data
        safe if you lose access to this one.
      </p>

      {#if $page.url.searchParams.get('upgraded')}
        <p role="status">Your account has been upgraded. Welcome!</p>

      {:else if step === 'verify'}
        <p>Enter the 6-digit code sent to <strong>{form.email}</strong>.</p>

        <form method="POST" action="?/confirmUpgrade" novalidate use:enhance>
          <input type="hidden" name="email" value={form.email} />

          <label for="code">Confirmation code</label>
          <input
            id="code"
            type="text"
            name="code"
            inputmode="numeric"
            maxlength="6"
            autocomplete="one-time-code"
          />
          {#if errors.code}
            <p role="alert">{errors.code}</p>
          {/if}

          <button type="submit">Confirm</button>
        </form>

      {:else}
        <form
          method="POST"
          action="?/requestUpgrade"
          novalidate
          use:enhance
          onsubmit={(e) => { if (!validateEmail()) e.preventDefault(); }}
        >
          <label for="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            bind:value={email}
            oninput={validateEmail}
            autocomplete="email"
          />
          {#if errors.email}
            <p role="alert">{errors.email}</p>
          {/if}

          <button type="submit">Send confirmation code</button>
        </form>
      {/if}

    {:else}
      <p>Email: <strong>{data.user.email}</strong></p>
    {/if}
  </section>
</main>
