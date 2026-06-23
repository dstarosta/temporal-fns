import { describe, expect, it } from 'vitest';
import { isPlainDate } from '../src/is-plain-date.js';

describe('isPlainDate', () => {
  it('returns true for Temporal.PlainDate', () => {
    expect(isPlainDate(Temporal.PlainDate.from('2026-06-19'))).toBe(true);
  });

  it('returns false for Temporal.PlainDateTime', () => {
    expect(isPlainDate(Temporal.PlainDateTime.from('2026-06-19T10:00:00'))).toBe(false);
  });

  it('returns false for Temporal.ZonedDateTime', () => {
    expect(isPlainDate(Temporal.Now.zonedDateTimeISO('UTC'))).toBe(false);
  });

  it('returns false for Date', () => {
    expect(isPlainDate(new Date())).toBe(false);
  });

  it('returns false for non-date values', () => {
    expect(isPlainDate(null)).toBe(false);
    expect(isPlainDate(undefined)).toBe(false);
    expect(isPlainDate({})).toBe(false);
  });
});
