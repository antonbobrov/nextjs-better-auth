import 'server-only';

import { getPathname } from '@/i18n/pathname';
import { routing } from '@/i18n/routing';
import { SITE_ORIGIN } from '@/shared/config/env';
import { SITE_NAME } from '@/shared/config/general';
import { ROUTES } from '@/shared/config/routes';
import { formatUserAgentDevice } from '@/utils';

import { renderEmailTemplate } from './templates/renderEmailTemplate';
import { queueEmail } from './utils/queueEmail';

interface IProps {
  email: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function sendPasswordChangedEmail({
  email,
  ipAddress,
  userAgent,
}: IProps) {
  const locale = routing.defaultLocale;

  const sessionsUrl = `${SITE_ORIGIN}${getPathname({
    href: ROUTES.account.sessions,
    locale,
  })}`;

  const passwordUrl = `${SITE_ORIGIN}${getPathname({
    href: ROUTES.account.password,
    locale,
  })}`;

  const ip = ipAddress || 'unknown';
  const device = formatUserAgentDevice(userAgent);
  const time = new Date().toUTCString();

  const html = await renderEmailTemplate({
    actions: [
      { href: passwordUrl, label: 'Change password' },
      { href: sessionsUrl, label: 'Manage sessions' },
    ],
    body: [
      'Your account password was changed.',
      `IP: ${ip}\nDevice: ${device}\nTime: ${time}`,
    ],
    companyName: SITE_NAME,
    footnote:
      'If this was not you, change your password and revoke active sessions.',
    heading: 'Password changed',
    preview: 'Your account password was changed',
  });

  await queueEmail({
    html,
    subject: `${SITE_NAME}: password changed`,
    to: email,
    url: passwordUrl,
  });
}
