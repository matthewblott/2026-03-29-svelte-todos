<script lang="ts">
  import { safeParse } from 'valibot';
  import { VerifySchema } from '$lib/schemas/auth';
  import { flattenErrors } from '$lib/utils/validation';

  let { data, form } = $props();

  let code   = $state(String(form?.values?.code ?? ''));
  let errors = $state<Record<string, string>>(form?.errors ?? {});

  function validate() {
    const result = safeParse(VerifySchema, { email: data.email, code });
    errors = result.success ? {} : flattenErrors(result.issues);
    return result.success;
  }
</script>

<main>
  <h1>Enter your code</h1>
  <p>We sent a 6-digit code to <strong>{data.email}</strong>.</p>

  <form
    method="POST"
    novalidate
    onsubmit={(e) => { if (!validate()) e.preventDefault(); }}
  >
    <input type="hidden" name="email" value={data.email} />

    <label for="code">Login code</label>
    <input
      id="code"
      type="text"
      name="code"
      bind:value={code}
      oninput={validate}
      inputmode="numeric"
      maxlength="6"
      autocomplete="one-time-code"
    />
    {#if errors.code}
      <p role="alert">{errors.code}</p>
    {/if}

    <button type="submit">Verify code</button>
  </form>

  <p><a href="login">Use a different email</a></p>
</main>
