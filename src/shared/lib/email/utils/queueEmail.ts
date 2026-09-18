import 'server-only';

import { qstash } from '@/lib/upstash/upstash';
import { SITE_ORIGIN } from '@/shared/config/env';
import { ROUTES } from '@/shared/config/routes';

import { sendEmail } from './sendEmail';

interface IProps {
  html?: string;
  subject: string;
  to: string;
  url?: string;
}

export async function queueEmail({ html, subject, to, url }: IProps) {
  if (qstash) {
    await qstash.publishJSON({
      body: {
        html,
        subject,
        to,
        url,
      },
      url: SITE_ORIGIN + ROUTES.api.sendEmail,
    });

    return;
  }

  await sendEmail({ html, subject, to, url });
}
