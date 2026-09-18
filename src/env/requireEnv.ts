import debug from 'debug';

const log = debug('env');

export function requireEnv(name: string, value: string, strict = true) {
  if (!value) {
    if (strict) {
      throw new Error(`Missing required environment variable: ${name}`);
    }

    log(`Missing optional environment variable: ${name}`);
  }

  return value;
}
