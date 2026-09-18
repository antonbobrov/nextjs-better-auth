import 'server-only';

import { SITE_NAME } from '@/shared/config/general';

import { renderEmailTemplate } from './templates/renderEmailTemplate';
import { queueEmail } from './utils/queueEmail';

interface IProps {
  email: string;
  url: string;
}

export async function sendConfirmEmail({ email, url }: IProps) {
  const html = await renderEmailTemplate({
    actions: [{ href: url, label: 'Confirm email' }],
    body: `Thank you for signing up for ${SITE_NAME}.\nTo verify your account, we just need to confirm your email address.`,
    companyName: SITE_NAME,
    footnote: "If you didn't request this,\nplease ignore this email.",
    heading: "We're almost there!",
    preview: 'Confirm your email address',
  });

  await queueEmail({
    html,
    subject: 'Verify your email address',
    to: email,
    url,
  });
}
