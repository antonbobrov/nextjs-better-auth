'use client';

import type { FC } from 'react';

import { Lock, Shield } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { SetUserPasswordForm } from '@/features/(admin)/users/set-user-password-form';
import { SetUserRole } from '@/features/(admin)/users/set-user-role';
import { useAdminUser } from '@/features/(admin)/users/user-details/hooks';
import { useSession } from '@/shared/providers/session/hooks';
import { Card } from '@/ui/layout/card';

import { AdminUserActions } from './actions';
import { AdminUserDetails } from './details';
import { AdminUserSessions } from './sessions';

import type { IProps } from './types';

export const AdminUser: FC<IProps> = ({ id }) => {
  const tPassword = useTranslations('admin.password');
  const tRole = useTranslations('admin.role');

  const { user: currentUser } = useSession();
  const { isError, isLoading, user } = useAdminUser(id);

  const isSelf = currentUser?.id === id;

  return (
    <div className="grid w-full xl:max-w-4xl gap-6">
      <AdminUserDetails isError={isError} isLoading={isLoading} user={user} />

      {user && !isSelf && (
        <Card
          description={tRole('description')}
          icon={Shield}
          title={tRole('title')}
        >
          <SetUserRole user={user} />
        </Card>
      )}

      <Card
        description={tPassword('description')}
        icon={Lock}
        title={tPassword('title')}
      >
        <SetUserPasswordForm userId={id} />
      </Card>

      {user && !isSelf && <AdminUserActions user={user} />}

      {user && !isSelf && <AdminUserSessions userId={id} />}
    </div>
  );
};
