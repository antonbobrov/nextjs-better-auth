import type { TActionChildren } from '@/types/Component';

export interface IProps {
  children: TActionChildren;
  email: string;
  onSuccess?: () => void;
  userId: string;
}
