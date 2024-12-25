export function getUrlSearchParam(rawUrl: string | undefined, paramName: string) {
  if (!rawUrl) return undefined;

  const url = new URL(rawUrl, 'https://example.org/');

  return url.searchParams.get(paramName) ?? undefined;
}

// при регистрации и входе в систему не нужно отправлять заголовок X-Session-Id
export const IGNORE_SESSION_ID_ENDPOINTS = ['/v1/login', '/v1/users'];
