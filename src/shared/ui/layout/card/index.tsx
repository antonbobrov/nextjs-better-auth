'use client';

import { type MouseEventHandler, type FC } from 'react';

import { Card as HeroUi } from '@heroui/react';

import { useAutoScroll, useEvent } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { TagName } from '@/ui/primitives/tag-name';
import { cn } from '@/utils';

import { CardHeader } from './header';

import type { IProps } from './types';

export const Card: FC<IProps> = ({
  href,
  actions,
  autoScroll,
  children,
  description,
  footer,
  highlighted,
  icon: Icon,
  title,
  truncateTitle,
  onClick,
}) => {
  const rootRef = useAutoScroll<HTMLElement>(autoScroll);

  const isInteractive = Boolean(onClick || href);
  const tagName = onClick ? 'button' : 'div';

  const handleActionClick: MouseEventHandler<HTMLDivElement> = useEvent(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
    },
  );

  return (
    <TagName
      ref={rootRef}
      className={cn(
        'w-full outline-none text-start',
        isInteractive &&
          'cursor-pointer rounded-3xl focus-visible:ring-2 focus-visible:ring-focus has-focus-visible:ring-2 has-focus-visible:ring-focus',
      )}
      tagName={tagName}
      type={tagName === 'button' ? 'button' : undefined}
      onClick={onClick}
    >
      <HeroUi
        className={cn(
          'relative gap-4 overflow-hidden p-5 transition-colors',
          highlighted && 'bg-warning/15',
        )}
      >
        <CardHeader
          href={href}
          actions={actions}
          description={description}
          icon={Icon}
          title={title}
          truncateTitle={truncateTitle}
          onActionClick={onClick ? handleActionClick : undefined}
        />

        <HeroUi.Content>{children}</HeroUi.Content>

        {footer ? (
          <HeroUi.Footer className="w-full text-center text-sm text-muted">
            {footer}
          </HeroUi.Footer>
        ) : null}

        {href ? (
          <Link
            className="absolute inset-0 z-0 rounded-[inherit] outline-none"
            href={href}
            aria-label={title}
          />
        ) : null}
      </HeroUi>
    </TagName>
  );
};
