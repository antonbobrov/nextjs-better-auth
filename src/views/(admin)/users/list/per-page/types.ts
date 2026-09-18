import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
}
