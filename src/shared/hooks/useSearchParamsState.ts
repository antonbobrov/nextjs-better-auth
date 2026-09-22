'use client';

import { useMemo, useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/navigation';

import { omitDefaultSearchParams } from '../utils/data';

import { useEvent } from './useEvent';

import type z from 'zod';

export function useSearchParamsState<
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
    const query = omitDefaultSearchParams(next, defaults).toString();

    router.push(query ? `${path}?${query}` : path);

    return query;
  });

  const patchParams = useEvent((patch: Partial<z.infer<TSchema>>) =>
    setParams({
      ...params,
      ...patch,
    }),
  );

  return {
    defaults,
    params,
    patchParams,
    setParams,
  };
}
