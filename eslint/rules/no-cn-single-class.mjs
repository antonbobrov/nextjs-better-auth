/**
 * Disallow cn(...) / clsx(...) with only one argument.
 *
 * Example (invalid):
 *   className={cn(styles.about)}
 *
 * Example (valid):
 *   className={styles.about}
 *   className={cn(styles.about, isActive && styles.active)}
 */

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow cn() with only one argument.',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          functionNames: {
            type: 'array',
            items: { type: 'string', minLength: 1 },
          },
        },
      },
    ],
    messages: {
      singleArg:
        'Avoid {{name}}() with a single argument; use the argument directly.',
    },
  },

  create(context) {
    const option = context.options?.[0] ?? {};
    /** @type {string[]} */
    const functionNames =
      option.functionNames?.length > 0 ? option.functionNames : ['cn'];

    return {
      CallExpression(node) {
        if (node.callee?.type !== 'Identifier') {
          return;
        }

        const { name } = node.callee;
        if (!functionNames.includes(name)) {
          return;
        }

        if (node.arguments.length !== 1) {
          return;
        }

        const arg = node.arguments[0];
        if (!arg) {
          return;
        }

        // Don't try to auto-fix on obvious edge cases.
        if (arg.type === 'SpreadElement') {
          return;
        }

        context.report({
          node,
          messageId: 'singleArg',
          data: { name },
        });
      },
    };
  },
};

export default rule;
