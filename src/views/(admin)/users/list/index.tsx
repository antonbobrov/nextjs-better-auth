'use client';

import { type FC } from 'react';

import { Table } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { ADMIN_USERS_SEARCH_MAX_LENGTH } from '@/features/(admin)/users/users/constants';
import { useAdminUsers } from '@/features/(admin)/users/users/hooks';
import { listAdminUsersParamsSchema } from '@/features/(admin)/users/users/schema';
import type {
  IParams,
  TCreatedWithin,
  TSortDirection,
} from '@/features/(admin)/users/users/types';
import { useEvent, useRouteSearchParams } from '@/hooks';
import { ROUTES } from '@/shared/config/routes';
import type { TUserRole } from '@/shared/config/user';
import { useSession } from '@/shared/providers/session/hooks';
import { DataState } from '@/ui/feedback/data-state';
import { Pagination } from '@/ui/navigation/pagination';
import { SearchField } from '@/ui/primitives/search-field';
import type { TBooleanFilter } from '@/utils';

import { AdminUsersFilters } from './filters';
import { AdminUsersTableContent } from './table-content';
import { AdminUsersActions } from './toolbar';

export const AdminUsersList: FC = () => {
  const t = useTranslations('admin.list');
  const { user: currentUser } = useSession();

  const { defaults, params, patchParams, setParams } = useRouteSearchParams(
    listAdminUsersParamsSchema,
    ROUTES.admin.users.list,
  );

  const { isError, isFetching, isLoading, refresh, total, users } =
    useAdminUsers(params);

  const patchFilters = useEvent((patch: Partial<IParams>) => {
    patchParams({
      ...patch,
      ...('page' in patch ? {} : { page: 1 }),
    });
  });

  const handlePageChange = useEvent((page: number) => {
    patchParams({ page });
  });

  const handlePageSizeChange = useEvent((pageSize: number) => {
    patchFilters({ pageSize });
  });

  const handleRoleChange = useEvent((role: TUserRole | null) => {
    patchFilters({ role });
  });

  const handleVerifiedChange = useEvent((verified: TBooleanFilter) => {
    patchFilters({ verified });
  });

  const handleBannedChange = useEvent((banned: TBooleanFilter) => {
    patchFilters({ banned });
  });

  const handleSelfSuspendedChange = useEvent(
    (selfSuspended: TBooleanFilter) => {
      patchFilters({ selfSuspended });
    },
  );

  const handleTwoFactorChange = useEvent((twoFactor: TBooleanFilter) => {
    patchFilters({ twoFactor });
  });

  const handleCreatedWithinChange = useEvent(
    (createdWithin: TCreatedWithin) => {
      patchFilters({ createdWithin });
    },
  );

  const handleSortDirectionChange = useEvent(
    (sortDirection: TSortDirection) => {
      patchFilters({ sortDirection });
    },
  );

  const handleSearchChange = useEvent((nextSearch: string) => {
    patchFilters({ search: nextSearch });
  });

  const handleReset = useEvent(() => {
    setParams({
      ...defaults,
      search: params.search,
    });
  });

  const isResetDisabled =
    params.banned === defaults.banned &&
    params.createdWithin === defaults.createdWithin &&
    params.pageSize === defaults.pageSize &&
    params.role === defaults.role &&
    params.selfSuspended === defaults.selfSuspended &&
    params.sortDirection === defaults.sortDirection &&
    params.twoFactor === defaults.twoFactor &&
    params.verified === defaults.verified;

  return (
    <Table>
      <div className="grid gap-3 px-4 py-2.5">
        <SearchField
          maxLength={ADMIN_USERS_SEARCH_MAX_LENGTH}
          mode="submit"
          name="search"
          placeholder={t('searchPlaceholder')}
          value={`${params.search}`}
          onSearchChange={handleSearchChange}
        />

        <div className="flex items-end gap-6">
          <div className="w-full">
            <AdminUsersFilters
              role={params.role}
              banned={params.banned}
              createdWithin={params.createdWithin}
              pageSize={params.pageSize}
              selfSuspended={params.selfSuspended}
              sortDirection={params.sortDirection}
              twoFactor={params.twoFactor}
              verified={params.verified}
              onBannedChange={handleBannedChange}
              onCreatedWithinChange={handleCreatedWithinChange}
              onPageSizeChange={handlePageSizeChange}
              onRoleChange={handleRoleChange}
              onSelfSuspendedChange={handleSelfSuspendedChange}
              onSortDirectionChange={handleSortDirectionChange}
              onTwoFactorChange={handleTwoFactorChange}
              onVerifiedChange={handleVerifiedChange}
            />
          </div>

          <AdminUsersActions
            className="max-md:hidden"
            isRefreshing={isFetching}
            isResetDisabled={isResetDisabled}
            onRefresh={refresh}
            onReset={handleReset}
          />
        </div>
      </div>

      <DataState
        error={isError}
        isEmpty={users.length === 0}
        isLoading={isLoading}
      >
        <AdminUsersTableContent currentUserId={currentUser?.id} users={users} />

        <Table.Footer>
          <Pagination
            page={params.page}
            pageSize={params.pageSize}
            total={total}
            onPageChange={handlePageChange}
          />
        </Table.Footer>
      </DataState>
    </Table>
  );
};
