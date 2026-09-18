/**
 * If an inline SVG uses only one explicit color, require using `currentColor`.
 *
 * Checks `fill` / `stroke` string values inside a single `<svg>...</svg>`.
 * Auto-fix is supported (for on-save fixes).
 */

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require currentColor for single-color inline SVG (fill/stroke).',
    },
    fixable: 'code',
    schema: [],
    messages: {
      useCurrentColor:
        'This inline <svg> uses a single color ({{color}}). Replace it with `currentColor`.',
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    /**
     * @param {import('estree').Node} valueNode
     * @returns {string | null}
     */
    function getStringValue(valueNode) {
      if (!valueNode) {
        return null;
      }

      // JSXAttribute with no value is boolean-ish: <path fill />
      if (valueNode.type === 'JSXExpressionContainer') {
        return getStringValue(valueNode.expression);
      }

      if (valueNode.type === 'Literal' && typeof valueNode.value === 'string') {
        return valueNode.value;
      }

      return null;
    }

    /**
     * @param {any} valueNode
     * @returns {boolean}
     */
    function isFixableStringValue(valueNode) {
      if (!valueNode) {
        return false;
      }

      if (valueNode.type === 'Literal' && typeof valueNode.value === 'string') {
        return true;
      }

      if (
        valueNode.type === 'JSXExpressionContainer' &&
        valueNode.expression?.type === 'Literal' &&
        typeof valueNode.expression.value === 'string'
      ) {
        return true;
      }

      return false;
    }

    /**
     * @param {string} raw
     */
    function normalizePaint(raw) {
      const v = raw.trim();
      if (!v) {
        return null;
      }

      const lower = v.toLowerCase();
      if (lower === 'none') {
        return null;
      }

      // Gradients/patterns: fill="url(#id)"
      if (lower.startsWith('url(')) {
        return null;
      }

      // CSS variables / calc etc.
      if (lower.includes('var(')) {
        return null;
      }

      return lower;
    }

    /**
     * @param {import('estree').Node} node
     * @param {{colors: Set<string>, nodesByColor: Map<string, any[]>}} acc
     */
    function collectFromJsx(node, acc) {
      if (!node) {
        return;
      }

      if (node.type !== 'JSXElement') {
        return;
      }

      const opening = node.openingElement;
      if (opening?.attributes?.length) {
        for (const attr of opening.attributes) {
          if (!attr || attr.type !== 'JSXAttribute') {
            continue;
          }

          if (!attr.name || attr.name.type !== 'JSXIdentifier') {
            continue;
          }

          const attrName = attr.name.name;
          if (attrName !== 'fill' && attrName !== 'stroke') {
            continue;
          }

          const raw = getStringValue(attr.value);
          if (!raw) {
            continue;
          }

          const paint = normalizePaint(raw);
          if (!paint) {
            continue;
          }

          acc.colors.add(paint);
          const arr = acc.nodesByColor.get(paint) ?? [];
          arr.push(attr);
          acc.nodesByColor.set(paint, arr);
        }
      }

      for (const child of node.children ?? []) {
        // children can be JSXText / JSXExpressionContainer / JSXElement
        if (child?.type === 'JSXElement') {
          collectFromJsx(child, acc);
        }
      }
    }

    return {
      JSXElement(node) {
        const opening = node.openingElement;
        const nameNode = opening?.name;
        if (!nameNode || nameNode.type !== 'JSXIdentifier') {
          return;
        }

        if (nameNode.name !== 'svg') {
          return;
        }

        const acc = { colors: new Set(), nodesByColor: new Map() };
        collectFromJsx(node, acc);

        if (acc.colors.size !== 1) {
          return;
        }

        const [onlyColor] = acc.colors.values();
        if (!onlyColor || onlyColor === 'currentcolor') {
          return;
        }

        const nodes = acc.nodesByColor.get(onlyColor);
        const first = nodes?.[0];
        if (!first) {
          return;
        }

        context.report({
          node: first,
          messageId: 'useCurrentColor',
          data: { color: onlyColor },
          fix(fixer) {
            const attrs = nodes ?? [];
            const fixes = [];

            for (const attr of attrs) {
              if (!attr || attr.type !== 'JSXAttribute') {
                continue;
              }

              if (!isFixableStringValue(attr.value)) {
                continue;
              }

              // Replace attribute value with a string literal: fill="currentColor"
              fixes.push(fixer.replaceText(attr.value, '"currentColor"'));
            }

            if (fixes.length === 0) {
              return null;
            }

            // Ensure we don't report fix when it wouldn't change anything.
            const alreadyOk = fixes.every((f) => {
              const [start, end] = f.range ?? [];
              if (typeof start !== 'number' || typeof end !== 'number') {
                return false;
              }

              return (
                sourceCode.getText().slice(start, end) === '"currentColor"'
              );
            });
            if (alreadyOk) {
              return null;
            }

            return fixes;
          },
        });
      },
    };
  },
};

export default rule;
