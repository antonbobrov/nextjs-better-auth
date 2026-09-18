export function totalOf(rows: { total: number | string }[]) {
  return Number(rows[0]?.total ?? 0);
}
