/**
 * Enforce `className` to be the last argument in cn(...)/clsx(...).
 *
 * Example (invalid):
 *   className={cn(className, styles.root)}
 *
 * Example (valid):
 *   className={cn(styles.root, className)}
 */

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require className to be last argument in cn()/clsx().',
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
      classNameLast:
        '`className` should be the last argument in {{name}}(...).',
    },
  },

  create(context) {
    const option = context.options?.[0] ?? {};
    /** @type {string[]} */
    const functionNames =
      option.functionNames?.length > 0 ? option.functionNames : ['cn', 'clsx'];

    /**
     * @param {import('estree').Node} node
     */
    function isClassNameExpression(node) {
      // className
      if (node.type === 'Identifier' && node.name === 'className') {
        return true;
      }

      // props.className / this.props.className
      if (node.type === 'MemberExpression' && !node.computed) {
        if (
          node.property?.type === 'Identifier' &&
          node.property.name === 'className'
        ) {
          const obj = node.object;
          if (obj?.type === 'Identifier' && obj.name === 'props') {
            return true;
          }
          if (
            obj?.type === 'MemberExpression' &&
            !obj.computed &&
            obj.object?.type === 'ThisExpression' &&
            obj.property?.type === 'Identifier' &&
            obj.property.name === 'props'
          ) {
            return true;
          }
        }
      }

      return false;
    }

    return {
      CallExpression(node) {
        if (node.callee?.type !== 'Identifier') {
          return;
        }

        const { name } = node.callee;
        if (!functionNames.includes(name)) {
          return;
        }

        if (!node.arguments || node.arguments.length < 2) {
          return;
        }

        const classNameIndex = node.arguments.findIndex((arg) => {
          if (!arg || arg.type === 'SpreadElement') {
            return false;
          }

          return isClassNameExpression(arg);
        });

        if (classNameIndex === -1) {
          return;
        }

        const lastIndex = node.arguments.length - 1;
        if (classNameIndex === lastIndex) {
          return;
        }

        context.report({
          node: node.arguments[classNameIndex],
          messageId: 'classNameLast',
          data: { name },
        });
      },
    };
  },
};

export default rule;
