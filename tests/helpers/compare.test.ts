import { describe, expect, it } from 'vitest';
import { compare } from '../../src/helpers/compare.js';

describe('compare', () => {
  it('throws when comparing mismatched Temporal types', () => {
    const plainDate = Temporal.PlainDate.from('2026-06-19');
    const plainDateTime = Temporal.PlainDateTime.from('2026-06-19T00:00:00');
    expect(() => compare(plainDate, plainDateTime)).toThrow(TypeError);
  });
});
