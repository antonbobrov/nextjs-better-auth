import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';

import { BOUNDARY_SETTINGS } from './eslint/config/boundaries.mjs';
import { ALL_SOURCE_FILES, IGNORES } from './eslint/config/constants.mjs';
import { OVERRIDES } from './eslint/config/overrides.mjs';
import { PLUGINS, tseslint } from './eslint/config/plugins.mjs';
import { CORE_RULES, sonarjs } from './eslint/config/rules.mjs';

const TS_PARSER_OPTIONS = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  projectService: {
    allowDefaultProject: ['*.js'],
  },
  tsconfigRootDir: import.meta.dirname,
};

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(IGNORES),

  {
    files: ALL_SOURCE_FILES,
    plugins: PLUGINS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ...TS_PARSER_OPTIONS,
      },
      globals: globals.browser,
    },
    extends: ['js/recommended', sonarjs.configs.recommended],
    rules: CORE_RULES,
    settings: {
      ...BOUNDARY_SETTINGS,
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
  },

  ...OVERRIDES,
]);
