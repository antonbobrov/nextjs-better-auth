import 'server-only';

import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { i18n, locales } from '@better-auth/i18n';
import { betterAuth } from 'better-auth';
import { APIError, createAuthMiddleware, isAPIError } from 'better-auth/api';
import { admin, twoFactor } from 'better-auth/plugins';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { getPathname } from '@/i18n/pathname';
import { routing } from '@/i18n/routing';
import {
  EMAIL_VERIFICATION,
  RATE_LIMIT,
  RESET_PASSWORD,
  SESSION,
  SIGN_UP,
  TWO_FACTOR,
} from '@/shared/config/auth';
import { SITE_ORIGIN } from '@/shared/config/env';
import { SITE_NAME } from '@/shared/config/general';
import { ROUTES } from '@/shared/config/routes';
import { PASSWORD_MIN_LENGTH } from '@/shared/config/user';

import { sendConfirmEmail } from '../email/sendConfirmEmail';
import { sendPasswordChangedEmail } from '../email/sendPasswordChangedEmail';
import { sendResetPasswordEmail } from '../email/sendResetPasswordEmail';
import { sendSignInNotification } from '../email/sendSignInNotification';
import { getRequestMeta } from '../request';

import {
  SELF_SUSPEND_ERROR_CODE,
  SELF_SUSPEND_ERROR_MESSAGE,
} from './messages';

export const authServer = betterAuth({
  appName: SITE_NAME,
  database: drizzleAdapter(db, { provider: 'pg' }),
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          void sendSignInNotification(session).catch(() => undefined);
        },
        before: async (session) => {
          const rows = await db
            .select({ selfSuspended: schema.user.selfSuspended })
            .from(schema.user)
            .where(eq(schema.user.id, session.userId))
            .limit(1);

          if (rows[0]?.selfSuspended) {
            throw APIError.from('FORBIDDEN', {
              code: SELF_SUSPEND_ERROR_CODE,
              message: SELF_SUSPEND_ERROR_MESSAGE,
            });
          }
        },
      },
    },
  },
  emailAndPassword: {
    autoSignIn: SIGN_UP.autoSignIn,
    disableSignUp: !SIGN_UP.enabled,
    enabled: true,
    minPasswordLength: PASSWORD_MIN_LENGTH,
    requireEmailVerification: SIGN_UP.requireVerification,
    resetPasswordTokenExpiresIn: RESET_PASSWORD.expiresIn,
    sendResetPassword: async ({ url, user }) => {
      await sendResetPasswordEmail({
        email: user.email,
        url,
      });
    },
    onExistingUserSignUp: async ({ user }) => {
      if (user.emailVerified) {
        return;
      }

      if (!SIGN_UP.requireVerification) {
        return;
      }

      if (!SIGN_UP.resendVerification) {
        return;
      }

      await authServer.api.sendVerificationEmail({
        body: {
          callbackURL: getPathname({
            href: ROUTES.auth.signIn(),
            locale: routing.defaultLocale,
          }),
          email: user.email,
        },
      });
    },
    onPasswordReset: async ({ user }, request) => {
      const meta = getRequestMeta(request);

      void sendPasswordChangedEmail({
        email: user.email,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      }).catch(() => undefined);
    },
  },
  emailVerification: {
    autoSignInAfterVerification: EMAIL_VERIFICATION.autoSignIn,
    expiresIn: EMAIL_VERIFICATION.expiresIn,
    sendVerificationEmail: async ({ token, user }) => {
      if (!SIGN_UP.requireVerification) {
        return;
      }

      const url = `${SITE_ORIGIN}${getPathname({
        href: ROUTES.auth.verifyEmail,
        locale: routing.defaultLocale,
      })}?token=${encodeURIComponent(token)}`;

      await sendConfirmEmail({
        email: user.email,
        url,
      });
    },
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (isAPIError(ctx.context.returned)) {
        return;
      }

      const meta = getRequestMeta(ctx.request ?? ctx.headers);

      if (ctx.path === '/change-password') {
        const { session } = ctx.context;

        if (!session?.user?.email || session.session?.impersonatedBy) {
          return;
        }

        void sendPasswordChangedEmail({
          email: session.user.email,
          ipAddress: meta.ipAddress ?? session.session?.ipAddress,
          userAgent: meta.userAgent ?? session.session?.userAgent,
        }).catch(() => undefined);
      }
    }),
  },
  plugins: [
    admin(),
    twoFactor({
      issuer: SITE_NAME,
      totpOptions: {
        digits: TWO_FACTOR.digits,
      },
    }),
    i18n({
      translations: {
        en: locales.en,
        ru: locales.ru,
      },
    }),
  ],
  rateLimit: {
    enabled: true,
    max: RATE_LIMIT.max,
    storage: 'database',
    window: RATE_LIMIT.window,
  },
  session: {
    expiresIn: SESSION.expiresIn,
    freshAge: 0,
    updateAge: SESSION.updateAge,
  },
  user: {
    additionalFields: {
      selfSuspended: {
        type: 'boolean',
        defaultValue: false,
        input: false,
        required: false,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
});
