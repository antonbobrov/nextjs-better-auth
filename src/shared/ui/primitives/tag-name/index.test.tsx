import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { TagName } from '.';

test('TagName Anchor', () => {
  const href = 'https://google.com';

  render(
    <TagName className="class-value" href={href} tagName="a">
      link text
    </TagName>,
  );

  const link = screen.getByRole('link', { name: 'link text' });
  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe(href);
  expect(link.getAttribute('class')).toBe('class-value');
});

test('TagName Paragraph', () => {
  render(
    <TagName className="class-value" tagName="p">
      paragraph text
    </TagName>,
  );

  const el = screen.getByRole('paragraph');
  expect(el.tagName).toBe('P');
  expect(el.getAttribute('class')).toBe('class-value');
  expect(el.innerHTML).toBe('paragraph text');
});
