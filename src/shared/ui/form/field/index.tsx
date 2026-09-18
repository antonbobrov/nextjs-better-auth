'use client';

import { memo, type FC } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { useEvent } from '@/hooks';
import { TextField } from '@/ui/primitives/text-field';
import type { TTextFieldProps } from '@/ui/primitives/text-field/types';

const Component: FC<TTextFieldProps> = ({
  type,
  name,
  required = true,
  ...props
}) => {
  const { getValues, trigger } = useFormContext();

  const isPassword = type === 'password';
  const isPasswordWithConfirm =
    isPassword && name === 'password' && 'confirmPassword' in getValues();

  const rules = required ? { required: true } : undefined;

  const { field, fieldState } = useController({ name, rules });

  const error = fieldState.error?.message?.toString();

  const handleChange = useEvent((value: string) => {
    field.onChange(value);

    if (isPasswordWithConfirm || name === 'confirmPassword') {
      trigger('confirmPassword');
    }
  });

  return (
    <TextField
      {...props}
      className="gap-2"
      type={type}
      error={error}
      inputRef={field.ref}
      name={field.name}
      value={typeof field.value === 'string' ? field.value : ''}
      onBlur={field.onBlur}
      onChange={handleChange}
    />
  );
};

Component.displayName = 'FormField';

export const FormField = memo(Component);
