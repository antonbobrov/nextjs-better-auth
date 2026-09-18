import z from 'zod';

import { stringifyZodError } from '@/lib/schema/utils';

export const zFromNow = z
  .string()
  .refine((value) => !value || new Date(value).getTime() > Date.now(), {
    error: stringifyZodError('expiration.future'),
  });
