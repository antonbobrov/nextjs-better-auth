import { useState, type FC } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useEvent } from '@/hooks';

import { Switch } from '.';

import type { IProps } from './types';

const Component: FC<Partial<IProps>> = (props) => {
  const [isSelected, setIsSelected] = useState(props.isSelected ?? false);

  const handleChange = useEvent((next: boolean) => {
    props.onChange?.(next);
    setIsSelected(next);
  });

  return (
    <Switch
      description={props.description}
      isSelected={isSelected}
      onChange={handleChange}
    >
      {props.children ?? 'Enable feature'}
    </Switch>
  );
};

test('Switch', () => {
  render(<Component description="More details" />);

  expect(screen.getByText('Enable feature')).toBeInTheDocument();
  expect(screen.getByText('More details')).toBeInTheDocument();
});

test('Switch toggle', () => {
  const onChange = vi.fn();

  render(<Component onChange={onChange} />);

  const control = screen.getByRole('switch');
  expect(control).not.toBeChecked();

  fireEvent.click(control);

  expect(onChange).toHaveBeenCalledWith(true);
  expect(control).toBeChecked();
});

test('Switch state', () => {
  render(<Component isSelected />);

  expect(screen.getByRole('switch')).toBeChecked();
});
