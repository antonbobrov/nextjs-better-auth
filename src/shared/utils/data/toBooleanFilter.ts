export type TBooleanFilter = boolean | null;

export const BOOLEAN_FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'true', label: 'Yes' },
  { id: 'false', label: 'No' },
] as const;

export function toBooleanFilter(value: string): TBooleanFilter {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return null;
}
