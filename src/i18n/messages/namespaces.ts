export const MESSAGE_NAMESPACES = [
  'errors',
  'common',
  'layout',
  'auth',
  'account',
  'admin',
  'notFound',
] as const;

export type TMessageNamespace = (typeof MESSAGE_NAMESPACES)[number];
