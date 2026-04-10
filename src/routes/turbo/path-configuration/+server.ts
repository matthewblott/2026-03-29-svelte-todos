import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
  const config = {
    settings: {
      screenshots_enabled: true,
    },
    rules: [
      // Root / auth — present as modal so the native nav stack stays clean
      {
        patterns: ['^/$', '^/auth/.*'],
        properties: {
          context:     'modal',
          presentation: 'modal',
        },
      },
      // New todo — modal sheet
      {
        patterns: ['.*/todos/new$'],
        properties: {
          context:      'modal',
          presentation: 'modal',
        },
      },
      // Settings — push
      {
        patterns: ['.*/settings'],
        properties: {
          context:      'default',
          presentation: 'push',
        },
      },
      // Todo detail — push
      {
        patterns: ['.*/todos/\\d+'],
        properties: {
          context:      'default',
          presentation: 'push',
        },
      },
      // Todo index — root of the stack
      {
        patterns: ['.*/todos$'],
        properties: {
          context:      'default',
          presentation: 'default',
        },
      },
    ],
  };

  return new Response(JSON.stringify(config), {
    headers: { 'content-type': 'application/json' },
  });
};
