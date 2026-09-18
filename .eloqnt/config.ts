import { defineConfig } from '@eloqnt/cli';

export default defineConfig({
  srcPath: './src',
  messages: {
    path: './src/i18n/messages/{locale}/{namespace}',
    locales: 'infer',
    sourceLocale: 'en',
    format: 'json',
  },
  lint: {
    overrides: [
      {
        keys: 'errors.*',
        rules: {
          'orphan-message': 'off',
        },
      },
    ],
  },
});
