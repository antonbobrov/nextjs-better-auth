export function omitDefaultSearchParams<T extends Record<string, unknown>>(
  params: T,
  defaults: T,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === '') {
      continue;
    }

    if (Object.is(value, defaults[key])) {
      continue;
    }

    searchParams.set(key, String(value));
  }

  return searchParams;
}
