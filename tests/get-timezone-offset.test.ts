import { describe, expect, it } from 'vitest';
import { getTimezoneOffset as dateFnsTzGetTimezoneOffset } from 'date-fns-tz';
import { getTimezoneOffset } from '../src/get-timezone-offset.js';

describe('getTimezoneOffset', () => {
  it('matches date-fns-tz for a raw offset string', () => {
    expect(getTimezoneOffset('-07:00')).toBe(dateFnsTzGetTimezoneOffset('-07:00'));
  });

  it('matches date-fns-tz for an IANA zone with no DST', () => {
    expect(getTimezoneOffset('Africa/Johannesburg')).toBe(
      dateFnsTzGetTimezoneOffset('Africa/Johannesburg')
    );
  });

  it('matches date-fns-tz for an IANA zone in standard time', () => {
    const date = new Date(2016, 0, 1);
    expect(getTimezoneOffset('America/New_York', date)).toBe(
      dateFnsTzGetTimezoneOffset('America/New_York', date)
    );
  });

  it('matches date-fns-tz for an IANA zone in daylight saving time', () => {
    const date = new Date(2016, 6, 1);
    expect(getTimezoneOffset('America/New_York', date)).toBe(
      dateFnsTzGetTimezoneOffset('America/New_York', date)
    );
  });

  it('defaults to the current instant when date is omitted', () => {
    const before = Date.now();
    const result = getTimezoneOffset('America/New_York');
    const after = Date.now();
    const expectedAtBefore = getTimezoneOffset('America/New_York', new Date(before));
    const expectedAtAfter = getTimezoneOffset('America/New_York', new Date(after));
    expect([expectedAtBefore, expectedAtAfter]).toContain(result);
  });

  it('accepts a Temporal.ZonedDateTime as the date argument', () => {
    const zoned = Temporal.ZonedDateTime.from('2016-07-01T00:00:00-04:00[America/New_York]');
    expect(getTimezoneOffset('America/New_York', zoned)).toBe(-4 * 60 * 60 * 1000);
  });

  it('accepts a Temporal.PlainDateTime as the date argument (read as UTC, per the UTC rule)', () => {
    const plainDateTime = Temporal.PlainDateTime.from('2016-07-01T00:00:00');
    expect(getTimezoneOffset('America/New_York', plainDateTime)).toBe(-4 * 60 * 60 * 1000);
  });
});
