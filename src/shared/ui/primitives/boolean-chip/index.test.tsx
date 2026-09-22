import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import { BooleanChip } from '.';

test('BooleanChip true', () => {
  const { container } = render(<BooleanChip color="success" value />);

  expect(container.textContent).toBe('common.yes');
});

test('BooleanChip false', () => {
  const { container } = render(<BooleanChip color="danger" value={false} />);

  expect(container.textContent).toBe('common.no');
});
