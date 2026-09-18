import type { TUser } from '@/lib/auth/types';

export interface IProps {
  currentUserId?: string;
  users: TUser[];
}
