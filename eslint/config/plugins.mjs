import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactPerf from 'eslint-plugin-react-perf';
import tseslint from 'typescript-eslint';

import localPlugin from '../local-plugin.mjs';

export const PLUGINS = {
  js,
  promise,
  tseslint,
  import: importPlugin,
  perfectionist,
  react,
  'react-perf': reactPerf,
  'check-file': checkFile,
  boundaries,
  local: localPlugin,
};

export { checkFile, tseslint };
