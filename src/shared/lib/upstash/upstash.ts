import 'server-only';

import { Client } from '@upstash/qstash';
import { Redis } from '@upstash/redis';

import { requireQstashNextSigningKey } from '@/env/requireQstashNextSigningKey';
import { requireQstashSigningKey } from '@/env/requireQstashSigningKey';
import { requireQstashToken } from '@/env/requireQstashToken';
import { requireQstashUrl } from '@/env/requireQstashUrl';
import { requireUpstashRedisToken } from '@/env/requireUpstashRedisToken';
import { requireUpstashRedisUrl } from '@/env/requireUpstashRedisUrl';

const redisUrl = requireUpstashRedisUrl();
const redisToken = requireUpstashRedisToken();

export const redis =
  redisUrl && redisToken
    ? new Redis({
        token: redisToken,
        url: redisUrl,
      })
    : null;

const qstashUrl = requireQstashUrl();
const qstashToken = requireQstashToken();
const qstashCurrentSigningKey = requireQstashSigningKey();
const qstashNextSigningKey = requireQstashNextSigningKey();

export const qstash =
  qstashUrl && qstashToken && qstashCurrentSigningKey && qstashNextSigningKey
    ? new Client({
        baseUrl: qstashUrl,
        token: qstashToken,
      })
    : null;
