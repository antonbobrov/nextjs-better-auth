import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';

import { PasswordInput } from '.';

test('PasswordInput', async () => {
  render(<PasswordInput name="password" />);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  expect(input.getAttribute('type')).toBe('password');

  const toggle = screen.getByTestId('toggle-password');

  fireEvent.click(toggle);

  await waitFor(() => {
    expect(input.getAttribute('type')).toBe('text');
  });

  fireEvent.click(toggle);

  await waitFor(() => {
    expect(input.getAttribute('type')).toBe('password');
  });
});
