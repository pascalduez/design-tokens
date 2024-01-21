import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import dedent from 'dedent';

import { nestedEs, nestedCjs } from './extra.ts';

let fixtures: any = {
  dictionary: {
    tokens: {
      color: {
        $type: 'color',
        value: '#ccc',
      },

      dimension: {
        $type: 'dimension',
        value: '8px',
      },

      fontWeight: {
        $type: 'fontWeight',
        value: 800,
      },
    },
  },
  file: { options: { showFileHeader: false } },
  platform: {},
};

describe('[formats] extra', () => {
  describe('extra/nested/es', () => {
    it('should formats tokens', () => {
      assert.equal(
        nestedEs.formatter(fixtures).trim(),
        dedent`export default {
          color: "#ccc",
          dimension: "8px",
          fontWeight: 800,
        };`,
      );
    });

    it('should formats tokens with added prefix', () => {
      assert.equal(
        nestedEs
          .formatter({ ...fixtures, platform: { prefix: 'test' } })
          .trim(),
        dedent`export default {
          test: {
            color: "#ccc",
            dimension: "8px",
            fontWeight: 800,
          },
        };`,
      );
    });
  });

  describe('extra/nested/cjs', () => {
    it('should formats tokens', () => {
      assert.equal(
        nestedCjs.formatter(fixtures).trim(),
        dedent`module.exports = {
          color: "#ccc",
          dimension: "8px",
          fontWeight: 800,
        };`,
      );
    });

    it('should formats tokens with added prefix', () => {
      assert.equal(
        nestedCjs
          .formatter({ ...fixtures, platform: { prefix: 'test' } })
          .trim(),
        dedent`module.exports = {
          test: {
            color: "#ccc",
            dimension: "8px",
            fontWeight: 800,
          },
        };`,
      );
    });
  });
});
