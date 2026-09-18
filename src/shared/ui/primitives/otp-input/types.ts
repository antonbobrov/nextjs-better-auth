import type { IComponent } from '@/types/Component';

export interface IOtpInputProps extends IComponent {
  autoFocus?: boolean;
  fullWidth?: boolean;
  isInvalid?: boolean;
  length?: number;
  name: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  value?: string;
}
