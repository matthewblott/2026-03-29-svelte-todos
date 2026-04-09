<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { safeParse } from 'valibot';
  import { EmailSchema } from '$lib/schemas/auth';
  import { UsernameSchema } from '$lib/schemas/user';
  import { flattenErrors } from '$lib/utils/validation';

  let { data, form } = $props();

  // Email upgrade state
  let email            = $state('');
  let emailErrors      = $state<Record<string, string>>({});
  let upgradeStep      = $derived(form?.step ?? 'request');
  let verifyEmail      = $derived(form?.email ?? '');

  // Username change state
  let newUsername      = $state(data.user.username);
  let usernameErrors   = $state<Record<string, string>>({});

  // Merge server errors back in when the action matches
  let activeErrors = $derived(
    form?.action === 'changeUsername'
      ? { ...(form?.errors ?? {}), ...usernameErrors }
      : { ...(form?.errors ?? {}), ...emailErrors }
  );

  function validateEmail() {
    const result = safeParse(EmailSchema, { email });
    emailErrors  = result.success ? {} : flattenErrors(result.issues);
    return result.success;
  }

  function validateUsername() {
    const result   = safeParse(UsernameSchema, { username: newUsername });
    usernameErrors = result.success ? {} : flattenErrors(result.issues);
    return result.success;
  }

  let editingUsername = $derived($page.url.searchParams.get('edit') === 'username');
</script>

<main>
  <h1>Settings</h1>

  <section>
    <h2>Account</h2>

    <!-- Username -->
    {#if editingUsername}
      <form
        method="POST"
        action="?/changeUsername"
        novalidate
        use:enhance
        onsubmit={(e) => { if (!validateUsername()) e.preventDefault(); }}
      >
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          bind:value={newUsername}
          oninput={validateUsername}
          autocomplete="off"
          spellcheck="false"
        />
        {#if activeErrors.username}
          <p role="alert">{activeErrors.username}</p>
        {/if}

        <button type="submit">Save</button>
        <a href="/{data.user.username}/settings">Cancel</a>
      </form>

    {:else}
      <p>
        Username: <strong>{data.user.username}</strong>
        <a href="/{data.user.username}/settings?edit=username">Change username</a>
      </p>

      {#if $page.url.searchParams.get('renamed')}
        <p role="status">Username updated successfully.</p>
      {/if}
    {/if}

    <!-- Email / guest upgrade -->
    {#if data.user.isGuest}
      <h3>Add an email address</h3>
      <p>Adding an email lets you sign in from other devices and keeps your data safe.</p>

      {#if $page.url.searchParams.get('upgraded')}
        <p role="status">Your account has been upgraded. Welcome!</p>

      {:else if upgradeStep === 'verify'}
        <p>Enter the 6-digit code sent to <strong>{verifyEmail}</strong>.</p>

        <form method="POST" action="?/confirmUpgrade" novalidate use:enhance>
          <input type="hidden" name="email" value={verifyEmail} />

          <label for="code">Confirmation code</label>
          <input
            id="code"
            type="text"
            name="code"
            inputmode="numeric"
            maxlength="6"
            autocomplete="one-time-code"
          />
          {#if activeErrors.code}
            <p role="alert">{activeErrors.code}</p>
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
          {#if activeErrors.email}
            <p role="alert">{activeErrors.email}</p>
          {/if}

          <button type="submit">Send confirmation code</button>
        </form>
      {/if}

    {:else}
      <p>Email: <strong>{data.user.email}</strong></p>
    {/if}
  </section>

  <p><a href="/{data.user.username}/todos">Back to todos</a></p>
</main>
