import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: ['**/*.{css,scss}'],
  ignoreDependencies: ['@eslint/js', 'csstype', 'estree'],
};

export default config;
