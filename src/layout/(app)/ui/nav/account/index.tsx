'use client';

import { memo, type FC } from 'react';

import { ArrowRightFromSquare, ArrowRotateLeft } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { SignOut } from '@/features/(account)/sign-out';
import { StopImpersonating } from '@/features/(account)/stop-impersonating';
import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Sidebar } from '@/ui/navigation/sidebar';

import type { IProps } from './types';

const Component: FC<IProps> = ({ className, style, isIconOnly, session }) => {
  const tMenu = useTranslations('layout.menu');
  const tNav = useTranslations('layout.nav');
  const router = useRouter();

  const handleSignedOut = useEvent(() => {
    router.push(ROUTES.auth.signIn());
    router.refresh();
  });

  return (
    <Sidebar.Menu className={className} style={style} label={tNav('account')}>
      {session?.impersonatedBy && (
        <StopImpersonating>
          <Sidebar.MenuItem
            icon={ArrowRotateLeft}
            isIconOnly={isIconOnly}
            label={tMenu('stopImpersonating')}
          />
        </StopImpersonating>
      )}

      <SignOut onSuccess={handleSignedOut}>
        <Sidebar.MenuItem
          icon={ArrowRightFromSquare}
          isIconOnly={isIconOnly}
          label={tMenu('signOut')}
        />
      </SignOut>
    </Sidebar.Menu>
  );
};

Component.displayName = 'NavAccount';

export const NavAccount = memo(Component);
