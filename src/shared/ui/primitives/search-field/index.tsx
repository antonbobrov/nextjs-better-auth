'use client';

import { memo, useEffect, useRef, useState, type FC } from 'react';

import { Magnifier, Xmark } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

import {
  useDebouncedProp,
  useEvent,
  useEventListener,
  usePropState,
} from '@/hooks';
import { TextField } from '@/ui/primitives/text-field';
import { isBrowser } from '@/utils';

import type { IProps } from './types';

const DEFAULT_DEBOUNCE_MS = 300;

const Component: FC<IProps> = ({
  className = 'w-full gap-2',
  style,
  autoFocus,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  error,
  maxLength,
  mode = 'change',
  name,
  placeholder,
  value: valueProp = '',
  onSearchChange,
}) => {
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');

  const inputRef = useRef<HTMLInputElement>(null);
  const isSubmit = mode === 'submit';

  const [localValue, setLocalValue] = usePropState(valueProp);
  const [changeValue, setChangeValue] = useState('');
  const value = isSubmit ? localValue : changeValue;

  const debouncedChangeValue = useDebouncedProp(changeValue, debounceMs);
  const handleSearchChange = useEvent(onSearchChange);

  useEffect(() => {
    if (isSubmit) {
      return;
    }

    handleSearchChange(debouncedChangeValue);
  }, [debouncedChangeValue, handleSearchChange, isSubmit]);

  useEventListener(isBrowser ? document : null, 'keydown', (event) => {
    const key = event.key.toLowerCase();

    if ((event.ctrlKey || event.metaKey) && (key == 'f' || key == 'а')) {
      event.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  });

  const setValue = useEvent((next: string) => {
    const clipped = maxLength ? next.slice(0, maxLength) : next;

    if (isSubmit) {
      setLocalValue(clipped);

      return;
    }

    setChangeValue(clipped);
  });

  const commit = useEvent(() => {
    const next = maxLength ? value.slice(0, maxLength) : value;

    if (next === valueProp) {
      return;
    }

    handleSearchChange(next);
  });

  const clear = useEvent(() => {
    setValue('');

    if (isSubmit) {
      handleSearchChange('');
    }
  });

  return (
    <TextField
      className={className}
      style={style}
      type="text"
      autoFocus={autoFocus}
      error={error}
      inputLeftIcon={isSubmit ? undefined : Magnifier}
      inputRef={inputRef}
      inputRight={
        isSubmit ? (
          <>
            {value ? (
              <Button
                size="sm"
                type="button"
                aria-label={tActions('clear')}
                isIconOnly
                variant="ghost"
                onPress={clear}
              >
                <Xmark className="size-4" />
              </Button>
            ) : null}

            <Button
              size="sm"
              type="button"
              aria-label={tFields('search.label')}
              isIconOnly
              variant="ghost"
              onPress={commit}
            >
              <Magnifier className="size-4" />
            </Button>
          </>
        ) : undefined
      }
      label={tFields('search.label')}
      maxLength={maxLength}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={setValue}
      onClear={!isSubmit && value ? clear : undefined}
      onEnter={isSubmit ? commit : undefined}
    />
  );
};

Component.displayName = 'SearchField';

export const SearchField = memo(Component);
