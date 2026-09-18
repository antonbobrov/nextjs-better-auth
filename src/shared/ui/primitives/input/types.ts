import type {
  ComponentType,
  HTMLInputTypeAttribute,
  ReactElement,
  Ref,
} from 'react';

import type { IComponent } from '@/types/Component';

export interface IInputProps extends IComponent {
  autoFocus?: boolean;
  inputLeftIcon?: ComponentType<IComponent>;
  inputRef?: Ref<HTMLInputElement>;
  inputRight?: ReactElement | null;
  max?: number | string;
  maxLength?: number;
  min?: number | string;
  name: string;
  onEnter?: () => void;
  placeholder?: string;
  required?: boolean;
  type: HTMLInputTypeAttribute;
}
