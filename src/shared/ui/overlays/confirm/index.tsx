'use client';

import { memo, type FC, type SubmitEventHandler } from 'react';

import { AlertDialog, Spinner } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

export { useConfirm, useConfirmForm } from './hooks';

const Component: FC<IProps> = ({
  width = 'default',
  autoFocus = 'cancel',
  body,
  cancelLabel,
  confirmLabel,
  form,
  header,
  icon: Icon,
  isOpen,
  isPending,
  status,
  onConfirm,
  onToggle,
}) => {
  const t = useTranslations('common.actions');

  const resolvedCancelLabel = cancelLabel ?? t('cancel');
  const resolvedConfirmLabel = confirmLabel ?? t('confirm');

  const onSubmit: SubmitEventHandler<HTMLFormElement> = useEvent((event) => {
    event.preventDefault();
    onConfirm();
  });

  return (
    <AlertDialog.Backdrop
      isKeyboardDismissDisabled={isPending}
      isOpen={isOpen}
      onOpenChange={onToggle}
    >
      <AlertDialog.Container placement="top">
        <AlertDialog.Dialog
          className={width === 'fit' ? 'max-w-fit' : 'sm:max-w-100'}
        >
          <AlertDialog.CloseTrigger isDisabled={isPending} />

          <AlertDialog.Header>
            <AlertDialog.Icon status={status}>
              {Icon && <Icon className="size-5" />}
            </AlertDialog.Icon>

            <AlertDialog.Heading>{header}</AlertDialog.Heading>
          </AlertDialog.Header>

          <form onSubmit={onSubmit}>
            {(body || form) && (
              <AlertDialog.Body>
                <div className="grid gap-4">
                  {body ? (
                    <p className="min-w-0 wrap-break-word">{body}</p>
                  ) : null}

                  {form}
                </div>
              </AlertDialog.Body>
            )}

            <AlertDialog.Footer>
              {isPending && <Spinner />}

              <Button
                type="button"
                autoFocus={autoFocus === 'cancel'}
                isDisabled={isPending}
                slot="close"
                variant="tertiary"
              >
                {resolvedCancelLabel}
              </Button>

              <Button
                type="submit"
                autoFocus={autoFocus === 'confirm'}
                isDisabled={isPending}
                variant={status === 'danger' ? 'danger' : 'primary'}
              >
                {resolvedConfirmLabel}
              </Button>
            </AlertDialog.Footer>
          </form>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  );
};

Component.displayName = 'Confirm';

export const Confirm = memo(Component);
