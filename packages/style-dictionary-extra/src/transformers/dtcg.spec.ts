import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  colorHSL,
  shadow,
  cubicBezier,
  transition,
  fontFamily,
} from './dtcg.ts';

describe('[transformers] dtcg', () => {
  describe('colorHSL', () => {
    it('should transform HSL color tokens without an alpha value', () => {
      assert.equal(
        colorHSL.transformer(
          {
            $value: { hue: 0, saturation: 0, lightness: 98 },
          },
          {},
        ),
        'hsl(0deg 0% 98%)',
      );
    });

    it('should transform HSL color tokens with an alpha value of 1', () => {
      assert.equal(
        colorHSL.transformer(
          {
            $value: { hue: 0, saturation: 0, lightness: 98, alpha: 1 },
          },
          {},
        ),
        'hsl(0deg 0% 98%)',
      );
    });

    it('should transform HSL color tokens with an alpha value lower than 1', () => {
      assert.equal(
        colorHSL.transformer(
          {
            $value: { hue: 0, saturation: 0, lightness: 98, alpha: 0.5 },
          },
          {},
        ),
        'hsl(0deg 0% 98% / 50%)',
      );
    });
  });

  describe('shadow', () => {
    it('should transform shadow tokens with a single value', () => {
      assert.equal(
        shadow.transformer(
          {
            $value: {
              inset: false,
              offsetX: '0px',
              offsetY: '1px',
              blur: '2px',
              spread: '0px',
              color: 'hsl(0deg 0% 0% / 5%)',
            },
          },
          {},
        ),
        '0px 1px 2px 0px hsl(0deg 0% 0% / 5%)',
      );
    });

    it('should transform shadow tokens with multiple values', () => {
      assert.equal(
        shadow.transformer(
          {
            $value: [
              {
                inset: false,
                offsetX: '0px',
                offsetY: '1px',
                blur: '2px',
                spread: '0px',
                color: 'hsl(0deg 0% 0% / 6%)',
              },
              {
                inset: false,
                offsetX: '0px',
                offsetY: '1px',
                blur: '3px',
                spread: '0px',
                color: 'hsl(0deg 0% 0% / 10%)',
              },
            ],
          },
          {},
        ),
        '0px 1px 2px 0px hsl(0deg 0% 0% / 6%), 0px 1px 3px 0px hsl(0deg 0% 0% / 10%)',
      );
    });
  });

  describe('cubicBezier', () => {
    it('should transform cubicBezier tokens', () => {
      assert.equal(
        cubicBezier.transformer(
          {
            $value: [0.25, 0.1, 0.25, 1.0],
          },
          {},
        ),
        'cubic-bezier(0.25, 0.1, 0.25, 1)',
      );
    });
  });

  describe('transition', () => {
    it('should transform transition tokens with timingFunction as String', () => {
      assert.equal(
        transition.transformer(
          {
            $value: {
              duration: '130ms',
              delay: '0ms',
              timingFunction: 'ease-in',
            },
          },
          {},
        ),
        '130ms ease-in 0ms',
      );
    });

    it('should transform transition tokens with timingFunction as Array', () => {
      assert.equal(
        transition.transformer(
          {
            $value: {
              duration: '130ms',
              delay: '0ms',
              timingFunction: [0.25, 0.1, 0.25, 1.0],
            },
          },
          {},
        ),
        '130ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms',
      );
    });
  });

  describe('fontFamily', () => {
    it('should transform fontFamily tokens', () => {
      assert.equal(
        fontFamily.transformer(
          {
            $value: ['Inter', 'system-ui', 'sans-serif'],
          },
          {},
        ),
        'Inter, system-ui, sans-serif',
      );
    });
  });
});
