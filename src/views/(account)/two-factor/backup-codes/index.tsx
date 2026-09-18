'use client';

import { memo, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { CopyButton } from '@/ui/primitives/copy-button';

import type { IProps } from './types';

const Component: FC<IProps> = ({ codes }) => {
  const t = useTranslations('account.twoFactor');

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-foreground text-sm font-medium">
          {t('backupCodes')}
        </p>

        <CopyButton
          className="shrink-0"
          label={t('backupCodes')}
          value={codes.join('\n')}
        />
      </div>

      <p className="text-muted text-sm">{t('saveCodesHint')}</p>

      <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
        {codes.map((code) => (
          <li
            key={code}
            className="bg-surface rounded-md px-3 py-2 text-center"
          >
            {code}
          </li>
        ))}
      </ul>
    </div>
  );
};

Component.displayName = 'TwoFactorBackupCodes';

export const TwoFactorBackupCodes = memo(Component);
