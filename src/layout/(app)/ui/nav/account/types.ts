import type { TSession } from '@/lib/auth/types';
import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  isIconOnly?: boolean;
  session: TSession | null;
}
