import 'server-only';

import debug from 'debug';
import { createTransport } from 'nodemailer';

import { requireEmailFrom } from '@/env/requireEmailFrom';
import { requireSmtpHost } from '@/env/requireSmtpHost';
import { requireSmtpPassword } from '@/env/requireSmtpPassword';
import { requireSmtpPort } from '@/env/requireSmtpPort';
import { requireSmtpUser } from '@/env/requireSmtpUser';

interface IProps {
  html?: string;
  subject: string;
  to: string;
  url?: string;
}

export async function sendEmail({ html, subject, to, url }: IProps) {
  if (process.env.USE_SMTP !== 'true') {
    debug('send_email')({ subject, to, url });

    return;
  }

  const port = requireSmtpPort();

  const transporter = createTransport({
    auth: {
      pass: requireSmtpPassword(),
      user: requireSmtpUser(),
    },
    host: requireSmtpHost(),
    port,
    secure: port === 465,
  });

  await transporter.sendMail({
    from: requireEmailFrom(),
    html,
    subject,
    to,
  });

  transporter.close();
}
