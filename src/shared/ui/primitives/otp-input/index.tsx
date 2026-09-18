'use client';

import { Fragment, memo, type FC } from 'react';

import { InputOTP, REGEXP_ONLY_DIGITS } from '@heroui/react';

import { TWO_FACTOR } from '@/shared/config/auth';
import { cn } from '@/utils';

import { createOtpGroups } from './utils';

import type { IOtpInputProps } from './types';

const transformPaste = (pasted: string) => pasted.replace(/\D/g, '');

const Component: FC<IOtpInputProps> = ({
  className,
  style,
  autoFocus,
  fullWidth,
  isInvalid,
  length = TWO_FACTOR.digits,
  name,
  value = '',
  onChange,
  onComplete,
}) => {
  const groups = createOtpGroups(length);
  const groupClassName = fullWidth ? 'flex-1' : undefined;

  return (
    <InputOTP
      className={cn(fullWidth ? 'w-full' : 'w-fit', className)}
      style={style}
      autoFocus={autoFocus}
      inputMode="numeric"
      isInvalid={isInvalid}
      maxLength={length}
      name={name}
      pasteTransformer={transformPaste}
      pattern={REGEXP_ONLY_DIGITS}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
    >
      {groups.map((slotIndexes) => (
        <Fragment key={slotIndexes[0]}>
          {slotIndexes[0] > 0 ? <InputOTP.Separator /> : null}

          <InputOTP.Group className={groupClassName}>
            {slotIndexes.map((slotIndex) => (
              <InputOTP.Slot key={slotIndex} index={slotIndex} />
            ))}
          </InputOTP.Group>
        </Fragment>
      ))}
    </InputOTP>
  );
};

Component.displayName = 'OtpInput';

export const OtpInput = memo(Component);
