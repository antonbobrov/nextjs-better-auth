import { useSearchParams } from 'next/navigation';

import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import z from 'zod';

import { useSearchParamsState } from './useSearchParamsState';

const { push } = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  usePathname: vi.fn(() => '/users'),
  useRouter: vi.fn(() => ({
    push,
  })),
}));

function mockSearch(query = '') {
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams(query) as ReturnType<typeof useSearchParams>,
  );
}

export const schema = z.object({
  banned: z
    .union([
      z.boolean(),
      z.enum(['true', 'false']).transform((v) => v === 'true'),
      z.literal('').transform(() => null),
      z.null(),
    ])
    .default(null)
    .catch(null),
  createdWithin: z.enum(['day', 'week', 'month']).nullable().catch(null),
  page: z.coerce.number().int().min(1).default(1).catch(1),
  pageSize: z.coerce
    .number()
    .int()
    .transform((value) => Math.min(Math.max(value, 1), 100))
    .default(50)
    .catch(1),
  verified: z
    .union([
      z.boolean(),
      z.enum(['true', 'false']).transform((v) => v === 'true'),
      z.literal('').transform(() => null),
      z.null(),
    ])
    .default(null)
    .catch(null),
});

test('useSearchParamsState default', () => {
  mockSearch('');

  const { result } = renderHook(() => useSearchParamsState(schema));

  expect(result.current.defaults).toEqual({
    banned: null,
    createdWithin: null,
    page: 1,
    pageSize: 50,
    verified: null,
  });

  expect(result.current.params).toEqual({
    banned: null,
    createdWithin: null,
    page: 1,
    pageSize: 50,
    verified: null,
  });
});

test('useSearchParamsState dirty', () => {
  mockSearch('verified=&banned=true&createdWithin=day');

  const { result } = renderHook(() => useSearchParamsState(schema));

  expect(result.current.params).toEqual({
    banned: true,
    createdWithin: 'day',
    page: 1,
    pageSize: 50,
    verified: null,
  });
});

test('useSearchParamsState invalid', () => {
  mockSearch('verified=hello&banned=falsy&createdWithin=invalid&pageSize=2');

  const { result } = renderHook(() => useSearchParamsState(schema));

  expect(result.current.params).toEqual({
    banned: null,
    createdWithin: null,
    page: 1,
    pageSize: 2,
    verified: null,
  });
});

test('useSearchParamsState parse failure', () => {
  const strict = z.object({
    status: z.enum(['a', 'b']).default('a'),
  });

  mockSearch('status=nope');

  const { result } = renderHook(() => useSearchParamsState(strict));

  expect(result.current.params).toEqual({ status: 'a' });
});

test('useSearchParamsState set/patch', () => {
  mockSearch();
  push.mockClear();

  const { rerender, result } = renderHook(() => useSearchParamsState(schema));

  expect(
    result.current.setParams({
      banned: true,
      createdWithin: 'month',
      page: 2,
      pageSize: 200,
      verified: null,
    }),
  ).toEqual('banned=true&createdWithin=month&page=2&pageSize=200');

  expect(push).toHaveBeenCalledWith(
    '/users?banned=true&createdWithin=month&page=2&pageSize=200',
  );

  mockSearch('banned=true&createdWithin=month&page=2&pageSize=200');
  rerender();

  expect(result.current.params).toEqual({
    banned: true,
    createdWithin: 'month',
    page: 2,
    pageSize: 100,
    verified: null,
  });

  expect(
    result.current.patchParams({
      pageSize: 300,
      verified: null,
    }),
  ).toEqual('banned=true&createdWithin=month&page=2&pageSize=300');

  mockSearch('banned=true&createdWithin=month&page=2&pageSize=300');
  rerender();

  expect(result.current.params).toEqual({
    banned: true,
    createdWithin: 'month',
    page: 2,
    pageSize: 100,
    verified: null,
  });

  expect(
    result.current.patchParams({
      verified: 'hello' as never,
    }),
  ).toEqual(
    'banned=true&createdWithin=month&page=2&pageSize=100&verified=hello',
  );

  mockSearch(
    'banned=true&createdWithin=month&page=2&pageSize=100&verified=hello',
  );
  rerender();

  expect(result.current.params).toEqual({
    banned: true,
    createdWithin: 'month',
    page: 2,
    pageSize: 100,
    verified: null,
  });
});

test('useSearchParamsState set defaults clears query', () => {
  mockSearch('page=2');
  push.mockClear();

  const { result } = renderHook(() => useSearchParamsState(schema));

  expect(
    result.current.setParams({
      banned: null,
      createdWithin: null,
      page: 1,
      pageSize: 50,
      verified: null,
    }),
  ).toEqual('');

  expect(push).toHaveBeenCalledWith('/users');
});

test('useSearchParamsState custom pathname', () => {
  mockSearch();
  push.mockClear();

  const { result } = renderHook(() =>
    useSearchParamsState(schema, '/admin/users'),
  );

  result.current.setParams({
    banned: true,
    createdWithin: null,
    page: 1,
    pageSize: 50,
    verified: null,
  });

  expect(push).toHaveBeenCalledWith('/admin/users?banned=true');
});
