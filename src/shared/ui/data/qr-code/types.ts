import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  size?: number;
  title?: string;
  value: string;
}
