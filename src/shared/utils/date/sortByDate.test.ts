import { expect, test } from 'vitest';

import { sortByDate } from './sortByDate';

test('sortByDate', () => {
  expect(sortByDate([], (item) => item, 'asc')).toEqual([]);

  expect(
    sortByDate([{ date: new Date('2018-05-02') }], (item) => item.date, 'asc'),
  ).toEqual([{ date: new Date('2018-05-02') }]);

  expect(
    sortByDate(
      [
        { date: new Date('2018-05-02') },
        { date: new Date('2018-05-01') },
        { date: new Date('2018-05-03') },
        { date: new Date('2018-05-05') },
        { date: new Date('2018-05-04') },
        { date: new Date('2018-05-06') },
        { date: new Date('2018-05-07') },
      ],
      (item) => item.date,
      'asc',
    ),
  ).toEqual([
    { date: new Date('2018-05-01') },
    { date: new Date('2018-05-02') },
    { date: new Date('2018-05-03') },
    { date: new Date('2018-05-04') },
    { date: new Date('2018-05-05') },
    { date: new Date('2018-05-06') },
    { date: new Date('2018-05-07') },
  ]);

  expect(
    sortByDate(
      [
        { date: new Date('2018-05-02') },
        { date: new Date('2018-05-01') },
        { date: new Date('2018-05-03') },
      ],
      (item) => item.date,
      'desc',
    ),
  ).toEqual([
    { date: new Date('2018-05-03') },
    { date: new Date('2018-05-02') },
    { date: new Date('2018-05-01') },
  ]);

  expect(
    sortByDate(
      [
        { date: new Date('2018-05-02') },
        { date: new Date('2018-05-01') },
        { date: new Date('2018-05-03') },
      ],
      (item) => item.date,
    ),
  ).toEqual([
    { date: new Date('2018-05-03') },
    { date: new Date('2018-05-02') },
    { date: new Date('2018-05-01') },
  ]);

  expect(
    sortByDate(
      [{ date: '2018-05-02' }, { date: '2018-05-01' }, { date: '2018-05-03' }],
      (item) => item.date,
      'asc',
    ),
  ).toEqual([
    { date: '2018-05-01' },
    { date: '2018-05-02' },
    { date: '2018-05-03' },
  ]);

  const early = Date.parse('2018-05-01');
  const mid = Date.parse('2018-05-02');
  const late = Date.parse('2018-05-03');

  expect(
    sortByDate(
      [{ date: mid }, { date: early }, { date: late }],
      (item) => item.date,
      'asc',
    ),
  ).toEqual([{ date: early }, { date: mid }, { date: late }]);

  expect(
    sortByDate(
      [
        { id: 'a', date: new Date('2018-05-01') },
        { id: 'b', date: new Date('2018-05-01') },
        { id: 'c', date: new Date('2018-05-02') },
      ],
      (item) => item.date,
      'asc',
    ),
  ).toEqual([
    { id: 'a', date: new Date('2018-05-01') },
    { id: 'b', date: new Date('2018-05-01') },
    { id: 'c', date: new Date('2018-05-02') },
  ]);

  const items = [
    { date: new Date('2018-05-02') },
    { date: new Date('2018-05-01') },
  ];

  expect(sortByDate(items, (item) => item.date, 'asc')).not.toBe(items);

  expect(items).toEqual([
    { date: new Date('2018-05-02') },
    { date: new Date('2018-05-01') },
  ]);
});
