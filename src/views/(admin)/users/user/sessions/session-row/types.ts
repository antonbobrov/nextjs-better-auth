import type { TSession } from '@/lib/auth/types';

export interface IProps {
  session: TSession;
  userId: string;
}
