'use client';

import '@/setup';

import type { FC, PropsWithChildren } from 'react';

import NextTopLoader from 'nextjs-toploader';

import { QueryProvider } from '@/providers';
import { Toast } from '@/ui/feedback/toast';

export const SetupClient: FC<PropsWithChildren> = ({ children }) => (
  <QueryProvider>
    <NextTopLoader color="var(--accent)" showSpinner={false} />

    <Toast.Provider />

    {children}
  </QueryProvider>
);
