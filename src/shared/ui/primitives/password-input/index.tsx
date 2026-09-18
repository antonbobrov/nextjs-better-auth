import { useState, type FC } from 'react';

import { Eye, EyeSlash } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';

import { Input } from '../input';

import type { TProps } from './types';

export const PasswordInput: FC<TProps> = (props) => {
  const t = useTranslations('common.actions');

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useEvent(() => setIsVisible((prev) => !prev));

  return (
    <Input
      {...props}
      type={isVisible ? 'text' : 'password'}
      inputRight={
        <Button
          size="sm"
          type="button"
          aria-label={isVisible ? t('hidePassword') : t('showPassword')}
          isIconOnly
          variant="ghost"
          onPress={toggleVisibility}
        >
          {isVisible ? (
            <Eye className="size-4" />
          ) : (
            <EyeSlash className="size-4" />
          )}
        </Button>
      }
    />
  );
};
