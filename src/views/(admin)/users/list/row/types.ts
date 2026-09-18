import type { TUser } from '@/lib/auth/types';

export interface IProps {
  isSelf: boolean;
  user: TUser;
}
