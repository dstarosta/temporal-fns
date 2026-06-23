import { expect, it } from 'vitest';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike } from '../../src/types.js';

type NumericFn = {
  (date: Date): number;
  (date: DateLike): number;
};

export function testNumericPredicateFn(
  fn: NumericFn,
  dateFnsFn: (date: Date) => number,
  dates: Date[] = fixtureDates
): void {
  it.each(dates)('matches date-fns for Date input (%s)', (date) => {
    expect(fn(date)).toBe(dateFnsFn(date));
  });

  it.each(dates)('matches date-fns for PlainDate input (%s)', (date) => {
    expect(fn(toPlainDate(date))).toBe(dateFnsFn(date));
  });

  it.each(dates)('matches date-fns for PlainDateTime input (%s)', (date) => {
    expect(fn(toPlainDateTime(date))).toBe(dateFnsFn(date));
  });

  it.each(dates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    expect(fn(toZonedDateTime(date))).toBe(dateFnsFn(date));
  });
}
