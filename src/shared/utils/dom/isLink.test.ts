import { expect, test } from 'vitest';

import { isLink } from './isLink';

test('isLink', () => {
  const div = document.createElement('div');

  const link = document.createElement('a');

  const span1 = document.createElement('span');
  link.append(span1);

  const span2 = document.createElement('span');
  span1.append(span2);

  expect(isLink(div)).toBe(false);
  expect(isLink(null)).toBe(false);
  expect(isLink(document)).toBe(false);

  expect(isLink(link)).toBe(true);
  expect(isLink(span1)).toBe(true);
  expect(isLink(span2)).toBe(true);
});
