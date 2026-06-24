import { describe, expect, it } from 'vitest';
import { formatInTimeZone as dateFnsTzFormatInTimeZone } from 'date-fns-tz';
import { formatInTimeZone } from '../src/format-in-time-zone.js';

describe('formatInTimeZone', () => {
  const date = new Date('2014-10-25T10:46:20Z');

  it('matches date-fns-tz for an offset token', () => {
    const fmt = 'yyyy-MM-dd HH:mm:ssXXX';
    expect(formatInTimeZone(date, 'America/New_York', fmt)).toBe(
      dateFnsTzFormatInTimeZone(date, 'America/New_York', fmt)
    );
  });

  it('matches date-fns-tz for a short specific-name token', () => {
    const fmt = 'yyyy-MM-dd HH:mm:ss zzz';
    expect(formatInTimeZone(date, 'America/New_York', fmt)).toBe(
      dateFnsTzFormatInTimeZone(date, 'America/New_York', fmt)
    );
  });

  it('matches date-fns-tz for a different time zone', () => {
    const fmt = 'yyyy-MM-dd HH:mm:ss zzz';
    expect(formatInTimeZone(date, 'Europe/Paris', fmt)).toBe(
      dateFnsTzFormatInTimeZone(date, 'Europe/Paris', fmt)
    );
  });

  it('matches date-fns-tz for a long specific-name token', () => {
    const fmt = 'yyyy-MM-dd HH:mm:ss zzzz';
    expect(formatInTimeZone(date, 'Europe/Paris', fmt)).toBe(
      dateFnsTzFormatInTimeZone(date, 'Europe/Paris', fmt)
    );
  });

  it('reflects the target zone in wall-clock fields too, not just the offset/zone-name tokens', () => {
    const fmt = 'yyyy-MM-dd HH:mm:ss';
    expect(formatInTimeZone(date, 'America/New_York', fmt)).toBe('2014-10-25 06:46:20');
  });

  it('accepts a Temporal.ZonedDateTime as the date argument', () => {
    const zoned = Temporal.ZonedDateTime.from('2014-10-25T10:46:20+00:00[UTC]');
    const fmt = 'yyyy-MM-dd HH:mm:ss zzz';
    expect(formatInTimeZone(zoned, 'America/New_York', fmt)).toBe(
      formatInTimeZone(date, 'America/New_York', fmt)
    );
  });
});
