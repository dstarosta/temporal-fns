import { describe, expect, it } from 'vitest';
import { isTemporal } from '../src/is-temporal.js';

describe('isTemporal', () => {
  it('returns true for Temporal.PlainDate', () => {
    expect(isTemporal(Temporal.PlainDate.from('2026-06-19'))).toBe(true);
  });

  it('returns true for Temporal.PlainDateTime', () => {
    expect(isTemporal(Temporal.PlainDateTime.from('2026-06-19T10:00:00'))).toBe(true);
  });

  it('returns true for Temporal.ZonedDateTime', () => {
    expect(isTemporal(Temporal.Now.zonedDateTimeISO('UTC'))).toBe(true);
  });

  it('returns false for Date', () => {
    expect(isTemporal(new Date())).toBe(false);
  });

  it('returns false for non-date values', () => {
    expect(isTemporal(null)).toBe(false);
    expect(isTemporal(undefined)).toBe(false);
    expect(isTemporal({})).toBe(false);
  });
});
