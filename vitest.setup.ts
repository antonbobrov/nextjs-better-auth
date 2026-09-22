import { createElement, type ReactNode } from 'react';

import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string) =>
    `${namespace}.${key}`,
}));

vi.mock('@/ui/feedback/toast', () => ({
  toast: {
    success: vi.fn(),
    danger: vi.fn(),
  },
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  redirect: vi.fn(),
  useParams: vi.fn(() => ({})),
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children?: ReactNode;
    href: string;
  }) => createElement('a', { href, ...props }, children),
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  })),
}));
