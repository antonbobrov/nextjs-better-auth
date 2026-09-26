import { srcFiles } from './constants.mjs';
import { PLUGINS, checkFile } from './plugins.mjs';
import { CHECK_FILE_RULES, sonarjsRulesOff } from './rules.mjs';
import { SORTING_RULES } from './sorting.mjs';

export const OVERRIDES = [
  {
    files: srcFiles('shared/svg'),
    rules: {
      'local/no-large-inline-svg': 'off',
    },
  },
  {
    files: ['eslint/**/*.{js,jsx,ts,tsx,mjs}'],
    rules: sonarjsRulesOff,
  },
  {
    files: [`src/**/*.{js,jsx,ts,tsx}`],
    plugins: PLUGINS,
    rules: {
      ...SORTING_RULES,
      ...CHECK_FILE_RULES,
      'import/no-default-export': 'error',
    },
  },
  {
    files: ['src/**/*.scss'],
    plugins: {
      'check-file': checkFile,
    },
    processor: 'check-file/eslint-processor-check-file',
    rules: CHECK_FILE_RULES,
  },
  {
    files: srcFiles('shared/lib/email/templates'),
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: srcFiles('app', 'i18n'),
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
