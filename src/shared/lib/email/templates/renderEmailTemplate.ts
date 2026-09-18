import 'server-only';

import { createElement } from 'react';

import { render } from 'react-email';

import EmailTemplate from './email';

import type { IEmailProps } from './types';

export function renderEmailTemplate(props: IEmailProps) {
  return render(createElement(EmailTemplate, props));
}
