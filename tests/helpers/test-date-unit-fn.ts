import { expect, it } from 'vitest';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike } from '../../src/types.js';

type DateUnitFn = {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};

export function testDateUnitFn(
  fn: DateUnitFn,
  dateFnsFn: (date: Date, amount: number) => Date,
  amount: number,
  dates: Date[] = fixtureDates
): void {
  it.each(dates)('matches date-fns for Date input (%s)', (date) => {
    expect(fn(date, amount)).toEqual(dateFnsFn(date, amount));
  });

  it.each(dates)('matches date-fns for PlainDate input (%s)', (date) => {
    const expected = toPlainDate(dateFnsFn(date, amount));
    expect(fn(toPlainDate(date), amount).toString()).toBe(expected.toString());
  });

  it.each(dates)('matches date-fns for PlainDateTime input (%s)', (date) => {
    const expected = toPlainDateTime(dateFnsFn(date, amount));
    expect(fn(toPlainDateTime(date), amount).toString()).toBe(expected.toString());
  });

  it.each(dates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    const expected = toZonedDateTime(dateFnsFn(date, amount));
    expect(fn(toZonedDateTime(date), amount).toString()).toBe(expected.toString());
  });
}
