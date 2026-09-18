import z from 'zod';

import {
  zConfirmPassword,
  zEmail,
  zName,
  zPassword,
  zRole,
} from '@/lib/schema/auth';
import { stringifyZodError } from '@/lib/schema/utils';

export const schema = z
  .object({
    role: zRole,
    confirmPassword: zConfirmPassword,
    email: zEmail,
    name: zName,
    password: zPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: stringifyZodError('confirmPassword.mismatch'),
    path: ['confirmPassword'],
  });
