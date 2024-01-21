import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { abstract } from './extra.ts';

describe('[filters] extra', () => {
  describe('abstract', () => {
    it('should filter out tokens based on the abstract extension', () => {
      assert.equal(
        abstract.matcher({
          $value: 4,
          $type: 'dimension',
          $extensions: {
            'org.tokens.extra': {
              use: 'abstract',
            },
          },
        }),
        false,
      );
    });
  });
});
