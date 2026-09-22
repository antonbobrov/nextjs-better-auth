import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { ActionButton } from '.';

const Children = () => <span data-testid="children" />;

test('ActionButton', () => {
  render(
    <ActionButton>
      <Children />
    </ActionButton>,
  );

  expect(screen.getByTestId('children')).toBeInTheDocument();
});

test('ActionButton Button', () => {
  render(
    <ActionButton>
      <Children />
    </ActionButton>,
  );

  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('ActionButton Button Disabled', () => {
  render(
    <ActionButton isDisabled>
      <Children />
    </ActionButton>,
  );

  const button = screen.getByRole('button');
  expect(button.hasAttribute('disabled')).toBe(true);
});

test('ActionButton Button Pending', () => {
  render(
    <ActionButton isPending>
      <Children />
    </ActionButton>,
  );

  const children = screen.queryByTestId('children');
  expect(children).not.toBeInTheDocument();
});

test('ActionButton Link', () => {
  const href = 'https://google.com';

  render(
    <ActionButton href={href}>
      <Children />
    </ActionButton>,
  );

  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();
  expect(link.getAttribute('href')).toBe(href);
});
