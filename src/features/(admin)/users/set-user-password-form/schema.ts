import z from 'zod';

import { zConfirmPassword, zPassword } from '@/lib/schema/auth';
import { stringifyZodError } from '@/lib/schema/utils';

export const schema = z
  .object({
    confirmPassword: zConfirmPassword,
    password: zPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: stringifyZodError('confirmPassword.mismatch'),
    path: ['confirmPassword'],
  });
