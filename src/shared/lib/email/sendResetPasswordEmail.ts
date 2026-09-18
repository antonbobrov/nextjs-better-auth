import 'server-only';

import { SITE_NAME } from '@/shared/config/general';

import { renderEmailTemplate } from './templates/renderEmailTemplate';
import { queueEmail } from './utils/queueEmail';

interface IProps {
  email: string;
  url: string;
}

export async function sendResetPasswordEmail({ email, url }: IProps) {
  const html = await renderEmailTemplate({
    actions: [{ href: url, label: 'Reset password' }],
    body: 'Click the button below to reset your password.',
    companyName: SITE_NAME,
    footnote: "If you didn't request this,\nplease ignore this email.",
    heading: 'Reset your password',
    preview: 'Reset your password',
  });

  await queueEmail({
    html,
    subject: 'Reset your password',
    to: email,
    url,
  });
}
