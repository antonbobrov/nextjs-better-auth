'use client';

import { useState, type FC } from 'react';

import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { SIGN_UP } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';

import { SignUpContent } from './components/sign-up-content';
import { SignUpSuccess } from './components/success';

import type { IProps } from './types';

export const SignUp: FC<IProps> = ({ email: initialEmail }) => {
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSuccess = useEvent((inputEmail: string) => {
    if (SIGN_UP.requireVerification) {
      setEmail(inputEmail);
      setIsSuccess(true);

      return;
    }

    if (SIGN_UP.autoSignIn) {
      router.push(ROUTES.app);
      router.refresh();

      return;
    }

    router.push(ROUTES.auth.signIn(inputEmail));
  });

  if (isSuccess) {
    return <SignUpSuccess email={email} />;
  }

  return <SignUpContent email={initialEmail} onSuccess={handleSuccess} />;
};
