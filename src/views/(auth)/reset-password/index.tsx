'use client';

import { useState, type FC } from 'react';

import { useEvent } from '@/hooks';

import { ResetPasswordContent } from './components/content';
import { ResetPasswordSuccess } from './components/success';

import type { IProps } from './types';

export const ResetPassword: FC<IProps> = ({ token }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = useEvent(() => setIsSuccess(true));

  if (isSuccess) {
    return <ResetPasswordSuccess />;
  }

  return <ResetPasswordContent token={token} onSuccess={handleSuccess} />;
};
