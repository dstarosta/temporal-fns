import { expect, it } from 'vitest';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike } from '../../src/types.js';
import { type StartOfWeekOptions } from '../../src/start-of-week.js';

type WeekFn = {
  (date: Date, options?: StartOfWeekOptions): Date;
  <T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
};

export function testWeekFn(
  fn: WeekFn,
  dateFnsFn: (date: Date, options?: StartOfWeekOptions) => Date,
  dates: Date[] = fixtureDates
): void {
  const weekStartsOnValues = [0, 1, 2, 3, 4, 5, 6] as const;

  for (const weekStartsOn of weekStartsOnValues) {
    const label = String(weekStartsOn);

    it.each(dates)(`matches date-fns for Date input, weekStartsOn=${label} (%s)`, (date) => {
      expect(fn(date, { weekStartsOn })).toEqual(dateFnsFn(date, { weekStartsOn }));
    });

    it.each(dates)(`matches date-fns for PlainDate input, weekStartsOn=${label} (%s)`, (date) => {
      const expected = toPlainDate(dateFnsFn(date, { weekStartsOn }));
      expect(fn(toPlainDate(date), { weekStartsOn }).toString()).toBe(expected.toString());
    });

    it.each(dates)(
      `matches date-fns for PlainDateTime input, weekStartsOn=${label} (%s)`,
      (date) => {
        const expected = toPlainDateTime(dateFnsFn(date, { weekStartsOn }));
        expect(fn(toPlainDateTime(date), { weekStartsOn }).toString()).toBe(expected.toString());
      }
    );

    it.each(dates)(
      `matches date-fns for ZonedDateTime input, weekStartsOn=${label} (%s)`,
      (date) => {
        const expected = toZonedDateTime(dateFnsFn(date, { weekStartsOn }));
        expect(fn(toZonedDateTime(date), { weekStartsOn }).toString()).toBe(expected.toString());
      }
    );
  }

  it.each(dates)('matches date-fns default (no options) for Date input (%s)', (date) => {
    expect(fn(date)).toEqual(dateFnsFn(date));
  });
}
