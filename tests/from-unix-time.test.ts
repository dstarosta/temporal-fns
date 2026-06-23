import { describe, expect, it } from 'vitest';
import { fromUnixTime as dateFnsFromUnixTime } from 'date-fns';
import { fromUnixTime } from '../src/from-unix-time.js';
import { fromUnixTimeZonedDateTime } from '../src/from-unix-time-zoned-date-time.js';
import { fromUnixTimePlainDateTime } from '../src/from-unix-time-plain-date-time.js';
import { toZonedDateTime, utcFieldsToPlainDateTime } from './helpers/fixtures.js';

describe('fromUnixTime', () => {
  const unixTimes = [0, 1_750_000_000, -86_400, 1_577_836_800];

  for (const unixTime of unixTimes) {
    it(`matches date-fns for ${String(unixTime)}`, () => {
      expect(fromUnixTime(unixTime)).toEqual(dateFnsFromUnixTime(unixTime));
    });
  }
});

describe('fromUnixTimeZonedDateTime', () => {
  const unixTimes = [0, 1_750_000_000, -86_400, 1_577_836_800];

  for (const unixTime of unixTimes) {
    it(`matches date-fns for ${String(unixTime)} (system zone)`, () => {
      const expected = toZonedDateTime(dateFnsFromUnixTime(unixTime));
      expect(fromUnixTimeZonedDateTime(unixTime).toString()).toBe(expected.toString());
    });

    it(`matches date-fns for ${String(unixTime)} in a fixed zone`, () => {
      // Unlike toZonedDateTime(date, zone) (which reinterprets a Date's
      // wall-clock fields as that zone's local time), fromUnixTimeZonedDateTime
      // converts the actual instant — so the expected value is computed
      // directly from the same instant via Temporal, not via the fixture
      // helper's wall-clock-reinterpreting semantics.
      const expected = Temporal.Instant.fromEpochMilliseconds(unixTime * 1000).toZonedDateTimeISO(
        'Asia/Tokyo'
      );
      expect(fromUnixTimeZonedDateTime(unixTime, 'Asia/Tokyo').toString()).toBe(
        expected.toString()
      );
    });
  }
});

describe('fromUnixTimePlainDateTime', () => {
  const unixTimes = [0, 1_750_000_000, -86_400, 1_577_836_800];

  for (const unixTime of unixTimes) {
    it(`matches date-fns+UTCDate for ${String(unixTime)}`, () => {
      const date = dateFnsFromUnixTime(unixTime);
      const expected = utcFieldsToPlainDateTime(date);
      expect(fromUnixTimePlainDateTime(unixTime).toString()).toBe(expected.toString());
    });
  }
});
