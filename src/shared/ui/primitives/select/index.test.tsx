import type { FC } from 'react';
import { useState } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useEvent } from '@/hooks';

import { Select } from '.';

import type { IOption, ISelectProps } from './types';

const OPTIONS: IOption[] = [
  {
    id: '0',
    label: 'Option 1',
  },
  {
    id: '1',
    label: 'Option 2',
  },
];

const Component: FC<Partial<ISelectProps>> = (props) => {
  const [value, setValue] = useState(props.value ?? '');

  const handleChange = useEvent((val: string) => {
    props.onChange?.(val);
    setValue(val);
  });

  return (
    <Select
      aria-label={props['aria-label']}
      isDisabled={props.isDisabled}
      label={props.label}
      options={props.options ?? OPTIONS}
      value={value}
      onChange={handleChange}
    />
  );
};

test('Select renders label and selects an option', () => {
  const onChange = vi.fn();

  render(<Component label="Select" onChange={onChange} />);

  expect(screen.getByTestId('label')).toHaveTextContent('Select');

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const option = screen.getByRole('option', { name: 'Option 2' });
  fireEvent.click(option);

  expect(onChange).toHaveBeenCalledWith('1');
  expect(button).toHaveTextContent('Option 2');
});

test('Select aria-label', () => {
  render(<Component aria-label="Choose option" />);

  expect(screen.queryByTestId('label')).not.toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute(
    'aria-label',
    'Choose option',
  );
});

test('Select is disabled', () => {
  render(<Component isDisabled label="Select" />);

  expect(screen.getByRole('button')).toBeDisabled();
});
