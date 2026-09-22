import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import copyToClipboard from 'clipboard-copy';
import { expect, test, vi } from 'vitest';

import { toast } from '@/ui/feedback/toast';

import { CopyButton } from '.';

vi.mock('clipboard-copy', () => ({
  default: vi.fn(),
}));

test('CopyButton', async () => {
  render(<CopyButton label="Copy text" value="text to copy" />);
  const button = screen.getByRole('button');

  fireEvent.click(button);

  expect(copyToClipboard).toHaveBeenCalledWith('text to copy');

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalled();
  });

  vi.clearAllMocks();

  vi.mocked(copyToClipboard).mockRejectedValueOnce(new Error());

  fireEvent.click(button);

  await waitFor(() => {
    expect(toast.danger).toHaveBeenCalled();
  });
  expect(toast.success).not.toHaveBeenCalled();
});

test('CopyButton Children', async () => {
  render(
    <CopyButton label="Copy text" value="text to copy">
      <span data-testid="children" />
    </CopyButton>,
  );

  const children = screen.getByTestId('children');
  expect(children).toBeInTheDocument();
});
