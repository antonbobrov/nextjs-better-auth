import boundaries from 'eslint-plugin-boundaries';
import { recommended as boundariesRecommended } from 'eslint-plugin-boundaries/config';

const SHARED = ['shared', 'shared-lib'];
const INFRA = [...SHARED, 'env', 'i18n'];

function wholeLayer(type, folder = type) {
  return { type, pattern: `src/${folder}`, partialMatch: false };
}

function slicedLayer(type, folder) {
  return {
    type,
    pattern: `src/${folder}/*`,
    partialMatch: false,
    capture: ['slice'],
  };
}

function allowTo(types) {
  return { to: { element: { type: types } } };
}

function allowFrom(fromType, toTypes) {
  return {
    from: { element: { type: fromType } },
    allow: allowTo(toTypes),
  };
}

export const BOUNDARY_ELEMENTS = [
  wholeLayer('app'),
  wholeLayer('layout'),
  // shared/lib before shared — db only from lib
  wholeLayer('shared-lib', 'shared/lib'),
  wholeLayer('shared'),
  wholeLayer('server'),
  wholeLayer('db'),
  wholeLayer('env'),
  wholeLayer('i18n'),

  // FSD pages → src/views
  slicedLayer('pages', 'views'),
  // FSD widgets → src/widgets | src/section(s)
  slicedLayer('widgets', 'widgets'),
  slicedLayer('widgets', 'section'),
  slicedLayer('widgets', 'sections'),
  slicedLayer('features', 'features'),
  slicedLayer('entities', 'entities'),
];

export const BOUNDARY_FILES = [
  { category: 'entry', pattern: 'src/proxy.ts' },
  { category: 'entry', pattern: 'src/middleware.ts' },
  { category: 'entry', pattern: 'proxy.ts' },
  { category: 'entry', pattern: 'middleware.ts' },
];

export const BOUNDARY_SETTINGS = {
  ...boundariesRecommended.settings,
  'boundaries/elements': BOUNDARY_ELEMENTS,
  'boundaries/files': BOUNDARY_FILES,
};

export const BOUNDARY_RULES = {
  ...boundariesRecommended.rules,
  'boundaries/dependencies': [
    'error',
    {
      default: 'disallow',
      policies: [
        // app → pages(views) → layout → widgets|section(s) → features → entities → shared
        allowFrom('app', [
          'pages',
          'layout',
          'widgets',
          'features',
          'entities',
          'server',
          'db',
          ...INFRA,
        ]),
        allowFrom('pages', [
          'layout',
          'widgets',
          'features',
          'entities',
          ...INFRA,
        ]),
        allowFrom('layout', ['widgets', 'features', 'entities', ...INFRA]),
        allowFrom('widgets', ['features', 'entities', ...INFRA]),
        allowFrom('features', ['entities', ...INFRA]),
        allowFrom('entities', INFRA),
        allowFrom('shared-lib', ['shared', 'db', 'env', 'i18n']),
        allowFrom('shared', ['shared-lib', 'env', 'i18n']),
        allowFrom('server', ['db', ...INFRA]),
        allowFrom('db', ['env']),
        allowFrom('i18n', [...SHARED, 'env']),
        {
          from: { file: { categories: 'entry' } },
          allow: allowTo(['server', 'db', ...INFRA]),
        },
      ],
    },
  ],
};

export { boundaries };
