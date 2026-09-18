type TDateValue = Date | number | string;

export function sortByDate<T>(
  items: T[],
  getDate: (item: T) => TDateValue,
  direction: 'asc' | 'desc' = 'desc',
) {
  return items.toSorted((left, right) => {
    const delta =
      new Date(getDate(left)).getTime() - new Date(getDate(right)).getTime();

    if (direction === 'desc') {
      return -delta;
    }

    return delta;
  });
}
