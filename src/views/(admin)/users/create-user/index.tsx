'use client';

import { useTranslations } from 'next-intl';

import { CreateUserForm } from '@/features/(admin)/users/create-user-form';
import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';

export const AdminCreateUser = () => {
  const t = useTranslations('admin.create');
  const router = useRouter();

  const handleSuccess = useEvent((userId?: string) => {
    if (userId) {
      router.push(ROUTES.admin.user(userId));

      return;
    }

    router.push(ROUTES.admin.users.list);
  });

  return (
    <div className="grid xl:max-w-md gap-4">
      <div className="grid gap-1">
        <p className="text-foreground text-sm font-medium">{t('title')}</p>

        <p className="text-muted text-sm">{t('description')}</p>
      </div>

      <CreateUserForm onSuccess={handleSuccess} />
    </div>
  );
};
