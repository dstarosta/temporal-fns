import { describe, expect, it } from 'vitest';
import { isPlainDateTime } from '../src/is-plain-date-time.js';

describe('isPlainDateTime', () => {
  it('returns true for Temporal.PlainDateTime', () => {
    expect(isPlainDateTime(Temporal.PlainDateTime.from('2026-06-19T10:00:00'))).toBe(true);
  });

  it('returns false for Temporal.PlainDate', () => {
    expect(isPlainDateTime(Temporal.PlainDate.from('2026-06-19'))).toBe(false);
  });

  it('returns false for Temporal.ZonedDateTime', () => {
    expect(isPlainDateTime(Temporal.Now.zonedDateTimeISO('UTC'))).toBe(false);
  });

  it('returns false for Date', () => {
    expect(isPlainDateTime(new Date())).toBe(false);
  });

  it('returns false for non-date values', () => {
    expect(isPlainDateTime(null)).toBe(false);
    expect(isPlainDateTime(undefined)).toBe(false);
    expect(isPlainDateTime({})).toBe(false);
  });
});
