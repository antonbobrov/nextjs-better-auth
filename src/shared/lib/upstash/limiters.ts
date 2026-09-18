import 'server-only';

import { Ratelimit } from '@upstash/ratelimit';

import {
  APP_RATE_LIMIT,
  MUTATION_RATE_LIMIT,
  SENSITIVE_RATE_LIMIT,
} from '@/shared/config/ratelimit';

import { redis } from './upstash';

export const appLimiter = redis
  ? new Ratelimit({
      limiter: Ratelimit.slidingWindow(
        APP_RATE_LIMIT.max,
        APP_RATE_LIMIT.window,
      ),
      prefix: APP_RATE_LIMIT.prefix,
      redis,
    })
  : null;

export const mutationLimiter = redis
  ? new Ratelimit({
      limiter: Ratelimit.slidingWindow(
        MUTATION_RATE_LIMIT.max,
        MUTATION_RATE_LIMIT.window,
      ),
      prefix: MUTATION_RATE_LIMIT.prefix,
      redis,
    })
  : null;

export const sensitiveLimiter = redis
  ? new Ratelimit({
      limiter: Ratelimit.slidingWindow(
        SENSITIVE_RATE_LIMIT.max,
        SENSITIVE_RATE_LIMIT.window,
      ),
      prefix: SENSITIVE_RATE_LIMIT.prefix,
      redis,
    })
  : null;
