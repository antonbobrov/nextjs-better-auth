'use client';

import type { FC } from 'react';

import {
  ArrowRightToSquare,
  Ban,
  BanDashed,
  TrashBin,
  TriangleExclamation,
} from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { BanUser } from '@/features/(admin)/users/ban-user';
import { DeleteUser } from '@/features/(admin)/users/delete-user';
import { ImpersonateUser } from '@/features/(admin)/users/impersonate-user';
import { UnbanUser } from '@/features/(admin)/users/unban-user';
import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/ui/layout/card';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

export const AdminUserActions: FC<IProps> = ({ user }) => {
  const tActions = useTranslations('common.actions');
  const tDanger = useTranslations('admin.danger');
  const tImpersonate = useTranslations('admin.impersonate');
  const router = useRouter();

  const handleDeleted = useEvent(() => {
    router.push(ROUTES.admin.users.list);
  });

  return (
    <>
      <Card
        description={tImpersonate('description')}
        icon={ArrowRightToSquare}
        title={tImpersonate('title')}
      >
        <ImpersonateUser email={user.email} userId={user.id}>
          <Button
            className="w-full"
            icon={ArrowRightToSquare}
            variant="secondary"
          >
            {tImpersonate('title')}
          </Button>
        </ImpersonateUser>
      </Card>

      <Card
        description={tDanger('description')}
        icon={TriangleExclamation}
        title={tDanger('title')}
      >
        <div className="grid grid-cols-2 gap-3">
          {user.banned ? (
            <UnbanUser email={user.email} userId={user.id}>
              <Button className="w-full" icon={BanDashed} variant="primary">
                {tDanger('unban.submit')}
              </Button>
            </UnbanUser>
          ) : (
            <BanUser email={user.email} userId={user.id}>
              <Button className="w-full" icon={Ban} variant="danger">
                {tDanger('ban.submit')}
              </Button>
            </BanUser>
          )}

          <DeleteUser
            email={user.email}
            userId={user.id}
            onSuccess={handleDeleted}
          >
            <Button className="w-full" icon={TrashBin} variant="danger">
              {tActions('delete')}
            </Button>
          </DeleteUser>
        </div>
      </Card>
    </>
  );
};
