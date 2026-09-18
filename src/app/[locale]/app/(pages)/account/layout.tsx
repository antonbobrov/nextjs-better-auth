import type { FC, PropsWithChildren } from 'react';

import { AccountLayout } from '@/layout/(app)/account';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <AccountLayout>{children}</AccountLayout>
);

export default Layout;
