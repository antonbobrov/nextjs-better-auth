'use client';

import { memo, type FC } from 'react';

import { Table } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { SIGN_UP } from '@/shared/config/auth';

import { AdminUsersRow } from '../row';

import type { IProps } from './types';

const Component: FC<IProps> = ({ currentUserId, users }) => {
  const t = useTranslations('admin.list');
  const tAccount = useTranslations('account');
  const tFields = useTranslations('common.fields');
  const tMenu = useTranslations('layout.menu');

  return (
    <Table.ScrollContainer>
      <Table.Content className="w-full min-w-225" aria-label={tMenu('users')}>
        <Table.Header>
          <Table.Column className="w-[7%]">{tFields('id.label')}</Table.Column>

          <Table.Column className="w-[15%]" isRowHeader>
            {tFields('name.label')}
          </Table.Column>

          <Table.Column className="w-[10%]">
            {tFields('role.label')}
          </Table.Column>

          {SIGN_UP.requireVerification && (
            <Table.Column className="w-max whitespace-nowrap">
              {tAccount('verified')}
            </Table.Column>
          )}

          <Table.Column className="w-[24%]">
            {tFields('email.label')}
          </Table.Column>

          <Table.Column className="w-max whitespace-nowrap">
            {tAccount('banned')}
          </Table.Column>

          <Table.Column className="w-max whitespace-nowrap">
            {t('suspended')}
          </Table.Column>

          <Table.Column className="w-[20%] text-end">
            {t('actions')}
          </Table.Column>
        </Table.Header>

        <Table.Body>
          {users.map((user) => (
            <AdminUsersRow
              key={user.id}
              isSelf={user.id === currentUserId}
              user={user}
            />
          ))}
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  );
};

Component.displayName = 'AdminUsersTableContent';

export const AdminUsersTableContent = memo(Component);
