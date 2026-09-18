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
  token: string;
  userAgent?: string | null;
}

export async function sendSelfUnsuspendEmail({
  email,
  ipAddress,
  token,
  userAgent,
}: IProps) {
  const url = `${SITE_ORIGIN}${getPathname({
    href: ROUTES.auth.selfUnsuspend(),
    locale: routing.defaultLocale,
  })}?token=${token}`;

  const ip = ipAddress || 'unknown';
  const device = formatUserAgentDevice(userAgent);
  const time = new Date().toUTCString();

  const html = await renderEmailTemplate({
    actions: [{ href: url, label: 'Unsuspend account' }],
    body: [
      'A request to unsuspend your account was received.',
      `IP: ${ip}\nDevice: ${device}\nTime: ${time}`,
    ],
    companyName: SITE_NAME,
    footnote:
      'If this was not you, ignore this email.\nYour account will stay suspended.',
    heading: 'Unsuspend your account',
    preview: 'A request to unsuspend your account was received',
  });

  await queueEmail({
    html,
    subject: `${SITE_NAME}: unsuspend your account`,
    to: email,
    url,
  });
}
