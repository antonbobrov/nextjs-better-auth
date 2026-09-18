'use client';

import { useTranslations } from 'next-intl';

import { useUserDetailsItems } from '@/features/(account)/hooks';
import { useSession } from '@/shared/providers/session/hooks';
import { InfoTable } from '@/ui/data/info-table';

export const AccountDetails = () => {
  const tAccount = useTranslations('account');

  const { user } = useSession();

  const items = useUserDetailsItems(user);

  return (
    <div className="grid gap-4">
      <p className="text-foreground text-sm font-medium">
        {tAccount('detailsHeading')}
      </p>

      {items && <InfoTable items={items} />}
    </div>
  );
};
