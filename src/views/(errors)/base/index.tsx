'use client';

import { type FC } from 'react';

import { Typography } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

export const BaseError: FC<IProps> = ({
  code,
  description,
  nextHref,
  nextText,
  title,
  onNextClick,
}) => {
  const t = useTranslations('common.actions');

  const router = useRouter();

  const back = useEvent(() => router.back());

  const handleNext = useEvent(() => {
    if (nextHref) {
      router.push(nextHref);
    } else if (onNextClick) {
      onNextClick();
    }
  });

  return (
    <div className="min-h-svh py-8 px-4 flex h-full w-full flex-col items-center justify-center gap-3">
      {code && <Typography type="h1">{code}</Typography>}

      {title && <Typography type="h5">{title}</Typography>}

      {description && (
        <Typography type="body" align="center">
          {description}
        </Typography>
      )}

      <div className="mt-3 flex gap-3">
        <Button type="button" variant="outline" onPress={back}>
          {t('goBack')}
        </Button>

        {nextText && (
          <Button type="button" onPress={handleNext}>
            {nextText}
          </Button>
        )}
      </div>
    </div>
  );
};
