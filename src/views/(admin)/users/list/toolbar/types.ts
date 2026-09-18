import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  isRefreshing: boolean;
  isResetDisabled: boolean;
  onRefresh: () => void;
  onReset: () => void;
}
