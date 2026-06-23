import { expect, it } from 'vitest';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike } from '../../src/types.js';
import { type StartOfWeekOptions } from '../../src/start-of-week.js';

type SameWeekFn = {
  (a: Date, b: Date, options?: StartOfWeekOptions): boolean;
  <T extends DateLike>(a: T, b: T, options?: StartOfWeekOptions): boolean;
};

export function testSameWeekFn(
  fn: SameWeekFn,
  dateFnsFn: (a: Date, b: Date, options?: StartOfWeekOptions) => boolean
): void {
  const pairs: [Date, Date][] = [];
  for (const a of fixtureDates) {
    for (const b of fixtureDates) {
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
      `matches date-fns for PlainDate input, weekStartsOn=${label} (%s vs %s)`,
      (a, b) => {
        expect(fn(toPlainDate(a), toPlainDate(b), { weekStartsOn })).toBe(
          dateFnsFn(a, b, { weekStartsOn })
        );
      }
    );

    it.each(pairs)(
      `matches date-fns for PlainDateTime input, weekStartsOn=${label} (%s vs %s)`,
      (a, b) => {
        expect(fn(toPlainDateTime(a), toPlainDateTime(b), { weekStartsOn })).toBe(
          dateFnsFn(a, b, { weekStartsOn })
        );
      }
    );

    it.each(pairs)(
      `matches date-fns for ZonedDateTime input, weekStartsOn=${label} (%s vs %s)`,
      (a, b) => {
        expect(fn(toZonedDateTime(a), toZonedDateTime(b), { weekStartsOn })).toBe(
          dateFnsFn(a, b, { weekStartsOn })
        );
      }
    );
  }
}
