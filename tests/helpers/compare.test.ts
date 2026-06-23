import { describe, expect, it } from 'vitest';
import { compare } from '../../src/helpers/compare.js';

describe('compare', () => {
  it('throws when comparing mismatched Temporal types', () => {
    const plainDate = Temporal.PlainDate.from('2026-06-19');
    const plainDateTime = Temporal.PlainDateTime.from('2026-06-19T00:00:00');
    expect(() => compare(plainDate, plainDateTime)).toThrow(TypeError);
  });

  it('throws when comparing a Date against a mismatched Temporal type', () => {
    const date = new Date(2026, 5, 19);
    const plainDate = Temporal.PlainDate.from('2026-06-19');
    expect(() => compare(date, plainDate)).toThrow(TypeError);
  });
});
