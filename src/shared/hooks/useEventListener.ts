import { useEffect } from 'react';

import { getHookEventElement } from './getHookEventElement';
import { useEvent } from './useEvent';

import type { THookEventElement } from './getHookEventElement';

interface IOptions {
  getIsDisabled?: () => boolean;
  isDisabled?: boolean;
}

export function useEventListener<
  Target extends keyof HTMLElementEventMap,
  Listener extends (event: DocumentEventMap[Target]) => void,
>(
  ref: THookEventElement,
  target: Target,
  listenerProp: Listener,
  options?: AddEventListenerOptions,
  { getIsDisabled, isDisabled }: IOptions = {},
) {
  const listener = useEvent(listenerProp);

  useEffect(() => {
    const isGetDisabled = getIsDisabled ? getIsDisabled() : false;
    const element = getHookEventElement(ref);

    if (isDisabled || isGetDisabled || !element) {
      return undefined;
    }

    element.addEventListener(target, listener as any, options);

    return () => {
      element.removeEventListener(target, listener as any, options);
    };
  }, [getIsDisabled, isDisabled, listener, options, ref, target]);
}
