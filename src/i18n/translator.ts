import type {
  createTranslator,
  Messages,
  NamespaceKeys,
  NestedKeyOf,
} from 'next-intl';

export type TTranslator<
  NestedKey extends NamespaceKeys<Messages, NestedKeyOf<Messages>> = never,
> = ReturnType<typeof createTranslator<Messages, NestedKey>>;
