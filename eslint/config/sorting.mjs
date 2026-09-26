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

export const SORTING_RULES = {
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
