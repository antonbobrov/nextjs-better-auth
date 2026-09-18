'use client';

import { memo, type FC } from 'react';

import { Description, Switch as HeroUiSwitch } from '@heroui/react';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  children,
  description,
  isSelected,
  onChange,
}) => (
  <HeroUiSwitch isSelected={isSelected} onChange={onChange}>
    <HeroUiSwitch.Content>
      <HeroUiSwitch.Control>
        <HeroUiSwitch.Thumb />
      </HeroUiSwitch.Control>

      {children}
    </HeroUiSwitch.Content>

    {description && <Description>{description}</Description>}
  </HeroUiSwitch>
);

Component.displayName = 'Switch';

export const Switch = memo(Component);
