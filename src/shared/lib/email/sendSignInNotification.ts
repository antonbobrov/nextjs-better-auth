import 'server-only';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { getPathname } from '@/i18n/pathname';
import { routing } from '@/i18n/routing';
import { SITE_ORIGIN } from '@/shared/config/env';
import { SITE_NAME } from '@/shared/config/general';
import { ROUTES } from '@/shared/config/routes';
import { formatUserAgentDevice } from '@/utils';

import { renderEmailTemplate } from './templates/renderEmailTemplate';
import { queueEmail } from './utils/queueEmail';

interface ISession {
  impersonatedBy?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}

export async function sendSignInNotification(session: ISession) {
  if (session.impersonatedBy) {
    return;
  }

  const [user] = await db
    .select({
      email: schema.user.email,
      name: schema.user.name,
    })
    .from(schema.user)
    .where(eq(schema.user.id, session.userId))
    .limit(1);

  if (!user?.email) {
    return;
  }

  const locale = routing.defaultLocale;

  const sessionsUrl = `${SITE_ORIGIN}${getPathname({
    href: ROUTES.account.sessions,
    locale,
  })}`;

  const passwordUrl = `${SITE_ORIGIN}${getPathname({
    href: ROUTES.account.password,
    locale,
  })}`;

  const ip = session.ipAddress || 'unknown';
  const device = formatUserAgentDevice(session.userAgent);
  const time = new Date().toUTCString();

  const html = await renderEmailTemplate({
    actions: [
      { href: passwordUrl, label: 'Change password' },
      { href: sessionsUrl, label: 'Manage sessions' },
    ],
    body: [
      'A new sign-in to your account was detected.',
      `IP: ${ip}\nDevice: ${device}\nTime: ${time}`,
    ],
    companyName: SITE_NAME,
    footnote:
      'If this was not you, change your password and revoke active sessions.',
    heading: 'New sign-in detected',
    preview: 'A new sign-in to your account was detected',
  });

  await queueEmail({
    html,
    subject: `${SITE_NAME}: new sign-in`,
    to: user.email,
    url: passwordUrl,
  });
}
