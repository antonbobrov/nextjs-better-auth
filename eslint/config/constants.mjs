const SRC_EXT = '{js,jsx,ts,tsx}';

export const ALL_SOURCE_FILES = [
  '**/*.ts',
  '**/*.js',
  '**/*.mjs',
  '**/*.tsx',
  '**/*.jsx',
  './eslint.config.mjs',
];

export const IGNORES = [
  '.next/**',
  'out/**',
  'build/**',
  'coverage/**',
  'next-env.d.ts',
  'public/**',
  'node_modules/**',
  '**/*.d.ts',
];

/** @param {...string} layers */
export function srcFiles(...layers) {
  return layers.map((layer) => `src/${layer}/**/*.${SRC_EXT}`);
}
