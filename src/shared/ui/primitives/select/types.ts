import type { IComponent } from '@/types/Component';

export interface IOption {
  id: string;
  label: string;
}

export interface ISelectProps extends IComponent {
  'aria-label'?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
  label?: string;
  onChange: (value: string) => void;
  options: readonly IOption[];
  value: string;
}
