import type { NextResponse } from 'next/server';

import type { TErrorParams, TTypedErrorCode } from './Error';

export type TApiResponse<T> = {
  code?: TTypedErrorCode;
  data?: T;
  debug?: any;
  params?: TErrorParams;
};

export type TApiRouteReturns<T> = Promise<NextResponse<TApiResponse<T>>>;

export type TRunApiReturns<T> = TApiResponse<T> & {
  ok?: boolean;
  status: number;
};

export type TApiSuccess = {
  success: true;
};
