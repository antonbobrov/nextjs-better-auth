import type { FC, PropsWithChildren } from 'react';

import { AppMain } from '@/layout/(app)/main';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <AppMain variant="flush">{children}</AppMain>
);

export default Layout;
