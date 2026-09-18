'use client';

import { useRef, useState } from 'react';

import { useEvent } from '@/hooks';

import type { FieldValues, UseFormReturn } from 'react-hook-form';

export function useConfirm(action: () => Promise<boolean>) {
  const [isOpen, setIsOpen] = useState(false);

  const inFlight = useRef(false);

  const open = useEvent(() => {
    inFlight.current = false;
    setIsOpen(true);
  });

  const confirm = useEvent(async () => {
    if (inFlight.current) {
      return;
    }

    inFlight.current = true;

    try {
      if (await action()) {
        setIsOpen(false);

        return;
      }
    } catch {
      // Action handlers surface their own errors.
    }

    inFlight.current = false;
  });

  return { confirm, isOpen, open, onToggle: setIsOpen };
}

interface IUseConfirmFormProps<T extends FieldValues> {
  action: (data: T) => Promise<boolean>;
  form: UseFormReturn<T>;
  saveOnSuccess?: boolean;
}

export function useConfirmForm<T extends FieldValues>({
  action,
  form,
  saveOnSuccess,
}: IUseConfirmFormProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const inFlight = useRef(false);

  const open = useEvent(() => {
    inFlight.current = false;
    setIsOpen(true);
  });

  const onToggle = useEvent((nextOpen: boolean) => {
    setIsOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
    }
  });

  const confirm = useEvent(async () => {
    if (inFlight.current) {
      return;
    }

    inFlight.current = true;

    let succeeded = false;

    try {
      await form.handleSubmit(async (data) => {
        succeeded = await action(data);

        if (succeeded) {
          if (saveOnSuccess) {
            form.reset(data);
          }

          setIsOpen(false);
        }
      })();
    } catch {
      // Action handlers surface their own errors.
    }

    if (!succeeded) {
      inFlight.current = false;
    }
  });

  return { confirm, isOpen, open, onToggle };
}
