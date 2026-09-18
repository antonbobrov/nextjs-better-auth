export function createOtpGroups(length: number) {
  const firstSize = Math.ceil(length / 2);

  return [
    Array.from({ length: firstSize }, (_, index) => index),
    Array.from({ length: length - firstSize }, (_, index) => firstSize + index),
  ].filter((group) => group.length > 0);
}
