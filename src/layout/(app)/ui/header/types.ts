import type { TUser } from '@/lib/auth/types';
import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  user: TUser | null;
}
