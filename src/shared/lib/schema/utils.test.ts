import { expect, test } from 'vitest';

import { parseZodErrorMessage, stringifyZodError } from './utils';

test('stringifyZodError', () => {
  expect(stringifyZodError('authenticatorCode.format')).toBe(
    JSON.stringify({ code: 'authenticatorCode.format' }),
  );

  expect(stringifyZodError('authenticatorCode.format', { max: 255 })).toBe(
    JSON.stringify({ code: 'authenticatorCode.format', params: { max: 255 } }),
  );
});

test('parseZodErrorMessage', () => {
  const translations: any = (code: string) => {
    if (code === 'unableToLoad') {
      return 'Unable to load';
    }

    return code;
  };

  expect(parseZodErrorMessage({ message: null, translations })).toBe(null);

  expect(
    parseZodErrorMessage({
      message: JSON.stringify({ code: 'unableToLoad' }),
      translations,
    }),
  ).toBe('Unable to load');

  expect(
    parseZodErrorMessage({
      message: JSON.stringify({ code: 'unexpectedCode' }),
      translations,
    }),
  ).toBe('unexpectedCode');

  expect(
    parseZodErrorMessage({
      message: JSON.stringify({ code: 'unexpectedCode', params: { max: 255 } }),
      translations,
    }),
  ).toBe('unexpectedCode');

  expect(
    parseZodErrorMessage({
      message: JSON.stringify({}),
      translations,
    }),
  ).toBe('{}');

  expect(
    parseZodErrorMessage({
      message: '{ "code": "unableToLoad"" }',
      translations,
    }),
  ).toBe('{ "code": "unableToLoad"" }');
});
