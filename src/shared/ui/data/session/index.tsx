'use client';

import { memo, type FC } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { useParseUserAgent } from '@/hooks';
import { BROWSER_ICONS, OS_ICONS } from '@/shared/svg/user-agent';
import { formatDateTime } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({ children, isCurrent, session }) => {
  const locale = useLocale();

  const t = useTranslations('account.session');

  const ipAddress = session.ipAddress || t('unknownIp');
  const lastActive = formatDateTime(session.updatedAt, locale);

  const agent = useParseUserAgent(session.userAgent);

  const BROWSER =
    BROWSER_ICONS[agent.browser?.toLowerCase() || 'unknown'] ??
    BROWSER_ICONS.unknown;

  const OS = OS_ICONS[agent.os?.toLowerCase() || 'unknown'] ?? OS_ICONS.unknown;

  return (
    <div className="bg-surface shadow-surface flex flex-col gap-2 overflow-hidden rounded-3xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-foreground flex min-w-0 items-center gap-2 text-sm font-medium leading-6">
            {BROWSER({
              className: 'size-4 shrink-0 text-muted',
              'aria-hidden': true,
            })}

            <span className="truncate">
              {agent.browser ?? t('unknownBrowser')}
            </span>
          </p>

          <p className="text-foreground flex min-w-0 items-center gap-2 text-sm font-medium leading-6">
            {OS({
              className: 'size-4 shrink-0 text-muted',
              'aria-hidden': true,
            })}

            <span className="truncate">{agent.os ?? t('unknownDevice')}</span>
          </p>
        </div>

        {isCurrent && (
          <span className="text-muted shrink-0 text-xs font-medium">
            {t('current')}
          </span>
        )}

        {children && <div className="shrink-0">{children}</div>}
      </div>

      <p className="text-muted truncate text-sm leading-5">{ipAddress}</p>

      <p className="text-muted truncate text-sm leading-5">{lastActive}</p>
    </div>
  );
};

Component.displayName = 'Session';

export const Session = memo(Component);
