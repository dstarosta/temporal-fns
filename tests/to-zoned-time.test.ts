import { describe, expect, it } from 'vitest';
import { toZonedTime as dateFnsTzToZonedTime } from 'date-fns-tz';
import { toZonedTime } from '../src/to-zoned-time.js';

describe('toZonedTime', () => {
  it('matches date-fns-tz for an IANA zone west of the system zone', () => {
    const date = new Date('2014-06-25T10:00:00.000Z');
    expect(toZonedTime(date, 'America/New_York')).toEqual(
      dateFnsTzToZonedTime(date, 'America/New_York')
    );
  });

  it('matches date-fns-tz for an IANA zone east of the system zone', () => {
    const date = new Date('2014-06-25T10:00:00.000Z');
    expect(toZonedTime(date, 'Asia/Tokyo')).toEqual(dateFnsTzToZonedTime(date, 'Asia/Tokyo'));
  });

  it('matches the documented example', () => {
    // In June 10am UTC is 6am in New York (-04:00)
    const result = toZonedTime(new Date('2014-06-25T10:00:00.000Z'), 'America/New_York');
    expect(result.getFullYear()).toBe(2014);
    expect(result.getMonth()).toBe(5);
    expect(result.getDate()).toBe(25);
    expect(result.getHours()).toBe(6);
    expect(result.getMinutes()).toBe(0);
  });

  it('accepts a Temporal.ZonedDateTime as the date argument', () => {
    const zoned = Temporal.ZonedDateTime.from('2014-06-25T10:00:00+00:00[UTC]');
    expect(toZonedTime(zoned, 'America/New_York')).toEqual(
      dateFnsTzToZonedTime(new Date(zoned.epochMilliseconds), 'America/New_York')
    );
  });

  it('accepts a Temporal.PlainDateTime as the date argument (read as UTC, per the UTC rule)', () => {
    const plainDateTime = Temporal.PlainDateTime.from('2014-06-25T10:00:00');
    const equivalentDate = new Date(Date.UTC(2014, 5, 25, 10, 0, 0));
    expect(toZonedTime(plainDateTime, 'America/New_York')).toEqual(
      dateFnsTzToZonedTime(equivalentDate, 'America/New_York')
    );
  });
});
