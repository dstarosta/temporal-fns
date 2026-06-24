import { describe, expect, it } from 'vitest';
import { fromZonedTime as dateFnsTzFromZonedTime } from 'date-fns-tz';
import { fromZonedTime } from '../src/from-zoned-time.js';

describe('fromZonedTime', () => {
  it('matches date-fns-tz for an IANA zone west of UTC', () => {
    const date = new Date(2014, 5, 25, 10, 0, 0);
    expect(fromZonedTime(date, 'America/Los_Angeles')).toEqual(
      dateFnsTzFromZonedTime(date, 'America/Los_Angeles')
    );
  });

  it('matches date-fns-tz for an IANA zone east of UTC', () => {
    const date = new Date(2014, 5, 25, 10, 0, 0);
    expect(fromZonedTime(date, 'Asia/Tokyo')).toEqual(dateFnsTzFromZonedTime(date, 'Asia/Tokyo'));
  });

  it('matches the documented example', () => {
    // In June 10am in Los Angeles is 5pm UTC
    const result = fromZonedTime(new Date(2014, 5, 25, 10, 0, 0), 'America/Los_Angeles');
    expect(result.toISOString()).toBe('2014-06-25T17:00:00.000Z');
  });

  it('accepts a Temporal.ZonedDateTime as the date argument', () => {
    const zoned = Temporal.ZonedDateTime.from('2014-06-25T10:00:00-04:00[America/New_York]');
    const equivalentLocalDate = new Date(2014, 5, 25, 10, 0, 0);
    expect(fromZonedTime(zoned, 'America/Los_Angeles')).toEqual(
      dateFnsTzFromZonedTime(equivalentLocalDate, 'America/Los_Angeles')
    );
  });

  it('accepts a Temporal.PlainDateTime as the date argument', () => {
    const plainDateTime = Temporal.PlainDateTime.from('2014-06-25T10:00:00');
    const equivalentLocalDate = new Date(2014, 5, 25, 10, 0, 0);
    expect(fromZonedTime(plainDateTime, 'America/Los_Angeles')).toEqual(
      dateFnsTzFromZonedTime(equivalentLocalDate, 'America/Los_Angeles')
    );
  });
});
