import StyleDictionary from 'style-dictionary';

import {
  isColor,
  isShadow,
  isFontFamily,
  isTypography,
  isFontWeight,
  isCubicBezier,
  isTransiton,
  isDuration,
} from '../matchers/dtcg.ts';

import type { Transform } from '../../types/style-dictionary.ts';

/**
 * Custom transformer to support HSL colors declared as "composite" token.
 * @see https://tr.designtokens.org/format/#composite-design-token
 */
export const colorHSL: Transform = {
  type: 'value',
  transitive: true,
  matcher: isColor,
  transformer: token => {
    let { hue, saturation, lightness, alpha: alphaValue } = token.$value;
    let alpha = alphaValue <= 1 ? alphaValue * 100 : alphaValue;
    let hasAlpha = alpha < 100;

    let params = [
      Math.round(hue) + 'deg',
      Math.round(saturation) + '%',
      Math.round(lightness) + '%',
      hasAlpha && '/',
      hasAlpha && alpha + '%',
    ]
      .filter(Boolean)
      .join(' ');

    return `hsl(${params})`;
  },
};

/**
 * Custom transformer to support shadow declared as "composite" token.
 * @see https://tr.designtokens.org/format/#composite-design-token
 * @see https://tr.designtokens.org/format/#shadow
 */
export const shadow: Transform = {
  type: 'value',
  transitive: true,
  matcher: isShadow,
  transformer: token => {
    let values = Array.isArray(token.$value) ? token.$value : [token.$value];

    let shadows = values.map(shadow => {
      let { inset, offsetX, offsetY, blur, spread, color } = shadow;

      return [inset && 'inset', offsetX, offsetY, blur, spread, color]
        .filter(Boolean)
        .join(' ');
    });

    return shadows.join(', ');
  },
};

/**
 * Custom transformer to support cubic beziers declared as "composite" token.
 * @see https://tr.designtokens.org/format/#composite-design-token
 * @see https://tr.designtokens.org/format/#cubic-bezier
 */
export const cubicBezier: Transform = {
  type: 'value',
  transitive: true,
  matcher: isCubicBezier,
  transformer: token => {
    return `cubic-bezier(${token.$value.join(', ')})`;
  },
};

/**
 * Custom transformer to support transitions declared as "composite" token.
 * @see https://tr.designtokens.org/format/#composite-design-token
 * @see https://tr.designtokens.org/format/#transition
 */
export const transition: Transform = {
  type: 'value',
  transitive: true,
  matcher: isTransiton,
  transformer: token => {
    let { duration, delay, timingFunction } = token.$value;

    let easing = Array.isArray(timingFunction)
      ? // @ts-ignore
        cubicBezier.transformer({ $value: timingFunction })
      : timingFunction;

    return [duration, easing, delay].filter(Boolean).join(' ');
  },
};

/**
 * Custom transformer to support font-family declared as an array of specifiers
 * or a single specifier.
 * @see https://design-tokens.github.io/community-group/format/#font-family
 */
export const fontFamily: Transform = {
  type: 'value',
  transitive: true,
  matcher: isFontFamily,
  transformer: token => {
    let values = Array.isArray(token.$value) ? token.$value : [token.$value];

    return values.map(val => (val.match(/\s/) ? `"${val}"` : val)).join(', ');
  },
};

/**
 * WIP: unused for now.
 *
 * shortand font declaration are to avoid.
 * Concatenation of all typography declarations should probably happen at the
 * component level.
 *
 * Note: SCSS format would need escaping.
 *
 * Custom transformer to support typography composite tokens.
 * @see https://tr.designtokens.org/format/#typography
 */
export const typography: Transform = {
  type: 'value',
  transitive: true,
  matcher: isTypography,
  transformer: (token, options) => {
    let { fontFamily, fontWeight, fontSize, lineHeight } = token.$value;

    return [fontWeight, fontSize, lineHeight && `/ ${lineHeight}`, fontFamily]
      .filter(Boolean)
      .join(' ');
  },
};

/**
 * OpenType weight aliases.
 * @see https://learn.microsoft.com/en-us/typography/opentype/spec/os2#usweightclass
 */
const WGHT_ALIASES = {
  100: ['thin', 'hairline'],
  200: ['extra-light', 'ultra-light'],
  300: ['light'],
  400: ['normal', 'regular', 'book'],
  500: ['medium'],
  600: ['semi-bold', 'demi-bold'],
  700: ['bold'],
  800: ['extra-bold', 'ultra-bold'],
  900: ['black', 'heavy'],
  950: ['extra-black', 'ultra-black'],
};

/**
 * WIP: unused for now.
 *
 * Add string aliases to numeric font-weight types.
 * @see https://design-tokens.github.io/community-group/format/#font-weight
 */
export const fontWeight: Transform = {
  type: 'attribute',
  matcher: isFontWeight,
  transformer: token => ({
    ...token.attributes,
    aliases: WGHT_ALIASES[token.$value],
  }),
};
