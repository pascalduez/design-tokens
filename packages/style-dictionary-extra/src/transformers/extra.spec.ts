import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { length, breakpoint } from './extra.ts';

describe('[transformers] extra', () => {
  describe('length', () => {
    it('should transform length tokens according to extension', () => {
      assert.equal(
        length.transformer(
          {
            $value: 2,
            $type: 'dimension',
            $extensions: {
              'org.tokens.extra': {
                use: 'length',
              },
            },
          },
          { basePxLength: 4 },
        ),
        '8px',
      );
    });
  });

  describe('breakpoint', () => {
    it('should transform breakpoint tokens according to extension', () => {
      assert.equal(
        breakpoint.transformer(
          {
            $value: '640px',
            $type: 'dimension',
            $extensions: {
              'org.tokens.extra': {
                use: 'breakpoint',
              },
            },
          },
          {},
        ),
        '40em',
      );
    });
  });
});
