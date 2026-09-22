import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

import { SearchField } from '.';

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

test('SearchField debounces', () => {
  vi.useFakeTimers();
  const onSearchChange = vi.fn();

  render(
    <SearchField
      debounceMs={300}
      name="search"
      placeholder="Search..."
      onSearchChange={onSearchChange}
    />,
  );

  fireEvent.change(screen.getByTestId('input'), {
    target: { value: 'ships' },
  });

  expect(onSearchChange).not.toHaveBeenCalled();

  act(() => {
    vi.advanceTimersByTime(300);
  });

  expect(onSearchChange).toHaveBeenCalledWith('ships');
});

test('SearchField clear', () => {
  vi.useFakeTimers();
  const onSearchChange = vi.fn();

  render(
    <SearchField
      debounceMs={300}
      name="search"
      placeholder="Search..."
      onSearchChange={onSearchChange}
    />,
  );

  fireEvent.change(screen.getByTestId('input'), {
    target: { value: 'ships' },
  });

  act(() => {
    vi.advanceTimersByTime(300);
  });
  expect(onSearchChange).toHaveBeenCalledWith('ships');
  onSearchChange.mockClear();

  fireEvent.click(screen.getByTestId('clear-button'));

  act(() => {
    vi.advanceTimersByTime(300);
  });

  expect(screen.getByTestId('input')).toHaveValue('');
  expect(onSearchChange).toHaveBeenCalledWith('');
});

test('SearchField Enter', () => {
  const onSearchChange = vi.fn();

  render(
    <SearchField
      mode="submit"
      name="search"
      placeholder="Search..."
      onSearchChange={onSearchChange}
    />,
  );

  const input = screen.getByTestId('input');
  fireEvent.change(input, { target: { value: 'fleet' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onSearchChange).toHaveBeenCalledWith('fleet');
});

test('SearchField Button', () => {
  const onSearchChange = vi.fn();

  render(
    <SearchField
      mode="submit"
      name="search"
      placeholder="Search..."
      onSearchChange={onSearchChange}
    />,
  );

  fireEvent.change(screen.getByTestId('input'), {
    target: { value: 'fleet' },
  });
  fireEvent.click(screen.getByTestId('search-button'));

  expect(onSearchChange).toHaveBeenCalledWith('fleet');
});

test('SearchField Submit Clear', () => {
  const onSearchChange = vi.fn();

  render(
    <SearchField
      mode="submit"
      name="search"
      placeholder="Search..."
      onSearchChange={onSearchChange}
    />,
  );

  fireEvent.change(screen.getByTestId('input'), {
    target: { value: 'fleet' },
  });
  fireEvent.click(screen.getByTestId('clear-button'));

  expect(screen.getByTestId('input')).toHaveValue('');
  expect(onSearchChange).toHaveBeenCalledWith('');
});

test('SearchField Focus', () => {
  render(
    <SearchField
      name="search"
      placeholder="Search..."
      onSearchChange={vi.fn()}
    />,
  );

  const input = screen.getByTestId('input');
  fireEvent.change(input, { target: { value: 'fleet' } });
  input.blur();

  fireEvent.keyDown(document, { key: 'f', ctrlKey: true });

  expect(input).toHaveFocus();
  expect(input).toHaveProperty('selectionStart', 0);
  expect(input).toHaveProperty('selectionEnd', 5);

  input.blur();

  fireEvent.keyDown(document, { key: 'а', ctrlKey: true });

  expect(input).toHaveFocus();
  expect(input).toHaveProperty('selectionStart', 0);
  expect(input).toHaveProperty('selectionEnd', 5);
});

test('SearchField respects maxLength', () => {
  vi.useFakeTimers();
  const onSearchChange = vi.fn();

  render(
    <SearchField
      debounceMs={100}
      maxLength={3}
      name="search"
      placeholder="Search..."
      onSearchChange={onSearchChange}
    />,
  );

  fireEvent.change(screen.getByTestId('input'), {
    target: { value: 'abcdef' },
  });

  expect(screen.getByTestId('input')).toHaveValue('abc');

  act(() => {
    vi.advanceTimersByTime(100);
  });

  expect(onSearchChange).toHaveBeenCalledWith('abc');
});
