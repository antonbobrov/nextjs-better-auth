'use client';

import { useState, type FC } from 'react';

import { useEvent } from '@/hooks';

import { ForgotPasswordContent } from './components/content';
import { ForgotPasswordSuccess } from './components/success';

import type { IProps } from './types';

export const ForgotPassword: FC<IProps> = ({ email: initialEmail }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSuccess = useEvent((inputEmail: string) => {
    setEmail(inputEmail);
    setIsSuccess(true);
  });

  if (isSuccess) {
    return <ForgotPasswordSuccess email={email} />;
  }

  return (
    <ForgotPasswordContent email={initialEmail} onSuccess={handleSuccess} />
  );
};
