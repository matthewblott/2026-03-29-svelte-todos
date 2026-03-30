<!-- src/routes/+page.svelte -->
<main>
  <h1>Todos</h1>
  <p>What would you like to do?</p>

  <nav>
    <a href="/auth/login">Sign in</a>
    <a href="/auth/register">Create account</a>

    <form method="POST" action="/auth/guest">
      <button type="submit">Continue as guest</button>
    </form>
  </nav>
</main>
