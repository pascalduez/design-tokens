import StyleDictionary from 'style-dictionary';

import { getExtension, hasExtension } from '../extensions/extra.ts';
import { isDimension, isLineHeight } from '../matchers/dtcg.js';
import { chain } from '../utils/chain.js';

import type { Transform } from '../../types/style-dictionary.ts';

const pxToRem = (token, options = {}) =>
  StyleDictionary.transform['size/pxToRem'].transformer(token, options);

export const length: Transform = {
  type: 'value',
  transitive: true,
  matcher: chain(isDimension, hasExtension('length')),
  transformer: token => {
    let { scale } = getExtension(token) || {};
    let base = parseInt(token.$value);

    if (!scale || !base) return token.$value;

    // https://github.com/amzn/style-dictionary/issues/873
    return pxToRem({ ...token, value: base * scale });
  },
};

export const breakpoint: Transform = {
  type: 'value',
  transitive: true,
  matcher: chain(isDimension, hasExtension('breakpoint')),
  transformer: (token, options) => {
    let val = parseFloat(token.$value);
    let base = options?.basePxFontSize || 16;

    return +(val / base).toFixed(2) + 'em';
  },
};

/**
 * WIP: unused for now.
 *
 * line heights only make sense paired with font sizes.
 */
export const lineHeight: Transform = {
  type: 'value',
  transitive: true,
  matcher: isLineHeight,
  // @ts-ignore
  transformer: (token, options) => {
    let val = parseFloat(token.$value);
    let base = options?.basePxFontSize || 16;

    return +(val / base).toFixed(4);
  },
};
