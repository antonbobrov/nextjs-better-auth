import 'server-only';
import { drizzle } from 'drizzle-orm/node-postgres';

import { requireDatabaseURL } from '@/env/requireDatabaseURL';

import * as schema from './schema';

export const db = drizzle(requireDatabaseURL(), { schema });
