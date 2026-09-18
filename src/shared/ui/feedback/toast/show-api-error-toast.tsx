'use client';

import type { ReactNode } from 'react';

import { toast } from '@heroui/react';

import type { TErrorParams } from '@/types/Error';

import { RateLimitCountdown } from './rate-limit-countdown';

export interface IApiErrorToastPayload {
  code?: string | null;
  content?: ReactNode;
  message: ReactNode;
  params?: TErrorParams | null;
}

function getRetryInSeconds(params?: TErrorParams | null) {
  const retryIn = Number(params?.retryIn);

  if (!Number.isFinite(retryIn) || retryIn <= 0) {
    return null;
  }

  return Math.ceil(retryIn);
}

export function showApiErrorToast({
  code,
  content,
  message,
  params,
}: IApiErrorToastPayload) {
  const retryIn =
    code === 'rateLimitedWithTime' ? getRetryInSeconds(params) : null;

  if (retryIn != null) {
    return toast.danger(content ?? <RateLimitCountdown seconds={retryIn} />, {
      timeout: (retryIn + 1) * 1000,
    });
  }

  return toast.danger(content ?? message);
}
