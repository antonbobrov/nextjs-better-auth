import type { TUser } from '@/lib/auth/types';

import type { listAdminUsersParamsSchema } from './schema';
import type { z } from 'zod';

export type IParams = z.infer<typeof listAdminUsersParamsSchema>;

export type TSortDirection = IParams['sortDirection'];

export type TCreatedWithin = IParams['createdWithin'];

export type TApiAdminUsersList = {
  total: number;
  users: TUser[];
};
