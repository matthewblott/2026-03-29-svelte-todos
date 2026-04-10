type StreamAction =
  | 'append'
  | 'prepend'
  | 'replace'
  | 'update'
  | 'remove'
  | 'before'
  | 'after';

export function turboStream(
  action: StreamAction,
  target: string,
  content: string = '',
): Response {
  const body = `
    <turbo-stream action="${action}" target="${target}">
      <template>${content}</template>
    </turbo-stream>
  `;

  return new Response(body, {
    headers: { 'content-type': 'text/vnd.turbo-stream.html' },
  });
}
