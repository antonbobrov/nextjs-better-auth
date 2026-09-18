/**
 * Disallow big inline SVG in JSX/TSX.
 *
 * Rationale: large inline SVGs bloat JS bundles, hurt readability, and duplicate
 * markup. Prefer importing an SVG file (SVGR) or extracting to a dedicated component.
 */

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow big inline <svg> in JSX/TSX.',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          /**
           * Maximum number of characters in inline SVG markup
           * (whitespace is removed before counting).
           */
          maxChars: { type: 'number', minimum: 1 },
        },
      },
    ],
    messages: {
      tooLarge:
        'Inline <svg> is too large ({{size}} chars, limit {{max}}). Extract it into a separate file/component.',
    },
  },

  create(context) {
    const option = context.options?.[0] ?? {};
    const maxChars =
      typeof option.maxChars === 'number' ? option.maxChars : 450;
    const sourceCode = context.getSourceCode();

    return {
      JSXElement(node) {
        const opening = node.openingElement;
        if (!opening) {
          return;
        }

        const nameNode = opening.name;
        if (!nameNode || nameNode.type !== 'JSXIdentifier') {
          return;
        }

        if (nameNode.name !== 'svg') {
          return;
        }

        const raw = sourceCode.getText(node);
        const compactSize = raw.replace(/\s+/g, '').length;

        if (compactSize <= maxChars) {
          return;
        }

        context.report({
          node: nameNode,
          messageId: 'tooLarge',
          data: { size: String(compactSize), max: String(maxChars) },
        });
      },
    };
  },
};

export default rule;
