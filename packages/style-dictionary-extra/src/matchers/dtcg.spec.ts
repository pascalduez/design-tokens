import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { DesignToken } from 'style-dictionary';

import * as matchers from './dtcg.ts';

let fixtures = {
  color: {
    matcher: 'isColor',
    $type: 'color',
    value: '#ccc',
  },

  dimension: {
    matcher: 'isDimension',
    $type: 'dimension',
    value: '8px',
  },

  fontFamily: {
    matcher: 'isFontFamily',
    $type: 'fontFamily',
    value: ['Comic Sans', 'sans-serif'],
  },

  fontWeight: {
    matcher: 'isFontWeight',
    $type: 'fontWeight',
    value: 800,
  },

  shadow: {
    matcher: 'isShadow',
    $type: 'shadow',
    value: {
      inset: false,
      offsetX: '0px',
      offsetY: '1px',
      blur: '2px',
      spread: '0px',
      color: 'hsl(0deg 0% 0% / 5%)',
    },
  },

  typography: {
    matcher: 'isTypography',
    $type: 'typography',
    value: {
      fontFamily: 'Comic Sans',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.2,
    },
  },

  duration: {
    matcher: 'isDuration',
    $type: 'duration',
    value: 800,
  },

  transition: {
    matcher: 'isTransiton',
    $type: 'transition',
    value: 800,
  },

  cubicBezier: {
    matcher: 'isCubicBezier',
    $type: 'cubicBezier',
    value: 800,
  },

  lineHeight: {
    matcher: 'isLineHeight',
    $type: 'lineHeight',
    value: 800,
  },
};

let tokens: DesignToken[] = Object.values(fixtures);

describe('[matchers] dtcg', () => {
  for (let [type, token] of Object.entries(fixtures)) {
    describe(token.matcher, () => {
      it(`should test for \`${type}\` type tokens`, () => {
        assert.deepEqual(tokens.filter(matchers[token.matcher]), [token]);
      });
    });
  }
});
