'use client';

import { memo, type FC } from 'react';

import { ChevronDown } from '@gravity-ui/icons';
import { Accordion } from '@heroui/react';

import { cn } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({ className, style, children, title }) => (
  <Accordion
    className={cn(
      'overflow-hidden rounded-field bg-field text-field-foreground shadow-field',
      className,
    )}
    style={style}
    hideSeparator
  >
    <Accordion.Item>
      <Accordion.Heading>
        <Accordion.Trigger className="min-h-9 rounded-none px-3 py-2 text-base sm:text-sm">
          {title}

          <Accordion.Indicator>
            <ChevronDown className="size-4 text-muted" />
          </Accordion.Indicator>
        </Accordion.Trigger>
      </Accordion.Heading>

      <Accordion.Panel>
        <Accordion.Body className="px-4 pt-2 pb-4">{children}</Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

Component.displayName = 'SurfaceAccordion';

export const SurfaceAccordion = memo(Component);
