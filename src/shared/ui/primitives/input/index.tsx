'use client';

import { type FC, type KeyboardEvent } from 'react';

import { InputGroup } from '@heroui/react';

import { useEvent } from '@/hooks';

import type { IInputProps } from './types';

export const Input: FC<IInputProps> = ({
  className,
  style,
  inputLeftIcon: LeftIcon,
  inputRef,
  inputRight,
  onEnter,
  ...props
}) => {
  const handleKeyDown = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || !onEnter) {
      return;
    }

    event.preventDefault();
    onEnter();
  });

  return (
    <InputGroup className={className} style={style} variant="primary">
      {LeftIcon && (
        <InputGroup.Prefix>
          <LeftIcon className="size-4 text-muted" />
        </InputGroup.Prefix>
      )}

      <InputGroup.Input
        {...props}
        ref={inputRef}
        className="w-full"
        onKeyDown={handleKeyDown}
      />

      {inputRight && (
        <InputGroup.Suffix className="pe-0">{inputRight}</InputGroup.Suffix>
      )}
    </InputGroup>
  );
};
