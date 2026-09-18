'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { ShieldExclamation } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { DisableTwoFactor } from '@/features/(account)/disable-two-factor';
import { EnableTwoFactor } from '@/features/(account)/enable-two-factor';
import { GenerateBackupCodes } from '@/features/(account)/generate-backup-codes';
import { SetupTwoFactor } from '@/features/(account)/setup-two-factor';
import type { TTwoFactorSetup } from '@/features/(account)/setup-two-factor/types';
import { getTotpSecret } from '@/features/(account)/two-factor/utils';
import { useEvent } from '@/hooks';
import { useSession } from '@/shared/providers/session/hooks';
import { QrCode } from '@/ui/data/qr-code';
import { Button } from '@/ui/primitives/button';
import { CopyButton } from '@/ui/primitives/copy-button';

import { TwoFactorBackupCodes } from './backup-codes';

export const AccountTwoFactor: FC = () => {
  const t = useTranslations('account.twoFactor');
  const tFields = useTranslations('common.fields');

  const { user } = useSession();

  const [setup, setSetup] = useState<TTwoFactorSetup | null>(null);
  const [codes, setCodes] = useState<string[] | null>(null);

  const onCancel = useEvent(() => setSetup(null));

  if (user?.twoFactorEnabled) {
    return (
      <div className="grid gap-8">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <p className="text-foreground text-sm font-medium">{t('title')}</p>

            <p className="text-muted text-sm">{t('enabledDescription')}</p>
          </div>

          <DisableTwoFactor>
            <Button
              className="w-full"
              icon={ShieldExclamation}
              variant="danger"
            >
              {t('disable')}
            </Button>
          </DisableTwoFactor>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-1">
            <p className="text-foreground text-sm font-medium">
              {t('backupCodes')}
            </p>

            <p className="text-muted text-sm">{t('generateHint')}</p>
          </div>

          {codes ? (
            <TwoFactorBackupCodes codes={codes} />
          ) : (
            <GenerateBackupCodes onGenerated={setCodes} />
          )}
        </div>
      </div>
    );
  }

  if (setup) {
    const secret = getTotpSecret(setup.totpURI);

    return (
      <div className="grid gap-6">
        <div className="grid gap-1">
          <p className="text-foreground text-sm font-medium">
            {t('scanTitle')}
          </p>

          <p className="text-muted text-sm">{t('scanHint')}</p>
        </div>

        <div className="flex justify-center">
          <QrCode title={t('qrTitle')} value={setup.totpURI} />
        </div>

        {secret ? (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2">
            <p className="font-mono text-sm break-all text-black">{secret}</p>

            <CopyButton label={tFields('secret.label')} value={secret} />
          </div>
        ) : null}

        <SetupTwoFactor onCancel={onCancel} />

        <TwoFactorBackupCodes codes={setup.backupCodes} />
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <p className="text-foreground text-sm font-medium">{t('title')}</p>

        <p className="text-muted text-sm">{t('setupHint')}</p>
      </div>

      <EnableTwoFactor onEnabled={setSetup} />
    </div>
  );
};
