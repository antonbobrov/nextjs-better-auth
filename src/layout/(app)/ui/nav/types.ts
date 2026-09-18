import type { TSession, TUser } from '@/lib/auth/types';
import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  isIconOnly?: boolean;
  onToggleCollapse?: () => void;
  session: TSession | null;
  user: TUser;
}
