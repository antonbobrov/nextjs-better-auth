'use client';

import { memo, type FC, type Key } from 'react';

import { Label, ListBox, Select as HeroUiSelect } from '@heroui/react';

import { useEvent } from '@/hooks';
import { cn } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  style,
  'aria-label': ariaLabel,
  fullWidth = false,
  isDisabled,
  label,
  options,
  value,
  onChange,
}) => {
  const handleChange = useEvent((next: Key | Key[] | null) => {
    if (next == null || Array.isArray(next)) {
      return;
    }

    onChange(String(next));
  });

  return (
    <HeroUiSelect
      className={cn('gap-2', className)}
      style={style}
      aria-label={label ? undefined : ariaLabel}
      fullWidth={fullWidth}
      isDisabled={isDisabled}
      value={value}
      onChange={handleChange}
    >
      {label && <Label className="truncate">{label}</Label>}

      <HeroUiSelect.Trigger>
        <HeroUiSelect.Value className="truncate" />

        <HeroUiSelect.Indicator />
      </HeroUiSelect.Trigger>

      <HeroUiSelect.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.id}
              className="active:transform-none! data-[pressed=true]:transform-none!"
              id={option.id}
              textValue={option.label}
            >
              {option.label}

              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </HeroUiSelect.Popover>
    </HeroUiSelect>
  );
};

Component.displayName = 'Select';

export const Select = memo(Component);
