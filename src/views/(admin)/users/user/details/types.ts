import type { TUser } from '@/lib/auth/types';

export interface IProps {
  isError: boolean;
  isLoading: boolean;
  user: TUser | null;
}
