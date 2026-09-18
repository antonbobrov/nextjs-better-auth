import type { TApiResponse, TRunApiReturns } from '@/types/Api';

interface IParams {
  body?: Record<string, any>;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST';
  signal?: AbortSignal;
  url: string;
}

export async function runApi<T>({
  body,
  method,
  signal,
  url,
}: IParams): Promise<TRunApiReturns<T>> {
  const hasBody = body !== undefined;

  const req = await fetch(url, {
    body: hasBody ? JSON.stringify(body) : undefined,
    headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
    method,
    signal,
  });

  const text = await req.text();

  if (!text) {
    return {
      ok: req.ok,
      status: req.status,
    };
  }

  try {
    const res = JSON.parse(text) as TApiResponse<T>;

    return {
      ...res,
      ok: req.ok,
      status: req.status,
    };
  } catch {
    return {
      code: 'invalidResponse',
      ok: false,
      status: req.status,
    };
  }
}
