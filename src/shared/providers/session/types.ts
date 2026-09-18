import type { PropsWithChildren } from 'react';

import type { TSession, TUser } from '@/lib/auth/types';

export type TSessionProviderContext = {
  session: TSession | null;
  user: TUser | null;
};

export interface IProps extends PropsWithChildren, TSessionProviderContext {}
