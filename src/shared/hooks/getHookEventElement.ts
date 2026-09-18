import type { RefObject } from 'react';

export type TEventElement = Document | Element | Window;

export type THookEventElement<T = TEventElement> =
  | T
  | RefObject<T | null>
  | null;

export function getHookEventElement<T extends TEventElement>(
  ref: THookEventElement<T>,
) {
  return ref && 'current' in ref ? ref.current : ref;
}
