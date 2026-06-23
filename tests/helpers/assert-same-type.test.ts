import { describe, expect, it } from 'vitest';
import { assertSameType } from '../../src/helpers/assert-same-type.js';

describe('assertSameType', () => {
  it('throws when comparing mismatched Temporal types', () => {
    const plainDate = Temporal.PlainDate.from('2026-06-19');
    const plainDateTime = Temporal.PlainDateTime.from('2026-06-19T00:00:00');
    expect(() => {
      assertSameType(plainDate, plainDateTime);
    }).toThrow(TypeError);
  });
});
