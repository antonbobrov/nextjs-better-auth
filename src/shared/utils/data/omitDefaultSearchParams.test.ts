import { expect, test } from 'vitest';

import { omitDefaultSearchParams } from './omitDefaultSearchParams';

test('omitDefaultSearchParams ', () => {
  expect(omitDefaultSearchParams({}, {})).toEqual(new URLSearchParams());

  expect(omitDefaultSearchParams({ filter1: 'value1' }, {})).toEqual(
    new URLSearchParams({ filter1: 'value1' }),
  );

  expect(
    omitDefaultSearchParams({ filter1: 'value1', filter2: 'value2' }, {}),
  ).toEqual(new URLSearchParams({ filter1: 'value1', filter2: 'value2' }));

  expect(
    omitDefaultSearchParams(
      { filter1: undefined, filter2: 'value2' },
      { filter1: 'value1' },
    ),
  ).toEqual(new URLSearchParams({ filter2: 'value2' }));

  expect(
    omitDefaultSearchParams(
      { filter1: null, filter2: 'value2' },
      { filter1: 'value1' },
    ),
  ).toEqual(new URLSearchParams({ filter2: 'value2' }));

  expect(
    omitDefaultSearchParams(
      { filter1: '', filter2: 'value2' },
      { filter1: 'value1' },
    ),
  ).toEqual(new URLSearchParams({ filter2: 'value2' }));

  expect(
    omitDefaultSearchParams({ filter2: 'value2' }, { filter2: 'value2' }),
  ).toEqual(new URLSearchParams({}));
});
