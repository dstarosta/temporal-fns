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
import { type StartOfWeekOptions } from '../../src/start-of-week.js';

type DifferenceInWeekFn = {
  (a: Date, b: Date, options?: StartOfWeekOptions): number;
  <T extends DateLike>(a: T, b: T, options?: StartOfWeekOptions): number;
};

export function testDifferenceInWeekFn(
  fn: DifferenceInWeekFn,
  dateFnsFn: (a: Date, b: Date, options?: StartOfWeekOptions) => number,
  dates: Date[] = fixtureDates
): void {
  const pairs: [Date, Date][] = [];
  for (const a of dates) {
    for (const b of dates) {
      pairs.push([a, b]);
    }
  }

  const weekStartsOnValues = [0, 1, 2, 3, 4, 5, 6] as const;

  for (const weekStartsOn of weekStartsOnValues) {
    const label = String(weekStartsOn);

    it.each(pairs)(`matches date-fns for Date input, weekStartsOn=${label} (%s vs %s)`, (a, b) => {
      expect(fn(a, b, { weekStartsOn })).toBe(dateFnsFn(a, b, { weekStartsOn }));
    });

    it.each(pairs)(
      `matches date-fns for ZonedDateTime input, weekStartsOn=${label} (%s vs %s)`,
      (a, b) => {
        expect(fn(toZonedDateTime(a), toZonedDateTime(b), { weekStartsOn })).toBe(
          dateFnsFn(a, b, { weekStartsOn })
        );
      }
    );

    it.each(pairs)(
      `matches date-fns+UTCDate for PlainDate input, weekStartsOn=${label} (%s vs %s)`,
      (a, b) => {
        expect(fn(toPlainDate(a), toPlainDate(b), { weekStartsOn })).toBe(
          dateFnsFn(toMidnightUTCDate(a), toMidnightUTCDate(b), { weekStartsOn })
        );
      }
    );

    it.each(pairs)(
      `matches date-fns+UTCDate for PlainDateTime input, weekStartsOn=${label} (%s vs %s)`,
      (a, b) => {
        expect(fn(toPlainDateTime(a), toPlainDateTime(b), { weekStartsOn })).toBe(
          dateFnsFn(toUTCDate(a), toUTCDate(b), { weekStartsOn })
        );
      }
    );
  }

  it.each(pairs)('matches date-fns default (no options) for Date input (%s vs %s)', (a, b) => {
    expect(fn(a, b)).toBe(dateFnsFn(a, b));
  });
}
