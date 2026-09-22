import type { Key } from 'react';

export function toSelectValue(next: Key | Key[] | null): string | null {
  if (next == null || Array.isArray(next)) {
    return null;
  }

  return String(next);
}
