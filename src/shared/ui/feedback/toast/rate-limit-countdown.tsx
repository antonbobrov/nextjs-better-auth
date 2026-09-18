'use client';

import { memo, useEffect, useState, type FC } from 'react';

import { useTranslations } from 'next-intl';

interface IProps {
  seconds: number;
}

const Component: FC<IProps> = ({ seconds }) => {
  const t = useTranslations('errors');

  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.ceil(seconds)),
  );

  useEffect(() => {
    const endsAt = Date.now() + Math.max(0, seconds) * 1000;

    const tick = () => {
      setRemaining(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
    };

    tick();
    const id = window.setInterval(tick, 250);

    return () => window.clearInterval(id);
  }, [seconds]);

  if (remaining <= 0) {
    return <>{t('rateLimited')}</>;
  }

  return <>{t('rateLimitedWithTime', { retryIn: remaining })}</>;
};

Component.displayName = 'RateLimitCountdown';

export const RateLimitCountdown = memo(Component);
