import type { TBooleanFilter } from './toBooleanFilter';

export function fromBooleanFilter(value: TBooleanFilter) {
  return value === null ? 'all' : String(value);
}
