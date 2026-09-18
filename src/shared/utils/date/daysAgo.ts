export function daysAgo(days: number) {
  const date = new Date();
  date.setTime(date.getTime() - Math.trunc(days) * 86_400_000);

  return date;
}
