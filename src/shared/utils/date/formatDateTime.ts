export function formatDateTime(value: Date | string, locale = 'en') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    timeZoneName: 'shortOffset',
    year: 'numeric',
  }).format(new Date(value));
}
