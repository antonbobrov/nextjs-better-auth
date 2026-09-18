import type { TClickChildren } from '@/types/Component';

export interface IProps {
  children: TClickChildren;
  onSuccess?: () => void;
}
