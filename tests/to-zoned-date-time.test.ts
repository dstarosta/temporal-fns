import { describe, expect, it } from 'vitest';
import { toZonedDateTime } from '../src/to-zoned-date-time.js';

describe('toZonedDateTime', () => {
  it('converts a Date to a ZonedDateTime in the given time zone', () => {
    const date = new Date(2026, 5, 19, 14, 32, 10);
    const zdt = toZonedDateTime(date, 'UTC');
    expect(zdt.timeZoneId).toBe('UTC');
  });

  it('attaches a time zone to a PlainDate at midnight', () => {
    const pd = Temporal.PlainDate.from('2026-06-19');
    expect(toZonedDateTime(pd, 'UTC').toString()).toBe('2026-06-19T00:00:00+00:00[UTC]');
  });

  it('attaches a time zone to a PlainDateTime', () => {
    const pdt = Temporal.PlainDateTime.from('2026-06-19T14:32:10');
    expect(toZonedDateTime(pdt, 'UTC').toString()).toBe('2026-06-19T14:32:10+00:00[UTC]');
  });

  it('preserves the instant when re-zoning a ZonedDateTime', () => {
    const zdt =
      Temporal.PlainDateTime.from('2026-06-19T12:00:00').toZonedDateTime('America/New_York');
    const reZoned = toZonedDateTime(zdt, 'UTC');
    expect(reZoned.epochMilliseconds).toBe(zdt.epochMilliseconds);
    expect(reZoned.timeZoneId).toBe('UTC');
  });
});
