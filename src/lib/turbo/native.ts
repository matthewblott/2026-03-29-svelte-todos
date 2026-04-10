export type NativePlatform = 'ios' | 'android' | null;

export function detectNativePlatform(request: Request): NativePlatform {
  const ua = request.headers.get('user-agent') ?? '';
  if (ua.includes('Hotwire Native iOS'))     return 'ios';
  if (ua.includes('Hotwire Native Android')) return 'android';
  return null;
}

export function isNativeRequest(request: Request): boolean {
  return detectNativePlatform(request) !== null;
}
