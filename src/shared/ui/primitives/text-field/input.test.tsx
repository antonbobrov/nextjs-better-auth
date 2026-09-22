import type { FC } from 'react';
import { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useEvent } from '@/hooks';

import { TextField } from '.';

import type { TTextFieldProps } from './types';

const Component: FC<Partial<TTextFieldProps>> = (props) => {
  const [value, setValue] = useState('');

  const clear = useEvent(() => {
    props.onClear?.();
    setValue('');
  });

  return (
    <TextField
      {...props}
      type={props.type ?? 'text'}
      label={props.label ?? 'Test label'}
      name={props.name ?? 'input-name'}
      value={value}
      onChange={setValue}
      onClear={clear}
    />
  );
};

test('TextField', () => {
  const handleBlur = vi.fn();

  render(
    <Component
      type="tel"
      error="my_error"
      right={<span data-testid="right" />}
      onBlur={handleBlur}
    />,
  );

  const label = screen.getByTestId('label');
  const input = screen.getByTestId('input');
  const right = screen.getByTestId('right');
  const error = screen.getByTestId('error');

  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(error).toBeInTheDocument();

  expect(label.textContent).toBe('Test label');

  expect(input.getAttribute('type')).toBe('tel');
  expect(input.getAttribute('name')).toBe('input-name');

  expect(error).toBeInTheDocument();
  expect(error.textContent).toBe('errors.my_error');

  fireEvent.focus(input);
  fireEvent.blur(input);
  expect(handleBlur).toHaveBeenCalled();
});

test('TextField Clear', async () => {
  const handleClear = vi.fn();

  render(<Component onClear={handleClear} />);

  const input = screen.getByTestId('input') as HTMLInputElement;

  let clearButton = screen.queryByTestId('clear-button');
  expect(clearButton).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'New value' } });

  await waitFor(() => {
    expect(input.value).toBe('New value');
  });

  clearButton = screen.getByTestId('clear-button');
  expect(clearButton).toBeInTheDocument();

  fireEvent.click(clearButton);

  expect(handleClear).toHaveBeenCalled();

  await waitFor(() => {
    expect(input.value).toBe('');
  });
});

test('TextField Password', async () => {
  render(<Component type="password" />);

  const input = screen.getByTestId('input') as HTMLInputElement;

  expect(input.type).toBe('password');
});
