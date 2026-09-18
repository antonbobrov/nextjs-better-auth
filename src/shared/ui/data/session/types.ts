import type { ReactNode } from 'react';

import type { TSession } from '@/lib/auth/types';

export interface IProps {
  children?: ReactNode;
  isCurrent?: boolean;
  session: TSession;
}
