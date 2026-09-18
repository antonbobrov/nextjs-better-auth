import z from 'zod';

import { stringifyZodError } from '@/lib/schema/utils';
import { TWO_FACTOR } from '@/shared/config/auth';
import { PASSWORD_MIN_LENGTH, USER_ROLE_IDS } from '@/shared/config/user';

export const zName = z
  .string()
  .min(1, stringifyZodError('name.required'))
  .max(255, stringifyZodError('name.max', { max: 255 }));

export const zEmail = z.email({
  error: (iss) =>
    iss.input === ''
      ? stringifyZodError('email.required')
      : stringifyZodError('email.invalid'),
});

export const zPassword = z
  .string()
  .min(1, stringifyZodError('password.required'))
  .min(
    PASSWORD_MIN_LENGTH,
    stringifyZodError('password.min', { min: PASSWORD_MIN_LENGTH }),
  )
  .max(128, stringifyZodError('password.max', { max: 128 }));

export const zCurrentPassword = z
  .string()
  .min(1, stringifyZodError('currentPassword.required'))
  .max(128, stringifyZodError('password.max', { max: 128 }));

export const zConfirmPassword = z
  .string()
  .min(1, stringifyZodError('confirmPassword.required'))
  .max(128, stringifyZodError('password.max', { max: 128 }));

export const zTotpCode = z
  .string()
  .min(1, stringifyZodError('authenticatorCode.required'))
  .regex(
    new RegExp(`^\\d{${TWO_FACTOR.digits}}$`),
    stringifyZodError('authenticatorCode.format', { count: TWO_FACTOR.digits }),
  );

export const zTwoFactorBackupCode = z
  .string()
  .trim()
  .min(1, stringifyZodError('backupCode.required'))
  .max(64, stringifyZodError('backupCode.max', { max: 64 }));

export const zRole = z.enum(USER_ROLE_IDS);

export const zBanReason = z
  .string()
  .min(1, stringifyZodError('reason.required'))
  .max(255, stringifyZodError('reason.max', { max: 255 }));
