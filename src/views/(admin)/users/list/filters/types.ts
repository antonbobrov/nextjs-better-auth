import type {
  TCreatedWithin,
  TSortDirection,
} from '@/features/(admin)/users/users/types';
import type { TUserRole } from '@/shared/config/user';
import type { TBooleanFilter } from '@/utils';

export interface IProps {
  banned: TBooleanFilter;
  createdWithin: TCreatedWithin;
  onBannedChange: (banned: TBooleanFilter) => void;
  onCreatedWithinChange: (createdWithin: TCreatedWithin) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRoleChange: (role: TUserRole | null) => void;
  onSelfSuspendedChange: (selfSuspended: TBooleanFilter) => void;
  onSortDirectionChange: (sortDirection: TSortDirection) => void;
  onTwoFactorChange: (twoFactor: TBooleanFilter) => void;
  onVerifiedChange: (verified: TBooleanFilter) => void;
  pageSize: number;
  role: TUserRole | null;
  selfSuspended: TBooleanFilter;
  sortDirection: TSortDirection;
  twoFactor: TBooleanFilter;
  verified: TBooleanFilter;
}
