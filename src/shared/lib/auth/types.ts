import type { authClient } from './client';

type TAuthSession = ReturnType<typeof authClient.useSession>['data'];

export type TSession = NonNullable<TAuthSession>['session'];

export type TUser = NonNullable<TAuthSession>['user'];
