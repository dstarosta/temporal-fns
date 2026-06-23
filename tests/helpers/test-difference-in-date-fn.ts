import { expect, it } from 'vitest';
import {
  fixtureDates,
  toMidnightUTCDate,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './fixtures.js';
import { type DateLike } from '../../src/types.js';

type DifferenceInFn = {
  (a: Date, b: Date): number;
  <T extends DateLike>(a: T, b: T): number;
};

export function testDifferenceInDateFn(
  fn: DifferenceInFn,
  dateFnsFn: (a: Date, b: Date) => number,
  dates: Date[] = fixtureDates
): void {
  const pairs: [Date, Date][] = [];
  for (const a of dates) {
    for (const b of dates) {
      pairs.push([a, b]);
    }
  }

  it.each(pairs)('matches date-fns for Date input (%s vs %s)', (a, b) => {
    expect(fn(a, b)).toBe(dateFnsFn(a, b));
  });

  it.each(pairs)('matches date-fns for ZonedDateTime input (%s vs %s)', (a, b) => {
    expect(fn(toZonedDateTime(a), toZonedDateTime(b))).toBe(dateFnsFn(a, b));
  });

  // Temporal.PlainDate/PlainDateTime carry no timezone, so temporal-fns treats
  // their fields as UTC — the matching date-fns behavior is `UTCDate`, not
  // plain `Date` (which date-fns reads through the system's local timezone).
  // PlainDate has no time-of-day, so it represents UTC midnight.
  it.each(pairs)('matches date-fns+UTCDate for PlainDate input (%s vs %s)', (a, b) => {
    expect(fn(toPlainDate(a), toPlainDate(b))).toBe(
      dateFnsFn(toMidnightUTCDate(a), toMidnightUTCDate(b))
    );
  });

  it.each(pairs)('matches date-fns+UTCDate for PlainDateTime input (%s vs %s)', (a, b) => {
    expect(fn(toPlainDateTime(a), toPlainDateTime(b))).toBe(dateFnsFn(toUTCDate(a), toUTCDate(b)));
  });
}
