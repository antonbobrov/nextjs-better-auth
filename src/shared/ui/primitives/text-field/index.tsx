'use client';

import { memo, type FC } from 'react';

import { Xmark } from '@gravity-ui/icons';
import {
  Button,
  FieldError,
  Label,
  TextField as HeroUiTextField,
} from '@heroui/react';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { parseZodErrorMessage } from '@/lib/schema/utils';

import { Input } from '../input';
import { PasswordInput } from '../password-input';

import type { TTextFieldProps } from './types';

const Component: FC<TTextFieldProps> = ({
  className,
  style,
  type,
  autoFocus,
  error,
  inputRef,
  inputRight: inputRightProp,
  label,
  name,
  required,
  right,
  value,
  onBlur,
  onChange,
  onClear,
  ...props
}) => {
  const t = useTranslations('common.actions');

  const handleClear = useEvent(onClear);

  const translations = useTranslations('errors');
  const errorMessage = parseZodErrorMessage({ message: error, translations });

  const inputRight =
    inputRightProp ||
    (onClear && value ? (
      <Button
        size="sm"
        type="button"
        aria-label={t('clear')}
        data-testid="clear-button"
        isIconOnly
        variant="ghost"
        onPress={handleClear}
      >
        <Xmark className="size-4" />
      </Button>
    ) : null);

  return (
    <HeroUiTextField
      className={className}
      style={style}
      autoFocus={autoFocus}
      fullWidth={false}
      isInvalid={Boolean(error)}
      isRequired={required}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    >
      <div className="flex justify-between">
        <Label data-testid="label">{label}</Label>

        {right && <p className="label text-muted">{right}</p>}
      </div>

      {type === 'password' ? (
        <PasswordInput
          {...props}
          inputRef={inputRef}
          inputRight={inputRight}
          name={name}
        />
      ) : (
        <Input
          {...props}
          type={type}
          inputRef={inputRef}
          inputRight={inputRight}
          name={name}
        />
      )}

      {errorMessage ? (
        <FieldError className="p-0" data-testid="error">
          {errorMessage}
        </FieldError>
      ) : null}
    </HeroUiTextField>
  );
};

Component.displayName = 'TextField';

export const TextField = memo(Component);
