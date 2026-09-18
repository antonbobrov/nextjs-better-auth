'use client';

import { Ban, TrashBin } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { DeleteAccount } from '@/features/(account)/delete';
import { SelfSuspendAccount } from '@/features/(account)/self-suspend-account';
import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/ui/primitives/button';

export const AccountDanger = () => {
  const tDelete = useTranslations('account.delete');
  const tSuspend = useTranslations('account.suspend');
  const router = useRouter();

  const handleSignedOut = useEvent(() => {
    router.push(ROUTES.auth.signIn());
    router.refresh();
  });

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div className="grid gap-1">
          <p className="text-foreground text-sm font-medium">
            {tSuspend('title')}
          </p>

          <p className="text-muted text-sm">{tSuspend('description')}</p>
        </div>

        <SelfSuspendAccount onSuccess={handleSignedOut}>
          <Button className="w-full" icon={Ban} variant="danger">
            {tSuspend('title')}
          </Button>
        </SelfSuspendAccount>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-1">
          <p className="text-foreground text-sm font-medium">
            {tDelete('title')}
          </p>

          <p className="text-muted text-sm">{tDelete('description')}</p>
        </div>

        <DeleteAccount onSuccess={handleSignedOut}>
          <Button className="w-full" icon={TrashBin} variant="danger">
            {tDelete('title')}
          </Button>
        </DeleteAccount>
      </div>
    </div>
  );
};
