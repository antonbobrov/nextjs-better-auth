import {
  Body,
  Button,
  Column,
  Container,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email';

import { MultilineText } from './multiline-text';
import { emailTailwindConfig } from './theme';

import type { IEmailProps } from './types';

const EmailTemplate = ({
  actions = [],
  body,
  companyName,
  footnote,
  heading,
  preview,
}: Readonly<IEmailProps>) => {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <Tailwind config={emailTailwindConfig}>
      <Html>
        <Body className="m-0 bg-bg-2 text-center font-sans">
          <Preview>{preview}</Preview>

          <Container className="mx-auto mt-8 w-full max-w-160">
            <Section>
              <Section className="bg-bg px-6 py-4">
                <Section className="rounded-2xl bg-bg-2 px-10 py-16 text-center">
                  <Section className="mb-3">
                    <Heading
                      className="m-0 text-[28px] font-semibold leading-[1.3] tracking-[-0.084px] text-fg font-sans"
                      as="h1"
                    >
                      {heading}
                    </Heading>
                  </Section>

                  {paragraphs.map((paragraph, index) => (
                    <MultilineText
                      key={paragraph}
                      className={
                        index === paragraphs.length - 1
                          ? 'mx-auto mb-8 mt-0 max-w-95 text-center text-[16px] font-normal leading-normal tracking-[-0.048px] text-fg-2 font-sans'
                          : 'mx-auto mb-4 mt-0 max-w-95 text-center text-[16px] font-normal leading-normal tracking-[-0.048px] text-fg-2 font-sans'
                      }
                    >
                      {paragraph}
                    </MultilineText>
                  ))}

                  {actions.length > 0 ? (
                    <Section className="mb-6 flex flex-col items-center gap-3 text-center">
                      {actions.map((action) => (
                        <Button
                          key={action.href}
                          className="inline-block rounded-lg bg-fg px-7 py-4 text-center text-[16px] font-normal leading-6 tracking-[-0.048px] text-fg-inverted font-sans"
                          href={action.href}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </Section>
                  ) : null}

                  {footnote ? (
                    <MultilineText className="mx-auto mb-0 mt-8 max-w-100 text-center text-[13px] font-normal leading-normal tracking-[-0.039px] text-fg-3 font-sans">
                      {footnote}
                    </MultilineText>
                  ) : null}
                </Section>

                <Section className="bg-bg">
                  <Row>
                    <Column className="px-6 py-10 text-center">
                      <Text className="m-0 text-center text-[11px] font-normal leading-normal tracking-[-0.033px] text-fg-3 font-sans">
                        {companyName}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

EmailTemplate.PreviewProps = {
  actions: [{ href: 'https://example.com/', label: 'Confirm email' }],
  body: [
    'Thank you for signing up for Better Auth.\nTo verify your account, we just need to confirm your email address.',
  ],
  companyName: 'Better Auth',
  footnote: "If you didn't request this,\nplease ignore this email.",
  heading: "We're almost there!",
  preview: 'Confirm your email address',
} satisfies IEmailProps;

export default EmailTemplate;
