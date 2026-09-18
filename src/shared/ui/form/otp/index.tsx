'use client';

import { memo, type FC } from 'react';

import { FieldError, Label } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useController } from 'react-hook-form';

import { useEvent } from '@/hooks';
import { parseZodErrorMessage } from '@/lib/schema/utils';
import { OtpInput } from '@/ui/primitives/otp-input';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  autoFocus,
  fullWidth,
  label,
  name,
  onComplete,
}) => {
  const { field, fieldState } = useController({ name });

  const error = fieldState.error?.message?.toString();
  const value = typeof field.value === 'string' ? field.value : '';

  const translations = useTranslations('errors');
  const errorMessage = parseZodErrorMessage({ message: error, translations });

  const handleChange = useEvent((next: string) => {
    field.onChange(next);
  });

  return (
    <div className={fullWidth ? 'grid w-full gap-2' : 'grid gap-2'}>
      <Label>{label}</Label>

      <OtpInput
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        isInvalid={Boolean(error)}
        name={field.name}
        value={value}
        onChange={handleChange}
        onComplete={onComplete}
      />

      {errorMessage ? (
        <FieldError className="p-0">{errorMessage}</FieldError>
      ) : null}
    </div>
  );
};

Component.displayName = 'FormOtp';

export const FormOtp = memo(Component);
