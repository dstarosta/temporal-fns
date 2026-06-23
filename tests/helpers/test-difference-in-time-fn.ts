import { expect, it } from 'vitest';
import { fixtureDates, toPlainDateTime, toUTCDate, toZonedDateTime } from './fixtures.js';
import { type TimeLike } from '../../src/types.js';

type DifferenceInFn = {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};

export function testDifferenceInTimeFn(
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

  // Temporal.PlainDateTime carries no timezone, so temporal-fns treats it as
  // UTC — the matching date-fns behavior is `UTCDate`, not plain `Date`
  // (which date-fns reads through the system's local timezone and DST).
  it.each(pairs)('matches date-fns+UTCDate for PlainDateTime input (%s vs %s)', (a, b) => {
    expect(fn(toPlainDateTime(a), toPlainDateTime(b))).toBe(dateFnsFn(toUTCDate(a), toUTCDate(b)));
  });
}
