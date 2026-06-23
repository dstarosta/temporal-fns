import { expect, it } from 'vitest';
import {
  fixtureDates,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
  utcFieldsToPlainDateTime,
} from './fixtures.js';
import { type TimeLike } from '../../src/types.js';

type TimeUnitFn = {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};

export function testTimeUnitFn(
  fn: TimeUnitFn,
  dateFnsFn: (date: Date, amount: number) => Date,
  amount: number,
  dates: Date[] = fixtureDates
): void {
  it.each(dates)('matches date-fns for Date input (%s)', (date) => {
    expect(fn(date, amount)).toEqual(dateFnsFn(date, amount));
  });

  // Temporal.PlainDateTime carries no timezone, so temporal-fns treats it as
  // UTC — the matching date-fns behavior is `UTCDate`, not plain `Date`
  // (which date-fns reads through the system's local timezone and DST).
  it.each(dates)('matches date-fns+UTCDate for PlainDateTime input (%s)', (date) => {
    const expected = utcFieldsToPlainDateTime(dateFnsFn(toUTCDate(date), amount));
    expect(fn(toPlainDateTime(date), amount).toString()).toBe(expected.toString());
  });

  it.each(dates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    const expected = toZonedDateTime(dateFnsFn(date, amount));
    expect(fn(toZonedDateTime(date), amount).toString()).toBe(expected.toString());
  });
}
