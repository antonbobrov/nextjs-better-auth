const colors = ['#E11D48', '#EA580C', '#16A34A', '#2563EB', '#7C3AED'];

export function uuidColor(uuid: string): string {
  const hash = [...uuid].reduce(
    (acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0,
    0,
  );

  return colors[Math.abs(hash) % colors.length];
}
