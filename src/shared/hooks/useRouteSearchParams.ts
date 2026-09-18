'use client';

import { useMemo, useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import { useEvent } from '@/hooks';
import { usePathname, useRouter } from '@/i18n/navigation';

import type z from 'zod';

function serializeParams<T extends Record<string, unknown>>(
  params: T,
  defaults: T,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === '') {
      continue;
    }

    if (Object.is(value, defaults[key])) {
      continue;
    }

    searchParams.set(key, String(value));
  }

  return searchParams;
}

export function useRouteSearchParams<
  TSchema extends z.ZodObject<z.ZodRawShape>,
>(schema: TSchema, pathname?: string) {
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const schemaRef = useRef(schema);
  schemaRef.current = schema;

  const path = pathname ?? currentPathname;

  const defaults = useMemo(
    () => schema.parse({}) as z.infer<TSchema>,
    [schema],
  );

  const params = useMemo(() => {
    const parsed = schemaRef.current.safeParse(
      Object.fromEntries(searchParams),
    );

    return (parsed.success ? parsed.data : defaults) as z.infer<TSchema>;
  }, [defaults, searchParams]);

  const setParams = useEvent((next: z.infer<TSchema>) => {
    const query = serializeParams(next, defaults).toString();

    router.push(query ? `${path}?${query}` : path);
  });

  const patchParams = useEvent((patch: Partial<z.infer<TSchema>>) => {
    setParams({
      ...params,
      ...patch,
    });
  });

  return {
    defaults,
    params,
    patchParams,
    setParams,
  };
}
