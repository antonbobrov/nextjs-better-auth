import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  autoFocus?: boolean;
  debounceMs?: number;
  error?: string | null;
  maxLength?: number;
  mode?: 'change' | 'submit';
  name: string;
  onSearchChange: (search: string) => void;
  placeholder: string;
  value?: string;
}
