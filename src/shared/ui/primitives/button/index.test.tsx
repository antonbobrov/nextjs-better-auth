import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Button } from '.';

test('Button', () => {
  render(<Button type="submit">button text</Button>);

  const button = screen.getByRole('button');
  expect(button.tagName).toBe('BUTTON');
  expect(button.textContent).toBe('button text');
  expect(button.getAttribute('type')).toBe('submit');
});

test('Button disabled', () => {
  render(
    <Button type="button" isDisabled>
      button
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button.hasAttribute('disabled')).toBe(true);
});

test('Button pending', () => {
  render(
    <Button type="button" isPending>
      button text
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button.textContent).toBe('button text');
  expect(button.hasAttribute('disabled')).toBe(true);
  expect(screen.getByTestId('spinner')).toBeTruthy();
});

const Icon = () => <span data-testid="icon" />;

test('Button icon', () => {
  render(
    <Button type="button" icon={Icon}>
      button text
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button.textContent).toBe('button text');
  expect(screen.getByTestId('icon')).toBeTruthy();
});
