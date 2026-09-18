'use client';

import { useState, type FC } from 'react';

import { useEvent } from '@/hooks';

import { SelfUnsuspendContent } from './components/content';
import { SelfUnsuspendRequestSuccess } from './components/success';

import type { IProps } from './types';

export const SelfUnsuspend: FC<IProps> = ({ email: initialEmail }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSuccess = useEvent((inputEmail: string) => {
    setEmail(inputEmail);
    setIsSuccess(true);
  });

  if (isSuccess) {
    return <SelfUnsuspendRequestSuccess email={email} />;
  }

  return (
    <SelfUnsuspendContent email={initialEmail} onSuccess={handleSuccess} />
  );
};
