import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { Input } from '.';

const LeftIcon = () => <span data-testid="left-icon" />;

test('Input', () => {
  render(<Input type="text" name="test-name" />);

  const input = screen.getByTestId('input');
  expect(input.getAttribute('name')).toBe('test-name');
  expect(input.getAttribute('type')).toBe('text');
});

test('Input Type', () => {
  render(<Input type="password" name="test-name" />);

  const input = screen.getByTestId('input');
  expect(input.getAttribute('type')).toBe('password');
});

test('Input AutoFocus', () => {
  render(<Input type="text" autoFocus name="test-name" />);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveFocus();
});

test('Input LeftIcon', () => {
  render(<Input type="text" inputLeftIcon={LeftIcon} name="test-name" />);

  expect(screen.getByTestId('left-icon')).toBeInTheDocument();
});

test('Input inputRight', () => {
  render(
    <Input
      type="text"
      inputRight={<div data-testid="right" />}
      name="test-name"
    />,
  );

  expect(screen.getByTestId('right')).toBeInTheDocument();
});

test('Input Enter', () => {
  const fn = vi.fn();

  render(<Input type="text" name="test-name" onEnter={fn} />);

  fireEvent.keyDown(screen.getByTestId('input'), { key: 'Enter' });

  expect(fn).toHaveBeenCalledOnce();
  vi.clearAllMocks();

  fireEvent.keyDown(screen.getByTestId('input'), { key: 'F' });
  expect(fn).not.toHaveBeenCalled();
});
