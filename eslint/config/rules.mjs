import prettierConfig from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

import { BOUNDARY_RULES } from './boundaries.mjs';

const LOCAL_RULES = {
  'local/cn-classname-last': 'warn',
  'local/inline-svg-single-color-currentcolor': 'warn',
  'local/no-cn-single-class': 'warn',
  'local/no-large-inline-svg': 'warn',
};

const SONAR_AWS_RULES_OFF = Object.fromEntries(
  Object.keys(sonarjs.configs.recommended.rules ?? {})
    .filter((ruleName) => ruleName.startsWith('sonarjs/aws-'))
    .map((ruleName) => [ruleName, 'off']),
);

const SONAR_RULES = {
  ...SONAR_AWS_RULES_OFF,
  'sonarjs/todo-tag': 'warn',
  'sonarjs/deprecation': 'off',
  'sonarjs/no-async-constructor': 'off',
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
};

export const CHECK_FILE_RULES = {
  'check-file/folder-naming-convention': [
    'error',
    {
      'src/**/': 'NEXT_JS_APP_ROUTER_CASE',
    },
  ],
};

export const CORE_RULES = {
  ...prettierConfig.rules,
  ...tseslint.configs.recommended.rules,
  ...LOCAL_RULES,
  ...SONAR_RULES,
  ...BASE_RULES,
  ...PROMISE_RULES,
  ...REACT_PERF_RULES,
  ...REACT_RULES,
  ...TS_RULES,
  ...IMPORT_RULES,
  ...BOUNDARY_RULES,
};

export const sonarjsRulesOff = Object.fromEntries(
  Object.keys(sonarjs.configs.recommended.rules ?? {}).map((ruleName) => [
    ruleName,
    'off',
  ]),
);

export { sonarjs };
