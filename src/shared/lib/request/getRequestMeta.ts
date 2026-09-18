import 'server-only';

function resolveHeaders(request?: Request | Headers | null) {
  if (request instanceof Request) {
    return request.headers;
  }

  if (request instanceof Headers) {
    return request;
  }

  return null;
}

export function getRequestMeta(request?: Request | Headers | null) {
  const headers = resolveHeaders(request);
  const forwarded = headers?.get('x-forwarded-for');

  return {
    ipAddress:
      forwarded?.split(',')[0]?.trim() || headers?.get('x-real-ip') || null,
    userAgent: headers?.get('user-agent') || null,
  };
}
