import type { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';

import { BaseError } from '../base';

export const NotFound: FC = async () => {
  const t = await getTranslations('notFound');

  return (
    <BaseError
      code="404"
      description={t('description')}
      nextHref={ROUTES.home}
      nextText={t('backHome')}
      title={t('title')}
    />
  );
};
