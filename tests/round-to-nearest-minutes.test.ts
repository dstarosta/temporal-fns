import { describe, expect, it } from 'vitest';
import {
  roundToNearestMinutes as dateFnsRoundToNearestMinutesImpl,
  type NearestMinutes,
} from 'date-fns';
import { roundToNearestMinutes } from '../src/round-to-nearest-minutes.js';
import { fixtureDates, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

// See the analogous comment in round-to-nearest-hours.test.ts: date-fns
// narrows nearestTo to a fixed union at the type level even though it's
// runtime-validated, so this cast lets the test exercise the same runtime
// range (including the invalid case) without fighting that stricter type.
function dateFnsRoundToNearestMinutes(
  date: Date,
  options?: { nearestTo?: number; roundingMethod?: 'ceil' | 'floor' | 'round' | 'trunc' }
): Date {
  return dateFnsRoundToNearestMinutesImpl(
    date,
    options as { nearestTo?: NearestMinutes } | undefined
  );
}

describe('roundToNearestMinutes', () => {
  for (const date of fixtureDates) {
    it(`matches date-fns for Date input, default options (${date.toISOString()})`, () => {
      expect(roundToNearestMinutes(date)).toEqual(dateFnsRoundToNearestMinutes(date));
    });

    for (const roundingMethod of ['ceil', 'floor', 'round', 'trunc'] as const) {
      it(`matches date-fns for Date input, roundingMethod=${roundingMethod} (${date.toISOString()})`, () => {
        expect(roundToNearestMinutes(date, { roundingMethod })).toEqual(
          dateFnsRoundToNearestMinutes(date, { roundingMethod })
        );
      });
    }

    for (const nearestTo of [2, 5, 10, 15, 30]) {
      it(`matches date-fns for Date input, nearestTo=${String(nearestTo)} (${date.toISOString()})`, () => {
        expect(roundToNearestMinutes(date, { nearestTo })).toEqual(
          dateFnsRoundToNearestMinutes(date, { nearestTo })
        );
      });
    }

    it(`matches date-fns for an out-of-range nearestTo, Date input (${date.toISOString()})`, () => {
      const result = roundToNearestMinutes(date, { nearestTo: 31 });
      expect(Number.isNaN(result.getTime())).toBe(true);
      expect(Number.isNaN(dateFnsRoundToNearestMinutes(date, { nearestTo: 31 }).getTime())).toBe(
        true
      );
    });

    it(`matches date-fns for ZonedDateTime input (${date.toISOString()})`, () => {
      const expected = toZonedDateTime(dateFnsRoundToNearestMinutes(date));
      expect(roundToNearestMinutes(toZonedDateTime(date)).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${date.toISOString()})`, () => {
      const expected = toPlainDateTime(dateFnsRoundToNearestMinutes(toUTCDate(date)));
      expect(roundToNearestMinutes(toPlainDateTime(date)).toString()).toBe(expected.toString());
    });

    it(`throws RangeError for an out-of-range nearestTo, PlainDateTime input (${date.toISOString()})`, () => {
      expect(() => roundToNearestMinutes(toPlainDateTime(date), { nearestTo: 31 })).toThrow(
        RangeError
      );
    });
  }
});
