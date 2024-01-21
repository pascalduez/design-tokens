import json5 from 'json5';
import type { Parser } from 'style-dictionary';
import traverse from 'traverse';

import { isPlainObject } from '../utils/isPlainObject.ts';

/**
 * Parse and transform DTCG format to make it Style Dictionary compatible.
 * `$value` --> `value`
 * `$type` --> `type` (and resolve it from parent groups)
 * `$description` --> `comment`
 * `$extensions` --> `$extensions` (untouched)
 *
 * @see https://tr.designtokens.org/format/#name-and-value
 * @see https://tr.designtokens.org/format/#type-0
 * @see https://tr.designtokens.org/format/#description
 */
export const parser: Parser = {
  pattern: /\.json5?$/,
  parse: ({ contents }) => {
    let parsed = json5.parse(contents);

    return traverse(parsed).map(function (node) {
      if (!isToken(node)) return;

      let { $type, $value, $description } = node;

      let resolvedType = this.parents.reduceRight(
        (type, parent) => type ?? parent.node.$type,
        $type,
      );

      this.update({
        ...node,
        ...($description && { comment: $description }),
        ...(resolvedType && { type: resolvedType, $type: resolvedType }),
        value: $value,
      });
    });
  },
};

const isToken = val => isPlainObject(val) && Object.hasOwn(val, '$value');

const isAlias = val =>
  typeof val === 'string' && val.startsWith('{') && val.endsWith('}');
