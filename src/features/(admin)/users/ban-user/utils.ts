export function toExpiresIn(expiresAt: string) {
  if (!expiresAt) {
    return undefined;
  }

  return Math.max(
    1,
    Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000),
  );
}
