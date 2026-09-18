'use client';

import { memo, Suspense, type FC } from 'react';

import { useSearchParams } from 'next/navigation';

import { hasLocale, useLocale, useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import type { IComponent } from '@/types/Component';
import { Select } from '@/ui/primitives/select';
import { cn } from '@/utils';

import { LOCALE_OPTIONS } from './data';

const Component: FC<IComponent> = ({ className, style }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('layout.nav');

  const onChange = useEvent((next: string) => {
    if (!hasLocale(routing.locales, next) || next === locale) {
      return;
    }

    const query = searchParams?.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    router.replace(href, { locale: next });
  });

  return (
    <div className={cn('w-36', className)} style={style} data-keep-menu>
      <Select
        aria-label={t('language')}
        fullWidth
        options={LOCALE_OPTIONS}
        value={locale}
        onChange={onChange}
      />
    </div>
  );
};

const Suspended: FC<IComponent> = (props) => (
  <Suspense fallback={<div className={cn('h-10 w-36', props.className)} />}>
    <Component {...props} />
  </Suspense>
);

Suspended.displayName = 'LocaleSelect';

export const LocaleSelect = memo(Suspended);
