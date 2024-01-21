import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { parser } from './dtcg.ts';

describe('[parser] dtcg', () => {
  it('should parse DTCG tokens format', () => {
    assert.deepEqual(
      parser.parse({
        filePath: 'test.json',
        contents: `{
          color: {
            $type: 'color',
            $value: '#ccc',
            $description: 'test',
          },
        }`,
      }),
      {
        color: {
          $type: 'color',
          $value: '#ccc',
          $description: 'test',
          comment: 'test',
          type: 'color',
          value: '#ccc',
        },
      },
    );
  });

  it('should resolve the `$type` property from parent groups', () => {
    assert.deepEqual(
      parser.parse({
        filePath: 'test.json',
        contents: `{
          color: {
            $type: 'color',
            gray: {
              $value: '#ccc',
            },
          }
        }`,
      }),
      {
        color: {
          $type: 'color',
          gray: {
            $type: 'color',
            $value: '#ccc',
            type: 'color',
            value: '#ccc',
          },
        },
      },
    );
  });
});
