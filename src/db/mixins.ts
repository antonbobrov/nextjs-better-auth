import { timestamp } from 'drizzle-orm/pg-core';

export const dateAt = (name: string) =>
  timestamp(name, {
    precision: 6,
    withTimezone: true,
  });
