import { browser } from '$app/environment';

if (browser) {
  const { start } = await import('@hotwired/turbo');
  const { Application } = await import('@hotwired/stimulus');

  start();

  const stimulus = Application.start();
  stimulus.debug = import.meta.env.DEV;

  // Export for controllers to use
  (window as any).__stimulus__ = stimulus;
}
