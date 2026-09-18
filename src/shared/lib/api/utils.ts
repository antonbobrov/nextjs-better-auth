import type { TTranslator } from '@/i18n/translator';
import type { TErrorParams, TTypedErrorCode } from '@/types/Error';
import { isString } from '@/utils';

interface IParseErrorMessageParams {
  code?: string | null;
  error?: unknown;
  params?: TErrorParams | null;
  translations: TTranslator<'errors'>;
}

export function parseErrorMessage({
  code,
  error,
  params,
  translations,
}: IParseErrorMessageParams) {
  if ((code as TTypedErrorCode) === 'noInternet') {
    return translations('noInternet');
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (error && typeof error === 'object') {
    if ('message' in error && isString(error.message) && error.message) {
      return error.message;
    }
  }

  const translatedCode = params
    ? translations?.(code as never, params as never)
    : translations?.(code as never);

  if (translatedCode !== code) {
    return translatedCode;
  }

  return translations('unexpected');
}

export function parseErrorParams(error: unknown) {
  if (
    error &&
    typeof error === 'object' &&
    'params' in error &&
    Object.keys(error).length
  ) {
    return error.params as TErrorParams;
  }

  return null;
}

export function parseErrorCode(err: unknown) {
  if (isNetworkError(err)) {
    return 'noInternet' satisfies TTypedErrorCode;
  }

  if (!err || typeof err !== 'object') {
    return null;
  }

  if ('code' in err && isString(err.code)) {
    return err.code;
  }

  return null;
}

function isNetworkError(err: unknown) {
  if (!(err instanceof TypeError)) {
    return false;
  }

  return /failed to fetch|networkerror|load failed/i.test(err.message);
}
