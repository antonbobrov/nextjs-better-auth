/**
 * Local ESLint plugin (flat config friendly).
 *
 * Add rules here instead of publishing a package.
 */
import cnClassnameLast from './rules/cn-classname-last.mjs';
import inlineSvgSingleColorCurrentcolor from './rules/inline-svg-single-color-currentcolor.mjs';
import noCnSingleClass from './rules/no-cn-single-class.mjs';
import noLargeInlineSvg from './rules/no-large-inline-svg.mjs';

const plugin = {
  rules: {
    'cn-classname-last': cnClassnameLast,
    'inline-svg-single-color-currentcolor': inlineSvgSingleColorCurrentcolor,
    'no-cn-single-class': noCnSingleClass,
    'no-large-inline-svg': noLargeInlineSvg,
  },
};

export default plugin;
