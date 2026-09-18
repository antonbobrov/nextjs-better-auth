const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const DIVISIONS = [
  { amount: YEAR, unit: 'year' },
  { amount: MONTH, unit: 'month' },
  { amount: WEEK, unit: 'week' },
  { amount: DAY, unit: 'day' },
  { amount: HOUR, unit: 'hour' },
  { amount: MINUTE, unit: 'minute' },
  { amount: SECOND, unit: 'second' },
] as const;

export function formatRelativeTime(value: Date | string, locale = 'en') {
  const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  for (const { amount, unit } of DIVISIONS) {
    if (Math.abs(seconds) >= amount || unit === 'second') {
      return formatter.format(Math.round(seconds / amount), unit);
    }
  }

  return formatter.format(0, 'second');
}
