import { describe, expect, it } from 'vitest';
import { isZonedDateTime } from '../src/is-zoned-date-time.js';

describe('isZonedDateTime', () => {
  it('returns true for Temporal.ZonedDateTime', () => {
    expect(isZonedDateTime(Temporal.Now.zonedDateTimeISO('UTC'))).toBe(true);
  });

  it('returns false for Temporal.PlainDate', () => {
    expect(isZonedDateTime(Temporal.PlainDate.from('2026-06-19'))).toBe(false);
  });

  it('returns false for Temporal.PlainDateTime', () => {
    expect(isZonedDateTime(Temporal.PlainDateTime.from('2026-06-19T10:00:00'))).toBe(false);
  });

  it('returns false for Date', () => {
    expect(isZonedDateTime(new Date())).toBe(false);
  });

  it('returns false for non-date values', () => {
    expect(isZonedDateTime(null)).toBe(false);
    expect(isZonedDateTime(undefined)).toBe(false);
    expect(isZonedDateTime({})).toBe(false);
  });
});
