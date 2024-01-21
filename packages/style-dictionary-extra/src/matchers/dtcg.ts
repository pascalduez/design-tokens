import type { Matcher } from 'style-dictionary';

// Token type is resolved in `parsers/dtcg` for now.
const getType = token => token.$type || token.type;

// DTCG types

export const isColor: Matcher = token => getType(token) === 'color';

export const isDimension: Matcher = token => getType(token) === 'dimension';

export const isFontFamily: Matcher = token => getType(token) === 'fontFamily';

export const isFontWeight: Matcher = token => getType(token) === 'fontWeight';

// DTCG composite types

export const isShadow: Matcher = token => getType(token) === 'shadow';

export const isTypography: Matcher = token => getType(token) === 'typography';

export const isDuration: Matcher = token => getType(token) === 'duration';

export const isTransiton: Matcher = token => getType(token) === 'transition';

export const isCubicBezier: Matcher = token => getType(token) === 'cubicBezier';

// Not yet in DTCG specs

export const isLineHeight: Matcher = token => getType(token) === 'lineHeight';
