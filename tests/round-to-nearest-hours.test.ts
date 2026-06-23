import { describe, expect, it } from 'vitest';
import { roundToNearestHours as dateFnsRoundToNearestHoursImpl, type NearestHours } from 'date-fns';
import { roundToNearestHours } from '../src/round-to-nearest-hours.js';
import { fixtureDates, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

// date-fns narrows nearestTo to a fixed union (NearestHours) at the type
// level even though it's runtime-validated (any out-of-range number falls
// through to Invalid Date) — this project intentionally types it as a plain
// number, so this cast lets the test exercise the same runtime range,
// including the invalid case, without fighting date-fns' stricter type.
function dateFnsRoundToNearestHours(
  date: Date,
  options?: { nearestTo?: number; roundingMethod?: 'ceil' | 'floor' | 'round' | 'trunc' }
): Date {
  return dateFnsRoundToNearestHoursImpl(date, options as { nearestTo?: NearestHours } | undefined);
}

describe('roundToNearestHours', () => {
  for (const date of fixtureDates) {
    it(`matches date-fns for Date input, default options (${date.toISOString()})`, () => {
      expect(roundToNearestHours(date)).toEqual(dateFnsRoundToNearestHours(date));
    });

    for (const roundingMethod of ['ceil', 'floor', 'round', 'trunc'] as const) {
      it(`matches date-fns for Date input, roundingMethod=${roundingMethod} (${date.toISOString()})`, () => {
        expect(roundToNearestHours(date, { roundingMethod })).toEqual(
          dateFnsRoundToNearestHours(date, { roundingMethod })
        );
      });
    }

    for (const nearestTo of [2, 3, 4, 6, 12]) {
      it(`matches date-fns for Date input, nearestTo=${String(nearestTo)} (${date.toISOString()})`, () => {
        expect(roundToNearestHours(date, { nearestTo })).toEqual(
          dateFnsRoundToNearestHours(date, { nearestTo })
        );
      });
    }

    it(`matches date-fns for an out-of-range nearestTo, Date input (${date.toISOString()})`, () => {
      const result = roundToNearestHours(date, { nearestTo: 13 });
      expect(Number.isNaN(result.getTime())).toBe(true);
      expect(Number.isNaN(dateFnsRoundToNearestHours(date, { nearestTo: 13 }).getTime())).toBe(
        true
      );
    });

    it(`matches date-fns for ZonedDateTime input (${date.toISOString()})`, () => {
      const expected = toZonedDateTime(dateFnsRoundToNearestHours(date));
      expect(roundToNearestHours(toZonedDateTime(date)).toString()).toBe(expected.toString());
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${date.toISOString()})`, () => {
      const expected = toPlainDateTime(dateFnsRoundToNearestHours(toUTCDate(date)));
      expect(roundToNearestHours(toPlainDateTime(date)).toString()).toBe(expected.toString());
    });

    it(`throws RangeError for an out-of-range nearestTo, PlainDateTime input (${date.toISOString()})`, () => {
      expect(() => roundToNearestHours(toPlainDateTime(date), { nearestTo: 13 })).toThrow(
        RangeError
      );
    });
  }
});
