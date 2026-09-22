import type { TTranslator } from '@/i18n/translator';
import type { TErrorParams, TTypedErrorCode } from '@/types/Error';

export function stringifyZodError(
  code: TTypedErrorCode,
  params?: TErrorParams,
) {
  return JSON.stringify({ code, params });
}

interface IParseZodErrorMessageParams {
  message?: string | null;
  translations: TTranslator<'errors'>;
}

export function parseZodErrorMessage({
  message,
  translations,
}: IParseZodErrorMessageParams) {
  if (!message) {
    return null;
  }

  let code: TTypedErrorCode = message as TTypedErrorCode;
  let params: TErrorParams | null = null;

  try {
    const { code: parsedCode, params: parsedParams } = JSON.parse(message) as {
      code?: TTypedErrorCode;
      params?: TErrorParams;
    };

    code = parsedCode || code;
    params = parsedParams || params;
  } catch {
    //
  }

  const translatedCode = params
    ? translations?.(code as never, params as never)
    : translations?.(code as never);

  return translatedCode;
}
