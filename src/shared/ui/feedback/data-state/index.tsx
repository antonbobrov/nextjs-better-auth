/* eslint-disable sonarjs/function-return-type */
'use client';

import type { FC } from 'react';

import { Magnifier, TriangleExclamation } from '@gravity-ui/icons';
import { Card, Spinner } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils';

import type { IProps } from './types';

export const DataState: FC<IProps> = ({
  className,
  style,
  children,
  error,
  isEmpty,
  isLoading,
}) => {
  const t = useTranslations('errors');

  if (isLoading || error || isEmpty) {
    return (
      <Card
        className={cn('items-center justify-center gap-2 p-5', className)}
        style={style}
      >
        <Card.Content className="flex flex-col items-center justify-center gap-2">
          {isLoading && <Spinner />}

          {!isLoading && error && (
            <>
              <TriangleExclamation className="size-5 text-danger" />

              <span className="text-sm text-muted">{t('unableToLoad')}</span>
            </>
          )}

          {!isLoading && !error && isEmpty && (
            <>
              <Magnifier className="size-5 text-muted" />

              <span className="text-sm text-muted">{t('noResults')}</span>
            </>
          )}
        </Card.Content>
      </Card>
    );
  }

  return children;
};
