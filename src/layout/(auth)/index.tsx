import type { FC, PropsWithChildren } from 'react';

import { LocaleSelect } from '@/ui/navigation/locale-select';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex min-h-svh items-center justify-center px-4 py-8">
    <div className="w-full max-w-100">
      {children}

      <LocaleSelect className="mx-auto mt-4" />
    </div>
  </div>
);
