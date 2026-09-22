import { expect, test } from 'vitest';

import { getHookEventElement } from './getHookEventElement';

test('getHookEventElement', () => {
  expect(getHookEventElement(null)).toBe(null);
  expect(getHookEventElement(document)).toBe(document);
  expect(getHookEventElement(window)).toBe(window);
  expect(getHookEventElement(document.body)).toBe(document.body);
  expect(getHookEventElement({ current: document.body })).toBe(document.body);
});
