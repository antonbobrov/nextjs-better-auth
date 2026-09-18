'use client';

import { memo, type FC } from 'react';

import {
  ArrowRightToSquare,
  Ban,
  BanDashed,
  Eye,
  TrashBin,
} from '@gravity-ui/icons';
import { Avatar, Table } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { BanUser } from '@/features/(admin)/users/ban-user';
import { DeleteUser } from '@/features/(admin)/users/delete-user';
import { ImpersonateUser } from '@/features/(admin)/users/impersonate-user';
import { UnbanUser } from '@/features/(admin)/users/unban-user';
import { SIGN_UP } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';
import { ActionButton } from '@/ui/primitives/action-button';
import { BooleanChip } from '@/ui/primitives/boolean-chip';
import { CopyButton } from '@/ui/primitives/copy-button';
import { toUserRole } from '@/utils';

import type { IProps } from './types';

const viewIcon = <Eye className="size-4" />;
const impersonateIcon = <ArrowRightToSquare className="size-4" />;
const unbanIcon = <BanDashed className="size-4" />;
const banIcon = <Ban className="size-4" />;
const deleteIcon = <TrashBin className="size-4" />;

const Component: FC<IProps> = ({ isSelf, user }) => {
  const tActions = useTranslations('common.actions');
  const tDanger = useTranslations('admin.danger');
  const tFields = useTranslations('common.fields');
  const tImpersonate = useTranslations('admin.impersonate');

  return (
    <Table.Row id={user.id}>
      <Table.Cell>
        <CopyButton label={tFields('id.label')} value={user.id} />
      </Table.Cell>

      <Table.Cell className="max-w-48">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="shrink-0" size="sm">
            <Avatar.Image
              src={user.image ?? `/api/user/${user.id}/avatar`}
              alt={user.name}
            />
          </Avatar>

          <span className="min-w-0 truncate text-s">{user.name}</span>
        </div>
      </Table.Cell>

      <Table.Cell>{toUserRole(user.role)}</Table.Cell>

      {SIGN_UP.requireVerification && (
        <Table.Cell className="whitespace-nowrap">
          <BooleanChip color="success" value={user.emailVerified} />
        </Table.Cell>
      )}

      <Table.Cell className="max-w-72">
        <CopyButton
          className="block w-full truncate text-start"
          label={tFields('email.label')}
          value={user.email}
        >
          {user.email}
        </CopyButton>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        <BooleanChip color="danger" value={Boolean(user.banned)} />
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        <BooleanChip color="danger" value={Boolean(user.selfSuspended)} />
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            className="shrink-0"
            href={ROUTES.admin.user(user.id)}
            label={tActions('show')}
          >
            {viewIcon}
          </ActionButton>

          {!isSelf && (
            <>
              <ImpersonateUser email={user.email} userId={user.id}>
                <ActionButton
                  className="shrink-0"
                  label={tImpersonate('title')}
                >
                  {impersonateIcon}
                </ActionButton>
              </ImpersonateUser>

              {user.banned ? (
                <UnbanUser email={user.email} userId={user.id}>
                  <ActionButton
                    className="shrink-0"
                    label={tDanger('unban.submit')}
                  >
                    {unbanIcon}
                  </ActionButton>
                </UnbanUser>
              ) : (
                <BanUser email={user.email} userId={user.id}>
                  <ActionButton
                    className="shrink-0"
                    label={tDanger('ban.submit')}
                  >
                    {banIcon}
                  </ActionButton>
                </BanUser>
              )}

              <DeleteUser email={user.email} userId={user.id}>
                <ActionButton
                  className="shrink-0"
                  label={tActions('delete')}
                  variant="danger-soft"
                >
                  {deleteIcon}
                </ActionButton>
              </DeleteUser>
            </>
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

Component.displayName = 'AdminUsersRow';

export const AdminUsersRow = memo(Component);
