import z from 'zod';

import { zTotpCode, zTwoFactorBackupCode } from '@/lib/schema/auth';
import { stringifyZodError } from '@/lib/schema/utils';
import { TWO_FACTOR } from '@/shared/config/auth';

export const schema = z
  .object({
    code: z.string().min(1, stringifyZodError('backupCode.required')),
    trustDevice: z.boolean(),
    useBackupCode: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.useBackupCode) {
      const result = zTwoFactorBackupCode.safeParse(data.code);

      if (!result.success) {
        ctx.addIssue({
          code: 'custom',
          message:
            result.error.issues[0]?.message ??
            stringifyZodError('backupCode.invalid'),
          path: ['code'],
        });
      }

      return;
    }

    const result = zTotpCode.safeParse(data.code);

    if (!result.success) {
      ctx.addIssue({
        code: 'custom',
        message:
          result.error.issues[0]?.message ??
          stringifyZodError('authenticatorCode.format', {
            count: TWO_FACTOR.digits,
          }),
        path: ['code'],
      });
    }
  });
