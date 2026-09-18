export const APP_RATE_LIMIT = {
  max: 50,
  prefix: 'rl:app',
  window: '1 s',
} as const;

export const MUTATION_RATE_LIMIT = {
  max: 5,
  prefix: 'rl:mutation',
  window: '1 s',
} as const;

export const SENSITIVE_RATE_LIMIT = {
  max: 1,
  prefix: 'rl:sensitive',
  window: '15 s',
} as const;
