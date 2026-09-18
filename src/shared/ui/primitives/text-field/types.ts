import type { ReactNode } from 'react';

import type { IInputProps } from '../input/types';

export type TTextFieldProps = IInputProps & {
  error?: string | null;
  label: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  right?: ReactNode;
  value?: string;
};
