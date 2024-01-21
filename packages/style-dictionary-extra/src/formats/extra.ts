import prettier from '@prettier/sync';
import { camelCase } from 'change-case';
import StyleDictionary, { type Format } from 'style-dictionary';

import { isPlainObject } from '../utils/isPlainObject.js';

const {
  formatHelpers: { fileHeader },
} = StyleDictionary;

export const nestedEs: Format = {
  name: 'extra/nested/es',
  formatter: ({ dictionary, file, platform }) => {
    let { prefix } = platform;
    let tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;

    let ouput = [
      fileHeader({ file }),
      'export default ',
      JSON.stringify(minifyDictionary(tokens), null, 2),
    ].join('');

    return prettier.format(ouput, { parser: 'typescript', printWidth: 200 });
  },
};

export const nestedCjs: Format = {
  name: 'extra/nested/cjs',
  formatter: ({ dictionary, file, platform }) => {
    let { prefix } = platform;
    let tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;

    let ouput = [
      fileHeader({ file }),
      'module.exports = ',
      JSON.stringify(minifyDictionary(tokens), null, 2),
    ].join('');

    return prettier.format(ouput, { parser: 'typescript', printWidth: 200 });
  },
};

/**
 * WIP: unused for now.
 */
export const nestedFlow: Format = {
  name: 'extra/nested/flow',
  formatter: args => {
    return [
      '// @flow',
      '\n\n',
      StyleDictionary.format['typescript/module-declarations'](args),
    ].join('');
  },
};

/**
 * Output a nested object.
 * Strip out everything except values.
 */
function minifyDictionary(node) {
  if (!isPlainObject(node)) return node;

  if (node.hasOwnProperty('value')) return node.value;

  let nextNode = {};
  for (let [key, value] of Object.entries(node)) {
    nextNode[camelCase(key)] = minifyDictionary(value);
  }

  return nextNode;
}
