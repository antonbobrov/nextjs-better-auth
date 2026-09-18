import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactPerf from 'eslint-plugin-react-perf';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import localPlugin from './eslint/local-plugin.mjs';

const ALL_SOURCE_FILES = [
  '**/*.ts',
  '**/*.js',
  '**/*.mjs',
  '**/*.tsx',
  '**/*.jsx',
  './eslint.config.mjs',
];

const IGNORES = [
  '.next/**',
  'out/**',
  'build/**',
  'next-env.d.ts',
  'public/**',
  'node_modules/**',
  '**/*.d.ts',
];

const PLUGINS = {
  prettier,
  js,
  promise,
  tseslint,
  import: importPlugin,
  perfectionist,
  react,
  'react-perf': reactPerf,
  'check-file': checkFile,
  local: localPlugin,
};

const CHECK_FILE_RULES = {
  'check-file/folder-naming-convention': [
    'error',
    {
      'src/**/': 'NEXT_JS_APP_ROUTER_CASE',
    },
  ],
};

const TS_PARSER_OPTIONS = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  project: './tsconfig.eslint.json',
  tsconfigRootDir: import.meta.dirname,
};

const IMPORT_ORDER_RULE = [
  'warn',
  {
    groups: [
      'builtin',
      'external',
      'internal',
      'parent',
      'sibling',
      'index',
      'object',
      'type',
    ],
    pathGroups: [
      { pattern: 'react', group: 'external', position: 'before' },
      { pattern: 'react-dom', group: 'external', position: 'before' },
      { pattern: 'next/**', group: 'external', position: 'before' },
      { pattern: 'next', group: 'external', position: 'before' },
      { pattern: '@/**', group: 'internal', position: 'before' },
      {
        pattern: '*.scss',
        group: 'index',
        patternOptions: { matchBase: true },
        position: 'after',
      },
    ],
    pathGroupsExcludedImportTypes: ['react', 'react-dom'],
    'newlines-between': 'always',
    alphabetize: { order: 'asc', caseInsensitive: true },
  },
];

const LOCAL_RULES = {
  'local/cn-classname-last': 'warn',
  'local/inline-svg-single-color-currentcolor': 'warn',
  'local/no-cn-single-class': 'warn',
  'local/no-large-inline-svg': 'warn',
};

const SONAR_RULES = {
  'sonarjs/todo-tag': 'warn',
  'sonarjs/deprecation': 'off',
};

const BASE_RULES = {
  curly: ['warn', 'all'],
  'object-shorthand': ['warn', 'always'],
  'newline-before-return': 'warn',
  'no-async-promise-executor': 'warn',
  'no-promise-executor-return': 'warn',
  'no-useless-catch': 'warn',
  'no-underscore-dangle': [
    'warn',
    { allowAfterThis: true, allowAfterSuper: true },
  ],
  'no-unused-vars': 'off',
  'no-redeclare': 'off',
  'no-console': 'warn',
  'no-alert': 'warn',
  'no-param-reassign': 'error',
  'no-plusplus': 'warn',
  'arrow-body-style': ['warn', 'as-needed'],
  'prefer-template': 'warn',
  'dot-notation': 'warn',
  'prefer-destructuring': ['warn', { object: true, array: false }],
};

const PROMISE_RULES = {
  'promise/always-return': 'off',
  'promise/catch-or-return': 'warn',
};

const REACT_PERF_RULES = {
  'react-perf/jsx-no-new-function-as-prop': 'warn',
  'react-perf/jsx-no-new-object-as-prop': [
    'warn',
    { nativeAllowList: ['style'] },
  ],
  'react-perf/jsx-no-new-array-as-prop': 'warn',
};

const REACT_RULES = {
  'react/function-component-definition': [
    2,
    { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
  ],
  'react/no-array-index-key': 'error',
  'react/require-default-props': 'off',
  'react/display-name': 'warn',
  'react/prop-types': 'off',
  'react/jsx-newline': 'warn',
  'react-hooks/set-state-in-effect': 'off',
  'react-hooks/refs': 'off',
  'react-hooks/immutability': 'off',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error',
  'react/self-closing-comp': ['warn', { component: true, html: true }],
  'react/jsx-no-useless-fragment': 'warn',
  'react/jsx-curly-brace-presence': [
    'warn',
    { props: 'never', children: 'never' },
  ],
};

const TS_RULES = {
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-empty-object-type': 'error',
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/consistent-type-imports': [
    'warn',
    { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
  ],
};

const RESTRICT_SERVER = {
  group: ['@/server', '@/server/*', '@/server/**'],
  message:
    'Import from @/server is only allowed in src/app, middleware, and proxy.',
};

const RESTRICT_APP = {
  group: ['@/app', '@/app/*', '@/app/**'],
  message: 'Do not import from src/app outside src/app.',
};

const RESTRICT_VIEWS = {
  group: ['@/views', '@/views/*', '@/views/**'],
  message: 'Do not import from the views layer outside src/app and src/views.',
};

const RESTRICT_LAYOUT = {
  group: ['@/layout', '@/layout/*', '@/layout/**'],
  message:
    'Import from @/layout is only allowed in src/app, src/views, and src/layout.',
};

const RESTRICT_ENTITIES = {
  group: ['@/entities', '@/entities/*', '@/entities/**'],
  message: 'Import from @/entities is not allowed in src/shared.',
};

const RESTRICT_ROUTER = {
  group: ['next/navigation', '@/i18n/navigation'],
  importNames: ['useRouter'],
  message:
    'useRouter is only allowed in src/app, src/views, and src/layout. Pass navigation callbacks instead.',
};

const IMPORT_RULES = {
  'import/order': IMPORT_ORDER_RULE,
  'import/no-unresolved': 'off',
  'import/no-duplicates': 'warn',
  'import/no-unused-modules': 'off',
  'import/no-self-import': 'warn',
  'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],
  'import/first': 'warn',
  'import/newline-after-import': 'warn',
  'import/no-absolute-path': 'warn',
  'import/no-relative-packages': 'warn',
  'no-restricted-imports': [
    'error',
    {
      patterns: [RESTRICT_SERVER, RESTRICT_APP],
    },
  ],
};

const SORT_RESERVED_PROPS = ['^key$', '^ref$'];

const SORT_MODIFIERS_PROPS = [
  '^id$',
  '^type$',
  '^tag$',
  '^tagName$',
  '^href$',
  '^target$',
  '^rel$',
];

const SORT_STYLING_PROPS = [
  '^className$',
  '^style$',
  '^theme$',
  '^size$',
  '^kind$',
];

const SORT_GROUP_ORDER = [
  'reserved',
  'styling',
  'modifiers',
  'img-src',
  'img-width',
  'img-height',
  'img-alt',
  'img-sizes',
  'img-priority',
  'aria',
  'data',
  'unknown',
  'callbacks',
];

const SORT_IMAGE_CUSTOM_GROUPS = [
  { groupName: 'img-src', elementNamePattern: '^src$' },
  { groupName: 'img-width', elementNamePattern: '^width$' },
  { groupName: 'img-height', elementNamePattern: '^height$' },
  { groupName: 'img-alt', elementNamePattern: '^alt$' },
  { groupName: 'img-sizes', elementNamePattern: '^sizes$' },
  { groupName: 'img-priority', elementNamePattern: '^priority$' },
];

function makeSortingRuleOptions({
  ariaElementNamePattern,
  callbacksElementNamePattern,
  dataElementNamePattern,
}) {
  return {
    customGroups: [
      {
        groupName: 'reserved',
        elementNamePattern: SORT_RESERVED_PROPS,
      },
      {
        groupName: 'modifiers',
        elementNamePattern: SORT_MODIFIERS_PROPS,
      },
      {
        groupName: 'styling',
        elementNamePattern: SORT_STYLING_PROPS,
      },
      ...SORT_IMAGE_CUSTOM_GROUPS,
      {
        groupName: 'aria',
        elementNamePattern: ariaElementNamePattern,
      },
      {
        groupName: 'data',
        elementNamePattern: dataElementNamePattern,
      },
      {
        groupName: 'callbacks',
        elementNamePattern: callbacksElementNamePattern,
      },
    ],
    groups: SORT_GROUP_ORDER,
    order: 'asc',
    type: 'natural',
  };
}

const SORTING_RULES = {
  'perfectionist/sort-interfaces': ['warn', { type: 'natural', order: 'asc' }],
  'perfectionist/sort-jsx-props': [
    'warn',
    makeSortingRuleOptions({
      ariaElementNamePattern: ['^aria-', '^role$', '^controls$', '^tabIndex$'],
      callbacksElementNamePattern: '^on[A-Z]',
      dataElementNamePattern: '^data-',
    }),
  ],
  'perfectionist/sort-object-types': [
    'warn',
    { type: 'natural', order: 'asc' },
  ],
  'perfectionist/sort-objects': [
    'warn',
    makeSortingRuleOptions({
      ariaElementNamePattern: [
        '^aria-.*',
        '^role$',
        '^controls$',
        '^tabIndex$',
      ],
      callbacksElementNamePattern: '^on[A-Z].*',
      dataElementNamePattern: '^data-.*',
    }),
  ],
};

const sonarjsRulesOff = Object.fromEntries(
  Object.keys(sonarjs.configs.recommended.rules ?? {}).map((ruleName) => [
    ruleName,
    'off',
  ]),
);

const eslintConfig = defineConfig([
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
    rules: {
      ...prettierConfig.rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': ['warn'],

      ...LOCAL_RULES,
      ...SONAR_RULES,
      ...BASE_RULES,
      ...PROMISE_RULES,
      ...REACT_PERF_RULES,
      ...REACT_RULES,
      ...TS_RULES,
      ...IMPORT_RULES,
    },
    settings: {
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

  {
    files: ['src/shared/svg/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'local/no-large-inline-svg': 'off',
    },
  },

  {
    files: ['eslint/**/*.{js,jsx,ts,tsx,mjs}'],
    rules: sonarjsRulesOff,
  },

  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
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
    files: ['src/shared/**/*.{js,jsx,ts,tsx}', 'src/env/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            RESTRICT_SERVER,
            RESTRICT_APP,
            RESTRICT_VIEWS,
            RESTRICT_LAYOUT,
            RESTRICT_ENTITIES,
          ],
        },
      ],
    },
  },

  {
    files: ['src/entities/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            RESTRICT_SERVER,
            RESTRICT_APP,
            RESTRICT_VIEWS,
            RESTRICT_LAYOUT,
          ],
        },
      ],
    },
  },

  {
    files: ['src/layout/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [RESTRICT_SERVER, RESTRICT_APP, RESTRICT_VIEWS],
        },
      ],
    },
  },

  {
    files: ['src/views/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [RESTRICT_SERVER, RESTRICT_APP],
        },
      ],
    },
  },

  {
    files: [
      'src/features/**/*.{js,jsx,ts,tsx}',
      'src/widgets/**/*.{js,jsx,ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            RESTRICT_SERVER,
            RESTRICT_APP,
            RESTRICT_VIEWS,
            RESTRICT_LAYOUT,
            RESTRICT_ROUTER,
          ],
        },
      ],
    },
  },

  {
    files: ['src/shared/lib/email/templates/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  {
    files: ['src/app/**/*.{js,jsx,ts,tsx}', 'src/i18n/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
      'no-restricted-imports': 'off',
    },
  },

  {
    files: [
      'src/server/**/*.{js,jsx,ts,tsx}',
      'src/middleware.{js,jsx,ts,tsx}',
      'src/proxy.{js,jsx,ts,tsx}',
      'middleware.{js,jsx,ts,tsx}',
      'proxy.{js,jsx,ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [RESTRICT_APP, RESTRICT_VIEWS, RESTRICT_LAYOUT],
        },
      ],
    },
  },
]);

export default eslintConfig;
