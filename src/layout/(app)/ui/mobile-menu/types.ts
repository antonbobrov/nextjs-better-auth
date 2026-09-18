import type { TSession, TUser } from '@/lib/auth/types';
import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  session: TSession | null;
  user: TUser;
}
