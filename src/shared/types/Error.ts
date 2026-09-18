import type { AppConfig } from 'next-intl';

type TErrors = AppConfig['Messages']['errors'];

type TDotPaths<T> = {
  [K in keyof T & string]: T[K] extends object ? `${K}.${TDotPaths<T[K]>}` : K;
}[keyof T & string];

export type TTypedErrorCode = TDotPaths<TErrors>;

export type TErrorParams = Record<string, any>;
